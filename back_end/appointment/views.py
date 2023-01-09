from django.shortcuts import render
from rest_framework import filters, generics, viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from appointment.serializer import AppointmentSerializer, AppointmentUserSerializer, AppointmentPredefinedSerializer, AppointmentWithReportSerializer, AppointmentWithQrCodeSerializer
from appointment.models import Appointment
from appointment_report.models import AppointmentReport
from tranfusion_center.models import TranfusionCenter
from user_profile.models import UserProfile
from questionnaire.models import Questionnaire
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime, timedelta
import qrcode
import json
import pytz
from django.core.files.storage import FileSystemStorage
import io
from django.core.files.uploadedfile import InMemoryUploadedFile
import os
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from email.mime.image import MIMEImage
from django.db.models import Q
from dateutil import parser
from django.contrib.auth.models import User
from django.db import DatabaseError, transaction

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'Admin'

class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'TranfusionCenterStaff'

class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'TranfusionCenterUser'

def create_qrcode(data):
    data.pop('date')
    data.pop('staff')
    img = qrcode.make(json.dumps(data))
    type(img)
    img_io = io.BytesIO() 
    img.save(img_io,format='png')
    thumb = InMemoryUploadedFile(img_io, None, 'foo2.png', 'image/png',img_io.seek(0,os.SEEK_END), None)
    fs = FileSystemStorage()
    file = fs.save(os.getcwd() + '/qrcodes/' + str(data['id']) + '_' + str(data['user_profile']) + '.png', thumb)
    #fileurl = fs.url(file)

def send_email(user_id, email, appointment_id):
    subject = 'Thank you for making appointment'
    body_html = '''
    <html>
        <body>
            <p>Here is your qr code with appointment information!</p>
            <img src="cid:logo.png" />
        </body>
    </html>
    '''
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email, ]
    msg = EmailMultiAlternatives(
        subject,
        body_html,
        from_email=email_from,
        to=recipient_list
    )

    msg.mixed_subtype = 'related'
    msg.attach_alternative(body_html, "text/html")
    img_dir = os.getcwd() + '\qrcodes\\'
    image = str(appointment_id) + '_' + str(user_id) + '.png'
    file_path = os.path.join(img_dir, image)
    with open(file_path, 'rb') as f:
        img = MIMEImage(f.read(), _subtype='png')
        img.add_header('Content-ID', '<{name}>'.format(name=image))
        img.add_header('Content-Disposition', 'inline', filename=image)
    msg.attach(img)
    msg.send()

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentGetByUserScheduledViewSet(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsUser)]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = '__all__'
    def list(self, request, *args, **kwargs):
        if request.query_params:
            instance = Appointment.objects.filter(user_profile=kwargs['pk'], date_time__gte=datetime.now()).order_by(request.query_params['ordering'])
        else:
            instance = Appointment.objects.filter(user_profile=kwargs['pk'], date_time__gte=datetime.now())
        if instance:
            serializer = self.get_serializer(instance, many=True)
            return Response(serializer.data)
        else:
            return Response(status=404)

class AppointmentCancelView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsUser)]
    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.get('date_time') > datetime.now(tz=pytz.utc) + timedelta(hours=24):
            serializer.validated_data['user_profiles_that_canceled'].append(serializer.validated_data['user_profile'])
            serializer.validated_data['user_profile'] = None
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response({"message" : "You can't cancel appointment that is happening in next 24 hours!"}, status=404)

class AppointmentGetByCenterViewSet(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsUser)]
    ordering_fields = '__all__'
    def list(self, request, *args, **kwargs):
        if request.query_params:
            instance = Appointment.objects.filter(transfusion_center=kwargs['pk'], date_time__gte=datetime.now(), user_profile=None).order_by(request.query_params['ordering'])
        else:
            instance = Appointment.objects.filter(transfusion_center=kwargs['pk'], date_time__gte=datetime.now(), user_profile=None)
        if instance:
            serializer = self.get_serializer(instance, many=True)
            return Response(serializer.data)
        else:
            return Response(status=404)

class AppointmentUpdateUserProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsUser)]
    def put(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.filter(id=request.user.id)
        questionnaires = Questionnaire.objects.filter(user_profile=request.user.id)
        user_appointments = Appointment.objects.filter(user_profile=request.user.id, date_time__gte=datetime.now() - timedelta(days=180), date_time__lte=datetime.now())
        future_appointments = Appointment.objects.filter(user_profile=request.user.id, date_time__gte=datetime.now(), date_time__lte=datetime.now() + timedelta(days=180))
        reports = False
        months6 = True
        app = Appointment.objects.filter(id=kwargs['pk'])
        if  len(app) > 0 and app[0].user_profile != None:
            return Response({"message" : "Somebody else already scheduled this appointment!"}, status=404)
        if len(future_appointments) > 0 and parser.parse(request.data['date_time']) < pytz.UTC.localize(datetime.now() + timedelta(days=180)):
            return Response({"message" : "You already have appointment scheduled in next 6 months!"}, status=404)
        if user_profile[0].penalty_points >= 3:
            return Response({"message" : "You have 3 penalties so you can't make appointment this month!"}, status=404)
        if len(user_appointments) > 0:
            months6 = False
        for q in questionnaires:
            if AppointmentReport.objects.filter(questionnaire=q.id).exists() == False:
                reports = True
                break
        for ua in user_appointments:
            if AppointmentReport.objects.filter(appointment=ua.id, accepted=True).exists() == False:
                months6 = True
                break
        if len(user_appointments) > 0 and user_appointments.last().date_time + timedelta(days=180) > parser.parse(request.data['date_time']):
            months6 = False
        if Questionnaire.objects.filter(user_profile=request.user.id).exists() and reports:
            if months6:
                if len(Appointment.objects.filter(id=request.data['id'], user_profiles_that_canceled=request.data['user_profile'])) == 0:
                    try:
                        apps = Appointment.objects.select_for_update(nowait=True).filter(id=kwargs['pk'])
                        with transaction.atomic():
                            for app in apps:
                                partial = kwargs.pop('partial', False)
                                instance = app
                                serializer = self.get_serializer(instance, data=request.data, partial=partial)
                                serializer.is_valid(raise_exception=True)
                                serializer.save()
                                create_qrcode(request.data)
                                send_email(request.data['user_profile'], request.user.email, request.data['id'])
                                return Response(serializer.data)
                    except DatabaseError:
                        return Response({"message" : "Somebody else already scheduled this appointment!"}, status=404)
                else:
                    return Response({"message" : "You already canceled this appointment!"}, status=404)
            else:
                    return Response({"message" : "You had appointment in last 6 months!"}, status=404)
        return Response({"message" : "You don't have questionnaire!"}, status=404)

#### predefinisani
class CreatePredefinedAppointmentView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentPredefinedSerializer
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsStaff)] #obrisati admina posle

    def post(self, request, *args, **kwargs):
        duration = timedelta(minutes=int(request.data['duration']))
        print(datetime.strptime(request.data['date_time'], '%Y-%m-%dT%H:%M') - duration)
        appointments = Appointment.objects.filter(Q(transfusion_center=request.data['transfusion_center']) & Q(date_time__gte=datetime.strptime(request.data['date_time'], '%Y-%m-%dT%H:%M')-duration) & Q(date_time__lte=datetime.strptime(request.data['date_time'], '%Y-%m-%dT%H:%M')+duration))
        #print(datetime.strptime(request.data['date_time'], '%Y-%m-%dT%H:%M')+timedelta(minutes=45))
        if len(appointments) > 0:
            return Response({'message' : 'Already exists appointment at choosen time. Please choose another date and time.'}, status=status.HTTP_404_NOT_FOUND)
        return self.create(request, *args, **kwargs)

#zakazivanje slobodnog termina za odabrani centar
class CreateAppointmentUserView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsUser)]
    def post(self, request, *args, **kwargs):
        print(request.user.id)
        user_profile = UserProfile.objects.filter(id=request.user.id)
        questionnaires = Questionnaire.objects.filter(user_profile=request.user.id)
        user_appointments = Appointment.objects.filter(user_profile=request.user.id, date_time__gte=datetime.now() - timedelta(days=180), date_time__lte=datetime.now())
        future_appointments = Appointment.objects.filter(user_profile=request.user.id, date_time__gte=datetime.now(), date_time__lte=datetime.now() + timedelta(days=180))
        reports = False
        months6 = True
        if len(future_appointments) > 0 and datetime.strptime(request.data['date_time'], '%Y-%m-%dT%H:%M') < (datetime.now() + timedelta(days=180)):
            return Response({"message" : "You already have appointment scheduled in next 6 months!"}, status=404)
        if user_profile[0].penalty_points >= 3:
            return Response({"message" : "You have 3 penalties so you can't make appointment this month!"}, status=404)
        if len(user_appointments) > 0:
            months6 = False
        for q in questionnaires:
            if AppointmentReport.objects.filter(questionnaire=q.id).exists() == False:
                reports = True
                break
        for ua in user_appointments:
            if AppointmentReport.objects.filter(appointment=ua.id, accepted=True).exists() == False:
                months6 = True
                break
        if Questionnaire.objects.filter(user_profile=request.user.id).exists() and reports:
            if months6:
                kreiran = self.create(request, *args, **kwargs)
                kreiran.data['date'] = ""
                create_qrcode(kreiran.data)
                print(kreiran)
                print(kreiran.data)
                user = User.objects.filter(id=kreiran.data['user_profile'])
                email = user[0].email
                send_email(kreiran.data['user_profile'], email, kreiran.data['id'])
                return Response({"message" : "Appointment scheduled!"}, status=200)
            else:
                    return Response({"message" : "You had appointment in last 6 months!"}, status=404)
        return Response({"message" : "You don't have questionnaire!"}, status=404)


class ListCenterUsers(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        queryset = Appointment.objects.filter(transfusion_center = request.user.userprofile.tranfusion_center)
        serialized_users = AppointmentUserSerializer(instance = queryset, many = True)
        return Response(serialized_users.data)

class ListCenterUsersForSearch(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        queryset = Appointment.objects.filter(transfusion_center = request.user.userprofile.tranfusion_center).exclude(user_profile = None).distinct("user_profile_id")
        serialized_users = AppointmentUserSerializer(instance = queryset, many = True)
        return Response(serialized_users.data)

class SearchCenterUsers(generics.ListAPIView):
    queryset = Appointment.objects.all().distinct("user_profile_id")
    serializer_class = AppointmentUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['user_profile__user__first_name', 'user_profile__user__last_name']

class ValidateAppointmentQRCode(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, pk):
        queryset = Appointment.objects.filter(pk = pk)
        if(queryset.count() == 0):
            return Response(False, status = status.HTTP_404_NOT_FOUND)
        return Response(True, status = status.HTTP_202_ACCEPTED)

class AppointmentGetByUserViewSet(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentWithReportSerializer
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsUser)]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = '__all__'
    def list(self, request, *args, **kwargs):
        appointments_to_return = []
        if request.query_params:
            user_appointments = Appointment.objects.filter(user_profile=request.user.id).order_by(request.query_params['ordering'])
        else:
            user_appointments = Appointment.objects.filter(user_profile=request.user.id)
        for i in user_appointments:
            reports = AppointmentReport.objects.prefetch_related('appointment').filter(appointment=i.id)
            center = TranfusionCenter.objects.filter(id=i.transfusion_center.id)
            if len(reports) > 0:
                i.accepted = reports[0].accepted
                i.center_name = center[0].name
                appointments_to_return.append(i)
        serializer = self.get_serializer(appointments_to_return, many=True)
        return Response(serializer.data)

class AppointmentGetQRCodesViewSet(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentWithQrCodeSerializer
    permission_classes = [permissions.IsAuthenticated & (IsAdmin | IsUser)]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = '__all__'
    def list(self, request, *args, **kwargs):
        print(request.query_params)
        if 'ordering' in request.query_params.keys():
            user_appointments = Appointment.objects.filter(user_profile=request.user.id).order_by(request.query_params['ordering'])
        else:
            user_appointments = Appointment.objects.filter(user_profile=request.user.id)
        for i in user_appointments:
            reports = AppointmentReport.objects.prefetch_related('appointment').filter(appointment=i.id)
            center = TranfusionCenter.objects.filter(id=i.transfusion_center.id)
            if len(reports) > 0 and  reports[0].accepted:
                i.status = 'Accepted'
            elif len(reports) > 0 and reports[0].accepted == False:
                i.status = 'Refused'
            else:
                i.status = 'New'
            i.qrcode_url = 'http://localhost:8000/qrcodes/' + str(i.id) + '_' + str(request.user.id) + '.png'
            i.center_name = center[0].name
        if 'filter' in request.query_params.keys():
            filtered_appointments = []
            for i in user_appointments:
                if i.status == request.query_params['filter']:
                    filtered_appointments.append(i)
        else:
            filtered_appointments = user_appointments
        serializer = self.get_serializer(filtered_appointments, many=True)
        return Response(serializer.data)
        
class AppointmentGetByUserAndStaffViewSet(generics.ListAPIView):
   queryset = Appointment.objects.all()
   serializer_class = AppointmentSerializer
   filter_backends = [DjangoFilterBackend]
   def list(self,  request, *args, **kwargs):
        user_appointments = Appointment.objects.filter(Q(staff = request.user.id), Q(user_profile = kwargs['pk']))
        reports = AppointmentReport.objects.all()
        filtered_appointments = []
        for ua in user_appointments:
            reports_appointment = AppointmentReport.objects.prefetch_related('appointment').filter(appointment = ua.id)
            if(len(reports_appointment)==0):
                filtered_appointments.append(ua)      
        serializer = self.get_serializer(filtered_appointments, many = True)
        return Response(serializer.data)
        
class DestroyAppointmentAPIView(generics.DestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class ListAppointmentsForCenterAPIView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    def list(self, request, staff):
        appointments = Appointment.objects.filter(staff=staff)
        serializer=self.get_serializer(appointments, many=True)
        return Response(serializer.data)