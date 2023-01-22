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
from appointment.models import Appointment
from appointment.serializer import AppointmentSerializer
from rest_framework.response import Response
from django.db.models import Q
from datetime import datetime, timedelta
from django.db import DatabaseError, transaction
import time


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
        try:
            
            tcs = TranfusionCenter.objects.select_for_update(nowait=True).filter(id=kwargs['pk'])
            with transaction.atomic():
                for tc in tcs:
                    time.sleep(5)
                    partial = kwargs.pop('partial', False)
                    instance = tc
                    serializer = self.get_serializer(instance, data=request.data, partial=partial)
                    serializer.is_valid(raise_exception=True)
                    self.perform_update(serializer)

                    if getattr(instance, '_prefetched_objects_cache', None):
                        # If 'prefetch_related' has been applied to a queryset, we need to
                        # forcibly invalidate the prefetch cache on the instance.
                        instance._prefetched_objects_cache = {}

                    return Response(serializer.data)
                           
        except DatabaseError:
            return Response({"message" : "Someone else is trying to update transfusion centar!"}, status=404)
     
        

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

class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'TranfusionCenterUser'

class ListTransfusionCentersForAppointmentAPIView(generics.ListAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    #permission_classes = [permissions.IsAuthenticated & (IsUser)]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'

    def list(self, request, date_time):
        centers = self.filter_queryset(self.get_queryset())

        centersList = []
        for c in centers:
            appointments = Appointment.objects.filter(Q(transfusion_center=c.id) & Q(date_time__gte=datetime.strptime(date_time, '%Y-%m-%dT%H:%M')-timedelta(minutes=45)) & Q(date_time__lte=datetime.strptime(date_time, '%Y-%m-%dT%H:%M')+timedelta(minutes=45)))
            if len(appointments) <= 0:
                centersList.append(c)
        serializer = self.get_serializer(centersList, many=True)
        return Response(serializer.data)

        

    

    



        