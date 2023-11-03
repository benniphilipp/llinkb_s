from django.db import models

from accounts.models import CustomUser

class Domain(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    domain = models.CharField(max_length=100, unique=True)