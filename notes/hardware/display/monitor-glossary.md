---
title: 显示器术语表 (Monitor & Display Glossary)
tags:
  - Hardware
  - Display
  - Monitor
  - eDP
  - Glossary
---

# 显示器术语表 (Monitor & Display Glossary) {#monitor-display-glossary}

计算机显示器和 DIY 显示器项目的术语、技术规格和兼容性说明。

## 常见术语 {#common-terminology}

- **eDP (Embedded DisplayPort)**: 嵌入式 DisplayPort，一种内部接口，主要用于笔记本电脑和一体机 (AIO)，用于连接显卡和集成显示面板。
- **DP (DisplayPort)**: 主要的外部数字显示接口，由 VESA 开发。
- **Refresh Rate (刷新率)**: 显示器每秒刷新图像的次数 (例如 60Hz, 120Hz, 144Hz, 240Hz)。
- **Driver Board (驱动板)**: 将标准视频信号 (HDMI, DP) 转换为特定面板信号 (LVDS, eDP) 的控制器板。

## DIY 显示器硬件 (DP 转 eDP) {#diy-display-hardware}

关于将笔记本屏幕改装为独立显示器的驱动板和转接板的说明。

### 驱动板规格 {#driver-board-specs}

- **Function**: DP 转 eDP。
- **Supported Modes**:
  - 4K @ 120Hz / 60Hz.
  - 2K @ 165Hz.
  - 1080p @ 144Hz / 240Hz / 300Hz.
- **Features**: 集成按键板、电源开关、亮度调节。
- **Connection**: 0.5mm 间距屏幕排线 (30-pin 或 40-pin eDP)。

## 面板兼容性 {#panel-compatibility-notes}

### 已验证的高刷面板 (NVIDIA / Intel) {#verified-high-refresh-panels}

- **4K @ 120Hz**:
  - `B156ZAN05.1`
  - `B173ZAN03.3`
- **1080p / 2K High Refresh**:
  - `B173HAN05.0`
  - `LQ173M1JW03`
  - `LP173WFG SPV3` (300Hz)
  - `NE173QHM-NY2`
  - `MNF601EA1-1`
  - `NE160QDM-NY2`
  - `N161HCA-GA1`

### 已验证面板 (AMD / 核显) {#verified-panels-amd-integrated}

- `B173HAN05.1`
- `N156KME-GNA` (2K 165Hz)
- `B173HAN04.9` (144Hz)
- `N173HHE-G32`
- `TV101QUM`
- `B133ZANxx.x` / `B156ZANxx.x`
- `NE156QUMxxx`
- `LQ156M1JWxx`
- `NV156QUM-N72`
- `LTN156FLxx`
- `MNG007DA1-1`
- `B156HAN08.2`
- `LQ156D1JW02`
- `NV156FHM-N4N`

## 特殊改装 {#special-conversions}

- iPad Pro 11-inch / iPad 系列屏幕面板。
- PlayStation 4 / 5 显示器改装。

## 资源 {#resources}

- [DIY Portable Monitor Guide (smzdm)](https://post.smzdm.com/p/424682/)
- [PanelBook](https://panelook.com/) - 屏幕面板规格数据库。
