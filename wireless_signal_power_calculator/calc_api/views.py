from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect 
from .antenna_utils.antenna_calculations import friis_transmission_formula
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
@csrf_protect
def calc(request):
    transmitter_power = request.GET.get('transmitter_power')
    transmitter_gain = request.GET.get('transmitter_gain')
    receiver_gain = request.GET.get('receiver_gain')
    frequency = request.GET.get('frequency')
    distance = request.GET.get('main_distance')
    print(transmitter_power)
    print(transmitter_gain)
    print(receiver_gain)
    print(frequency)
    print(distance)
    receiver_power = friis_transmission_formula(transmitter_power, transmitter_gain, receiver_gain, frequency, distance)
    print(receiver_power)
    return Response({"howya": "howya"})