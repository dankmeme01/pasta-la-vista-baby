from django.contrib import admin
from .models import FoodModel, FoodCategory

# Register your models here.
admin.site.register(FoodModel)
admin.site.register(FoodCategory)
