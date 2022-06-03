from django.shortcuts import render
from django.http import HttpResponse

from .models import FoodModel

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
