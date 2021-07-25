---
title: Linux GSM
---

# Linux GSM

## Huawei GSM Modem

- Huawei Technologies Co., Ltd. E161/E169/E620/E800 HSDPA Modem

```
usb 2-4.1: new full-speed USB device number 5 using xhci_hcd
usb 2-4.1: New USB device found, idVendor=12d1, idProduct=1001, bcdDevice= 0.00
usb 2-4.1: New USB device strings: Mfr=1, Product=2, SerialNumber=1
usb 2-4.1: Product: HUAWEI Mobile
usb 2-4.1: Manufacturer: ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
usb 2-4.1: SerialNumber: ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
usb-storage 2-4.1:1.0: USB Mass Storage device detected
usb-storage 2-4.1:1.1: USB Mass Storage device detected
usb-storage 2-4.1:1.2: USB Mass Storage device detected
usbcore: registered new interface driver usbserial_generic
usbserial: USB Serial support registered for generic
usbcore: registered new interface driver option
usbserial: USB Serial support registered for GSM modem (1-port)
option 2-4.1:1.0: GSM modem (1-port) converter detected
usb 2-4.1: GSM modem (1-port) converter now attached to ttyUSB0
option 2-4.1:1.1: GSM modem (1-port) converter detected
usb 2-4.1: GSM modem (1-port) converter now attached to ttyUSB1
option 2-4.1:1.2: GSM modem (1-port) converter detected
usb 2-4.1: GSM modem (1-port) converter now attached to ttyUSB2
```

## EC20 Dongle

- Quectel Wireless Solutions Co., Ltd. EC25 LTE modem

```
usb 1-12: new high-speed USB device number 3 using xhci_hcd
usb 1-12: New USB device found, idVendor=2c7c, idProduct=0125, bcdDevice= 3.18
usb 1-12: New USB device strings: Mfr=1, Product=2, SerialNumber=0
usb 1-12: Product: Android
usb 1-12: Manufacturer: Android
usbcore: registered new interface driver usbserial_generic
usbserial: USB Serial support registered for generic
usbcore: registered new interface driver option
usbserial: USB Serial support registered for GSM modem (1-port)
option 1-12:1.0: GSM modem (1-port) converter detected
usb 1-12: GSM modem (1-port) converter now attached to ttyUSB0
option 1-12:1.1: GSM modem (1-port) converter detected
usb 1-12: GSM modem (1-port) converter now attached to ttyUSB1
option 1-12:1.2: GSM modem (1-port) converter detected
usb 1-12: GSM modem (1-port) converter now attached to ttyUSB2
option 1-12:1.3: GSM modem (1-port) converter detected
usb 1-12: GSM modem (1-port) converter now attached to ttyUSB3
usbcore: registered new interface driver cdc_wdm
qmi_wwan 1-12:1.4: cdc-wdm0: USB WDM device
qmi_wwan 1-12:1.4 wwan0: register 'qmi_wwan' at usb-0000:00:14.0-12, WWAN/QMI device, 1a:b5:99:71:81:5e
usbcore: registered new interface driver qmi_wwan
```

# FAQ

## 为什么需要 usb-modeswitch

GSM Modem 一般有 ZeroCD/免驱 模式, 所以会先挂载为 USB 存储, 需要使用 usb-modeswitch 来切换为 modem 模式, lsusb 如果出现的是 modem 那么就没问题。
