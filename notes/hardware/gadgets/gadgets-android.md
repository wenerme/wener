---
title: Android 设备第三方 ROM 与替代系统 (Custom ROMs & Alternative OS)
tags:
  - Hardware
  - Android
  - Linux
  - TWRP
  - postmarketOS
  - Flashing
---

# Android 设备第三方 ROM 与替代系统 (Custom ROMs & Alternative OS) {#custom-roms-alternative-os}

关于在基于 Android 的硬件上运行第三方 Recovery、替代 Android ROM 或 Linux 发行版的笔记。

## 必备工具与 Recovery {#essential-tools-recoveries}

- **TWRP (Team Win Recovery Project)**: Android 设备行业标准的第三方 Recovery。允许进行完整的系统备份、存储擦除和刷入自定义 ZIP 文件。
  - [TWRP 官网](https://twrp.me/)
- **ADB (Android Debug Bridge)** & **Fastboot**: 用于从 PC 与 Android 设备通信和刷机的命令行工具。

## 移动 Linux 项目 {#mobile-linux-projects}

- **postmarketOS (pmOS)**: 一个为触摸优化、预配置的 Alpine Linux，可安装在智能手机和其他移动设备上。
  - [Google Nexus 5 (Hammerhead) on pmOS Wiki](<https://wiki.postmarketos.org/wiki/Google_Nexus_5_(lg-hammerhead)>)
- **Ubuntu Touch**: Ubuntu 操作系统的移动版本。
- **OpeniBoot**: Apple 设备引导加载程序的开源实现 (历史项目)。
  - [OpeniBoot (Wikipedia)](https://en.wikipedia.org/wiki/OpeniBoot)
  - [iDroid Project on GitHub](https://github.com/iDroid-Project/openiBoot)

## 安装替代系统的策略 {#strategies-installing-alternative-os}

视硬件而定，使用以下高级策略可能安装非 Android 系统 (如标准 Linux):

1. **Hardware Preparation (硬件准备)**: 使用 USB OTG 线和 USB 集线器。
2. **Peripheral Connection (外设连接)**: 将 USB 键盘和可引导 Linux 安装盘连接到集线器。
3. **BIOS/UEFI Entry (进入 BIOS/UEFI)**: 启动设备并快速按 `ESC`, `F2` 或 `音量减` 键尝试进入启动菜单或 BIOS。
4. **Boot Configuration (启动配置)**: 如果 BIOS 可访问，将 USB 驱动器设置为主要启动设备。
5. **Execution (执行)**: 保存设置，重启，尝试运行安装程序。

### 硬件限制 {#hardware-limitations}

- **Bootloader Locking (Bootloader 锁定)**: 许多现代设备锁定了 Bootloader 且加密，难以绕过。
- **ROM-based Bootstrapping (基于 ROM 的引导)**: 许多平板电脑内部仅引导 Android。它们使用基于 ROM 的引导方案，仅允许恢复官方签名的 Android 镜像，使得标准 Linux 安装无法进行。
- **Proprietary Drivers (专有驱动)**: 即使 Linux 能启动，关键的 GPU、WiFi 或蜂窝调制解调器驱动可能是专有的，标准 Linux 内核无法使用。
