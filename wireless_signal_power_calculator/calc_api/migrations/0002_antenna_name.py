# Generated by Django 4.1.4 on 2023-02-20 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calc_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='antenna',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]