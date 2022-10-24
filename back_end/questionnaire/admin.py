from django.contrib import admin
from questionnaire.models import Questionnaire

@admin.register(Questionnaire)
class QuestionnaireAdmin(admin.ModelAdmin):
    pass
