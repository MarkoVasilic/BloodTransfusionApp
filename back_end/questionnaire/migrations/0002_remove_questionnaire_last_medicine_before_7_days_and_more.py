# Generated by Django 4.1.2 on 2022-10-26 19:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_alter_userprofile_jmbg'),
        ('questionnaire', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionnaire',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questionnaire',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='questionnaire',
            name='user_profile',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile'),
            preserve_default=False,
        ),
    ]
