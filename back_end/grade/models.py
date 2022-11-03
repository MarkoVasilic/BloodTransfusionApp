from wsgiref.validate import validator
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from tranfusion_center.models import TranfusionCenter
from user_profile.models import UserProfile


class Grade(models.Model):

    grade = models.PositiveIntegerField(default = 0, 
    validators=[MinValueValidator(0), MaxValueValidator(10)])
    user_profile = models.ForeignKey(UserProfile, on_delete = models.CASCADE)
    transfusion_center = models.ForeignKey(TranfusionCenter, on_delete = models.CASCADE)