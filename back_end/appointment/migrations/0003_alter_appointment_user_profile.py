# Generated by Django 4.1.2 on 2022-11-15 17:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0004_alter_userprofile_jmbg'),
        ('appointment', '0002_alter_appointment_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='user_profile',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile'),
        ),
    ]
