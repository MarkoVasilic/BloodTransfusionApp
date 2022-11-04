# Generated by Django 4.1.2 on 2022-11-03 20:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('appointment', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppointmentReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appointment', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='appointment.appointment')),
            ],
        ),
    ]