---
title: NodeMCU Firmware & Ecosystem
tags:
  - Hardware
  - Microcontroller
  - Lua
  - ESP8266
  - ESP32
  - NodeMCU
---

# NodeMCU Firmware & Ecosystem

NodeMCU is an open-source Lua-based firmware for ESP8266 and ESP32 WiFi SoCs. It includes an interactive Lua shell and a set of modules for interacting with hardware peripherals.

- [NodeMCU Official Documentation](https://nodemcu.readthedocs.io/en/release/)

## Key Features

- **Lua Interpretation**: Allows for rapid prototyping without the need for traditional compilation.
- **Event-Driven**: Non-blocking network and timer events.
- **Modular Design**: Users can build custom firmware images containing only the modules they need (e.g., `mqtt`, `http`, `u8g2`, `dht`).
- **File System**: Includes integrated SPIFFS/LittleFS for storing Lua scripts and data.

## Development & Flashing

### Custom Firmware Builds

Since the full firmware is too large for many ESP8266 chips (4MB), developers typically use custom build services:

- [NodeMCU Build Service (Cloud)](https://nodemcu-build.com/)

### Flashing Tools

- **NodeMCU PyFlasher**: A simple GUI tool for flashing firmware.
- **esptool.py**: The professional CLI tool for all ESP flashing tasks.

## GitHub Projects

- - [nodemcu/nodemcu-firmware](https://github.com/nodemcu/nodemcu-firmware)
    - C, Lua, MIT
    - The core ESP8266 firmware repository.
- - [nodemcu/nodemcu-esp32](https://github.com/nodemcu/nodemcu-esp32)
    - C, Lua, MIT
    - Port of the NodeMCU firmware to the ESP32 (based on ESP-IDF).

## Resources

- [NodeMCU Wiki](https://github.com/nodemcu/nodemcu-firmware/wiki)
- [NodeMCU Community Forum](https://www.nodemcu.com/index_en.html)
