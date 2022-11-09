from django.urls import path
from .views import RegisterCenterUserAPIView,RegisterCenterStaffAPIView,RegisterCenterAdminAPIView, UserUpdatePasswordView,UserViewSet, UserUpdateViewSet, CurrentUserView
from rest_framework.routers import DefaultRouter

urlpatterns = [
  path('register/user/',RegisterCenterUserAPIView.as_view()),
  path('register/staff/',RegisterCenterStaffAPIView.as_view()),
  path('register/admin/',RegisterCenterAdminAPIView.as_view()),
  path(r'users/update/<int:pk>/', UserUpdateViewSet.as_view()),
  path(r'users/change-password/<int:pk>/', UserUpdatePasswordView.as_view()),
  path('users/logged/', CurrentUserView.as_view()),

]

router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns += router.urls