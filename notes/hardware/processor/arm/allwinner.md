---
title: Allwinner (全志科技) ARM SoCs
description: What Allwinner SoCs are, series by use (A/H/V/R/T/F), common chips like H3/H616/V3s/F1C100s, linux-sunxi mainline support and FEL boot.
tags:
  - Hardware
  - SoC
  - Allwinner
  - ARM
  - SBC
  - Sunxi
---

# Allwinner (全志科技) ARM SoCs

Allwinner Technology (全志科技, SZSE: 300458) is a Chinese fabless semiconductor company founded in 2007 and headquartered in Zhuhai, Guangdong. It designs ARM-based mixed-signal systems on a chip (SoC) for tablets, OTT boxes, cameras, car electronics and IoT devices.

- An Allwinner SoC integrates ARM CPU cores and peripherals in one chip; GPU, video codec (CedarX/VE), display and audio vary by model (e.g. V3s has no GPU).
- Chips are cheap and common in low-cost SBCs (Orange Pi, NanoPi, Lichee Pi) and TV boxes; mainline Linux support comes mostly from the linux-sunxi community.
- In 2012–2013 it was the largest supplier by units of application processors for Android tablets.

- [Allwinner Official Website](http://www.allwinnertech.com/)
- [Allwinner Technology (Wikipedia)](https://en.wikipedia.org/wiki/Allwinner_Technology)

## SoC Series Breakdown

| Series       | Focus Area           | Common Models                                             |
| :----------- | :------------------- | :-------------------------------------------------------- |
| **A-Series** | Tablets              | A10, A20, A31, A64 (64-bit).                              |
| **H-Series** | OTT / Set-Top Boxes  | H3, H5, H6, H616. Popular in SBCs like Orange Pi.         |
| **V-Series** | Video / Camera       | V3, V3s, V5. Used in dashcams and sports cameras.         |
| **R-Series** | Smart Hardware / IoT | R8, R16, R40. Used in Google Home Hub and smart speakers. |
| **T-Series** | Automotive           | T5, T7. Infotainment and smart cockpits.                  |
| **F-Series** | Low-cost Multimedia  | F1C100s, F1C200s. Extremely compact ARM9 designs.         |

## Open Source Community (linux-sunxi)

The **linux-sunxi** community is a great resource for porting mainline Linux and U-Boot to Allwinner-based devices.

- [linux-sunxi Wiki](https://linux-sunxi.org/)
- [linux-sunxi H3 Documentation](https://linux-sunxi.org/H3)

## Key Technical Features

- **CedarX**: Allwinner's proprietary hardware video decoding engine.
- **Boot Process**: Allwinner SoCs typically boot from an internal ROM (BROM) which searches for code on SD cards (MMC0) or NAND/EMMC before falling back to USB FEL mode for flashing.

## Resources

- [Allwinner H-Series Products](http://www.allwinnertech.com/index.php?c=product&a=index&pid=6)
- [Comprehensive Hardware Data (Taobao)](https://shujuziliao.taobao.com/index.htm?spm=2013.1.w5002-4697349947.2.5a722221bJYFYq)
