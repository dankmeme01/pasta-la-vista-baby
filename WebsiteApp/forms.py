# from django import forms
# from .models import *


# class Order(forms.Form):
#     full_name = forms.CharField(label="Введіть ваше ім’я")


# class Order(forms.Form):
#     full_name = forms.CharField(max_length=40)

# completed = models.BooleanField()
# was_paid_for = models.BooleanField()
# full_name = models.TextField()
# phone_number = models.CharField(max_length=15)
# is_delivery = models.BooleanField()
# address_street = models.CharField(max_length=150)
# address_house = models.CharField(max_length=10)
# address_apt_num = models.CharField(max_length=10, blank=True)
# is_card = models.BooleanField()
# fork_n_spoon = models.IntegerField()
# comment = models.TextField(blank=True)

# class Reservation(models.Model):
#     full_name = models.TextField()
#     phone_number = models.CharField(max_length=15)
#     date = models.DateField()
#     time = TimeField()
