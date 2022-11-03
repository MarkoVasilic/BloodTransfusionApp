from django.contrib import admin
from complaints.models import Complaints


@admin.register(Complaints)
class ComplaintsAdmin(admin.ModelAdmin):
    pass

