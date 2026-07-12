---
title: ESP Awesome
tags:
  - Awesome
---

# ESP Awesome

| module   | CPU            | freq       | ROM    | SRAM                    | Wi-Fi   | Bluetooth        | 外设                    | desc                                                                                  |
| -------- | -------------- | ---------- | ------ | ----------------------- | ------- | ---------------- | ----------------------- | ------------------------------------------------------------------------------------- |
| ESP8266  | Tensilica L106 | 80/160 MHz | -      | <50 KB user             | 2.4 GHz | -                | UART, SDIO, SPI, I2C, I2S, PWM, IR, ADC | 低成本经典 Wi-Fi MCU；资源较少，无蓝牙，适合简单联网、串口透传、传感器节点。          |
| ESP32    | Xtensa LX6     | 240 MHz    | 448 KB | 520 KB + 16 KB RTC      | 2.4 GHz | Classic, BLE 4.2 | UART, SPI, I2C, I2S, RMT, LED PWM, TWAI, Ethernet MAC, ADC, DAC, Touch | 经典款，生态成熟、资料最多；适合通用 IoT、音频、网关、需要 Bluetooth Classic 的场景。 |
| ESP32-S2 | Xtensa LX7     | 240 MHz    | 128 KB | 320 KB + 8 KB RTC       | 2.4 GHz | -                | USB OTG, UART, SPI, I2C, I2S, RMT, LED PWM, TWAI, LCD, ADC, DAC, Touch | 无蓝牙；强调安全、USB OTG、丰富 GPIO，适合 Wi-Fi-only 设备、USB 外设、人机接口。      |
| ESP32-S3 | Xtensa LX7     | 240 MHz    | 384 KB | 512 KB + 16 KB RTC      | 2.4 GHz | BLE 5            | USB OTG, LCD, Camera, UART, SPI, I2C, I2S, RMT, LED PWM, TWAI, ADC, Touch | 带向量指令，适合 AIoT、语音/图像/信号处理、USB、需要 PSRAM 的 HMI 场景。              |
| ESP32-C3 | RISC-V         | 160 MHz    | 384 KB | 400 KB + 8 KB RTC       | 2.4 GHz | BLE 5            | USB Serial/JTAG, UART, SPI, I2C, I2S, RMT, LED PWM, TWAI, ADC | 低成本 RISC-V Wi-Fi + BLE，适合替代 ESP8266、传感器、简单联网设备。                   |
| ESP32-C6 | RISC-V         | 160 MHz    | 320 KB | 512 KB + 16 KB LP       | 2.4 GHz | BLE 5            | 802.15.4, USB Serial/JTAG, UART, SPI, I2C, I2S, RMT, LED PWM, TWAI, ADC | 低功耗 Wi-Fi 6 + BLE + Thread/Zigbee，适合 Matter、智能家居、边缘节点。               |
| ESP32-H2 | RISC-V         | 96 MHz     | 128 KB | 320 KB + 4 KB LP        | -       | BLE 5            | 802.15.4, USB Serial/JTAG, UART, SPI, I2C, I2S, RMT, LED PWM, TWAI, ADC | 无 Wi-Fi；面向低功耗 BLE/Thread/Zigbee/Matter 终端，常与 Wi-Fi SoC 组合做网关。       |

- Bluetooth BR/EDR / Bluetooth Classic
  - 持续连接、高吞吐
  - 音频、耳机、音箱、串口 SPP
  - Profile，如 A2DP、HFP、SPP
- BLE / Bluetooth Low Energy
  - 低功耗、短数据、间歇通
  - 传感器、手环、Beacon、配网、控制
  - GATT Service / Characteristic
- BLE 5
  - 1Mbps -> 2Mbps
  - LE Coded PHY 长距离, S=2/S=8
  - Advertising Extensions - 广播包
  - 31bytes 更大广播数据包
  - Channel Selection Algorithm #2
  - Slot Availability Mask
  - LE Audio
  - Periodic Advertising

```
Bluetooth
├── Classic Bluetooth / BR/EDR
│   ├── A2DP 音频
│   ├── HFP 免提
│   └── SPP 串口
└── Bluetooth Low Energy / BLE
    ├── GATT
    ├── Beacon
    ├── Mesh
    └── 低功耗传感器/控制
```

- ESP32-D0WDQ6 - 芯片 / SoC
  - ESP32 - SoC 系列
  - D0WD - 芯片变体, 双核
    - D - Dual core
      - S - Single core
      - U/D - Dual core
    - 0 - No in-package flash / PSRAM
    - WD - Wi-Fi b/g/n + Bluetooth/Bluetooth LE dual mode
    - H - High temperature
  - Q6 - QFN 封装 6×6 mm
- ESP32-WROOM-32 - 模组
  - 模组型号, 可能封装了 ESP32-D0WDQ6 + SPI Flash + 晶振 + 射频匹配 + 天线
- 开发板: ESP32 DevKit / NodeMCU-32S / ESP32-WROOM-32 DevBoard
- 变体
  - D0WD - 双核
  - D2WD - 2MB flash
  - U4WDH - 4 MB flash
  - S0WD - 单核

| abbr. | stand for                       | cn                 |
| ----- | ------------------------------- | ------------------ |
| NRND  | Not Recommended for New Designs | 不推荐用于新设计   |
| TWAI  | Two-Wire Automotive Interface   | CAN 总线控制器     |
| ADC   | Analog-to-Digital Converter     | 模数转换器         |
| DAC   | Digital-to-Analog Converter     | 数模转换器         |
| Touch | Capacitive Touch Sensor         | 电容触摸传感器     |


## 参考

- 官方资料
  - [ESP SoCs](https://www.espressif.com/en/products/socs)
  - [ESP Product Selector](https://products.espressif.com/#/product-selector)
  - [ESP-IDF Chip Series Comparison](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/chip-series-comparison.html)
  - [ESP8266EX Datasheet](https://documentation.espressif.com/0a-esp8266ex_datasheet_en.pdf)
  - [ESP32 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf)
  - [ESP32-S2 Datasheet](https://documentation.espressif.com/esp32-s2_datasheet_en.pdf)
  - [ESP32-S3 Datasheet](https://documentation.espressif.com/esp32-s3_datasheet_en.pdf)
  - [ESP32-C3 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-c3_datasheet_en.pdf)
  - [ESP32-C6 Datasheet](https://documentation.espressif.com/esp32-c6_datasheet_en.pdf)
  - [ESP32-H2 Datasheet](https://documentation.espressif.com/esp32-h2_datasheet_en.html)
  - [ESP32-C3-SUPERMINI - Zephyr Project Documentation](https://docs.zephyrproject.org/latest/boards/others/esp32c3_supermini/doc/index.html)
- 语言选择
  - 新手/最快出效果：Arduino C++ / ESPHome
  - 认真做项目：PlatformIO + Arduino C++
  - 产品/底层/稳定性：ESP-IDF C/C++
  - 快速原型：MicroPython
- [Rust on Espressif chips](https://mabez.dev/blog/posts/esp-rust-18-10-2021/)
  - [HN](https://news.ycombinator.com/item?id=29000870)
- [esp-rs/espflash](https://github.com/esp-rs/espflash)
