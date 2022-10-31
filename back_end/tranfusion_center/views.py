from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from tranfusion_center.models import TranfusionCenter
from tranfusion_center.serializer import TranfusionCenterSerializer 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics

class CreateTranfusionCenterAPIView(generics.CreateAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

class RetrieveUpdateDestroyTranfusionCenterAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

class RetrieveTranfusionCenterAPIView(generics.RetrieveAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    permission_classes = []

class ListTranfusionCenterGetAPIView(generics.ListAPIView):
    queryset = TranfusionCenter.objects.all()
    serializer_class = TranfusionCenterSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['=name', '=description', '=country', '=city', '=street', '=building_number']

