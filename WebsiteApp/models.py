from django.db import models

# Create your models here.


class FoodModel(models.Model):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='food/%Y/%m/%d')
    price = models.IntegerField()
    weight = models.CharField(max_length=8)  # in grams

    def __str__(self):
        return self.title
