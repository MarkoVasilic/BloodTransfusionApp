# Generated by Django 4.1.2 on 2022-11-19 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment', '0001_initial'),
        ('appointment_report', '0005_appointmentreport_accepted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointmentreport',
            name='equipment',
            field=models.ManyToManyField(blank=True, related_name='equipment_list', to='equipment.equipment'),
        ),
    ]
