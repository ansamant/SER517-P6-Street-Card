##
# The following code is solely for the generation of qrcode to be read.
# Ideally upon reading the qrcode the user will be redirected to the landing page of the website.
# author: Aditya Samant
# version: 1.0
# link:https://pypi.org/project/PyQRCode/
##

"""
This file is to generate QR code to redirect from StreetCard to the landing page 
after scanning
@author:Aditya 
"""

import pyqrcode


url = 'http://3.23.2.175:3000/'
qr = pyqrcode.create(url)
qr.png('qrCode.png', scale=8)



