from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from calc_api.models import Antenna
from json import dumps 


@csrf_protect
def index(request):
    antenna_names = [antenna_names for antenna in Antenna.objects.all()]
    antenna_names.sort()
    return render(request, "index.html", {'antenna_names': dumps(antenna_names)})