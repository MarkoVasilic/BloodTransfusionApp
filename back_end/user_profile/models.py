from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from tranfusion_center.models import TranfusionCenter
from django.core.validators import MaxLengthValidator, MinLengthValidator

class UserProfile(models.Model):
    class Gender(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female')
        UNKNOWN = 'N', _('Unknown')
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

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=150, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    jmbg = models.CharField(max_length=13, blank=True, null=False, validators=[MinLengthValidator(13), MaxLengthValidator(13)])
    gender = models.CharField(
        max_length=1,
        choices=Gender.choices,
        default=Gender.UNKNOWN,
    )
    blood_type= models.CharField(
        max_length=6,
        choices=BloodType.choices,
        default=BloodType.UNKNOWN,
    )
    profession = models.CharField(max_length=50, blank=True, null=True)
    workplace = models.TextField(max_length=200, blank=True, null=True)
    loyalty_points = models.PositiveIntegerField(default=0)
    penalty_points = models.PositiveIntegerField(default=0)
    tranfusion_center = models.ForeignKey(TranfusionCenter, on_delete=models.CASCADE, null=True, blank=True)
    is_activated = models.BooleanField(default=False)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
