import math
import numpy as np
from calc_api.models import Antenna


class AntennaObj:
    def __init__(self, position, profile, power=None):
        self.power = power
        self.position = position
        self.profile = profile


def friis_transmission_formula(transmitter_power, transmitter_gain, receiver_gain, frequency, distance):
    speed_of_light = 2e8
    # print(transmitter_power, transmitter_gain, receiver_gain)
    receiver_power = transmitter_power * transmitter_gain * receiver_gain * \
        speed_of_light / (4 * math.pi * 2 * distance * frequency*10**-6)**2
    if receiver_power == 0:
        return 0
    return 10 * math.log10(receiver_power) + 30


def friis_transmission_formula_per_channel(transmitters: list[AntennaObj], receiver: AntennaObj):
    receiver_profile = receiver.profile
    receiver_power = dict()
    for key, value in receiver_profile.items():
        receiver_frequency = float(key)
        receiver_key = key
        receiver_power[key] = 0
        for transmitter in transmitters:
            transmitter_profile = transmitter.profile
            transmitter_gain = value
            if key not in transmitter_profile.keys():
                for key, value in transmitter_profile.items():
                    transmitter_frequency = float(key)
                    if receiver_frequency > transmitter_frequency:
                        lower_bound_gain = value
                    else:
                        break
                    if lower_bound_gain:
                        transmitter_gain = (lower_bound_gain + value) / 2
            dist = distance(transmitter.position, receiver.position)
            receiver_power[receiver_key] += friis_transmission_formula(
                transmitter.power, transmitter_gain, value, receiver_frequency, dist)
    return receiver_power


def signal_to_interference_ratio_per_channel(signal: dict(), interference: dict()):
    result = dict()
    for key, signal_value, interference_value in zip(signal.keys(), signal.values(), interference.values()):
        result[key] = signal_value - interference_value   
    return result


def distance(transmitter_position: list[float], receiver_position: list[float]):
    result = 0
    for x, y in zip(transmitter_position, receiver_position):
        result += (x-y)**2
    return result**0.5


def calculate_antenna_parameters(transmitter, receiver, transmitter_power, transmitter_position, receiver_position, interferers):
    transmitter_obj = AntennaObj(
        transmitter_position, transmitter.profile, transmitter_power)
    receiver_obj = AntennaObj(receiver_position, receiver.profile)
    receiver_power = friis_transmission_formula_per_channel(
        [transmitter_obj], receiver_obj)
    signal_to_interference_ratio = None
    distance = None
    if len(interferers) > 0:
        interference = friis_transmission_formula_per_channel(
            interferers, receiver_obj)
        signal_to_interference_ratio = signal_to_interference_ratio_per_channel(
            receiver_power, interference)
        distance = calculate_distance(
            transmitter_obj, receiver_obj, interference)
    return {
        "power": receiver_power,
        "signal_to_interference_ratio": signal_to_interference_ratio,
        "distance": distance,
        "avg_power": average_of_dict(receiver_power),
        "avg_SIR": average_of_dict(signal_to_interference_ratio)
    }


def calculate_SIR(transmitter_power, transmitter_gain, receiver_gain, frequency, distance, interference):
    received_power = friis_transmission_formula(
        transmitter_power, transmitter_gain, receiver_gain, frequency, distance)
    SIR = received_power - interference
    return SIR


def calculate_distance(transmitter, receiver, interference):
    # Initialize distance to 0.1 meters
    distance = 0.1

    while True:
        SIR_values = []
        for frequency, gain in receiver.profile.items():
            SIR = calculate_SIR(transmitter.power, transmitter.profile[frequency], gain, float(frequency), distance, interference[frequency])
            SIR_values.append(SIR)
        min_SIR = np.min(SIR_values)
        if min_SIR < 3:
            break

        distance += 0.1

    return distance

def average_of_dict(dictionary: dict()):
    sum = 0
    amt = 0
    if dictionary is None:
        return None
    for value in dictionary.values():
        if value is not None:
            sum += value
            amt += 1
    
    return sum / amt