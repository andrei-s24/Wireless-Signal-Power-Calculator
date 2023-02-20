from django.contrib.postgres.fields import ArrayField
from django.db import models

class Antenna(models.Model):
    name = models.CharField(max_length=100, null=True)
    gain = ArrayField(models.FloatField(null=True, blank=True), blank=True)
    frequency = ArrayField(models.FloatField(null=True, blank=True), blank=True)