from django.urls import path
from .views import QuestionnaireAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'all', QuestionnaireAPIView)
urlpatterns = router.urls