# Generated by Django 4.1.2 on 2022-11-03 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tranfusion_center', '0004_alter_tranfusioncenter_building_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tranfusioncenter',
            name='building_number',
            field=models.CharField(max_length=16),
        ),
    ]
