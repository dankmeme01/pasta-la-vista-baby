from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('menu/', views.menu, name='menu'),
    path('ordering/', views.ordering, name='ordering'),
    path('order_management/', views.order_management, name='order_management'),
    path('order_place/', views.order_place, name='order_place'),
    path('order_remove/', views.order_remove, name='order_remove'),
    path('food_json/', views.food_json, name='food_json'),
    path('orders_json/', views.orders_json, name='orders_json'),
    path('reserve_table/', views.reserve_table, name='reserve_table'),
]
