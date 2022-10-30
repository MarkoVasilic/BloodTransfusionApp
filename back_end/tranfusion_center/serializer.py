from rest_framework import serializers
from tranfusion_center.models import TranfusionCenter

class TranfusionCenterSerializer(serializers.ModelSerializer):
  class Meta:
    model = TranfusionCenter
    fields = ["id", "name", "country", "city", "street", "building_number", "description"]
    read_only_fields = ['average_grade']