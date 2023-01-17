from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ComplaintsViewSet, TransactionalComplaintReply


urlpatterns = [
    path('transactional-update/<int:pk>/', TransactionalComplaintReply.as_view())
]

router = DefaultRouter()
router.register(r'', ComplaintsViewSet)
urlpatterns += router.urls