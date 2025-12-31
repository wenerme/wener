---
title: Circle Bare Metal C++ Environment for Raspberry Pi
tags:
  - Hardware
  - RaspberryPi
  - BareMetal
  - C++
  - Development
  - USB
---

# Circle Bare Metal C++ Environment

Circle is a specialized C++ bare metal environment designed for the Raspberry Pi. It allows developers to create high-performance applications that run directly on the hardware without an underlying Linux operating system.

- - [rsta2/circle](https://github.com/rsta2/circle)
    - C++, C, GPL-3.0
    - A comprehensive C++ bare metal environment for Raspberry Pi (A+, B, B+, 2, 3, 4, 400, 5, Zero). Supports both 32-bit and 64-bit applications.

## Key Features

- **USB Support**: Includes a robust USB stack (32 and 64 bit).
- **Networking**: Full TCP/IP stack (ARP, IP, ICMP, UDP, TCP) with clients for DHCP, DNS, HTTP, MQTT, and mDNS. Includes a BSD-like socket API.
- **Graphics Support**: Support for OpenGL ES 1.1/2.0, OpenVG 1.1, EGL 1.4, and integration with LVGL / uGUI.
- **File Systems**: Integrates the FatFs driver for SD card access.
- **Device Drivers**: Drivers for touchscreen, MIDI, serial, and mass-storage gadgets.

## Supported Hardware

Circle supports almost the entire Raspberry Pi family (except the Pico/RP2040), from the original Model B to the Raspberry Pi 5.

## Resources

- [Circle Wiki & Documentation](https://github.com/rsta2/circle/wiki)
- - [Re4son/re4son-kernel-builder](https://github.com/Re4son/re4son-kernel-builder)
    - Shell, GPL-2.0
    - A tool for building custom Kali Linux kernels for Raspberry Pi, relevant for hardware-level kernel discussions.
