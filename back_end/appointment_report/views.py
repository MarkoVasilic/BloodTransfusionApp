from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from appointment_report.models import AppointmentReport
from appointment_report.serializer import AppointmentReportSerializer

class AppointmentReportViewSet(ModelViewSet):
    queryset = AppointmentReport.objects.all()
    serializer_class = AppointmentReportSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]