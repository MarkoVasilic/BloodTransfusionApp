from django.urls import path
from .views import RegisterCenterUserAPIView,RegisterCenterStaffAPIView,RegisterCenterAdminAPIView, UserUpdatePasswordView,UserViewSet, UserUpdateViewSet, CurrentUserView, ListCenterStaff, UserDestroyAPIView, RetrieveUserAPIView,UserUpdateStaffView
from rest_framework.routers import DefaultRouter

urlpatterns = [
  path('register/user/',RegisterCenterUserAPIView.as_view()),
  path('register/staff/',RegisterCenterStaffAPIView.as_view()),
  path('register/admin/',RegisterCenterAdminAPIView.as_view()),
  path(r'users/update/<int:pk>/', UserUpdateViewSet.as_view()),
  path(r'users/change-password/<int:pk>/', UserUpdatePasswordView.as_view()),
  path('users/logged/', CurrentUserView.as_view()),
  path('users/user-profile/', CurrentUserView.as_view()),
  path('users/center/<int:pk>/', ListCenterStaff.as_view()),
  path('users/delete-user/<int:pk>/', UserDestroyAPIView.as_view()),
  path(r'users/get/<int:pk>/', RetrieveUserAPIView.as_view()),
  path(r'users/update-staff/<int:pk>/', UserUpdateStaffView.as_view()),
]

router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns += router.urls