---
title: ESP32 Arduino Core
tags:
  - Hardware
  - Microcontroller
  - ESP32
  - Espressif
  - Arduino
---

# ESP32 Arduino Core

The ESP32 Arduino core allows you to program Espressif ESP32 series SoCs using the Arduino IDE and ecosystem. The ESP32 is a powerful successor to the ESP8266, featuring integrated WiFi and dual-mode Bluetooth.

- - [espressif/arduino-esp32](https://github.com/espressif/arduino-esp32)
    - C, C++, LGPL-2.1
    - The official Arduino core for ESP32, ESP32-S2, ESP32-S3, ESP32-C3, and more.

## Key Features of ESP32

- **Dual Core**: Most models feature two Xtensa® 32-bit LX6 microprocessors.
- **Wireless Connectivity**: 2.4 GHz Wi-Fi and Bluetooth (Classic and LE).
- **Rich Peripherals**: Capacitive touch sensors, Hall sensors, SD card interface, Ethernet, high-speed SPI, UART, I2S, and I2C.
- **Security**: Hardware acceleration for AES, SHA-2, RSA, and ECC; secure boot and flash encryption.

## Getting Started

To install the ESP32 core in Arduino IDE:

1. Open **Preferences**.
2. Add `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json` to **Additional Boards Manager URLs**.
3. Open **Boards Manager**, search for "esp32", and install the latest version.

## Resources

- [ESP32 Official Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html)
- [ESP-IDF (IoT Development Framework)](https://github.com/espressif/esp-idf)
