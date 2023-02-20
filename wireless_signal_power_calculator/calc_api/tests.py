from ..wireless_signal_power_calculator.antenna_utils.antenna_calculations import friis_transmission_formula
from django.test import TestCase

class FriisTransmissionTests(TestCase):

    def test_friis_transmission_formula(self):
        result_power = friis_transmission_formula(3, 5, 5, 2.4e9, 2)
        actual_power = 4.122769517e-12
        self.assertAlmostEqual(result_power, actual_power)