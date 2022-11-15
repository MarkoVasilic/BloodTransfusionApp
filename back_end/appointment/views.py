from django.shortcuts import render
from rest_framework import filters, generics, mixins, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from appointment.serializer import AppointmentSerializer
from appointment.models import Appointment
from rest_framework.response import Response
from datetime import datetime

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
