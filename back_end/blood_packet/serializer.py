from rest_framework import serializers
from blood_packet.models import BloodPacket

class BloodPacketSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodPacket
        fields = '__all__'