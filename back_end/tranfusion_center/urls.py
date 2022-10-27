from django.urls import path
from .views import TranfusionCenterAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'all/', TranfusionCenterAPIView)
urlpatterns = router.urls
