---
title: Raspberry Pi (树莓派) Overview & Getting Started
tags:
  - Hardware
  - SBC
  - RaspberryPi
  - Guide
  - Benchmarking
  - Linux
---

# Raspberry Pi (树莓派) Overview

The Raspberry Pi is a versatile series of single-board computers (SBCs) used for everything from learning basic programming to deploying high-performance edge computing nodes.

## Hardware Specifications

| Model        | SoC       | Architecture   | Memory        | CPU                     |
| :----------- | :-------- | :------------- | :------------ | :---------------------- |
| **RPi 1 A**  | BCM2835   | ARMv6 (32-bit) | 256 MB        | 1× ARM1176 @ 700 MHz    |
| **RPi 2 B**  | BCM2836   | ARMv7 (32-bit) | 1 GB          | 4× Cortex-A7 @ 900 MHz  |
| **RPi 3 B**  | BCM2837   | ARMv8 (64-bit) | 1 GB          | 4× Cortex-A53 @ 1.2 GHz |
| **RPi 4 B**  | BCM2711   | ARMv8 (64-bit) | 1, 2, 4, 8 GB | 4× Cortex-A72 @ 1.5 GHz |
| **RPi 5**    | BCM2712   | ARMv8 (64-bit) | 4, 8 GB       | 4× Cortex-A76 @ 2.4 GHz |
| **Zero 2 W** | BCM2710A1 | ARMv8 (64-bit) | 512 MB        | 4× Cortex-A53 @ 1 GHz   |
| **Pico**     | RP2040    | Cortex-M0+     | 264 KB        | 2× M0+ @ 133 MHz        |

- **Raspberry Pi 400**: A Pi 4 with 4GB RAM integrated into a compact keyboard casing. [Official Product Page](https://www.raspberrypi.com/products/raspberry-pi-400-unit/).

## Getting Started (Headless Setup)

You can set up a Raspberry Pi without a monitor or keyboard using the "headless" method.

### 1. Preparing the OS

Use the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) for the easiest setup.

- **Tip**: Click the gear icon to pre-configure WiFi (SSID/Password), SSH (enabled), and user account (username/password) before flashing.

### 2. Manual Configuration (Legacy Method)

If flashing a raw `.img` file using `dd`:

1. Mount the `boot` partition on your PC.
2. Create an empty file named `ssh` (no extension) in the root of the `boot` partition to enable SSH.
3. Configure WiFi by creating `wpa_supplicant.conf`:
   ```text
   network={
       ssid="YOUR_WIFI_NAME"
       psk="YOUR_WIFI_PASSWORD"
   }
   ```

### 3. Initial SSH Access

```bash
# Default hostname is raspberrypi.local
ssh pi@raspberrypi.local
# Default password: raspberry (unless changed in Imager)
```

## Post-Installation Tips

### `raspi-config`

Use the official configuration tool for common tasks:

```bash
sudo raspi-config
```

- Expand filesystem to fill the SD card.
- Change password & hostname.
- Enable hardware interfaces (I2C, SPI, Camera).

### Environment Setup (Golang Example)

```bash
# Install Go (Cortex-A architectures)
GOVERSION=1.21.0
wget https://golang.org/dl/go$GOVERSION.linux-armv6l.tar.gz
sudo tar -C /usr/local -xzf go$GOVERSION.*.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

## System Monitoring

### Temperature Monitoring

Monitor CPU and GPU temperatures in real-time:

```bash
watch -n 1 '
  echo -n "CPU: " && sed -re "s/(..)(.).*/\1.\2°C/" /sys/class/thermal/thermal_zone0/temp;
  echo -n "GPU: " && vcgencmd measure_temp | sed -re "s/temp=([0-9.]+).*/\1°C/"
'
```

## Folder Contents

- [Main Raspberry Pi Guide](./raspberry-pi.md)
- [Diagnostics (vcgencmd)](./vcgencmd.md)
- [Boot Process](./rpi-boot.md)
- [Glossary & Terminology](./rpi-glossary.md)
- [Emulation/Simulation](./rpi-sim.md)
- [Benchmarking](./rpi-user.md)

## Official Resources

- [Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/)
- [GPIO Pinout Guide](https://pinout.xyz/)
- [Hardware Documentation (Schematics)](https://www.raspberrypi.org/documentation/hardware/raspberrypi/)
