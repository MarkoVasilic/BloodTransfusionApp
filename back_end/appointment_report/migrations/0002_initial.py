# Generated by Django 4.1.2 on 2022-11-03 20:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('blood_packet', '0001_initial'),
        ('appointment_report', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointmentreport',
            name='blood_packet',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='blood_packet.bloodpacket'),
        ),
    ]
