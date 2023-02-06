from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect 
from .antenna_utils.antenna_calculations import friis_transmission_formula


@csrf_protect
def index(request):
    if request.method == 'POST':
        transmitter_power = request.POST.get('transmitter_power')
        transmitter_gain = request.POST.get('transmitter_gain')
        receiver_gain = request.POST.get('receiver_gain')
        frequency = request.POST.get('frequency')
        distance = request.POST.get('distance')
        receiver_power = friis_transmission_formula(transmitter_power, transmitter_gain, receiver_gain, frequency, distance)
        print(receiver_power)
    return render(request, "index.html")