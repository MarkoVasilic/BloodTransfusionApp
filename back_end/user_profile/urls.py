from django.urls import path
from .views import RegisterCenterUserAPIView,RegisterCenterStaffAPIView,RegisterCenterAdminAPIView, UserUpdatePasswordView,UserViewSet, UserUpdateViewSet, CurrentUserView, ListCenterStaff, UserDestroyAPIView, UserUpdateStaffView, ActivateUserView, UserUpdatePenaltyDateViewSet, IncreasePenaltyPoints
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
  path(r'users/update-staff/<int:pk>/', UserUpdateStaffView.as_view()),
  path(r'users/activate/<int:pk>/', ActivateUserView.as_view()),
  path(r'users/update-penalty/<int:pk>/', UserUpdatePenaltyDateViewSet.as_view()),
  path(r'users/increase-penalty-points/<int:pk>', IncreasePenaltyPoints.as_view()),
]

router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns += router.urls