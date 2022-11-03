from django.contrib import admin
from blood_packet.models import BloodPacket


@admin.register(BloodPacket)
class BloodPacketAdmin(admin.ModelAdmin):
    pass

