from .views import  AppointmentReportViewSet, AppointmentReportDuplicate
from django.urls import path
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path(r'duplicate/<int:pk>', AppointmentReportDuplicate.as_view())
]


router = DefaultRouter()
router.register(r'', AppointmentReportViewSet)
urlpatterns += router.urls