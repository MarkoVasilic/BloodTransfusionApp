from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from blood_packet.models import BloodPacket
from blood_packet.serializer import BloodPacketSerializer

class RetrieveBloodPacketByUser(generics.RetrieveAPIView):
    queryset = BloodPacket.objects.all()
    serializer_class = BloodPacketSerializer
    def get(self, request, pk):
        queryset = BloodPacket.objects.filter(pk = pk)
        serialized_data = BloodPacketSerializer(instance = queryset, many = True)
        return Response(serialized_data.data)

class BloodPacketViewSet(ModelViewSet):
    queryset = BloodPacket.objects.all()
    serializer_class = BloodPacketSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
