from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework import permissions, generics, status, filters
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from appointment_report.models import AppointmentReport
from appointment.models import Appointment
from appointment_report.serializer import AppointmentReportSerializer
from datetime import datetime, timedelta
from django_filters.rest_framework import DjangoFilterBackend
import pytz

class AppointmentReportViewSet(ModelViewSet):
    queryset = AppointmentReport.objects.all()
    serializer_class = AppointmentReportSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

#Metoda za provjeru da li je napravljen vec jedan Report za dati Appointment
class AppointmentReportDuplicate(generics.RetrieveAPIView):
    queryset = AppointmentReport.objects.all()
    serializer_class = AppointmentReportSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def get(self, request, pk):
        queryset = AppointmentReport.objects.filter(appointment = pk)
        if(queryset.count() == 0):
            return Response(False, status = status.HTTP_200_OK)
        else:
            return Response(True, status = status.HTTP_201_CREATED)
