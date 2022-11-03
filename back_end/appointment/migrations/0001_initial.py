# Generated by Django 4.1.2 on 2022-11-03 20:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_profile', '0003_alter_userprofile_jmbg'),
        ('tranfusion_center', '0004_alter_tranfusioncenter_building_number_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('duration', models.PositiveIntegerField(default=0)),
                ('staff', models.ManyToManyField(blank=True, null=True, related_name='staff_list', to='user_profile.userprofile')),
                ('transfusion_center', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tranfusion_center.tranfusioncenter')),
                ('user_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile')),
            ],
        ),
    ]
