from urllib import request
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
import tranfusion_center
from tranfusion_center import serializer
from tranfusion_center.models import TranfusionCenter
from tranfusion_center.serializer import TranfusionCenterSerializer 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions
from django.contrib.auth.models import User
from user_profile.models import UserProfile
from tranfusion_center.models import TranfusionCenter

class IsUpdateAllowedForLoggedUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.userprofile.tranfusion_center_id == obj.id or request.user.is_superuser

class CreateTranfusionCenterAPIView(generics.CreateAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

class RetrieveUpdateDestroyTranfusionCenterAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    permission_classes = [IsAuthenticated, IsUpdateAllowedForLoggedUser]
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
        

class RetrieveTranfusionCenterAPIView(generics.RetrieveAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer

class ListTranfusionCenterGetAPIView(generics.ListAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['=name', '=description', '=country', 'city', '=street', '=building_number']

