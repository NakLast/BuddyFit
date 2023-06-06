from django.db import models
from django.contrib.auth.models import User

class Buddy(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    character_name = models.CharField(max_length=255)
    arm_powers = models.IntegerField(default=0)
    body_powers = models.IntegerField(default=0)
    leg_powers = models.IntegerField(default=0)

    def __str__(self):
        return self.name