from rest_framework import serializers
from email_token.models import EmailToken

class EmailTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailToken
        fields = '__all__'