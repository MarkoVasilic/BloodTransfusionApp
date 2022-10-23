from django.urls import path
from .views import RegisterCenterUserAPIView, RegisterCenterStaffAPIView, UserViewSet
from rest_framework.routers import DefaultRouter

urlpatterns = [
  path('register/user',RegisterCenterUserAPIView.as_view()),
  path('register/staff',RegisterCenterStaffAPIView.as_view()),
]

router = DefaultRouter()
router.register(r'', UserViewSet, basename='users')
urlpatterns += router.urls