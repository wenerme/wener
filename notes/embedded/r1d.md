---
title: 小米 R1D 路由器 (Mi Router R1D)
tags:
  - Embedded
  - Router
  - Xiaomi
  - Hardware
  - OpenWrt
---

# 小米 R1D 路由器 (Mi Router R1D)

小米路由器第一代产品，代号 R1D，以内置 1TB 硬盘为主要特色。

## 硬件规格 (Hardware Specs)

- **CPU**: Broadcom BCM4709C Dual-Core ARM Cortex-A9 @ 1.0GHz.
- **RAM**: 256MB DDR3.
- **Flash**: 256MB SLC NAND.
- **Storage**: 内置 2.5 英寸 1TB SATA 硬盘 (可自行更换).
- **WiFi**: AC1200 (2.4GHz 300Mbps + 5GHz 867Mbps).
- **Ports**: 1 x WAN (Gigabit), 2 x LAN (Gigabit), 1 x USB 3.0.

## 刷机与固件 (Flashing & Firmware)

由于采用 Broadcom 芯片，开源驱动支持较为有限，但仍有社区提供的 OpenWrt 支持。

### 开启 SSH

1. 在小米路由器官网下载“开启 SSH 工具”。
2. 将工具放入 U 盘根目录。
3. 路由器断电，插入 U 盘，按住 Reset 键并上电，直到指示灯闪烁。
4. 使用官方提供的 root 密码登录。

### 第三方固件

- [OpenWrt Wiki - Xiaomi Mi Router R1D](https://openwrt.org/toh/xiaomi/xiaomi_r1d)
- **PandoraBox**: 以前有支持，但目前较难找到更新版本。

## 常用操作

- 进入 U-Boot/恢复模式：断电按住 Reset 上电。
- 硬盘管理：R1D 的硬盘主要用于存储电影、备份照片，可通过 Samba 或小米路由 App 访问。
