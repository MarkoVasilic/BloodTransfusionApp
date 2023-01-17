from django.shortcuts import render
from rest_framework import viewsets
from complaints.models import Complaints
from complaints.serializer import ComplaintsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction, DatabaseError
import time 



class ComplaintsViewSet(viewsets.ModelViewSet):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer
class TransactionalComplaintReply(APIView):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer

    def put(self, request, pk, format=None):
        Complaint = Complaints.objects.get(pk = pk)
        if(Complaint.response != ""):
            return Response({"message": "Something went wrong, Other Admins have already replied to the same Complaint!"}, 423)
        try:
            with transaction.atomic():
                complaints = Complaints.objects.select_for_update(nowait=True).filter(id = pk)
                for complaint in complaints:
                    time.sleep(5)
                    serializer = ComplaintsSerializer(complaint, data=request.data)
                    if serializer.is_valid(raise_exception = True):
                        serializer.save()
                        return Response({"message": "You have succesfully replied to a Complaint!"}, 201)
        except DatabaseError:
            return Response({"message": "Something went wrong, Other Admins have already replied to the same Complaint!"}, 409)
             #return Response(serializer.data, 409)
