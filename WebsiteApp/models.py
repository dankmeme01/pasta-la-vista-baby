from django.db import models
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.forms import ModelForm

upload_storage = FileSystemStorage(
    location=settings.STATIC_ROOT, base_url='/static/')


# Create your models here.


class FoodModel(models.Model):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/food/', storage=upload_storage)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    weight = models.CharField(max_length=8)  # in grams

    def __str__(self):
        return self.title


class OrderModel(models.Model):
    completed = models.BooleanField(default=False)
    full_name = models.CharField(max_length=160)
    phone_number = models.CharField(max_length=20)
    delivery_type = models.CharField(
        max_length=1, choices=(('1', 'Delivery'), ('2', 'Pickup')))
    delivery_address = models.CharField(max_length=160, blank=True)
    payment_type = models.CharField(
        max_length=1, choices=(('1', 'Cash'), ('2', 'Card')))
    amount_of_tools = models.IntegerField(blank=True)
    comment = models.TextField(blank=True)
    order_time = models.TimeField(auto_now_add=True)
    food_id_list = models.JSONField(default=list)
    total_cost = models.DecimalField(max_digits=9, decimal_places=2)


class OrderForm(ModelForm):
    class Meta:
        model = OrderModel
        fields = ['full_name', 'phone_number', 'delivery_type',
                  'delivery_address', 'payment_type', 'amount_of_tools', 'comment']
