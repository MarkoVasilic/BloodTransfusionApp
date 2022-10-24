from atexit import register
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from django.contrib.auth.models import User
from user_profile.models import UserProfile
from .serializers import RegisterSerializer, UserProfileSerializer, UserSerializer
from django.contrib.auth.models import Group
from rest_framework import status, mixins

class UserViewSet(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    print(queryset)

class RegisterCenterUserAPIView(APIView):
    def post(self, request, format=None):
        return post_new_user(request, Group.objects.get(name="TranfusionCenterUser"), False, False, False)

class RegisterCenterStaffAPIView(APIView):
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    def post(self, request, format=None):
        return post_new_user(request, Group.objects.get(name="TranfusionCenterStaff"), True, False, False)

class RegisterCenterAdminAPIView(APIView):
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    def post(self, request, format=None):
        return post_new_user(request, Group.objects.get(name="Admin"), True, True, True)

def post_new_user(request, group, isActive, is_superuser, is_staff):
    register_serializer = RegisterSerializer(data=request.data)
    user_profile_serializer = UserProfileSerializer(data=request.data)
    if register_serializer.is_valid():
        if user_profile_serializer.is_valid():
            instance = register_serializer.save()
            instance.groups.add(group)
            instance.is_superuser = is_superuser
            instance.is_staff = is_staff
            instance.userprofile.is_activated = isActive
            instance.save()
            user_profile_serializer.instance = instance.userprofile
            user_profile_serializer.save()
            return Response(user_profile_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(register_serializer.errors, status=status.HTTP_400_BAD_REQUEST)