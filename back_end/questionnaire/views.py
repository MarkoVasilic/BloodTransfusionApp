from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from questionnaire.models import Questionnaire
from questionnaire.serializer import QuestionnaireSerializer 
from rest_framework.filters import OrderingFilter

class QuestionnaireAPIView(ModelViewSet):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
