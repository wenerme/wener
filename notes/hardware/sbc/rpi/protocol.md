---
title: Serial & Bus Communication Protocols (RS-232, I2C, 1-Wire)
tags:
  - Hardware
  - Protocols
  - Serial
  - RS232
  - I2C
  - 1-Wire
  - Communication
---

# Serial & Bus Communication Protocols

Overview of common communication protocols used for interfacing sensors, peripherals, and other computers with the Raspberry Pi.

## RS-232 (Serial)

RS-232 is a standard for serial communication transmission of data.

### Hardware Flow Controls

Used to signal when the device is ready to send or receive data.

| DTE     | Direction | DCE | Description         | Active |
| :------ | :-------- | :-- | :------------------ | :----- |
| **RTS** | →         | RTS | Request to send (†) | Low    |
| **CTS** | ←         | CTS | Clear to send (†)   | Low    |
| **DSR** | ←         | DSR | Data set ready      | Low    |
| **DTR** | →         | DTR | Data terminal ready | Low    |

_† Primary flow control signals_

### Software Flow Control (XON/XOFF)

Uses specific characters embedded in the data stream to control the flow.

| Code     | Meaning             | ASCII | Hex | Keyboard  |
| :------- | :------------------ | :---- | :-- | :-------- |
| **XOFF** | Pause transmission  | DC3   | 13  | Control-S |
| **XON**  | Resume transmission | DC1   | 11  | Control-Q |

**Disadvantages of Software Flow Control**:

1. **Data Loss**: Line noise can mask XOFF characters, causing buffer overruns.
2. **Link Lockup**: Missing XON characters can prevent transmission from resuming.
3. **Data Collision**: XON/XOFF characters cannot be used as literal data unless escaped.

---

## I2C

I2C 是一种多主从、同步、半双工的串行通信总线，主要用于板级短距离通信。

- I2C - Inter-Integrated Circuit - 芯片间总线
- **寻址**: 每个设备拥有唯一的 7 位或 10 位地址，支持一主多从或多主多从。
- **特点**: 硬件连接简单（仅需上拉电阻），支持热插拔，但传输速率受总线电容限制。

| pin | for               | cn   |
| --- | ----------------- | ---- |
| VCC | 3.3V or 5V        | 电源 |
| GND | Ground            | 接地 |
| SDA | Serial Data Line  | 数据 |
| SCL | Serial Clock Line | 时钟 |

- 接线
  - SDA <-> SDA
  - SCL <-> SCL
- 标准 4-pin I2C

| 模式            | 速率 (Bit Rate) | 备注                         |
| :-------------- | :-------------- | :--------------------------- |
| Standard-mode   | 100 kbit/s      | 最常用的标准速率             |
| Fast-mode       | 400 kbit/s      | 多数传感器支持的速率         |
| Fast-mode Plus  | 1 Mbit/s        | 增强型快速模式               |
| High-speed mode | 3.4 Mbit/s      | 高速模式                     |
| 电平标准        | 3.3V / 5V       | 漏极开路结构，必须接上拉电阻 |

- **传感器数据采集**: 如 MPU6050 (陀螺仪)、BME280 (温湿度计)。
- **系统配置存储**: 读写 AT24C02 等 EEPROM 存储器。
- **实时时钟 (RTC)**: 与 DS3231 等时钟芯片同步时间。
- **低速外设控制**: 驱动 0.96 寸 OLED 显示屏或 PCF8574 IO 扩展芯片。

## SPI (Serial Peripheral Interface)

SPI is a synchronous serial communication interface used for short-distance communication, primarily in embedded systems.

- **Pins**: Typically uses four wires: **MOSI** (Master Out Slave In), **MISO** (Master In Slave Out), **SCLK** (Serial Clock), and **SS/CS** (Slave Select / Chip Select).
- **Speed**: Much higher speeds than I2C (often up to 10+ MHz).
- **Usage**: SD cards, LCD displays, and high-speed ADCs.

---

## 1-Wire

A device communications bus system designed by Dallas Semiconductor (now Maxim Integrated).

- **Pins**: Technically requires only one data line plus ground (often powered via a pull-up resistor on the data line, known as "parasite power").
- **Addressing**: Each device has a unique, factory-programmed 64-bit ID.
- **Usage**: Temperature sensors (DS18B20), electronic keys (iButton), and digital potentiometers.
