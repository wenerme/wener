---
title: Embedded Operations & PlatformIO
tags:
  - Embedded
  - PlatformIO
  - Operations
  - Automation
---

# Embedded Operations & PlatformIO

Notes on using PlatformIO for managing embedded boards, devices, and libraries.

## PlatformIO CLI Usage

### Board Management

```bash
# 查看支持的主板
# Online: http://platformio.org/boards
platformio boards

# 查看已安装的主板
platformio boards --installed
```

### Device Management

```bash
# 查看所有的设备
platformio device list

# 设备监控 (Serial Monitor)
platformio device monitor
```

### Project Initialization

```bash
# 生成 CLion 项目
platformio init --ide clion --board uno
```

### Library Management

```bash
# 在线库搜索: http://platformio.org/lib
# 安装库 (例如 DallasTemperature)
# 可以使用 ID, 名字 或者名字加版本号来安装
# 会在 platformio.ini 中自动添加 lib_deps = DallasTemperature
platformio lib install "DallasTemperature"
```
