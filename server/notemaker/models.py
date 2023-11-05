from django.db import models

# Create your models here.
class FileName(models.Model):
    filename=models.CharField(max_length=100)
    thumbs_up=models.IntegerField(default=0)
    thumbs_down=models.IntegerField(default=0)