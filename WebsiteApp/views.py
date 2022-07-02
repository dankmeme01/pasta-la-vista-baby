from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.admin.views.decorators import staff_member_required
from django.core.exceptions import BadRequest

from datetime import datetime
import hashlib
import pytz
import json

from .models import FoodModel, OrderModel, OrderForm, FoodCategory, ReservationForm, ReservationModel

# Create your views here.


def index(request):
    # print(dir(request))
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def menu(request):
    ctx = {'menu': FoodModel.objects.filter(in_stock=True).order_by('category', 'title'), 'categories': FoodCategory.objects.all()}
    return render(request, 'menu.html', context=ctx)


def contact(request):
    return render(request, 'contact.html')


def ordering(request):
    return render(request, 'ordering.html')


def order_success(request):
    return render(request, 'order_success.html')


@staff_member_required
def order_management(request):
    ctx = {}
    ctx['orders'] = OrderModel.objects.filter(completed=False)
    ctx['food_lookup'] = {
        food.id: food.title for food in FoodModel.objects.all()}
    ctx['reservations'] = ReservationModel.objects.filter(reserved_for__gte=datetime.now())

    return render(request, 'order_management.html', context=ctx)


def respond(msg, error=False):
    return HttpResponse(
        json.dumps({'error': error, 'message': msg}),
        content_type='application/json')


def order_place(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            total_price = 0
            food_ids = []
            menuc = request.COOKIES.get('menu')
            if not menuc:
                return BadRequest()

            for foodentry in menuc.split(','):
                if not foodentry:
                    continue

                quantity, foodid = foodentry.split('x')
                food = FoodModel.objects.get(id=foodid)
                if not food or not food.in_stock:
                    return respond(f'Food {foodid} not found or out of stock', True)

                total_price += food.price * int(quantity)
                food_ids.append((int(quantity), int(foodid)))

            model = form.save(commit=False)

            model.food_id_list = food_ids
            model.total_cost = total_price

            model.save()
            form.save_m2m()
            return respond(form.cleaned_data['full_name'] + ', Ваше замовлення підтверджено! Очікуйте. Дякуємо, що обираєте Pasta la Vista!')
        else:
            print(form.errors)
            return HttpResponseBadRequest("Invalid form")
    return HttpResponseNotAllowed(['POST'])


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
            'image': food.image.url,
        } for food in food_list
    }
    return HttpResponse(
        json.dumps(food_dict), content_type='application/json')

def orders_json(request):
    order_list = OrderModel.objects.filter(completed=False)
    reservation_list = ReservationModel.objects.filter(reserved_for__gte=datetime.now())
    # Make a unique hash
    uniq_str = ''
    for order in order_list:
        uniq_str += str(order.id) + str(order.total_cost) + str(order.food_id_list) + order.phone_number + order.full_name + ' '
    for reservation in reservation_list:
        uniq_str += str(reservation.id) + str(reservation.reserved_for) + reservation.phone_number + reservation.full_name + ' '

    algo = hashlib.sha512(uniq_str.encode('utf-8'), usedforsecurity=False).hexdigest()
    return HttpResponse(
        json.dumps({'hash': algo}), content_type='application/json')


def test(request):
    return render(request, 'test.html')

def reserve_table(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            form.save()
            return respond("Бронювання підтверджено! Чекаємо на вас у зазначений нас в нашому ресторані! Дякуємо, що обираєте Pasta la Vista!")

        else:
            print(form.errors)
            return HttpResponseBadRequest("Invalid form")
    return HttpResponseNotAllowed(['POST'])
