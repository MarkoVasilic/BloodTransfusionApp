from django.db import models

from user_profile.models import UserProfile

class Questionnaire(models.Model):
    less_than_50kg = models.BooleanField(blank=True, null=True)
    flu = models.BooleanField(blank=True, null=True)
    other_sickness = models.BooleanField(blank=True, null=True)
    feel_good = models.BooleanField(blank=True, null=True)
    changes_on_skin = models.BooleanField(blank=True, null=True)
    blood_preasure_high = models.BooleanField(blank=True, null=True)
    blood_preasure_low = models.BooleanField(blank=True, null=True)
    using_medicine = models.BooleanField(blank=True, null=True)
    last_medicine_in_last_7_days = models.BooleanField(blank=True, null=True)
    on_menstruation_period = models.BooleanField(blank=True, null=True)
    dental_interventions_in_last_7_days = models.BooleanField(blank=True, null=True)
    tattoo_piercing_in_last_6_months = models.BooleanField(blank=True, null=True)
    surgery_in_last_6_months = models.BooleanField(blank=True, null=True)
    blood_tranfusion_in_last_6_months = models.BooleanField(blank=True, null=True)
    pregnant = models.BooleanField(blank=True, null=True)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add= True)
    updated= models.DateTimeField(auto_now= True)
