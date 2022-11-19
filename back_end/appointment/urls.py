from django.urls import path
from .views import AppointmentViewSet, AppointmentGetByCenterViewSet, AppointmentUpdateUserProfileView, ListCenterUsers, SearchCenterUsers, AppointmentGetByUserScheduledViewSet, AppointmentCancelView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path(r'center/<int:pk>', AppointmentGetByCenterViewSet.as_view()),
    path(r'update-profile/<int:pk>', AppointmentUpdateUserProfileView.as_view()),
    path('users/', ListCenterUsers.as_view()),
    path('search/', SearchCenterUsers.as_view()),
    path(r'user-scheduled/<int:pk>', AppointmentGetByUserScheduledViewSet.as_view()),
    path(r'cancel/<int:pk>', AppointmentCancelView.as_view()),
]

router = DefaultRouter()
router.register(r'', AppointmentViewSet)
urlpatterns += router.urls