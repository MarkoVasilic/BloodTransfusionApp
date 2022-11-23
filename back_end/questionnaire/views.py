from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from questionnaire.models import Questionnaire
from questionnaire.serializer import QuestionnaireSerializer 
from rest_framework.filters import OrderingFilter
from rest_framework import permissions, generics, mixins
from rest_framework.response import Response
import datetime
import pytz

class IsViewAllowedForLoggedUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user_profile.id == obj.user.id

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.values_list('name',flat = True)[0] == 'Admin'

class CreateQuestionnaireAPIView(generics.CreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    def post(self, request, *args, **kwargs):
        request.data['created'] = datetime.datetime.now(tz=pytz.timezone('Europe/Belgrade'))
        request.data['updated'] = datetime.datetime.now(tz=pytz.timezone('Europe/Belgrade'))
        return self.create(request, *args, **kwargs)

class RetrieveUpdateDestroyQuestionnaireAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
        
class RetrieveQuestionnaireAPIView(generics.RetrieveAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, IsViewAllowedForLoggedUser]

class RetrieveQuestionnaireByUserAPIView(mixins.ListModelMixin,
                            generics.GenericAPIView):
    queryset = [Questionnaire.objects.filter(user_profile=12).order_by("created").last()]
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, IsViewAllowedForLoggedUser]
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class ListQuestionnaireGetAPIView(generics.ListAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class RetrieveQuestionnaireByUser(generics.RetrieveAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    def get(self, request, pk):
        queryset = Questionnaire.objects.filter(user_profile = pk).order_by("created").last()
        serialized_data = QuestionnaireSerializer(instance = queryset)
        return Response(serialized_data.data)