---
title: Android & LineageOS on Raspberry Pi
tags:
  - Hardware
  - RaspberryPi
  - Android
  - LineageOS
  - AOSP
---

# Android & LineageOS on Raspberry Pi

Running Android on Raspberry Pi allows for creating low-cost media centers (Android TV), tablets, or touchscreen kiosks using the vast Android application ecosystem.

## Popular Projects

### KonstaKANG (AOSP/LineageOS)

The most active and widely used source for Android builds on Raspberry Pi.

- **LineageOS 16.0 (Android 9)**: stable builds for RPi 4.
  - [KonstaKANG RPi 4 LineageOS 16.0 Page](https://konstakang.com/devices/rpi4/LineageOS16.0/)
- **LineageOS 20.0+ (Android 13+)**: Modern builds featuring hardware graphics acceleration.
  - [KonstaKANG Official Site](https://konstakang.com/)

### Other Noteworthy Projects

- **OmniROM**: Another popular alternative firmware often ported to Raspberry Pi.
- **Emteria.OS**: A commercial, enterprise-hardened version of Android for Raspberry Pi with OTA support.

## Hardware Considerations

- **GPU Acceleration**: Raspberry Pi 4 and 5 are far better suited for Android due to their superior Broadcom VideoCore GPUs. Older models may feel sluggish.
- **RAM**: Android is memory-hungry. A Raspberry Pi with at least **4GB or 8GB of RAM** is highly recommended.
- **Storage**: Use a **Class 10 / UHS-1** SD card or boot from a **USB 3.0 SSD** for a responsive user experience.
- **Cooling**: High-performance Android builds can cause the SoC to throttle; active cooling (fans) is advised.

## Use Cases

- **Android TV Box**: Use Android TV builds to create a smart TV interface.
  - [How to Build an Android TV Box with Raspberry Pi](https://www.makeuseof.com/tag/build-android-tv-box-raspberry-pi/)
- **Wall-Mounted Dashboard**: Using a Raspberry Pi with a touchscreen and Android dashboard apps.
- **Kiosk Mode**: Using AOSP to run a single web app or application for public terminals.

## Resources

- [Raspberry Pi Foundation](https://www.raspberrypi.com/)
- [LineageOS Official Site](https://lineageos.org/)
