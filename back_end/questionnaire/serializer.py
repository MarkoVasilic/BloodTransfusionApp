from rest_framework import serializers
from questionnaire.models import Questionnaire

class QuestionnaireSerializer(serializers.ModelSerializer):
  class Meta:
    model = Questionnaire
    fields = ["less_than_50kg", "flu", "other_sickness", "feel_good",
    "changes_on_skin", "blood_preasure_high", "blood_preasure_low", "using_medicine",
    "last_medicine_in_last_7_days", "on_menstruation_period", "dental_interventions_in_last_7_days", "tattoo_piercing_in_last_6_months",
    "surgery_in_last_6_months", "blood_tranfusion_in_last_6_months", "pregnant", "user_profile"]