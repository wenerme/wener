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

| 层次              | 关注内容                                    | 例子                                                         |
| ----------------- | ------------------------------------------- | ------------------------------------------------------------ |
| SoC               | 芯片本身提供什么能力和引脚复用              | ESP32 的 GPIO15、GPIO21、I2C 控制器、UART、SPI               |
| MCU               | 微控制器固件如何初始化和使用这些能力        | I2C0 使用 SCL15/SDA21，Port 1 使用 GPIO33                    |
| Board             | 具体 PCB 如何把芯片引脚连到插座、芯片和外设 | 5号口第3脚连 GPIO21                                          |
| Connector         | 连接器的物理针序和电气定义                  | GND / VCC / SDA / SCL                                        |
| Protocol          | 这些信号线上跑什么通信协议                  | I2C、SPI、UART、PWM、ADC、GPIO                               |
| Device/Peripheral | 总线另一端连接的是什么设备                  | PN532、MPU6050、GD32、舵机、电机驱动器                       |
| Software API      | 程序怎样调用它                              | I2C(0, scl=Pin(15), sda=Pin(21))、PN532.getFirmwareVersion() |
| Electrical        | 电压、电流、上下拉、时序和负载限制          | 3.3V、5V TTL、I2C 上拉、PWM 电流能力                         |

| 1Pin 类型         | 常见信号                  |
| ----------------- | ------------------------- |
| 单针电源          | GND、VCC                  |
| 单针数字/模拟信号 | GPIO、ADC、PWM、SIG、DATA |

| 2Pin 类型     | 常见信号           |
| ------------- | ------------------ |
| 电源接口      | GND、VCC           |
| 按键/开关     | GND、SIG           |
| 单路 LED      | GND、LED+          |
| 差分/串行信号 | TX、RX；CANH、CANL |

> `TX/RX` 和 `CANH/CANL` 只是两根信号线；实际模块通常还需要另外的公共
> `GND`，不能把任意两针接口直接当作完整 UART 或 CAN 接口。CAN 收发器的
> `CANH/CANL` 也不是 MCU 的 `TX/RX`，中间通常还需要 CAN transceiver。

| 3Pin 类型     | 常见信号       |
| ------------- | -------------- |
| 数字传感器    | GND、VCC、SIG  |
| 舵机          | GND、VCC、PWM  |
| 单线设备      | GND、VCC、DATA |
| 普通扩展 GPIO | GND、VCC、GPIO |
| 模拟传感器    | GND、VCC、ADC  |

| 4Pin 类型         | 常见信号                      |
| ----------------- | ----------------------------- |
| I2C 设备          | GND、VCC、SDA、SCL            |
| UART 设备         | GND、VCC、TX、RX              |
| SPI 设备（简化）  | GND、VCC、SCLK、DATA（或 CS） |
| RGB LED           | VCC、R、G、B                  |
| 双路数字/模拟输入 | GND、VCC、SIG1、SIG2          |

| 5Pin 类型       | 常见信号                       |
| --------------- | ------------------------------ |
| 完整 SPI        | GND、VCC、SCLK、MOSI、MISO     |
| SPI 外设带片选  | GND、VCC、SCLK、MOSI、CS       |
| UART 带控制信号 | GND、VCC、TX、RX、RST/EN       |
| I2C 带中断/复位 | GND、VCC、SDA、SCL、IRQ 或 RST |
| RGB 灯/三路输出 | GND、VCC、R、G、B              |

| 6Pin 类型       | 常见信号                              |
| --------------- | ------------------------------------- |
| 完整 SPI 模块   | GND、VCC、SCLK、MOSI、MISO、CS        |
| I2C 带控制线    | GND、VCC、SDA、SCL、IRQ、RST          |
| UART 带流控     | GND、VCC、TX、RX、RTS、CTS            |
| CAN 模块        | GND、VCC、TX、RX、CANH、CANL          |
| 电机/执行器模块 | GND、VCC、控制信号若干、状态/故障信号 |

> 5Pin、6Pin 没有统一的“标准针序”。同样是6针，可能是 SPI、I2C 加控制线、
> UART 流控或 CAN 模块；必须结合丝印、原理图、数据手册和电气测试确认。

## GPIO

GPIO（General-Purpose Input/Output，通用输入输出）是 SoC/MCU 可由软件控制的
数字引脚。一个 GPIO 通常可以在不同时间配置成不同功能，但具体能力、限制和
可否同时使用取决于芯片的 datasheet、启动配置和封装引脚复用表。

### 常见配置能力

| 能力                  | 典型用途                             | 需要注意                                            |
| --------------------- | ------------------------------------ | --------------------------------------------------- |
| 数字输入              | 按键、开关、数字传感器、故障反馈     | 浮空输入可能随机跳变，通常需要上拉或下拉            |
| 数字输出              | LED、使能脚、片选、复位、继电器控制  | GPIO 不能直接承受超出电压或大电流负载               |
| 推挽输出              | 主动输出高、低电平                   | 不能与另一个主动输出直接短接                        |
| 开漏/开集电极         | I2C、线与中断、多设备共享信号        | 需要外部或内部上拉，低电平驱动能力有限              |
| 内部上拉/下拉         | 默认电平、按键输入、片选保持         | 阻值范围和启动阶段状态需查 datasheet                |
| 中断输入              | 按键、IRQ、边沿/电平事件             | 需要处理去抖、毛刺、唤醒和中断共享                  |
| PWM 输出              | 舵机、蜂鸣器、LED 调光、电机速度控制 | PWM 不是模拟电压；频率、分辨率和占空比有限制        |
| ADC 输入              | 电池、光敏、NTC、电位器、模拟传感器  | 输入范围、衰减、采样保持和校准决定可用精度          |
| DAC 输出              | 简单模拟电压或波形                   | 分辨率、输出电流和负载能力通常有限                  |
| 定时器捕获/计数       | 测频、脉宽、编码器、超声波回波       | 需要确认定时器通道与 GPIO 复用关系                  |
| UART TX/RX            | 串口模块、调试口、GPS                | TX/RX 是方向信号，通常还需要 GND                    |
| I2C SDA/SCL           | 传感器、EEPROM、IO 扩展器            | SDA/SCL 通常是开漏信号，需要上拉和地址管理          |
| SPI SCLK/MOSI/MISO/CS | 屏幕、Flash、ADC、RF 芯片            | 通常需要每个从设备独立 CS，电平和模式需匹配         |
| I2S 音频信号          | 数字麦克风、codec、功放              | 常涉及 BCLK、LRCLK、DIN/DOUT 等多根复用信号         |
| RMT/脉冲收发          | 红外、单总线、精确定时协议           | 是芯片专用外设能力，不等同于普通 GPIO 翻转          |
| JTAG/SWD 调试         | 下载、调试、边界测试                 | 可能在启动或量产配置中被占用，不能随意复用          |
| 触摸输入              | 电容触摸按键、接近检测               | 需要专用 touch sensing 外设和校准，不是普通数字输入 |

### GPIO 能力的三个边界

1. **GPIO 编号不等于接口协议。** `GPIO21` 是引脚编号；只有在固件配置为
   `I2C SDA` 后，它才承担 I2C 的 SDA 功能。
2. **复用能力不等于同时可用。** 一个引脚可能同时列出 GPIO、ADC、PWM、SPI
   等功能，但同一时刻通常只能选择一个主要复用功能；还要考虑 DMA、定时器、
   启动 strap、USB、Flash/PSRAM 和调试接口占用。
3. **能输出逻辑电平不等于能驱动负载。** 电压域、源/灌电流、推挽/开漏模式、
   上电默认状态、5V 容忍度、ESD 和外部驱动器都必须单独确认。电机、继电器、
   大功率 LED、舵机等通常需要晶体管、MOSFET、驱动芯片或专用控制器。

### 从芯片到连接器的映射

GPIO 资料最好分开记录以下事实：

```text
SoC GPIO21
-> 芯片复用为 I2C0 SDA
-> 固件初始化为 SDA
-> PCB 走线/电阻/电平转换
-> 连接器 5号口第3针
-> 外部 PN532 SDA
```

其中 SoC datasheet 只能证明第一层能力，固件 dump 可以证明第二层配置，
PCB 原理图或万用表才能证明第三、四层。连接器针序、VCC 电压和最大负载
不能仅从 GPIO 复用表推出。

## Pinout

```
5号口 第3针
-> PCB 铜线 / 电阻 / 电平转换
-> ESP32 GPIO21
-> I2C0 SDA
-> I2C 总线
-> PN532 设备地址 0x24
-> PN532 命令协议
-> NFC / ISO14443A
```

```
I2C0:
SCL = GPIO15
SDA = GPIO21
frequency <= 400 kHz
logic level = 3.3 V
```

```
5号口：
1 = GND
2 = VCC
3 = SDA
4 = SCL
```

## Protocol or Bus

协议或总线的“几针”只统计常用信号线；完整连接通常还需要 `GND`，很多模块还
需要 `VCC`、`IRQ`、`RST`、`CS` 或 `EN`。下面的频率、带宽和电压是常见工程范围，
不是所有 SoC、模块和连接器的保证值。真正接线前应以芯片 datasheet、模块手册
和板级电气定义为准。

| Protocol / Bus    | 常用信号与典型针数                                                   | 常见设备                                    | 作用                                 | 典型速率/频率                                             | 电压与限制                                                          |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------- |
| GPIO              | 1根信号线，另需GND；常见2/3针模块含VCC                               | 按键、LED、继电器控制、状态输出             | 单线数字输入或输出                   | 静态到数MHz，取决于软件/中断/负载                         | 通常1.8V或3.3V；不能据此驱动大电流负载                              |
| I2C               | `SDA`、`SCL`，2根信号；常见4针含GND/VCC                              | 温湿度、IMU、RTC、EEPROM、PMIC、IO扩展器    | 同一总线挂多个带地址的低速外设       | 100kHz标准、400kHz快速；部分支持1MHz/更高                 | 开漏，必须上拉；总线电容、线长和上拉阻值限制速度                    |
| UART / TTL Serial | `TX`、`RX`，2根信号；常见3针含GND，常见4针再含VCC                    | GPS、串口屏、调制解调器、调试终端、语音模块 | 点对点异步串行通信                   | 常见9600、115200 baud；可到数Mbps                         | TX/RX电平必须匹配；TTL UART不是RS-232，也不是RS-485                 |
| SPI               | `SCLK`、`MOSI`、`MISO`、`CS`，4根信号；常见6针含GND/VCC              | LCD、Flash、SD卡、ADC/DAC、RF/NFC模块       | 主从式同步高速短距离通信             | 常见1--40MHz；芯片和走线允许时可更高                      | 推挽信号；每个从设备通常需要独立CS；模式和位序需匹配                |
| I2S               | `BCLK`、`LRCLK/WS`、`DIN`或`DOUT`，3根信号；常见另含MCLK             | 数字麦克风、音频codec、DAC、数字功放        | 连续音频采样数据传输                 | 由采样率、位宽、声道数决定；常见44.1/48kHz，BCLK约1--6MHz | 通常1.8V/3.3V CMOS；时钟主从和数据方向需确认                        |
| CAN / TWAI        | 控制器侧`TX`、`RX`；总线侧`CANH`、`CANL`；含收发器通常4--6针         | 车辆ECU、BMS、工业控制器、机器人节点        | 抗干扰、多节点、带仲裁的差分总线     | 常见125k、250k、500k、1Mbps                               | MCU不能直接接CANH/CANL，需CAN transceiver；两端通常需终端电阻       |
| RS-485            | `A`、`B`两根差分线，另建议GND；常见3针或4针                          | Modbus设备、工业仪表、变频器                | 半双工或全双工长线多节点串行通信     | 常见9.6k--1Mbps，取决于线长和收发器                       | 需要RS-485 transceiver；A/B命名在不同厂商间可能相反                 |
| 1-Wire            | `DATA`一根信号，另需GND；寄生供电时可2针，外供电常3针                | DS18B20、序列号芯片、温度传感器             | 单总线寻址和低速传感器通信           | 约16kbit/s标准、约142kbit/s高速                           | 通常开漏加上拉；时序、线长和寄生供电影响很大                        |
| USB 2.0           | USB2低速/全速为`D-`、`D+`，另含GND/VBUS，常见4针                     | U盘、键盘、串口桥、摄像头、MCU USB设备      | 主机与设备间高速串行通信和供电       | 1.5Mbps低速、12Mbps全速、480Mbps高速                      | 典型信号1.8V差分内部逻辑但接口电气由USB规范定义；不可只按GPIO电平接 |
| JTAG / SWD        | JTAG常见TCK/TMS/TDI/TDO加GND；SWD常见SWCLK/SWDIO加GND，另含RESET/VCC | 调试器、烧录器、量产测试夹具                | 下载、单步调试、寄存器访问、边界测试 | 通常数MHz到数十MHz                                        | 常见1.8V/3.3V；可能占用启动脚，不能与普通外设随意复用               |
| PWM               | 1根输出信号，另需GND；舵机常见3针含VCC                               | 舵机、蜂鸣器、LED调光、电机驱动器           | 用占空比表达功率或时序控制           | 舵机常50Hz；蜂鸣器数百Hz到kHz；LED常数百Hz到数十kHz       | PWM不是模拟电压；电机/舵机供电和电流通常由外部驱动器承担            |
| ADC               | 1根模拟输入，另需GND；传感器常3针含VCC                               | 电池分压、NTC、光敏电阻、电位器、模拟传感器 | 把输入电压采样为数字值               | 采样率从数kSPS到MSPS，依芯片而定                          | 输入不能超过ADC范围；分压、阻抗、参考电压和校准决定精度             |
| DAC               | 1根模拟输出，另需GND；模块常3针含VCC                                 | 简单波形、音频、模拟控制电压                | 把数字值转换为模拟电压               | 更新率从kSPS到数MSPS，依芯片而定                          | 输出范围、分辨率和驱动能力有限；高质量音频通常用外置codec           |

### 如何阅读协议/总线接口

可以把一个外设连接描述成以下链路：

```text
连接器针脚
-> 电气信号（例如 SDA/SCL）
-> SoC 外设复用（例如 I2C0）
-> 总线协议（例如 I2C）
-> 设备地址或片选（例如 0x24 / CS）
-> 设备命令协议（例如 PN532 command）
-> 上层功能（例如 NFC 读卡）
```

例如 Elechouse PN532 的 I2C 接法通常需要 `GND、VCC、SDA、SCL` 四针；
`SDA/SCL` 是总线信号，`0x24` 是 PN532 在该总线上的地址，而 NFC/ISO14443A
是更上层的设备和无线协议。不能因为两个接口都标有四针，就假定它们的针序、
电压和协议相同。

### 典型带宽的理解

- UART 的 `baud` 是符号率，常见8-N-1配置下有效数据率约为 `baud / 10` 字节每秒，
  还会受到帧格式、流控和协议开销影响。
- I2C、SPI、I2S 的标称时钟不是应用层有效吞吐；地址、ACK、命令、空闲周期、
  DMA和设备处理时间都会降低实际吞吐。
- CAN、RS-485和USB的有效业务带宽还要扣除帧头、仲裁、填充、握手和重传等开销。
- PWM、ADC和DAC的“频率”描述的是控制/采样/更新速度，不应直接称为网络带宽。

### 电压的最低确认要求

接入未知模块至少确认：

1. `VCC` 是输入还是输出，以及是1.8V、3.3V、5V还是更高电压。
2. 信号是TTL/CMOS、开漏、差分还是模拟信号。
3. 外部模块是否带电平转换和上拉电阻。
4. GPIO 是否5V tolerant，以及上电默认状态是否会误触发外设。
5. 外设峰值电流、启动电流、终端电阻和最大线长。

## LittleFS

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
