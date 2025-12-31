---
title: Real-Time Operating Systems (RTOS) & Embedded Runtimes
tags:
  - Embedded
  - RTOS
  - OperatingSystem
  - MicroPython
  - TinyGo
---

# Real-Time Operating Systems (RTOS) & Embedded Runtimes

Overview of various RTOS kernels and language-specific runtimes for embedded systems.

## Mainstream RTOS Kernels

- [FreeRTOS](https://www.freertos.org/)
  - [aws/amazon-freertos](https://github.com/aws/amazon-freertos)
  - **License**: MIT | **Language**: C | **Tech**: Real-time Kernel
  - The most popular RTOS for microcontrollers, now supported by AWS.

- [RT-Thread](https://www.rt-thread.org/)
  - [RT-Thread/rt-thread](https://github.com/RT-Thread/rt-thread)
  - **License**: Apache 2.0 | **Language**: C | **Tech**: IoT RTOS
  - An open-source IoT RTOS from China with a rich component ecosystem.

- [Zephyr Project](https://www.zephyrproject.org/)
  - [zephyrproject-rtos/zephyr](https://github.com/zephyrproject-rtos/zephyr)
  - **License**: Apache 2.0 | **Language**: C, Python | **Tech**: Scalable RTOS
  - A scalable RTOS for resource-constrained devices, backed by the Linux Foundation.

- [Apache Mynewt](https://mynewt.apache.org/)
  - [apache/mynewt-core](https://github.com/apache/mynewt-core)
  - **License**: Apache 2.0 | **Language**: C | **Tech**: Modular RTOS
  - A modular RTOS for tiny IoT devices, featuring a small kernel (6KB).

## Scripting & Interactive Runtimes

- [NodeMCU](http://nodemcu.com/)
  - [nodemcu/nodemcu-firmware](https://github.com/nodemcu/nodemcu-firmware)
  - **License**: MIT | **Language**: C (Firmware), Lua (Scripting)
  - Lua-based interactive firmware for ESP8266 and ESP32.

- [MicroPython](https://micropython.org/)
  - [micropython/micropython](https://github.com/micropython/micropython)
  - **License**: MIT | **Language**: C, Python | **Tech**: Python 3 for MCU
  - A lean and efficient implementation of Python 3 for microcontrollers.

- [Espruino](https://www.espruino.com/)
  - [espruino/Espruino](https://github.com/espruino/Espruino)
  - **License**: MPL 2.0 | **Language**: C, JavaScript | **Tech**: JavaScript for MCU
  - JavaScript interpreter for microcontrollers (STM32, nRF52, ESP32, etc.).

## Modern Language Implementations

- **Go (TinyGo)**
  - [tinygo-org/tinygo](https://github.com/tinygo-org/tinygo)
  - **License**: BSD-3-Clause | **Language**: Go | **Tech**: LLVM-based Go Compiler
  - Go compiler for small places (Microcontrollers, WebAssembly).

- **Go (TamaGo)**
  - [f-secure-foundry/tamago](https://github.com/f-secure-foundry/tamago)
  - **License**: BSD-3-Clause | **Language**: Go | **Tech**: Bare-metal Go
  - Framework for running pure Go applications on bare-metal ARM/RISC-V.

- **Rust**
  - [Real Time For the Masses (RTFM)](https://blog.japaric.io/rtfm-v2/) - Concurrency framework for embedded Rust.
  - [Rust Embedded Working Group](https://github.com/rust-embedded/wg)

## Vendor Specific SDKs

- **Espressif (ESP8266)**
  - [ESP8266_NONOS_SDK](https://github.com/espressif/ESP8266_NONOS_SDK)
  - [ESP8266_RTOS_SDK](https://github.com/espressif/ESP8266_RTOS_SDK) - Based on FreeRTOS.

## Learning Resources

- [How To Choose The Best RTOS for IoT Devices (Nabto)](https://www.nabto.com/how-to-choose-best-rtos-for-iot/)
- [Comparison of RTOS (Wikipedia)](https://en.wikipedia.org/wiki/Comparison_of_real-time_operating_systems)
