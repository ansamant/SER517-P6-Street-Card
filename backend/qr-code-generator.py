##
# The following code is solely for the generation of qrcode to be read.
# Ideally upon reading the qrcode the user will be redirected to the landing page of the website.
# author: Aditya Samant
# version: 1.0
# link:https://pypi.org/project/PyQRCode/
##

import pyqrcode


url = 'http://localhost:3000/'
qr = pyqrcode.create(url)
qr.png('qrCode.png', scale=8)



