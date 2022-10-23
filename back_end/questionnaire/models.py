from django.db import models


class Questionnaire(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(max_length=350, blank=True, null=True)
    average_grade = models.FloatField(default=0,
    validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
