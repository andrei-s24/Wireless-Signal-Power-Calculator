from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect 
from .utils.antenna_calculations import friis_transmission_formula_per_channel
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Antenna
from django.core import serializers



@api_view(['GET'])
def get(request):
    name = request.GET.get('name')
    antenna = serializers.serialize(Antenna.objects.get(name=name))
    return Response(antenna)


@api_view(['GET'])
def calc(request):
    transmitter_power = float(request.GET.get('transmitter_power'))
    distance = float(request.GET.get('main_distance'))
    transmitter = Antenna.objects.get(name=request.GET.get('transmitter'))
    receiver = Antenna.objects.get(name=request.GET.get('receiver'))
    receiver_power = friis_transmission_formula_per_channel(transmitter_power, transmitter, receiver, distance)
    return Response({"array": receiver_power})