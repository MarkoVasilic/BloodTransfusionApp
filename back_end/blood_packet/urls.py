from .views import RetrieveBloodPacketByUser, BloodPacketViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter
urlpatterns = [
      path('get/<int:pk>/', RetrieveBloodPacketByUser.as_view())
]


router = DefaultRouter()
router.register(r'', BloodPacketViewSet)
urlpatterns += router.urls