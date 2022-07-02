from django.contrib import admin
from .models import FoodModel, FoodCategory, OrderModel, ReservationModel

# Register your models here.
admin.site.register(FoodModel)
admin.site.register(FoodCategory)
admin.site.register(OrderModel)
admin.site.register(ReservationModel)
