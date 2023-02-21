# Generated by Django 4.1.4 on 2023-02-20 16:47

from django.db import migrations, models
import django_better_admin_arrayfield.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('calc_api', '0003_alter_antenna_frequency_alter_antenna_gain'),
    ]

    operations = [
        migrations.AlterField(
            model_name='antenna',
            name='frequency',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.FloatField(blank=True, null=True), size=None),
        ),
        migrations.AlterField(
            model_name='antenna',
            name='gain',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.FloatField(blank=True, null=True), size=None),
        ),
    ]