---
title: Raspberry Pi Glossary & Terminology
tags:
  - Hardware
  - RaspberryPi
  - Glossary
  - Terminology
  - IR
---

# Raspberry Pi Glossary & Terminology

A reference list of common terms, protocols, and hardware components encountered in the Raspberry Pi ecosystem.

## Core Hardware Terms

- **SoC (System on a Chip)**: The main integrated circuit that contains the CPU, GPU, and RAM (e.g., Broadcom BCM2837).
- **GPIO (General Purpose Input/Output)**: The physical pins used to interface with external hardware like sensors, LEDs, and buttons.
- **HAT (Hardware Attached on Top)**: An add-on board that conforms to the official Raspberry Pi specification, often including an ID EEPROM for automatic configuration.
- **CSI (Camera Serial Interface)**: A specialized interface for connecting high-speed camera modules.
- **DSI (Display Serial Interface)**: A specialized interface for connecting liquid crystal displays (LCDs).
- **PoE (Power over Ethernet)**: A standard that allows the Raspberry Pi (with an appropriate HAT) to be powered via its Ethernet cable.

## Software & Boot Terms

- **Raspberry Pi OS**: Formerly known as Raspbian; the official Debian-based operating system for the Pi.
- **NOOBS (New Out Of Box Software)**: An easy-to-use OS installer and recovery system for beginners.
- **`config.txt`**: The primary configuration file used to set system and hardware parameters before the Linux kernel boots.
- **`cmdline.txt`**: Passes command-line arguments to the Linux kernel at boot time.
- **Device Tree (DT)**: A database used to describe the hardware configuration to the operating system.

## Communication Protocols

- **UART (Universal Asynchronous Receiver-Transmitter)**: Used for serial communication (TX/RX).
- **I2C (Inter-Integrated Circuit)**: A multi-device bus using two wires (SDA/SCL) for communication between ICs.
- **SPI (Serial Peripheral Interface)**: A high-speed synchronous serial data link.
- **IR (Infrared)**: Wireless communication using infrared light.
  - ![IRDA Protocol Stack](https://upload.wikimedia.org/wikipedia/commons/9/9b/Irda_protocol_stack_basic.png)
  - [Infrared Communication Technology (Wikipedia)](https://zh.wikipedia.org/wiki/%E7%BA%A2%E5%A4%96%E9%80%9A%E8%AE%AF%E6%8A%80%E6%9C%AF)

## Power & Electrical

- **Under-voltage**: Occurs when the input voltage drops below ~4.63V, signaled by a lightning bolt icon.
- **Thermal Throttling**: Reducing the CPU clock speed to prevent damage when the SoC temperature exceeds 80°C.
