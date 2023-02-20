from django.urls import URLPattern, path
from . import views

urlpatterns = [
    path('calc/', views.calc)
]