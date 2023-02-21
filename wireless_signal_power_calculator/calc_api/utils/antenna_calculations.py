import math

def friis_transmission_formula(transmitter_power, transmitter_gain, receiver_gain, frequency, distance):
    speed_of_light = 2e8
    return transmitter_power * transmitter_gain * receiver_gain * speed_of_light / (4 * math.pi * 2 * frequency)**2
