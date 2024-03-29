from django.urls import path
from .views import CreateTranfusionCenterAPIView, RetrieveUpdateDestroyTranfusionCenterAPIView, ListTranfusionCenterGetAPIView, RetrieveTranfusionCenterAPIView, TransfusionCenterAPIView, ListTransfusionCentersForAppointmentAPIView

urlpatterns = [
  path('create/',CreateTranfusionCenterAPIView.as_view()),
  path(r'update-delete/<int:pk>/',RetrieveUpdateDestroyTranfusionCenterAPIView.as_view()),
  path('list/',ListTranfusionCenterGetAPIView.as_view()),
  path(r'get/<int:pk>/', RetrieveTranfusionCenterAPIView.as_view()),
  path('find/<int:pk>/', TransfusionCenterAPIView.as_view()),
  path(r'centers-appointment/<str:date_time>/', ListTransfusionCentersForAppointmentAPIView.as_view()),


]