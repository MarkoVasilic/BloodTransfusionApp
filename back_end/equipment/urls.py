from .views import  EquipmentViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter
urlpatterns = [
]


router = DefaultRouter()
router.register(r'', EquipmentViewSet)
urlpatterns += router.urls