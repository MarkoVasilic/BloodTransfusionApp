from django.shortcuts import render
from rest_framework import filters, generics, viewsets, status, mixins, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from appointment.serializer import AppointmentSerializer, AppointmentUserSerializer
from appointment.models import Appointment
from rest_framework.response import Response
from datetime import datetime
from appointment.models import Appointment
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentGetByCenterViewSet(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = '__all__'
    def list(self, request, *args, **kwargs):
        if request.query_params:
            instance = Appointment.objects.filter(transfusion_center=kwargs['pk'], date_time__gte=datetime.now(), user_profile=None).order_by(request.query_params['ordering'])
        else:
            instance = Appointment.objects.filter(transfusion_center=kwargs['pk'], date_time__gte=datetime.now(), user_profile=None)
        if instance:
            serializer = self.get_serializer(instance, many=True)
            return Response(serializer.data)
        else:
            return Response(status=404)

class AppointmentUpdateUserProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class ListCenterUsers(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentUserSerializer
    permission_classes = [IsAuthenticated]
    def list(self, request):
        queryset = Appointment.objects.filter(transfusion_center = request.user.userprofile.tranfusion_center).exclude(user_profile = None)
        serialized_users = AppointmentUserSerializer(instance = queryset, many = True)
        return Response(serialized_users.data)

class SearchCenterUsers(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentUserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['user_profile__user__first_name', 'user_profile__user__last_name']
