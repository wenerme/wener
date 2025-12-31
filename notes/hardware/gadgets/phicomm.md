---
title: 斐讯 N1 (Phicomm N1)
tags:
  - Hardware
  - SetTopBox
  - Phicomm
  - Amlogic
  - S905D
  - Linux
  - Armbian
---

# 斐讯 N1 (Phicomm N1) {#phicomm-n1}

斐讯 N1 是一款基于 Amlogic S905D SoC 的流行网络和多媒体设备。最初作为 "云存储" 销售，它已成为开发者社区运行 Linux、OpenWrt 和复古游戏系统的最爱。

## 硬件规格 {#hardware-specifications}

- **SoC**: Amlogic S905D (四核 Cortex-A53 up to 1.5GHz).
- **GPU**: Mali-450 MP3.
- **RAM**: 2GB DDR3.
- **Storage**: 8GB eMMC.
- **Network**:
  - Ethernet: Realtek RTL8211F 千兆以太网.
  - WiFi/Bluetooth: Broadcom CYW43455 (双频 2.4/5GHz 802.11ac + BT 4.1).
- **Power**: 12V 2A.
- **Video Output**: HDMI 2.0 (支持 4K H.265).

## 刷机与救砖资源 {#flashing-recovery-resources}

### 工具 {#tools}

- [Official Amlogic USB Burning Tool (Windows)](http://openlinux.amlogic.com:8000/download/A113/Tool/flash-tool-v4.7/flash-tool/)
- [Android Platform Tools (ADB/Fastboot)](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
- - [Stane1983/aml-linux-usb-burn](https://github.com/Stane1983/aml-linux-usb-burn)
    - Shell
    - Amlogic USB Burning Tool 的 Linux 版本。兼容 S905, S905X, S912, 和 S812。

### 社区指南 (Right.com.cn / Smzdm) {#community-guides}

- [N1 Dedicated Armbian BBR Kernel](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=393982&highlight=n1)
- [N1 CoreELEC / Kodi Setup Guide](https://post.smzdm.com/p/akmgxpe9/)
- [N1 Docker Xunlei Remote Download](https://www.right.com.cn/forum/thread-388378-1-1.html)
- [斐讯 N1 拆机 芯片拆解 (acwifi.net)](http://www.acwifi.net/4312.html)

## 操作系统与内核 {#operating-systems-kernels}

### GitHub 项目 {#github-projects}

- [yangxuan8282/phicomm-n1](https://github.com/yangxuan8282/phicomm-n1)
  - Shell, Scheme
  - N1 Linux, U-Boot, 和分区布局的综合资源。包括 [生成 N1 Alpine Linux](https://github.com/yangxuan8282/gen-rpi_os/blob/master/gen-alpine_n1.sh) 的脚本。
- [150balbes/Amlogic_s905-kernel](https://github.com/150balbes/Amlogic_s905-kernel)
  - C, GPL-2.0
  - 用于 Amlogic S905 设备的主线 Linux 内核。用于 Armbian 和其他发行版。
- [shantigilbert/Sx05RE](https://github.com/shantigilbert/Sx05RE)
  - Makefile, Shell, GPL-2.0
  - 基于 LibreELEC 的复古游戏分支 (Retroarch/EmulationStation)，用于 Amlogic S905/S912 设备。

### 其他发行版 {#other-distributions}

- **Armbian**: 这种基于 Debian/Ubuntu 的流行发行版用于 ARM 设备。[Armbian for N1](http://one.armhf.tw/OS/armbian/).
- **Alpine Linux**: 小型、安全导向的 Linux。[Alpine Amlogic Packages](https://pkgs.alpinelinux.org/packages?name=linux-amlogic&branch=edge&arch=aarch64).
- **CoreELEC**: "Just enough OS" for Kodi，针对 Amlogic 硬件优化。

## 一般信息 {#general-information}

- **Amlogic**: 专注于娱乐和多媒体 SoC 的半导体公司。[Amlogic (Wikipedia)](https://en.wikipedia.org/wiki/Amlogic).
- **Meson**: Linux 内核中 Amlogic 硬件架构系列的名称。[Linux for Amlogic Meson](http://linux-meson.com/).
