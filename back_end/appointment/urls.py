from django.urls import path
from .views import AppointmentViewSet, AppointmentGetByCenterViewSet, AppointmentUpdateUserProfileView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path(r'center/<int:pk>', AppointmentGetByCenterViewSet.as_view()),
    path(r'update-profile/<int:pk>', AppointmentUpdateUserProfileView.as_view()),
]

router = DefaultRouter()
router.register(r'', AppointmentViewSet)
urlpatterns += router.urls