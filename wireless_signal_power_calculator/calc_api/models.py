from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField

class Antenna(models.Model):
    name = models.CharField(max_length=100, null=True)
    gain = ArrayField(models.FloatField(), null=True, blank=True)
    frequency = ArrayField(models.FloatField(), null=True, blank=True)