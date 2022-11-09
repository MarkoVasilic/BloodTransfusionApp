from django.db import models
from user_profile.models import UserProfile
from tranfusion_center.models import TranfusionCenter


class Complaints(models.Model):
    text = models.TextField(max_length=500)
    response = models.TextField(max_length=500, blank=True, null=True)
    user_profile = models.ForeignKey(UserProfile, on_delete = models.CASCADE, related_name = 'user_profile')
    transfusion_center = models.ForeignKey(TranfusionCenter, on_delete = models.CASCADE)
    staff = models.ForeignKey(UserProfile, on_delete = models.CASCADE, related_name = 'staff', blank=True, null=True)


    def __str__(self) -> str:
        return "ID:" + str(self.id) + " " + self.text