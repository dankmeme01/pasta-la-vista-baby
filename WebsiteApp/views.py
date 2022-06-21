from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.admin.views.decorators import staff_member_required

import json

from .models import FoodModel, OrderModel, OrderForm, FoodCategory

# Create your views here.


def index(request):
    # print(dir(request))
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def menu(request):
    ctx = {'menu': FoodModel.objects.all(
    ), 'categories': FoodCategory.objects.all()}
    return render(request, 'menu.html', context=ctx)


def contact(request):
    return render(request, 'contact.html')


def ordering(request):
    return render(request, 'ordering.html')


# def set_order(request):
#     return render(request, 'CART.html')


def order_success(request):
    return render(request, 'order_success.html')


# def order_confirm(request):
#     if request.method == 'POST':
#         form = Order(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('order_success')

#     return redirect('')

@staff_member_required
def order_management(request):
    ctx = {}
    ctx['orders'] = OrderModel.objects.filter(completed=False)
    ctx['food_lookup'] = {
        food.id: food.title for food in FoodModel.objects.all()}
    return render(request, 'order_management.html', context=ctx)


def order_place(request):
    def respond(msg, error=False):
        return HttpResponse(
            json.dumps({'error': error, 'message': msg}),
            content_type='application/json')

    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            total_price = 0
            food_ids = []
            menuc = request.COOKIES.get('menu')
            if not menuc:
                return respond('No menu cookie', True)

            for foodid in menuc.split(','):
                food = FoodModel.objects.get(id=foodid)
                total_price += food.price
                food_ids.append(int(foodid))

            model = form.save(commit=False)

            model.food_id_list = food_ids
            model.total_cost = total_price

            model.save()
            form.save_m2m()
            return respond('Order placed successfully')
        else:
            return respond('Invalid form', True)
    return respond("wrong request bozo", True)


@staff_member_required
def order_remove(request):
    if request.method == 'POST':
        id = request.POST.get('order_id', None)
        if id:
            obj = OrderModel.objects.get(id=id)
            obj.completed = True
            obj.save()
        return redirect('order_management')


def food_json(request):
    food_list = FoodModel.objects.all()
    food_dict = {
        food.id: {
            'title': food.title,
            'price': str(food.price),
            'weight': str(food.weight),
        } for food in food_list
    }
    return HttpResponse(
        json.dumps(food_dict), content_type='application/json')


def test(request):
    return render(request, 'test.html')
