from .utils.antenna_calculations import *
from django.test import TestCase

class FriisTransmissionTests(TestCase):

    def test_friis_transmission_formula(self):
        self.assertAlmostEqual(friis_transmission_formula(3, 5, 5, 2400, 2), -30.83780948)
        self.assertAlmostEqual(friis_transmission_formula(0, 5, 5, 2400, 2), 0)
        self.assertAlmostEqual(friis_transmission_formula(3, -5, -5, 2400, 10000), -104.81720956747742)

    def test_friis_transmission_formula_per_channel(self):
        transmitter = AntennaObj([0, 0, 0], {"2400": 5}, 30)
        receiver = AntennaObj([1, 1, 1], {"2400": 5})
        transmitter_power = 3
        result_power = friis_transmission_formula_per_channel([transmitter], receiver)
        expected_power = {"2400": -19.588422114674046}
        for key in result_power.keys():
            self.assertAlmostEqual(result_power[key], expected_power[key], places=6)
            
class SignalToInterferenceRatioTests(TestCase):

    def test_signal_to_interference_ratio_per_channel(self):
        signal = {"2400": -60}
        interference = {"2400": -100}
        result_sir = signal_to_interference_ratio_per_channel(signal, interference)
        expected_sir = {"2400": 40}
        for key in result_sir.keys():
            self.assertEqual(result_sir[key], expected_sir[key])

class DistanceTests(TestCase):

    def test_distance(self):
        transmitter = AntennaObj([0, 0, 0], {"2400": 5}, 30)
        receiver = AntennaObj([1, 1, 1], {"2400": 5})
        interference = {"2400": -30}
        result_distance = calculate_distance(transmitter, receiver, interference)
        expected_distance = 4.1
        self.assertAlmostEqual(result_distance, expected_distance, places=6)

class AverageOfDictTests(TestCase):

    def test_average_of_dict(self):
        dictionary = {"2400": -60, "5800": -80, "9000": None}
        result_average = average_of_dict(dictionary)
        expected_average = -70
        self.assertEqual(result_average, expected_average)