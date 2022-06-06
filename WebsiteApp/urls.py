from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('menu/', views.menu, name='menu'),
    path('ordering/', views.ordering, name='ordering'),
    path('order_success/', views.order_success, name='order_success'),
]
