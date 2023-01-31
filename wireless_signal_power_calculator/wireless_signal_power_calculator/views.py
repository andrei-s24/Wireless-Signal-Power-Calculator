from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect 

@csrf_protect
def index(request):
    if request.method == 'POST':
        print(request.POST.get('power'))
    return render(request, "index.html")