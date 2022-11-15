from rest_framework import serializers
from appointment.models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "date_time", "duration", "user_profile", "transfusion_center",
                  "staff"]
