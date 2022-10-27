from django.contrib import admin
from questionnaire.models import Questionnaire
from user_profile.models import UserProfile

@admin.register(Questionnaire)
class QuestionnaireAdmin(admin.ModelAdmin):
    pass

