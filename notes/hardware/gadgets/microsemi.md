---
title: Microsemi 语音线路电路 (SLIC)
tags:
  - Hardware
  - Telecommunications
  - Microsemi
  - SLIC
  - VoIP
  - FXS
  - FXO
---

# Microsemi 语音线路电路 (SLIC) {#microsemi-slic}

Microsemi (现为 Microchip Technology 子公司) 为 VoIP、宽带和企业电话应用提供一系列语音线路接口电路 (SLIC) 和芯片组。

## 产品系列 {#product-families}

### VE880 系列 {#ve880-series}

VE880 系列提供单通道和双通道 FXS (外部交换站) 和 FXO (外部交换局) 线路接口。

- **Applications (应用)**: VoIP 网关、路由器和电缆调制解调器。
- [VE880 Series Product Page](https://www.microsemi.com/product-directory/voice-line-circuits/1473-ve880-single-and-dual-channel-fxs-and-fxo-line-interfaces)

### VE890 系列 {#ve890-series}

用于电话集成的高级 FXS/FXO 接口。

### VE950 系列 (含 Le9541) {#ve950-series}

针对短环路 VoIP 应用优化的通用振铃 SLIC。

- **Le9541 Features**:
  - 单通道设计。
  - 提供电池馈电、振铃和监控。
  - **Serial Bus Interface (串行总线接口)**: 优化用于直接连接 Broadcom [BCM3383](file:///notes/hardware/gadgets/bcm6838x.md)/84/85/90 有线 SoC 和 BCM6818/28/38 PON SoC。
  - **Power**: 从单个用户调节电池和 +3.3V VCC 运行。
  - **States**: 支持正向/反向电池馈电、语音传输、电源振铃、超低功耗扫描、接地启动 (Tip open) 和断开。
  - **Testing**: 包含用于集成测试算法的测试负载开关。
- [Le9541 Product Page](https://www.microsemi.com/product-directory/ve950-general-purpose-ringing-slic/4392-le9541)

## 关键集成 {#key-integration}

Microsemi SLIC 经常与 Broadcom 和其他宽带处理器搭配使用，在 ISP 提供的 ONT/ONU 和有线网关中提供传统语音 (RJ11) 端口。
