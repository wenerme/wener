---
tags:
  - Glossary
---

# Glossary

| term          | stand for                       | cn                        |
| ------------- | ------------------------------- | ------------------------- |
| IEEE 802.15.4 |                                 | 低速无线个人局域网标准    |
| ADC           | Analog-to-Digital Converter     | 模数转换器                |
| BLE           | Bluetooth Low Energy            | 低功耗蓝牙                |
| BLE 5         | Bluetooth 5 Low Energy          | 第五代低功耗蓝牙能力集    |
| Camera        | Camera Interface                | 摄像头接口                |
| DAC           | Digital-to-Analog Converter     | 数模转换器                |
| I2C           | Inter-Integrated Circuit        | 双线串行总线              |
| I2S           | Inter-IC Sound                  | 数字音频总线              |
| IR            | Infrared                        | 红外收发                  |
| JTAG          | Joint Test Action Group         | 调试/测试接口             |
| LED PWM       | LED Pulse-Width Modulation      | LED 脉宽调制              |
| NRND          | Not Recommended for New Designs | 不推荐用于新设计          |
| RMT           | Remote Control Transceiver      | 远程控制/精确定时收发外设 |
| SDIO          | Secure Digital Input/Output     | SD 扩展 I/O 总线          |
| SPI           | Serial Peripheral Interface     | 串行外设接口              |
| Touch         | Capacitive Touch Sensor         | 电容触摸传感器            |
| TWAI          | Two-Wire Automotive Interface   | CAN 总线控制器            |
| USB OTG       | USB On-The-Go                   | USB 主从双角色能力        |

## IEEE 802.15.4

IEEE 802.15.4，是低速无线个人局域网 LR-WPAN 的物理层和 MAC 层标准。

常见用途：

- Zigbee。
- Thread。
- Matter over Thread。
- 低功耗传感器网络、智能家居、楼宇自动化。

特点：

- 面向低功耗、低速率、短报文、网状网络场景。
- 常见工作在 2.4 GHz，也有部分区域/协议使用 sub-GHz 频段。
- 它定义底层 PHY/MAC；Zigbee、Thread 等是在其上构建的网络/应用协议栈。

注意：

- 802.15.4 不是 Wi-Fi，也不是 BLE。
- 同一颗 SoC 标称支持 802.15.4 时，仍需确认 SDK 是否支持目标协议栈，例如 Zigbee、Thread 或 Matter。

## TWAI

TWAI, Two-Wire Automotive Interface，通常可理解为 SoC 内置的 CAN 总线控制器。

常见用途：

- 汽车、摩托车、BMS、工业控制等 CAN 总线通信。
- 多个 MCU 或控制节点之间的可靠总线通信。

注意：

- TWAI 通常只是控制器，接入真正的 CANH/CANL 总线还需要外接 CAN transceiver，例如 `SN65HVD230`、`TJA1050`、`MCP2562`。
- 典型链路：`SoC TWAI TX/RX -> CAN transceiver -> CANH/CANL`。

## ADC

ADC, Analog-to-Digital Converter，模数转换器，用于把模拟电压转换为数字值。

常见用途：

- 读取电池电压、电位器、光敏电阻、NTC 温度传感器、土壤湿度传感器等模拟信号。
- 简单模拟量采样和阈值检测。

注意：

- MCU/SoC 内置 ADC 通常不是高精度仪表级 ADC。
- 采样精度、线性度、噪声、输入阻抗和不同通道差异都需要看具体 datasheet。
- 测量高于 ADC 输入范围的电压时，需要分压，并注意输入保护。

## DAC

DAC, Digital-to-Analog Converter，数模转换器，用于把数字值转换为模拟电压。

常见用途：

- 输出简单模拟电压。
- 简单波形、音频、参考电压或模拟传感器信号。

注意：

- 内置 DAC 分辨率和输出驱动能力通常有限，例如一些 MCU 只有 8-bit DAC。
- 不适合高精度模拟输出或高保真音频场景；这类场景通常需要外置 DAC 或 codec。

## Touch

Touch 一般指 Capacitive Touch Sensor，电容触摸传感器。

常见用途：

- 触摸按键。
- 隐藏式面板按键。
- 简单接近检测。
- 低功耗唤醒输入。

注意：

- 触摸效果受 PCB pad 面积、外壳厚度、接地、湿度、噪声和软件阈值影响明显。
- 量产产品通常需要做校准、抗干扰和误触测试。

## BLE

BLE, Bluetooth Low Energy，低功耗蓝牙。

特点：

- 面向低功耗、小数据量、间歇通信场景。
- 常用 GATT Service / Characteristic 数据模型。
- 常见于传感器、手环、Beacon、手机 App 控制、设备配网等场景。

和 Bluetooth Classic 的区别：

- Bluetooth Classic / BR/EDR 更适合传统音频、耳机、音箱、SPP 串口等持续连接或较高吞吐场景。
- BLE 更适合电池设备、短数据、广播发现和低功耗控制。
- 有些芯片是 dual mode，同时支持 Classic 和 BLE；有些芯片只支持 BLE。

## BLE 5

BLE 5 通常指 Bluetooth 5.x 中的 Bluetooth Low Energy 能力。

相比 BLE 4.x 常见增强：

- 2M PHY：物理层速率从 1 Mbps 增加到 2 Mbps。
- LE Coded PHY：长距离模式，通过编码冗余提升距离和抗干扰能力。
- Advertising Extensions：扩展广播，可承载更多广播数据。
- Channel Selection Algorithm #2：改善复杂射频环境下的信道选择。

注意：

- 标称 BLE 5 不代表芯片和 SDK 一定支持全部 BLE 5 特性。
- 2M PHY、Coded PHY、Extended Advertising、Periodic Advertising、LE Audio 等能力需要分别查看芯片 datasheet、认证信息和 SDK 支持状态。

## Camera

Camera 一般指 SoC 的摄像头输入接口，用于接入并行或串行图像传感器。

常见用途：

- 摄像头采集、二维码扫描、图像识别、简单机器视觉。
- 与 LCD、PSRAM、DMA 配合做低成本图像显示和处理。

注意：

- 图像数据量大，通常需要关注 PSRAM、DMA、像素格式、帧率和引脚复用。
- 具体支持 DVP、MIPI CSI 或专用 camera interface，需要看芯片 datasheet。

## SPI

SPI, Serial Peripheral Interface，串行外设接口。

常见用途：

- Flash、PSRAM、屏幕、传感器、ADC/DAC、射频芯片等高速外设通信。
- 常见信号包括 `SCLK`、`MOSI`、`MISO`、`CS`。

注意：

- SPI 可一主多从，但每个从设备通常需要单独 `CS`。
- SoC 的外置 Flash/PSRAM 往往也占用 SPI/QSPI/OPI 资源和固定引脚。

## I2C

I2C, Inter-Integrated Circuit，双线串行总线。

常见用途：

- 低速传感器、RTC、EEPROM、触摸芯片、电源管理芯片、IO 扩展器。
- 常见信号为 `SCL` 和 `SDA`。

注意：

- I2C 是开漏/开集电极总线，需要上拉电阻。
- 总线速度、线长、上拉阻值和设备地址冲突都会影响稳定性。

## I2S

I2S, Inter-IC Sound，数字音频总线。

常见用途：

- 连接数字麦克风、音频 DAC、音频 codec、功放。
- 也常被一些 MCU/SoC 用作高速串行/并行数据搬运接口。

注意：

- 常见信号包括 `BCLK`、`WS/LRCLK`、`DIN`、`DOUT`、`MCLK`。
- 音频场景要关注采样率、位宽、主从时钟和 DMA buffer。

## RMT

RMT, Remote Control Transceiver，是 Espressif 常见的远程控制/精确定时收发外设。

常见用途：

- 红外遥控收发，例如 NEC 协议。
- 精确脉冲输入/输出。
- 驱动 WS2812/NeoPixel 一类对时序敏感的 LED。

注意：

- RMT 适合处理微秒级时序，能减少纯软件 bit-bang 的抖动。
- 不同 ESP 芯片的 RMT 通道数和编码器能力不同，需要看具体 datasheet 和 ESP-IDF driver。

## LED PWM

LED PWM, LED Pulse-Width Modulation，用于生成 PWM 波形控制 LED 或其他负载。

常见用途：

- LED 调光、RGB 灯控制、蜂鸣器、简单电机/舵机控制。
- 通过调节占空比改变平均功率。

注意：

- PWM 频率和分辨率通常相互制约。
- 驱动大电流 LED 或电机时需要外接 MOSFET/驱动芯片，不能直接由 GPIO 承担负载。

## JTAG

JTAG, Joint Test Action Group，常用于芯片调试和边界扫描测试。

常见用途：

- 在线调试、断点、单步、寄存器/内存查看。
- 生产测试和芯片边界扫描。

注意：

- JTAG 引脚常与普通 GPIO 或启动配置脚复用。
- 量产产品可能会关闭 JTAG 以降低安全风险。

## USB OTG

USB OTG, USB On-The-Go，表示 USB 控制器可在 device 和 host 角色之间切换。

常见用途：

- USB device：虚拟串口、HID、MSC、CDC、DFU 等。
- USB host：连接键盘、鼠标、U 盘、部分外设。

注意：

- 是否支持 full-speed/high-speed、host、device、OTG，需要看具体芯片。
- USB host 场景还要考虑 5 V VBUS 供电和限流保护。

## SDIO

SDIO, Secure Digital Input/Output，是基于 SD 总线扩展的 I/O 接口。

常见用途：

- SD 卡、Wi-Fi/蓝牙模块、SoC 与主控之间的高速通信。
- 一些 ESP 芯片可作为 SDIO slave 被外部 host 控制。

注意：

- SDIO 有 1-bit/4-bit 模式，速度和布线要求高于普通 UART/I2C。
- 引脚常与启动、Flash 或其他高速外设复用，设计前需要查 pin mux。

## IR

IR, Infrared，红外通信或红外遥控。

常见用途：

- 电视、空调、机顶盒等红外遥控发射/接收。
- 常见协议包括 NEC、RC5、Sony SIRC 等。

注意：

- 红外发射通常需要红外 LED 和三极管/MOSFET 驱动。
- 红外接收通常使用 38 kHz 等载波频率的集成接收头。

## NRND

NRND, Not Recommended for New Designs，不推荐用于新设计。

含义：

- 厂商仍可能继续供货或维护该型号，但不建议新项目继续选用。
- 常见原因包括已有替代型号、生命周期进入后段、成本/工艺/供应策略变化等。

选型建议：

- 新项目优先选择官方推荐的新型号或替代型号。
- 维护已有产品时可以继续关注供货周期、PCN/EOL 通知和兼容替代方案。
