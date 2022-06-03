from django.db import models
from django.core.files.storage import FileSystemStorage
from django.conf import settings

upload_storage = FileSystemStorage(
    location=settings.STATIC_ROOT, base_url='/static/')


# Create your models here.


class FoodModel(models.Model):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/food/', storage=upload_storage)
    price = models.IntegerField()
    weight = models.CharField(max_length=8)  # in grams

    def __str__(self):
        return self.title
