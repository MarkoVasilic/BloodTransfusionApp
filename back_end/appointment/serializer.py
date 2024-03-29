from rest_framework import serializers
from appointment.models import Appointment
from user_profile.serializers import UserAppointmentSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField()
    class Meta:
        model = Appointment
        fields = ["id", "date_time", "duration", "user_profile", "transfusion_center", "user_profiles_that_canceled",
                  "staff"]

class AppointmentUserSerializer(serializers.ModelSerializer):
    user_profile = UserAppointmentSerializer()
    class Meta:
        model = Appointment
        fields = ['id','date_time','duration', 'transfusion_center','staff', 'user_profile']

class AppointmentPredefinedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id','date_time','duration', 'transfusion_center','staff']

class AppointmentWithReportSerializer(serializers.ModelSerializer):
    accepted = serializers.BooleanField()
    center_name = serializers.StringRelatedField()
    class Meta:
        model = Appointment
        fields = ['id','date_time','duration', 'transfusion_center','staff', 'accepted', 'center_name']

class AppointmentWithQrCodeSerializer(serializers.ModelSerializer):
    status = serializers.StringRelatedField()
    center_name = serializers.StringRelatedField()
    qrcode_url = serializers.StringRelatedField()
    class Meta:
        model = Appointment
        fields = ['id','date_time','duration', 'transfusion_center','staff', 'status', 'qrcode_url', 'center_name']
