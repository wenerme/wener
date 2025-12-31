---
title: Peripheral I/O (Android Things PIO)
tags:
  - Embedded
  - AndroidThings
  - PIO
  - GPIO
  - I2C
  - SPI
---

# Peripheral I/O (Android Things PIO)

Notes on hardware peripherals and their management in Android Things.

## Peripheral Protocols

- **GPIO**: BCM2-BCM27. Supports Resistor None/Pull-up/Pull-down.
- **I2C**: Supports 100kHz/400kHz frequencies.
- **SPI**: Serial Peripheral Interface.
- **UART**: UART0 (disables Bluetooth/MINIUART).
- **PWM**: PWM0/PWM1 (disables I2S audio).

## Android Things PIO API

- [com.google.android.things.pio (Package Summary)](https://developer.android.com/reference/com/google/android/things/pio/package-summary)
- [com.google.android.things.userdriver (Package Summary)](https://developer.android.com/reference/com/google/android/things/userdriver/package-summary)

### User Driver Support

- GNSS
- Input
- LoWPAN
- Sensor
