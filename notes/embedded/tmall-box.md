---
title: Tmall Genie (天猫精灵) & Magic Box
tags:
  - Embedded
  - IoT
  - Alibaba
  - Android
  - SmartSpeaker
  - Hardware
---

# Tmall Genie (天猫精灵) & Magic Box

Alibaba's smart internal ecosystem, including smart speakers (Tmall Genie) and Android-based set-top boxes (Magic Box).

## Hardware Specifications

### Tmall Genie Magic Box (OTT Box)

- **CPU**: Quad-core ARM Cortex-A53.
- **RAM**: 2GB DDR3.
- **Storage**: 8GB eMMC.
- **GPU**: [ARM Mali-450](https://developer.arm.com/ip-products/graphics-and-multimedia/mali-gpus/mali-450-gpu).
- **Resolution**: Supports up to 4K (3840x2160).
- **OS**: Alibaba YunOS (Android compatible).

### Tmall Genie X1 (Smart Speaker)

- **CPU**: MediaTek MT8516 (Quad-core ARM Cortex-A35 @ 1.3GHz).
- **Wireless**: WiFi 802.11 b/g/n, Bluetooth 4.0.
- **Tech**: Integrated with AliGenie AI assistant.

## Flashing & Recovery Resources

- [Tmall Box Flashing Guide (ZNDS)](https://www.znds.com/tv-1117831-1-1.html)
- [Unboxing and Teardown (SMZDM)](https://post.smzdm.com/p/424682/)

### Common Recovery Steps

1. **Hidden Reset Button**: Often located inside the AV port. Use a toothpick to press it while connecting power.
2. **Factory Reset**: Enter Recovery mode to perform a "Wipe Data/Factory Reset".
3. **Firmware Update**: Can often be done via a USB drive in FAT32 format using the recovery menu.

## Notes

Most Tmall devices are closed-ecosystem products. OpenWrt support is non-existent due to proprietary Alibaba/MediaTek components, but some set-top boxes can be flashed with standard Android TV firmwares.
