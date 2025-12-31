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

## I2C (Inter-Integrated Circuit)

I2C is a multi-master, multi-slave, packet-switched, single-ended, serial communication bus.

- **Pins**: Uses two wires: **SDA** (Serial Data) and **SCL** (Serial Clock).
- **Addressing**: Each device on the bus has a unique 7-bit or 10-bit address.
- **Speed**: Standard mode (100 kbit/s), Fast mode (400 kbit/s), and High-speed mode (up to 3.4 Mbit/s).
- **Usage**: Common for EEPROMs, RTCs (DS3231), and simple sensors (MPU6050).

---

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
