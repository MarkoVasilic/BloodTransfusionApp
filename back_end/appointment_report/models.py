from django.db import models
from appointment.models import Appointment
from blood_packet.models import BloodPacket
from equipment.models import Equipment
from questionnaire.models import Questionnaire

class AppointmentReport(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE)
    blood_packet = models.OneToOneField(BloodPacket, on_delete = models.CASCADE, blank=True, null=True)
    questionnaire = models.OneToOneField(Questionnaire, on_delete = models.CASCADE)
    equipment = models.ManyToManyField(Equipment, related_name = 'equipment_list')
    