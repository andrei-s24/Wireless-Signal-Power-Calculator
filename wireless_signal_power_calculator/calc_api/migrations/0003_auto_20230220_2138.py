# Generated by Django 3.2.3 on 2023-02-20 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calc_api', '0002_antenna_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='antenna',
            name='frequency',
        ),
        migrations.RemoveField(
            model_name='antenna',
            name='gain',
        ),
        migrations.AddField(
            model_name='antenna',
            name='profile',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
