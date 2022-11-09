from django.shortcuts import render
from rest_framework import viewsets
from complaints.models import Complaints
from complaints.serializer import ComplaintsSerializer


class ComplaintsViewSet(viewsets.ModelViewSet):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer
