from django.shortcuts import render, redirect
from django.http import HttpResponse

from .models import FoodModel, Order

# Create your views here.


def index(request):
    # print(dir(request))
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def menu(request):
    ctx = {}
    ctx['menu'] = FoodModel.objects.all()
    return render(request, 'menu.html', context=ctx)


def contact(request):
    return render(request, 'contact.html')


def ordering(request):
    return render(request, 'ordering.html')


# def set_order(request):
#     return render(request, 'CART.html')


def order_success(request):
    return render(request, 'order_success.html')


def order_confirm(request):
    if request.method == 'POST':
        form = Order(request.POST)
        if form.is_valid():
            form.save()
            return redirect('order_success')

    return redirect('')
