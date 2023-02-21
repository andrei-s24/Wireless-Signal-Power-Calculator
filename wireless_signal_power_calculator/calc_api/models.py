from django.db import models

class Antenna(models.Model):
    name = models.CharField(max_length=100, null=True)
    profile = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name