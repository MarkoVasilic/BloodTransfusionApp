from django.contrib import admin
from appointment_report.models import AppointmentReport


@admin.register(AppointmentReport)
class AppointmentReportAdmin(admin.ModelAdmin):
    pass

