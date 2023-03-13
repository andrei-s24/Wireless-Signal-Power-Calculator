import math
from calc_api.models import Antenna

def friis_transmission_formula(transmitter_power, transmitter_gain, receiver_gain, frequency, distance):
    speed_of_light = 2e8
    return transmitter_power * transmitter_gain * receiver_gain * speed_of_light / (4 * math.pi * 2 * distance * frequency)**2

def friis_transmission_formula_per_channel(transmitter_power: float, transmitter: Antenna, receiver: Antenna, distance: float):
    transmitter_profile = transmitter.profile
    receiver_profile = receiver.profile
    receiver_power = dict()
    for key, value in receiver_profile.items():
        receiver_frequency = float(key)
        if key in transmitter_profile.keys():
            transmitter_gain = value
        else:
            for key, value in transmitter_profile.items():
                transmitter_frequency = float(key)
                if receiver_frequency > transmitter_frequency:
                    lower_bound_gain = value
                else: 
                    break
                if lower_bound_gain:
                    transmitter_gain = (lower_bound_gain + value) / 2
                else: 
                    transmitter_gain = value
        receiver_power[key] = friis_transmission_formula(transmitter_power, transmitter_gain, value, receiver_frequency*10**-6, distance)
    return receiver_power
        

                
                

