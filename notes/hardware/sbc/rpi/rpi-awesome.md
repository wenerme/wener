---
title: Raspberry Pi Awesome Resources
tags:
  - Hardware
  - RaspberryPi
  - Awesome
  - Resources
  - CM4
---

# Raspberry Pi Awesome Resources

A curated list of high-quality tools, hardware projects, and resources for the Raspberry Pi ecosystem.

## Featured Projects & Tools

- [PiBox](https://pibox.io/): A modular, Raspberry Pi-powered NAS and home server kit.
- [Uptime.lab](https://www.instagram.com/uptime.lab/): High-end Compute Module carrier boards and accessories.

### Development & Firmware

- - [JeremyGrosser/rp2040_hal](https://github.com/JeremyGrosser/rp2040_hal)
    - Ada, BSD-3-Clause
    - Hardware Abstraction Layer (HAL) drivers for the Raspberry Pi RP2040 SoC, enabling Ada development on the Pico.

## Compute Module 4 (CM4) Naming Convention

The product codes for the CM4 series follow a standardized structure that indicates its specifications.

**Format**: `CM4 [Wireless] [RAM] [eMMC]`

```
CM4 0 01 000
    | |  |
    | |  `- eMMC (Storage): 000 (Lite/No eMMC), 008 (8GB), 016 (16GB), 032 (32GB)
    | `- RAM: 01 (1GB), 02 (2GB), 04 (4GB), 08 (8GB)
    `- Wireless: 0 (No Wifi/BT), 1 (Includes Wifi/BT)
```

| Config   | Options                     |
| :------- | :-------------------------- |
| **RAM**  | 1GB, 2GB, 4GB, 8GB          |
| **eMMC** | Lite (0GB), 8GB, 16GB, 32GB |

## Learning & Community

- [The MagPi Magazine](https://magpi.raspberrypi.com/): Official Raspberry Pi magazine with guides and projects.
- [Raspberry Pi Stack Exchange](https://raspberrypi.stackexchange.com/): Q&A community for hardware and software issues.
