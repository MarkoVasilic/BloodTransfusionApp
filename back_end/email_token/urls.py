from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import EmailTokenCreateViewSet, EmailTokenGetViewSet


urlpatterns = [
    path(r'get/<str:pk>/<int:id>', EmailTokenGetViewSet.as_view()),
]

router = DefaultRouter()
router.register(r'create', EmailTokenCreateViewSet)
urlpatterns += router.urls