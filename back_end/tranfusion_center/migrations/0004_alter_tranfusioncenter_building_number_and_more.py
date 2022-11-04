# Generated by Django 4.1.2 on 2022-11-01 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tranfusion_center', '0003_rename_address_tranfusioncenter_street_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tranfusioncenter',
            name='building_number',
            field=models.CharField(default=None, max_length=15),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tranfusioncenter',
            name='city',
            field=models.CharField(default=None, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tranfusioncenter',
            name='country',
            field=models.CharField(default=None, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tranfusioncenter',
            name='name',
            field=models.CharField(default=None, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tranfusioncenter',
            name='street',
            field=models.CharField(default=None, max_length=150),
            preserve_default=False,
        ),
    ]