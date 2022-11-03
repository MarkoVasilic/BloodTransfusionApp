from email.policy import default
from django.db import models
from tranfusion_center.models import TranfusionCenter

class Equipment(models.Model):

    name = models.CharField(max_length = 50)
    quantity = models.PositiveIntegerField(default=0)
    transfusion_center = models.ForeignKey(TranfusionCenter, on_delete = models.CASCADE)