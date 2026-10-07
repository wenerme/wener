---
title: Allwinner (全志科技) ARM SoCs
tags:
  - Hardware
  - SoC
  - Allwinner
  - ARM
  - SBC
  - Sunxi
---

# Allwinner (全志科技) ARM SoCs

- 全志科技 / Allwinner Technology
- Fabless，2007，广东珠海，SZSE: 300458
- ARM SoC - 平板、OTT、摄像头、汽车电子、IoT
- CPU + 外设集成；GPU、视频编解码（CedarX/VE）、显示、音频依型号
  - V3s 无 GPU
- 常见低成本 SBC / TV Box：Orange Pi、NanoPi、Lichee Pi
- 主线 Linux / U-Boot：linux-sunxi
- 2012–2013：Android 平板应用处理器出货量领先 - 来源 [Wikipedia](https://en.wikipedia.org/wiki/Allwinner_Technology)

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
