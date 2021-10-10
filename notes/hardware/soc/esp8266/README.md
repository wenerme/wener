---
id: esp8266
title: ESP8266
---

# ESP8266

- wiki [ESP8266](https://en.wikipedia.org/wiki/ESP8266)
- ESP8285 为 ESP8266 1 MiB Flash
- Spec
  - 处理器 L106 32-bit RISC
  - 内存
    - 32 KiB instruction RAM
    - 32 KiB instruction cache RAM
    - 80 KiB user-data RAM
    - 16 KiB ETS system-data RAM
  - 外部 QSPI 闪存 16 MiB - (512 KiB to 4 MiB typically included)
  - IEEE 802.11 b/g/n Wi-Fi
    - Integrated TR switch, balun, LNA, power amplifier and matching network
    - WEP or WPA/WPA2 authentication, or open networks
  - 16 GPIO pins
  - SPI
  - I²C (software implementation)
  - I²S interfaces with DMA (sharing pins with GPIO)
  - UART on dedicated pins, plus a transmit-only UART can be enabled on GPIO2
  - 10-bit ADC (successive approximation ADC)
- modules
  - ESP-01 - 2014-8
- https://github.com/espressif/ESP8266_RTOS_SDK
- https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/
- FreeRTOS
- https://github.com/espressif/esptool
  - ESP8266 and ESP32 serial bootloader utility
- https://github.com/espressif/esp-at
  - AT application for ESP32 ESP-IDF & ESP32S2 ESP-IDF & ESP8266 ESP8266_RTOS_SDK
- https://github.com/mertenats/NodeMCU-and-JavaScript
- http://www.espruino.com/
- https://tinygo.org/microcontrollers/machine/esp8266/
- https://tinygo.org/microcontrollers/esp8266/
- https://github.com/solarwinds/tinygo-lessons
- ESP8266 最新 SDK http://wiki.ai-thinker.com/esp8266/sdk

## Dev

- https://docs.espressif.com/projects/esp-idf/en/release-v3.0/get-started/linux-setup.html#standard-setup-of-toolchain-for-linux

## 模块

- [ESP8266](https://en.wikipedia.org/wiki/ESP8266)

| Name    | Pins | LED | Shielded | Notes                               |
| ------- | ---- | --- | -------- | ----------------------------------- |
| ESP-01  | 6    | ✅  | ❌       | 蓝色 512 KiB; AI-Thinker 黑色 1 MiB |
| ESP-01S | 6    | ✅  | ❌       | 1 Mib Flash                         |
| ESP-12  | 12   | ✅  | ✅       | FCC,CE 批准                         |
| ESP-12E | 12   | ✅  | ✅       | 4 MiB                               |
| ESP-12F | 12   | ✅  | ✅       | 天线增强                            |

- 盗版 ESP-01
  - 上电后不会输出 READY 信息，而是输出 INVAILD 失效信息
  - 不具备特性
    1. 不带免费云服务，只能在局域网内用。
    1. 不支持 AT 指令设 IO 口的高低电平
    1. 不支持 AT 指令读取 IO 口电平。
    1. 不支持 AT 指令读取 ADC 电压
    1. 不支持 AT 指令升级到安信可最新官方版本
    1. 不支持 AT 设本机在电脑上显示在 HOST NAME 功能。
    1. 不能用网络无线方式执行 AT 指令。
    1. 不支持后续的上电后，直接用 APP 控制功能。
    1. 因为安信可官方产品，因此不能获得技术支持。
