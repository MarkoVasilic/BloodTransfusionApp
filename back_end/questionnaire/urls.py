from django.urls import path
from .views import CreateQuestionnaireAPIView, RetrieveUpdateDestroyQuestionnaireAPIView, RetrieveQuestionnaireAPIView, RetrieveQuestionnaireByUserAPIView, ListQuestionnaireGetAPIView
from rest_framework.routers import DefaultRouter


urlpatterns = [
  path('create/',CreateQuestionnaireAPIView.as_view()),
  path(r'update-delete/<int:pk>/',RetrieveUpdateDestroyQuestionnaireAPIView.as_view()),
  path('list/',ListQuestionnaireGetAPIView.as_view()),
  path('last/',RetrieveQuestionnaireByUserAPIView.as_view()),
  path(r'get/<int:pk>/', RetrieveQuestionnaireAPIView.as_view()),
]