from django.contrib import admin
from tranfusion_center.models import TranfusionCenter

@admin.register(TranfusionCenter)
class TranfusionCenterAdmin(admin.ModelAdmin):
    pass