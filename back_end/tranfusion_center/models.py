from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class TranfusionCenter(models.Model):
    name = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=150)
    building_number = models.CharField(max_length=16)
    description = models.TextField(max_length=350, blank=True, null=True)
    average_grade = models.FloatField(default=0,
    validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])

    def __str__(self):
        return 'ID: %s,     name: %s,       street: %s,          city:  %s,            avg_grade:  %f' % (self.id, self.name, self.street, self.city, self.average_grade)
