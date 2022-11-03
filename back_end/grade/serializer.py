from rest_framework import serializers
from grade.models import Grade

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'