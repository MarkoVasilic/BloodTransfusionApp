from django.db import models
from user_profile.models import UserProfile

class EmailToken(models.Model):
    token = models.TextField(max_length=500)
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)