# Generated by Django 4.1.2 on 2022-11-19 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_report', '0004_alter_appointmentreport_equipment'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointmentreport',
            name='accepted',
            field=models.BooleanField(default=True),
        ),
    ]
