from email.policy import default
from django.db import models
from BloodTranfusionApi import settings
from user_profile.models import UserProfile
from tranfusion_center.models import TranfusionCenter

class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now = False, auto_now_add = False)
    duration = models.PositiveIntegerField(default = 0)
    user_profile = models.ForeignKey(UserProfile, on_delete = models.CASCADE, null=True, blank=True)
    user_profiles_that_canceled = models.ManyToManyField(UserProfile, related_name = "user_list", blank=True)
    transfusion_center = models.ForeignKey(TranfusionCenter, on_delete = models.CASCADE)
    staff = models.ManyToManyField(UserProfile, related_name = "staff_list", blank=True)


    def __str__(self) -> str:
        return "ID:" + str(self.id) + "center ID: " + str(self.transfusion_center_id)