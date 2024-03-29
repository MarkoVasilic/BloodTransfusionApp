# Generated by Django 4.1.2 on 2022-11-15 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0004_alter_userprofile_jmbg'),
        ('appointment', '0006_alter_appointment_staff_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='staff',
            field=models.ManyToManyField(blank=True, related_name='staff_list', to='user_profile.userprofile'),
        ),
    ]
