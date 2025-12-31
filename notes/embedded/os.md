---
title: Embedded & IoT Operating Systems
tags:
  - Embedded
  - IoT
  - RTOS
  - Linux
  - Android
---

# Embedded & IoT Operating Systems

Overview and resources for various real-time and embedded operating systems.

## General Information

- [Wikipedia - Real-time Operating System (RTOS)](https://en.wikipedia.org/wiki/Real-time_operating_system)
- [Wikipedia - Comparison of RTOS](https://en.wikipedia.org/wiki/Comparison_of_real-time_operating_systems)
- [Top IoT Operating Systems and Microsoft (Medium)](https://medium.com/@iskerrett/25aee43e11f4)
- [Open Source IoT Operating Systems (HackerEarth)](https://www.hackerearth.com/blog/internet-of-things/open-source-iot-operating-systems/)

## Major Embedded OS/RTOS

- **FreeRTOS** (MIT)
  - Active support for ARM, AVR, AVR32, ColdFire, IA-32, Cortex-M, MSP430, PIC, STM32, etc.
  - [Official Site](https://www.freertos.org)
- **RIOT OS** (LGPL)
  - Supports ARM, MSP430, AVR, x86.
  - [Official Site](https://www.riot-os.org)
- **Apache Mynewt** (Apache 2.0)
  - Supports ARM Cortex-M, MIPS32, PIC32, RISC-V.
  - [Official Site](https://mynewt.apache.org)
- **Zephyr Project** (Apache 2.0)
  - Supports x86, ARM, ARC, NIOS2, XTensa, RISC-V.
  - [Official Site](https://www.zephyrproject.org)

## Android Things (Brillo)

- [Official Android Things Page](https://developer.android.com/things/)
- [Things Console](https://partner.android.com/things/console/)
- [Android Things Internals (PDF)](https://elinux.org/images/e/ee/Android-things-internals-170223-170224005332.pdf)

### Internals & Daemons

- `/system/bin/peripheralman`: C++ System Service for peripheral I/O.
- `dumpsys com.google.android.things.pio.IPeripheralManager`
- [Peripheral Manager Source](https://android.googlesource.com/platform/system/peripheralmanager/)
- `peripheral_io.h`: The header for the new HAL.
- HAL Path: `/system/lib/hw/peripheral_io.<board_name>.so`

### Device Classes & Protocols

- **Classes**: Vibrator, Battery, Audio, Modem, Bluetooth, Camera, IR, Display, GPS, Lights, NFC, Sensors, Wifi.
- **Greybus Device Classes**: standardizing communication.
- **Protocols**: USB, GPIO, SPI, UART, PWM, I2C, SDIO.
