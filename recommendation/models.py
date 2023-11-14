from django.db import models
from accounts.models import CustomUser

class Recommendation(models.Model):
    referred_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    referred_to_email = models.EmailField()
    status_change = models.BooleanField(default=False)