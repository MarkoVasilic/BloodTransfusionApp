from rest_framework import serializers
from equipment.models import Equipment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'