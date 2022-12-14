from urllib import request
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
import tranfusion_center
from tranfusion_center import serializer
from tranfusion_center.models import TranfusionCenter
from tranfusion_center.serializer import TranfusionCenterSerializer 
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import NumberFilter, FilterSet
from rest_framework import filters, generics, permissions
from django.contrib.auth.models import User
from user_profile.models import UserProfile
from tranfusion_center.models import TranfusionCenter
from rest_framework.response import Response

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
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'country', 'city', 'street', 'building_number']
    ordering_fields = '__all__'
    filterset_fields = {
        'average_grade' : ['gte', 'lte']
    }

class TransfusionCenterAPIView(generics.RetrieveAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    def findCenter(request, self):
        queryset = TranfusionCenter.objects.get(id = request.user.userprofile.tranfusion_center_id)
        serializer = TranfusionCenterSerializer
        return Response(serializer.data)


        