---
title: Tasmota Open-Source Firmware for ESP8266/ESP32
tags:
  - Hardware
  - IoT
  - Tasmota
  - ESP8266
  - ESP32
  - HomeAssistant
  - MQTT
---

# Tasmota Open-Source Firmware

Tasmota is an alternative firmware for ESP8266 and ESP32-based devices, focusing on local control over MQTT with a web-based configuration UI. It is widely used to "de-cloud" smart plugs and switches.

- [Tasmota Documentation](https://tasmota.github.io/docs/)
- - [arendst/Tasmota](https://github.com/arendst/Tasmota)
    - C, GPL-3.0
    - Core firmware project. Includes extensive support for sensors, displays, and energy monitoring.

## Initial Setup & Tools

### Installing esptool

The standard CLI tool for flashing ESP devices.

```bash
# Alpine Linux example
apk add py3-pip py3-wheel
sudo pip install esptool
```

### Basic Device Diagnostics

```bash
# Verify connection and read chip info
esptool.py read_mac
esptool.py flash_id
```

## Flashing Procedure

### 1. Backup & Erase

It is highly recommended to backup the original firmware before erasing.

```bash
# Backup 1MB flash
esptool.py read_flash 0x00000 0x100000 fwbackup.bin

# Erase flash completely
esptool.py erase_flash
```

### 2. Download & Flash Tasmota

```bash
# Download latest Chinese version
curl -LO https://github.com/arendst/Tasmota/releases/latest/download/tasmota-CN.bin

# Flash (typical ESP8266 settings: 1MB flash, DOUT mode)
esptool.py write_flash -fs 1MB -fm dout 0x0 tasmota-CN.bin
```

### 3. Initial Configuration

- After flashing, the device will broadcast an AP like `tasmota_XXXXXX-####`.
- Connect to it and navigate to `http://192.168.4.1` to configure your WiFi.

## Hardware Flashing Pinout (Generic ESP8266)

To enter flashing mode, **GPIO0** must be pulled to **GND** during power-up or reset.

| ESP Pin  | Connection | Note                                           |
| :------- | :--------- | :--------------------------------------------- |
| **GND**  | GND        | Common ground with USB adapter.                |
| **GP2**  | Open       | Not connected.                                 |
| **GP0**  | **GND**    | **CRITICAL: Pull to GND to enter flash mode.** |
| **RXD**  | TX         | Cross-connected to adapter.                    |
| **TXD**  | RX         | Cross-connected to adapter.                    |
| **CHPD** | 3.3V       | Enable pin (High).                             |
| **RST**  | Open       | Reset pin.                                     |
| **VCC**  | 3.3V       | 3.3V Power (Do not use 5V).                    |

## Home Assistant Integration

Tasmota supports Home Assistant MQTT Discovery for automatic setup.

- [Tasmota Home Assistant Integration Guide](https://tasmota.github.io/docs/Home-Assistant/)

### Enabling Discovery

Navigate to the Tasmota console and run:

```bash
# Enable Home Assistant MQTT Discovery
SetOption19 1
```

### Logging & Debugging

Example MQTT state messages observed via syslog:

```json
// STATE message
tele/tasmota_0A7B40/STATE = {"Time":"2020-10-19T20:35:29","Uptime":"0T00:08:47","UptimeSec":527,"Heap":25,"SleepMode":"Dynamic","Sleep":50,"LoadAvg":19,"MqttCount":1,"POWER":"OFF","Wifi":{"RSSI":96,"Signal":-52}}

// POWER result
stat/tasmota_0A7B40/RESULT = {"POWER":"OFF"}
stat/tasmota_0A7B40/POWER = OFF
```
