# Generated by Django 4.1.4 on 2023-02-20 16:44

from django.db import migrations, models
import django_better_admin_arrayfield.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('calc_api', '0002_antenna_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='antenna',
            name='frequency',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.FloatField(blank=True, null=True), blank=True, size=None),
        ),
        migrations.AlterField(
            model_name='antenna',
            name='gain',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.FloatField(blank=True, null=True), blank=True, size=None),
        ),
    ]
