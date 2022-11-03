from django.contrib import admin
from grade.models import Grade


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    pass

