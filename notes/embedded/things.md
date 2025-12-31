---
title: Internet of Things (IoT) & Embedded Integration
tags:
  - Embedded
  - IoT
  - Protocols
  - Hardware
  - Software
  - Integration
---

# Internet of Things (IoT) & Embedded Integration

A comprehensive collection of notes on IoT protocols, software frameworks, hardware platforms, and integration techniques.

## Software Frameworks & Libraries

### Go (Golang)

- [kidoman/embd](https://github.com/kidoman/embd)
  - **License**: Apache 2.0 | **Language**: Go | **Tech**: HAL for Embedded
  - Hardware abstraction layer for boards like Raspberry Pi, BeagleBone Black, etc.
- [stianeikeland/go-rpio](https://github.com/stianeikeland/go-rpio)
  - **License**: MIT | **Language**: Go | **Tech**: Raspberry Pi GPIO
  - Native Go library for GPIO, SPI, and I2C on Raspberry Pi without C dependencies.
- [dhiltgen/go-owfs](https://github.com/dhiltgen/go-owfs)
  - **Language**: Go | **Tech**: 1-Wire / OWFS
  - Client library for interacting with One-Wire File System (OWFS).
- [tinygo-org/tinygo](https://github.com/tinygo-org/tinygo)
  - Go compiler for microcontrollers and WebAssembly.

### JavaScript (Node.js)

- [johnny-five](http://johnny-five.io/)
  - [rwaldron/johnny-five](https://github.com/rwaldron/johnny-five)
  - **Language**: JavaScript | **Tech**: Firmata, Robotics
  - The original JavaScript Robotics & IoT Framework.
- [Samsung/iotjs](https://github.com/Samsung/iotjs)
  - **License**: Apache 2.0 | **Language**: C, JavaScript | **Tech**: JerryScript
  - Lightweight JavaScript platform for resource-constrained IoT devices.
- [Gobot](https://gobot.io/)
  - Next generation robotics framework with support for various platforms.

### Hardware Utilities

- [themadinventor/esptool](https://github.com/themadinventor/esptool)
  - **License**: GPLv2+ | **Language**: Python | **Tech**: ESP8266/ESP32 Flashing
  - Essential serial utility for flashing Espressif chips.
- [pellepl/spiffs](https://github.com/pellepl/spiffs)
  - **License**: MIT | **Language**: C | **Tech**: SPI Flash File System
  - Wear-leveling file system designed for SPI NOR flash.

## Communication Protocols

### Bus Types & Networks

- [List of Network Buses (Wikipedia)](https://en.wikipedia.org/wiki/List_of_network_buses)

| Protocol   | Description                 | Pins                 | Characteristics                            |
| :--------- | :-------------------------- | :------------------- | :----------------------------------------- |
| **I2C**    | Inter-Integrated Circuit    | SDA, SCL             | Synchronous, 127/1023 nodes, up to 5Mbps   |
| **SPI**    | Serial Peripheral Interface | SCLK, MOSI, MISO, SS | Full-duplex, synchronous, higher speed     |
| **1-Wire** | Single wire data            | DQ, GND              | Low speed (16.3kbps), long distance (300m) |
| **UART**   | Universal Async             | TX, RX               | Asynchronous, point-to-point               |

### Infrared (IR)

- [z3t0/Arduino-IRremote](https://github.com/z3t0/Arduino-IRremote)
  - **License**: MIT | **Language**: C++ | **Tech**: IR Protocols
  - Send and receive IR signals using various protocols (NEC, Sony, Samsung, etc.).
- [LIRC (Linux Infrared Remote Control)](http://www.lirc.org/)

## Hardware Platforms & Components

### Microcontrollers (MCU)

- **ESP8266 / ESP32**: Popular WiFi/BT integrated SoCs.
- **ATmega328 (Arduino Uno)**: Mainstream 8-bit MCU.
- **ATtiny85 (Digispark)**: Ultra-small USB development board.
  - Runs [Micronucleus](https://github.com/micronucleus/micronucleus) bootloader.

### Sensors & Modules

- **DS18B20**: Digital temperature sensor (1-Wire).
  - Uses 4.7kΩ pull-up resistor. Supports parasitic power mode.
- **HC-SR04**: Ultrasonic distance sensor (Trig/Echo).
- **OV7670**: VGA camera module (640x480).
- **L293D**: Quadruple high-current half-H drivers for motors.
- **SN74HC595**: 8-bit shift register with output latches.

### USB-Serial Bridges

Common VID/PID for serial converters:

- **PL-2303**: VID `067B`, PID `2303`. [Prolific Driver](http://prolificusa.com/pl-2303hx-drivers/).
- **CH340G**: Popular on low-cost Arduino clones.
- **FT232H**: High-speed USB to multi-protocol (UART, SPI, I2C, JTAG).

## Tools & Troubleshooting

### Kernel & Device Logs

```bash
# Linux: Follow kernel logs
dmesg -wH

# macOS: Follow kernel logs
watch -n 0.1 "sudo dmesg | tail -n 20"
```

### USB Management

- [Linux USB ID Repository](http://www.linux-usb.org/usb.ids)
- [libusb Examples](https://github.com/hjelmn/libusb-darwin/tree/master/examples)

## Specialized IoT Projects

- [MagicMirror²](https://magicmirror.builders/)
  - [MichMich/MagicMirror](https://github.com/MichMich/MagicMirror)
  - Modular smart mirror platform.
- [Blynk](https://blynk.io/)
  - [blynkkk/blynk-library](https://github.com/blynkkk/blynk-library)
  - IoT platform to connect hardware to mobile apps.

## Resources

- [Embedded Linux Wiki (eLinux)](http://elinux.org/Main_Page)
- [Linux Device Drivers (LDD3)](http://www.makelinux.net/ldd3/)
- [JSLinux](https://bellard.org/jslinux/) - PC emulator in JavaScript by Fabrice Bellard.
