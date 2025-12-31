---
title: Web-based Embedded Simulators
tags:
  - Embedded
  - Web
  - Simulator
  - Wokwi
  - Arduino
  - ESP32
---

# Web-based Embedded Simulators

Web-based tools that allow for designing, testing, and debugging electronic and embedded projects directly in the browser.

## Wokwi

[Wokwi](https://wokwi.com/) is a powerful, browser-based embedded simulator supporting various architectures (AVR, ARM, ESP32, RISC-V).

### Key Features

- **Zero Installation**: Runs entirely in the browser.
- **Real-time Simulation**: Watch virtual circuits behave as you code.
- **Languages**: Supports C/C++ (Arduino), MicroPython, and Rust.
- **Advanced Tools**: Integrated logic analyzer, GDB debugging, and SD card simulation.
- **IoT Simulation**: Simulate WiFi, MQTT, and HTTP communication (ESP32).

### Supported Hardware

- **Arduino**: Uno, Mega, Nano, ATtiny85.
- **ESP32**: Standard ESP32, S2, S3, C3, C6.
- **STM32**: STM32C031, STM32L031.
- **Other**: Raspberry Pi Pico (RP2040).
- **Sensors & I/O**: SSD1306 (OLED), DHT22, HC-SR04, NeoPixels (FastLED).

### Resources

- [wokwi-elements Source](https://github.com/wokwi/wokwi-elements) - Web component implementations for various electronic parts.
  - [Arduino Uno Element](https://github.com/wokwi/wokwi-elements/blob/master/src/arduino-uno-element.ts)
- [Wokwi Element Storybook](https://elements.wokwi.com/) - Visual gallery of supported components.

## Other Simulators

- [Autodesk Tinkercad](https://www.tinkercad.com/circuits) - Simple circuit and Arduino simulation.
- [Codebender](https://codebender.cc/) - Web-based Arduino IDE and flashing.
