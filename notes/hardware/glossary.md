---
id: glossary
title: 硬件词汇
---

# Glossary

- 参考

  - [](https://www.electronics-lab.com/hardware-acronyms-sip-soc-som-com-sbc/)

- SoC - System on Chip / Single-chip microcomputer / Microcontroller \* MCU
  - 系统级芯片
  - 单片机
  - 是芯片
- SBC - Single Board Computer
  - 单板机
  - 是 PCB
  - 可能包含 SoC
- PCB - Printed circuit board
  - 印刷电路板
  - PWB - Printed wire board - 印刷线路板
- SiP - System in Package
- PoP - Package on Package
- SoM - System On Module / CoM - Computer On Module

# CH_PD

- Chip power-down

## SoC vs SBC

- SoC
  - 单个芯片
  - 可独立使用
  - 使用量大、尺寸小、价格便宜、功能固定
  - 通常直接烧录代码或运行 RTOS 或非常小的系统
  - 需要专业工具和知识、功能单一、通常用于成形产品
- SBC
  - 印刷版
  - 一般需要外设 - 例如 树莓派需要存储
  - 使用量小于 SoC、尺寸更大、价格较高、功能灵活
  - 通常运行完整系统 - Linux
  - 易于使用、功能完善、通常用于开发实验
