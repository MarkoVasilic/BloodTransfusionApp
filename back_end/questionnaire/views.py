from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from questionnaire.models import Questionnaire
from questionnaire.serializer import QuestionnaireSerializer 
from rest_framework.filters import OrderingFilter
from rest_framework import permissions, generics, mixins
from rest_framework.response import Response

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
    queryset = [Questionnaire.objects.filter(user_profile=18).order_by("created").last()]
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, IsViewAllowedForLoggedUser]
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class ListQuestionnaireGetAPIView(generics.ListAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, IsAdmin]