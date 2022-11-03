from email.policy import default
from random import choices
from unittest.util import _MAX_LENGTH
from django.db import models
from django.utils.translation import gettext_lazy as _
from tranfusion_center.models import TranfusionCenter

class BloodPacket(models.Model):

    class BloodType(models.TextChoices):
        A_POSITIVE = 'A_POS', _('A+')
        A_NEGATIVE = 'A_NEG', _('A-')
        B_POSITIVE = 'B_POS', _('B+')
        B_NEGATIVE = 'B_NEG', _('B-')
        AB_POSITIVE = 'AB_POS', _('AB+')
        AB_NEGATIVE = 'AB_NEG', _('AB-')
        O_POSITIVE = 'O_POS', _('O+')
        O_NEGATIVE = 'O_NEG', _('O-')
        UNKNOWN = 'N', _('Unknown')

    blood_type = models.CharField(
        max_length = 6, 
        choices = BloodType.choices,
        default = BloodType.UNKNOWN)

    amount_of_blood = models.PositiveBigIntegerField(default = 0)

    transfusion_center = models.ForeignKey(TranfusionCenter, on_delete = models.CASCADE)