from django.db import models

from user_profile.models import UserProfile

class Questionnaire(models.Model):
    less_than_50kg = models.BooleanField()
    flu = models.BooleanField()
    other_sickness = models.BooleanField()
    feel_good = models.BooleanField()
    changes_on_skin = models.BooleanField()
    blood_preasure_high = models.BooleanField()
    blood_preasure_low = models.BooleanField()
    using_medicine = models.BooleanField()
    last_medicine_in_last_7_days = models.BooleanField()
    on_menstruation_period = models.BooleanField()
    dental_interventions_in_last_7_days = models.BooleanField()
    tattoo_piercing_in_last_6_months = models.BooleanField()
    surgery_in_last_6_months = models.BooleanField()
    blood_tranfusion_in_last_6_months = models.BooleanField()
    pregnant = models.BooleanField()
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    created = models.DateTimeField()
    updated = models.DateTimeField()

    def __str__(self):
        return "ID:" + str(self.id)