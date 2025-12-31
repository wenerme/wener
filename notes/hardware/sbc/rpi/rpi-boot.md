---
title: Raspberry Pi Boot Process & Configuration
tags:
  - Hardware
  - RaspberryPi
  - Boot
  - Kernel
  - Alpine
  - Config
---

# Raspberry Pi Boot Process & Configuration

The Raspberry Pi boot process is unique compared to traditional x86 systems. It starts with the GPU initializing the system before the ARM CPU is brought online.

## Boot Sequence Overview

1. **System-on-Chip (SoC) BROM**: Hard-coded bootloader in the SoC reads from the SD card.
2. **`bootcode.bin`**: (RPi 1/2/3 only) Initializes SDRAM and loads the GPU firmware. _Note: RPi 4/5 uses an on-board EEPROM instead._
3. **`start.elf`**: The GPU firmware. It reads `config.txt` and loads the ARM kernel into RAM.
4. **`kernel.img`**: The ARM CPU starts executing the kernel code.

- [Detailed Boot Sequence Documentation](https://www.raspberrypi.org/documentation/configuration/config-txt/boot.md)
- [Alpine Boot Process on Raspberry Pi](https://pi3g.com/2019/01/10/alpine-boot-process-on-the-raspberry-pi/)

## Kernel Naming Conventions

The bootloader looks for specific kernel filenames depending on the Raspberry Pi model:

| Model                     | Default Kernel Filename                               |
| :------------------------ | :---------------------------------------------------- |
| **RPi 1 (A/B/B+) & Zero** | `kernel.img`                                          |
| **RPi 2 (B)**             | `kernel7.img`                                         |
| **RPi 3 (B/B+)**          | `kernel8.img` (64-bit) or `kernel7l.img` (32-bit LPM) |
| **RPi 4**                 | `kernel8.img` (64-bit) or `kernel7l.img` (32-bit)     |

- [Raspberry Pi Kernels Reference](https://pi-ltsp.net/advanced/kernels.html)

## Conditional Configuration (`config.txt`)

You can use filters in `config.txt` to apply settings to specific models or based on hardware conditions.

```ini
[pi4]
# Settings specific to Raspberry Pi 4
arm_boost=1

[all]
# Settings for all models
disable_splash=1
```

- [Conditional Configuration Guide](https://www.raspberrypi.org/documentation/configuration/config-txt/conditional.md)

## Example: Alpine Linux `config.txt`

Alpine Linux often uses specific kernel and initramfs paths defined in `config.txt`:

```ini
disable_splash=1
boot_delay=0
gpu_mem=256

[pi0]
kernel=boot/vmlinuz-rpi
initramfs boot/initramfs-rpi

[pi3+]
kernel=boot/vmlinuz-rpi2
initramfs boot/initramfs-rpi2

[all]
include usercfg.txt
```

## Resources

- [Debian Wiki: Raspberry Pi 4 Boot](https://wiki.debian.org/RaspberryPi4)
- [Alpine Linux `linux-rpi` Package Contents](https://pkgs.alpinelinux.org/contents?branch=v3.12&name=linux-rpi&arch=armhf&repo=main)
