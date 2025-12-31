---
title: Raspberry Pi (树莓派) Hardware & Software Guide
tags:
  - Hardware
  - SBC
  - RaspberryPi
  - Arm
  - Linux
  - QEMU
  - GPIO
---

# Raspberry Pi (树莓派) Guide

The Raspberry Pi is a series of small single-board computers (SBCs) developed by the Raspberry Pi Foundation. They are widely used for education, prototyping, and home automation.

## Official Resources & Schematics

- [Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/)
- [Hardware Schematics](https://www.raspberrypi.org/documentation/hardware/raspberrypi/schematics/README.md)
- [RPi Verified Peripherals](http://elinux.org/RPi_VerifiedPeripherals)

## Hardware Overview

| Model           | SoC                   | RAM   | Features                                        |
| :-------------- | :-------------------- | :---- | :---------------------------------------------- |
| **RPi 3B**      | BCM2837 (1.2GHz Quad) | 1GB   | WiFi/BLE, CSI, DSI, 10/100 Ethernet.            |
| **RPi 3B+**     | BCM2837B0 (1.4GHz)    | 1GB   | Dual-band WiFi, GigE over USB 2.0, PoE support. |
| **RPi Zero**    | BCM2835 (1GHz Single) | 512MB | Mini HDMI, OTG USB.                             |
| **RPi Zero W**  | BCM2835               | 512MB | Adds 802.11 b/g/n and Bluetooth 4.1.            |
| **RPi Zero WH** | BCM2835               | 512MB | Pre-soldered GPIO header.                       |

### GPU & Graphics

Broadcom VideoCore IV / VI. Supports OpenGL ES and hardware-accelerated video decoding (H.264, H.265 on newer models).

- - [raspberrypi/userland](https://github.com/raspberrypi/userland)
    - C, BSD-3-Clause
    - ARM-side libraries for interacting with the VideoCore GPU (EGL, GLESv2, OpenMAX). _Note: Modern builds prefer V4L2/DRM._

### GPIO Pinout (RPi 1 Rev 1 Example)

| GPIO | Phys | Name   | GPIO | Phys | Name   |
| :--- | :--- | :----- | :--- | :--- | :----- |
| 0    | 3    | SDA    | 1    | 5    | SCL    |
| 4    | 7    | GPIO 7 | 14   | 8    | TxD    |
| 15   | 10   | RxD    | 17   | 11   | GPIO 0 |

## Emulation with QEMU

You can test Raspberry Pi images on a PC using QEMU.

- - [dhruvvyas90/qemu-rpi-kernel](https://github.com/dhruvvyas90/qemu-rpi-kernel)
    - Shell, MIT
    - Ready-made kernel images for emulating RPi devices in QEMU.

### Basic QEMU Setup

```bash
# Download kernel and Raspbian image
curl -L https://github.com/dhruvvyas90/qemu-rpi-kernel/raw/master/kernel-qemu-4.4.13-jessie -o kernel-qemu

# Run simulation
qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb \
  -serial stdio -append "root=/dev/sda2" \
  -hda 2016-05-27-raspbian-jessie-lite.img
```

## Operating Systems

### Alpine Linux

Extremely lightweight, runs mostly in RAM.

- [Alpine Linux for Raspberry Pi Wiki](https://wiki.alpinelinux.org/wiki/Raspberry_Pi)
- **WiFi Troubleshooting**: Broadcom firmware may need manual installation via `aports`.

### Ubuntu MATE

A full desktop experience tailored for Pi.

- [Ubuntu MATE for Raspberry Pi](https://ubuntu-mate.org/raspberry-pi/)
- **Installation (macOS)**:
  ```bash
  sudo dd bs=1M if=ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img of=/dev/rdiskX
  ```

## Troubleshooting & FAQ

### HDMI Issues

If the monitor is blank or flickering, adjust `config.txt`:

```ini
# Force 800x480 resolution
hdmi_group=2
hdmi_mode=87
hdmi_cvt 800 480 60 6 0 0 0

# Fix HKC 2K Monitor
hdmi_group=2
hdmi_mode=87
disable_overscan=1
hdmi_cvt 2560 1440 60 3 0 0 0
```

### Low Power Warning (Lightning Bolt)

The lightning bolt icon indicates your power supply is dropping below 4.63V. Use a high-quality 5V/2.5A or 5.1V/3.0A power supply.

### Chinese Character Display

```bash
# Install fonts
apt-get install ttf-wqy-zenhei
# Configure locale
raspi-config # Choose en_US.UTF-8 and zh_CN.UTF-8
```

## Advanced Tools

- - [raspberrypi/usbboot](https://github.com/raspberrypi/usbboot)
    - C, Python, Apache-2.0
    - Tool for booting RPi over USB, useful for provisioning Compute Modules.
- **vcgencmd**: Utility for querying GPU/CPU info.
  ```bash
  # Measure temperature
  vcgencmd measure_temp
  ```
