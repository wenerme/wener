---
title: USB 转 TTL 串口适配器与引脚定义 (USB-to-TTL Serial Adapters & Pinouts)
tags:
  - Hardware
  - Serial
  - TTL
  - UART
  - PL2303
  - CH340
---

# USB 转 TTL 串口适配器与引脚定义 {#usb-to-ttl-serial-adapters}

关于用于将 USB 接口与晶体管-晶体管逻辑 (TTL) 电平串口 (UART) 对接的常用集成电路和线缆的信息。

> [!NOTE]
> 本笔记主要关注低成本 "刷机线" 和模块的物理接线和芯片组。

## 常用芯片与模块 {#common-chips-modules}

- **PL2303 (Prolific)**: 非常常见于廉价的 USB 转串口线。
- **CH340G / CH340E (WCH)**: 由于成本极低，广泛用于 Arduino Nano/D1 Mini 克隆板。
- **CP2102 (Silicon Labs)**: 可靠，常见于 ESP32/ESP8266 开发板。
- **FT232R (FTDI)**: 高级标准，支持多种电压电平 (3.3V/5V)。

## PL2303 线缆引脚定义 (标准线色) {#pl2303-cable-pinout}

许多基于 PL2303 的廉价 USB 转串口线遵循此内部接线颜色代码：

| Color          | Function | Description                                  |
| :------------- | :------- | :------------------------------------------- |
| **Red (红)**   | 5V       | VCC Power output from USB (USB 5V 电源输出). |
| **Black (黑)** | GND      | Common Ground (公共接地).                    |
| **White (白)** | RXD      | Receive Data (接收数据，连接到目标的 TX).    |
| **Green (绿)** | TXD      | Transmit Data (发送数据，连接到目标的 RX).   |

## CH340G 模块引脚定义 {#ch340g-breakout-pinout}

CH340 模块上常见的标准 6 针接头：

1. **DTR**: Data Terminal Ready (用于 Arduino 上的自动复位).
2. **RXD**: Receive Data (接收数据).
3. **TXD**: Transmit Data (发送数据).
4. **VCC**: 5V or 3.3V power (通常可通过跳线选择).
5. **CTS**: Clear To Send (流控制).
6. **GND**: Ground (接地).

## 使用技巧 {#usage-tips}

- **Voltage Levels (电压电平)**: 大多数现代微控制器 (ESP32, STM32) 使用 **3.3V TTL**。确保您的适配器设置为 3.3V 以免损坏目标。
- **TX/RX Swapping (TX/RX 交换)**: 始终将适配器上的 **TX** 连接到目标上的 **RX**，反之亦然。
- **Drivers (驱动程序)**: 由于 "假冒" 芯片，PL2303 驱动程序在 Windows 10/11 上可能很难搞定。CH340 和 CP2102 通常更即插即用。
