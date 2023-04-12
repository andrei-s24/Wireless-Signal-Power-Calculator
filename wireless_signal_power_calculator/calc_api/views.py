from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from .utils.antenna_calculations import friis_transmission_formula_per_channel, AntennaObj, signal_to_interference_ratio_per_channel, distance, calculate_antenna_parameters
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
    transmitter = Antenna.objects.get(name=request.GET.get('transmitter'))
    receiver = Antenna.objects.get(name=request.GET.get('receiver'))
    transmitter_power = float(request.GET.get('transmitter_power'))*10**-3
    transmitter_position = [float(request.GET.get('transmitter_position_x')),
                            float(request.GET.get('transmitter_position_y')),
                            float(request.GET.get('transmitter_position_z'))]
    receiver_position = [float(request.GET.get('receiver_position_x')),
                         float(request.GET.get('receiver_position_y')),
                         float(request.GET.get('receiver_position_z'))]
    i = 1
    interferers = []
    while ('interferer' + str(i) + '_power') in request.GET:
        position = [float(request.GET.get('interferer' + str(i) + '_position_x')),
                    float(request.GET.get('interferer' + str(i) + '_position_y')),
                    float(request.GET.get('interferer' + str(i) + '_position_z'))]
        profile = Antenna.objects.get(
            name=request.GET.get('interferer' + str(i))).profile
        interferer = AntennaObj(
            position, profile, float(request.GET.get('interferer' + str(i) + '_power'))*10**-3)
        interferers.append(interferer)
        i += 1
    output = calculate_antenna_parameters(
        transmitter, receiver, transmitter_power, transmitter_position, receiver_position, interferers)
    return Response(output)