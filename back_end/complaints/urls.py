from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ComplaintsViewSet


urlpatterns = [

]

router = DefaultRouter()
router.register(r'', ComplaintsViewSet)
urlpatterns += router.urls