from django.shortcuts import render
from rest_framework import filters, generics, mixins, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from appointment.serializer import AppointmentSerializer
from appointment.models import Appointment
from rest_framework.response import Response
from datetime import datetime
import qrcode
import json
from django.core.files.storage import FileSystemStorage

def create_qrcode(data):
    img = qrcode.make(json.dumps(data))
    type(img)
    print(img)
    #img.save("/qrcodes/some_file.png")
    fs = FileSystemStorage()
    file = fs.save('some_file.png', img)
    # the fileurl variable now contains the url to the file. This can be used to serve the file when needed.
    fileurl = fs.url(file)

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

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
    def put(self, request, *args, **kwargs):
        create_qrcode(request.data)
        return self.update(request, *args, **kwargs)
