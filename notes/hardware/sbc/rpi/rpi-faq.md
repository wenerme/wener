---
title: Raspberry Pi FAQ & Troubleshooting (常见问题)
tags:
  - Hardware
  - RaspberryPi
  - FAQ
  - Troubleshooting
  - Linux
  - Firmware
---

# Raspberry Pi FAQ & Troubleshooting

A collection of common issues, error messages, and solutions for Raspberry Pi hardware and software.

## Power & Throttling Issues

### Lightning Bolt Icon (Under-voltage)

This indicates your power supply is dropping below 4.63V.

- **Diagnostics**: Run `vcgencmd get_throttled` to check the status code (see [vcgencmd Guide](./vcgencmd.md) for details).
- **Solution**: Use a high-quality 5V/3A power supply and a thick USB cable.

### Raspberry Pi 4 USB-C Design Flaw

Early RPi 4 models have a non-compliant USB-C implementation that prevents them from powering up when using "smart" or E-marked cables (like Apple's USB-C cables).

- **Solution**: Use a basic, "dumb" USB-C cable or the official Raspberry Pi power supply.
- [Ars Technica: Raspberry Pi 4 uses incorrect USB-C design](https://arstechnica.com/gadgets/2019/07/raspberry-pi-4-uses-incorrect-usb-c-design-wont-work-with-some-chargers/)

## Networking & Connectivity

### No `wlan0` Interface

If the WiFi interface is missing:

```bash
lshw -short
dmesg | grep -i "brcmfmac\|firmware"
sudo modprobe brcmfmac
```

- **Potential Kernel Bug**: For some users, disabling specific features in the Broadcom driver helps:
  ```txt title="/etc/modprobe.d/brcmfmac.conf"
  options brcmfmac feature_disable=0x82000
  ```
- [Relevant Discussion (GitHub)](https://github.com/RaspAP/raspap-webgui/discussions/1606)

### Regulatory Database Error

`platform regulatory.0: Direct firmware load for regulatory.db failed with error -2`

- **Cause**: Missing wireless regulatory database files.
- **Solution (Alpine Linux)**: `apk add wireless-regdb`.

### brcmfmac: `brcmf_set_channel: set chanspec 0x100e fail, reason -52`

Common when trying to set a channel not supported by the current region or hardware. Ensure your country code is set correctly in `raspi-config`.

## System Performance & Stability

### Improving SSH/Entropy Performance

Raspberry Pi lacks a hardware random number generator in some older models, which can make SSH connection establishment slow.

```bash
# Use haveged to generate entropy
apk add haveged
rc-update add haveged
service haveged start
```

### Kernel Hangs: `vchiq-keep/0` blocked

`INFO: task vchiq-keep/0:427 blocked for more than 362 seconds.`

- **Context**: VCHIQ (Video Core Image Queue) is the interface between the ARM CPU and the VideoCore GPU firmware. This often indicates a hang in the GPU firmware or a memory management issue (CMA).
- **Troubleshooting**: Try increasing `gpu_mem` in `config.txt` or checking for power/voltage issues that might cause the GPU firmware to crash.

## Configuration & Peripherals

### Enabling SPI & I2C

Ensure these are enabled in your hardware configuration:

```txt title="/boot/config.txt"
dtparam=spi=on
dtparam=i2c_arm=on
```

### USB Keyboard Not Working (RPi 4)

- **Cause**: Often caused by insufficient power or USB current limits.
- **Solution**: Increase USB current limit (if supported by firmware):
  ```bash
  echo "max_usb_current=1" | sudo tee -a /boot/config.txt
  ```
