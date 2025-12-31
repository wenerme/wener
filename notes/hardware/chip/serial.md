---
title: USB 转串口 (UART) 桥接芯片 (USB-to-Serial Bridge Chips)
tags:
  - Hardware
  - Serial
  - UART
  - USB
  - FTDI
  - CP2102
  - CH340
---

# USB 转串口 (UART) 桥接芯片 (USB-to-Serial Bridge Chips) {#usb-to-serial-bridge-chips}

用于连接 USB 与异步串行接口 (UART) 的常用集成电路 (IC) 的比较与规格。

## 主要厂商与芯片型号 {#major-vendors-chip-models}

### FTDI (Future Technology Devices International)

串口桥接芯片的高端标准，以稳定性和强大的驱动支持著称。

- **FT232R**: 经典的 USB 2.0 全速 (12 Mbit/s) 芯片，UART 速率高达 3 MBaud。
- **FT230X / FT231X**: X-Chip 系列的一部分，低成本，UART 速率高达 3 MBaud。
- **FT2232H / FT4232H**: 高速 (480 Mbit/s) 芯片，拥有 2 或 4 个端口，支持 MPSSE (SPI, I2C, JTAG)。UART 速率高达 12 MBaud。

### Silicon Labs (Silabs)

在 ESP32/ESP8266 开发板中非常流行。

- **CP2102**: 经典型号，UART 速率高达 1 MBaud。无需外部元件。
- **CP2104**: 改进版，支持 GPIO，UART 速率高达 2 MBaud。
- **CP2102N**: 现代替代型号，封装更小，UART 速率高达 3 MBaud。

### WCH (WinChipHead / 南京沁恒)

在低成本消费电子产品和克隆产品中占据主导地位。

- **CH340 / CH341**: 成本极低，广泛用于 Arduino 克隆板。UART 速率高达 2 MBaud。
- [WCH 官网](http://www.wch.cn/)

### Prolific (旺玖)

常见于较旧的 USB 转串口线。

- **PL2303**: 常见于许多廉价线缆中。有多个变体 (HX, GC, GL)。

## 对比表 {#comparison-table}

| Feature (特性)     | FT232R              | CP2102   | CH340G       |
| :----------------- | :------------------ | :------- | :----------- |
| **Max Baud Rate**  | 3 MBaud             | 1 MBaud  | 2 MBaud      |
| **USB Class**      | 厂商特定            | 厂商特定 | 厂商特定     |
| **Driver Support** | 优秀 (原生 Win/mac) | 良好     | 常见手动安装 |
| **Price**          | 高                  | 中       | 低           |

## Resources

- [USB to UART Adapter Comparison (ESP32.net)](http://esp32.net/usb-uart/)
- [Understanding USB Serial Converters (SparkFun)](https://learn.sparkfun.com/tutorials/how-to-install-ftdi-drivers)
- [Linux USB Serial Driver Source](https://github.com/torvalds/linux/tree/master/drivers/usb/serial)
