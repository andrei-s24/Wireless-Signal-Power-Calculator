from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect 
from .antenna_utils.antenna_calculations import friis_transmission_formula
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
    return Response({"key": "value"})