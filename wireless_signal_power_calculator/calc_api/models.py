from django.contrib.postgres.fields import ArrayField
from django.db import models

class Antenna(models.Model):
    gain = ArrayField(models.FloatField(null=True, blank=True), blank=True)
    frequency = ArrayField(models.FloatField(null=True, blank=True), blank=True)