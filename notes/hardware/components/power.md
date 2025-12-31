---
title: Power Management Modules & Regulators (电源管理模块)
tags:
  - Hardware
  - Power
  - Regulator
  - LM2596
  - AMS1117
---

# Power Management Modules

## Voltage Regulators (稳压器)

### LM2596S-ADJ

DC-DC Buck Converter (Step-Down) - JM64RP

- **Input**: 3V - 40V
- **Output**: 1.23V - 37V (Adjustable)
- **Current**: 3A (Max)
- **Efficiency**: Up to 92%
- **Frequency**: 150 kHz

### AMS1117

Low Dropout (LDO) Voltage Regulator

- **Common Output**: 3.3V, 5.0V, Adjustable
- **Current**: 1A
- **Usage**: Common in ESP8266/ESP32 boards for 3.3V logic.

## Battery Management

### TP4056

1A Li-Ion Battery Charging Module with Current Protection

- **Input**: 5V (Micro USB / USB-C)
- **Charge Current**: 1A Adjustable
- **Protection**: Over-discharge, Over-current
