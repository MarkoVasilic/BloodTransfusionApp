from django.shortcuts import render
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets
from email_token.serializer import EmailTokenSerializer
from email_token.models import EmailToken
import secrets
from rest_framework import status, mixins, generics
from rest_framework.response import Response
from django.http.request import QueryDict

def send_email(user_id, email):
    subject = 'Thank you for becoming member'
    token = secrets.token_hex(16)
    url = 'http://localhost:3000/verify-email/' + token + '/' + str(user_id)
    message = f'Hello, \nPlease press the following link to activate your account: \n{url}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email, ]
    send_mail( subject, message, email_from, recipient_list )
    return token

class EmailTokenCreateViewSet(mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    queryset = EmailToken.objects.all()
    serializer_class = EmailTokenSerializer
    def create(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):
            request.data._mutable = True
        request.data['token'] = send_email(request.data['user'], request.data['email'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class EmailTokenGetViewSet(generics.RetrieveAPIView):
    queryset = EmailToken.objects.all()
    serializer_class = EmailTokenSerializer
    def retrieve(self, request, *args, **kwargs):
        instance = EmailToken.objects.filter(user_id=kwargs['id'])
        if instance:
            instance = instance[0]
            if kwargs['pk'] == instance.token:
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                return Response(status=404)
        else:
            return Response(status=404)
    
        

    
