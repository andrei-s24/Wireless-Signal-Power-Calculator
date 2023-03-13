from django import forms
from django.contrib import admin
from .models import Antenna
from .utils.parse import parse_profile


# Will use this form later
class AntennaForm(forms.ModelForm):
    class Meta:
        model = Antenna
        widgets = {
            'profile': forms.FileInput
        }
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        if(args):
            data = args[1]
            if data:
                data['profile'] = parse_profile(data['profile'])
        super(AntennaForm, self).__init__(*args, **kwargs)

@admin.register(Antenna)
class AntennaAdmin(admin.ModelAdmin):
    form = AntennaForm