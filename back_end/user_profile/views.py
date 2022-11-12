from atexit import register
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from user_profile.models import UserProfile
from .serializers import RegisterSerializer, UserProfileSerializer, UserSerializer, UserUpdateSerializer, UserUpdatePasswordSerializer
from django.contrib.auth.models import Group, AnonymousUser
from rest_framework import status, mixins, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions
from rest_framework.decorators import api_view
from tranfusion_center.models import TranfusionCenter
from rest_framework import viewsets

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'Admin'

class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'TranfusionCenterStaff'

class IsStaffInCenter(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        staff_in_center = TranfusionCenter.objects.prefetch_related("userprofile_set__user__groups").get(id = request.user.userprofile.tranfusion_center.id).userprofile_set.all()
        ids = []
        for sic in staff_in_center:
            ids.append(sic.id)
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'TranfusionCenterStaff' and (obj.id in ids)
        

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return obj.id == request.user.id
        else:
            return False

class UserViewSet(mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['=first_name', '=last_name']
    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsAdmin]
        elif self.action == 'retrieve':
            self.permission_classes = [IsOwner | IsAdmin | IsStaffInCenter]
        return super(self.__class__, self).get_permissions()

class UserUpdateViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    
class RegisterCenterUserAPIView(APIView):
    queryset = User.objects.all()
    def post(self, request, format=None):
        return post_new_user(request, Group.objects.get(name="TranfusionCenterUser"), False, False, False, None)

class RegisterCenterStaffAPIView(APIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]
    def post(self, request, format=None):
        return post_new_user(request, Group.objects.get(name="TranfusionCenterStaff"), True, False, False, None)

class RegisterCenterAdminAPIView(APIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]
    def post(self, request, format=None):
        return post_new_user(request, Group.objects.get(name="Admin"), True, True, True, None)

def post_new_user(request, group, isActive, is_superuser, is_staff, tranfusion_center):
    print(request.data)
    register_serializer = RegisterSerializer(data=request.data)
    user_profile_serializer = UserProfileSerializer(data=request.data)
    if register_serializer.is_valid():
        if user_profile_serializer.is_valid():
            instance = register_serializer.save()
            instance.groups.add(group)
            instance.is_superuser = is_superuser
            instance.is_staff = is_staff
            instance.userprofile.is_activated = isActive
            instance.tranfusion_center = tranfusion_center
            instance.save()
            user_profile_serializer.instance = instance.userprofile
            user_profile_serializer.save()
            return Response(user_profile_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(register_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    def get(self, request):
        if isinstance(request.user, AnonymousUser) == True:
            return Response(status=404)
        else:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)   

class ListCenterStaff(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated & (IsStaff | IsAdmin)]
    def retrieve(self, request, pk):
        queryset = TranfusionCenter.objects.prefetch_related("userprofile_set__user__groups").get(id = pk).userprofile_set.all()
        serialized_users = UserSerializer(instance = [pu.user for pu in queryset if pu.user.groups.filter(name = "TranfusionCenterStaff")], many = True)
        serialized_data = UserProfileSerializer(instance=queryset, many = True)
        return Response(serialized_users.data)


class UserDestroyAPIView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'
    def perform_destroy(self, instance):
        super().perform_destroy(instance)

class UserUpdatePasswordView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdatePasswordSerializer
    permission_classes = [IsAuthenticated, IsOwner]

class UserUpdateStaffView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]


