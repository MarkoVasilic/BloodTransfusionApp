# Generated by Django 4.1.2 on 2022-11-09 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('complaints', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaints',
            name='responde',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]
