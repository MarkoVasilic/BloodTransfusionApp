from django.urls import path
from .views import AppointmentViewSet, AppointmentGetByCenterViewSet, AppointmentUpdateUserProfileView, ListCenterUsers, SearchCenterUsers, AppointmentGetByUserScheduledViewSet, AppointmentCancelView, ValidateAppointmentQRCode, AppointmentGetByUserViewSet, AppointmentGetQRCodesViewSet, AppointmentGetByUserAndStaffViewSet, DestroyAppointmentAPIView, ListCenterUsersForSearch
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path(r'center/<int:pk>', AppointmentGetByCenterViewSet.as_view()),
    path(r'update-profile/<int:pk>', AppointmentUpdateUserProfileView.as_view()),
    path('users/', ListCenterUsers.as_view()),
    path('search/', SearchCenterUsers.as_view()),
    path(r'user-scheduled/<int:pk>', AppointmentGetByUserScheduledViewSet.as_view()),
    path(r'cancel/<int:pk>', AppointmentCancelView.as_view()),
    path('validate/<int:pk>', ValidateAppointmentQRCode.as_view()),
    path(r'user/', AppointmentGetByUserViewSet.as_view()),
    path(r'qrcodes/', AppointmentGetQRCodesViewSet.as_view()),
    path(r'staff-appointments-for-user/<int:pk>', AppointmentGetByUserAndStaffViewSet.as_view()),
    path('delete-appointment/<int:pk>', DestroyAppointmentAPIView.as_view()),
    path('users-search/', ListCenterUsersForSearch.as_view()),
]

router = DefaultRouter()
router.register(r'', AppointmentViewSet)
urlpatterns += router.urls