from rest_framework import serializers
from complaints.models import Complaints

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaints
        fields = '__all__'