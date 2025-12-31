---
title: 中兴 ZXHN F407 硬件笔记
tags:
  - Hardware
  - ONT
  - ZTE
  - EPON
  - Broadcom
  - Teardown
---

# 中兴 ZXHN F407 硬件笔记 {#zte-zxhn-f407-hardware-notes}

关于中兴 (ZTE) ZXHN F407 EPON 光网络单元 (ONU) 的拆解和组件分析，该设备通常由 ISP 提供用于 FTTH (光纤到户)。

## 设备概览 {#device-overview}

- **Device Type**: EPON ONU / ONT.
- **Model**: ZXHN F407 (FTTH WO-26s).
- **Power**: 12V 1A DC.
- **Interfaces**:
  - 2 x RJ45 (Ethernet).
  - 1 x RJ11 (Phone/POTS).

## 主要组件 (IC 分析) {#major-components-ic-analysis}

- **SoC (Processor)**: Broadcom [BCM6838](file:///notes/hardware/gadgets/bcm6838x.md) (BCM683851FSBG).
  - 第四代 PON 处理器。
- **RAM (Memory)**: Nanya [NT5CB64M16FP](file:///notes/hardware/gadgets/nanya.md).
  - 1Gb (128MB) DDR3-1600 SDRAM.
- **Flash (Storage)**: ESMT [F59L1G81MA](file:///notes/hardware/gadgets/esmt.md).
  - 1Gb (128MB) SLC NAND Flash.
- **SLIC (Voice Interface)**: Microsemi [Le9541](file:///notes/hardware/gadgets/microsemi.md) (LE9541DUQC).
  - 用于 VoIP/电话端口的单通道振铃 SLIC。

## 电源与分立元件 {#power-discrete-components}

- **Voltage Regulator**: TI (德州仪器) **LM2937** (LDO Regulator).
- **Transformer**: TNK **BD20A01** (隔离变压器，用于 Ethernet/线路)。
- **Rectifier (整流器)**: 标记 `L69B`.
- **EEPROM/Flash**: 标记 `25L95`.
- **Other Markings**:
  - `GT408A-2ZLI` (可能是逻辑或电源芯片)。
  - `56D972K G4 ACT08` (逻辑电平转换器 / 缓冲器)。
