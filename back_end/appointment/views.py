from django.shortcuts import render
from rest_framework import filters, generics, viewsets, status, mixins, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from appointment.serializer import AppointmentSerializer, AppointmentUserSerializer
from appointment.models import Appointment
from appointment_report.models import AppointmentReport
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
        questionnaires = Questionnaire.objects.filter(user_profile=request.user.id)
        user_appointments = Appointment.objects.filter(user_profile=request.user.id, date_time__gte=datetime.now() - timedelta(days=60), date_time__lte=datetime.now())
        reports = False
        months6 = True
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
                if len(Appointment.objects.filter(id=request.data['id'], user_profiles_that_canceled=request.data['user_profile'])) == 0:
                    create_qrcode(request.data)
                    send_email(request.data['user_profile'], 'vasilicmarko111@gmail.com', request.data['id'])
                    return self.update(request, *args, **kwargs)
                else:
                    return Response({"message" : "You already canceled this appointment!"}, status=404)
            else:
                    return Response({"message" : "You had appointment in last 6 months!"}, status=404)
        return Response({"message" : "You don't have questionnaire!"}, status=404)

class ListCenterUsers(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        queryset = Appointment.objects.filter(transfusion_center = request.user.userprofile.tranfusion_center).exclude(user_profile = None)
        serialized_users = AppointmentUserSerializer(instance = queryset, many = True)
        return Response(serialized_users.data)

class SearchCenterUsers(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['user_profile__user__first_name', 'user_profile__user__last_name']
