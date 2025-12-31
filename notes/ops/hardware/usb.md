---
title: USB Hardware
tags:
  - Ops
  - Hardware
  - USB
---

# USB Hardware

- [USB hardware - Power](https://en.wikipedia.org/wiki/USB_hardware#Power)

For example if you have a QuickCharge 4+ device (Snapdragon 710, 845) you can charge at:

- 5V, 9V via USB-PD
- 3V to 5.9V or 3V to 11V in 20mV increments via USB-PD 3.0 PPS (Programmable Power Supply)
- 3.6V to 20V in 200mV increments via QC charger

Power Delivery is supposed to be interchangeable with the Battery Charging standard which uses the 2.0 data pins

Not interchangeable, but backwards compatible, meaning if CC pin is not used to negotiate charging rate, it will fallback to USB Battery Charging standard.

According to what's on Wikipedia, Power Delivery 2.0 is capable of 60-100 watts and includes Type A and B
