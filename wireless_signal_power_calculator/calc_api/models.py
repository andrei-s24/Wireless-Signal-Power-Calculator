from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField

class Antenna(models.Model):
    name = models.CharField(max_length=100, null=True)
    profile = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name
