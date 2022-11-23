from .views import  AppointmentReportViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter


urlpatterns = [
]


router = DefaultRouter()
router.register(r'', AppointmentReportViewSet)
urlpatterns += router.urls