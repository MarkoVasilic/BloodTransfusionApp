from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class TranfusionCenter(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    street = models.CharField(max_length=150, blank=True, null=True)
    building_number = models.CharField(max_length=15, blank=True, null=True)
    description = models.TextField(max_length=350, blank=True, null=True)
    average_grade = models.FloatField(default=0,
    validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
