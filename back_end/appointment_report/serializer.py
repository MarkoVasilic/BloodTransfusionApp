from rest_framework import serializers
from appointment_report.models import AppointmentReport
from appointment.serializer import AppointmentSerializer

class AppointmentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentReport
        fields = '__all__'