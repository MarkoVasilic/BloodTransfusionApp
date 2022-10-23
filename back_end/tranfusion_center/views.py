from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from tranfusion_center.models import TranfusionCenter
from tranfusion_center.serializer import TranfusionCenterSerializer 
from rest_framework.filters import OrderingFilter

class TranfusionCenterAPIView(ModelViewSet):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    permission_classes = [DjangoModelPermissions]
    filter_backends = [OrderingFilter]
    ordering_fields = '__all__'
    ordering = ['name']

