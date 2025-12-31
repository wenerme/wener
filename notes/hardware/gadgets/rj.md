---
title: Registered Jack & VoIP 接口 (RJ11, RJ45, FXS/FXO)
tags:
  - Hardware
  - Telecommunications
  - RJ11
  - RJ45
  - VoIP
  - FXS
  - FXO
---

# Registered Jack & VoIP 接口 {#registered-jack-voip-interfaces}

关于物理通信连接器 (Registered Jacks) 和用于集成模拟电话与数字系统的硬件接口的参考笔记。

## Registered Jack (RJ) 术语 {#rj-terminology}

[Registered Jack (RJ)](https://en.wikipedia.org/wiki/Registered_jack) 是用于将语音和数据设备连接到本地交换运营商或长途运营商提供的服务的标准化网络接口。

### 常见连接器类型 {#common-connector-types}

- **{A}P{B}C Notation (表示法)**:
  - `P` = Number of positions (物理槽位数量)。
  - `C` = Number of contacts (实际连接的触点/针脚数量)。
  - Example: `6P4C` 意味着 6 个位置，其中 4 个导体已连接。

| Interface | Connector | Common Use (常见用途)              |
| :-------- | :-------- | :--------------------------------- |
| **RJ11**  | 6P2C      | 单线模拟电话。                     |
| **RJ14**  | 6P4C      | 双线模拟电话。                     |
| **RJ25**  | 6P6C      | 三线模拟电话。                     |
| **RJ45**  | 8P8C      | 计算机网络 (Ethernet)。            |
| **RJ61X** | 8P8C      | 四线模拟电话。                     |
| **RJ21X** | 50-pin    | 高密度多线 (最多 25 线) 桥接连接。 |

### 安装后缀 {#mounting-suffixes}

- **C**: Flush-mount or surface mount (嵌入式或表面安装)。
- **F**: Flex-mount (柔性安装)。
- **W**: Wall-mount (壁挂式)。
- **L**: Lamp-mount (灯座式)。
- **S**: Single-line (单线)。
- **M**: Multi-line (多线)。
- **X**: Complex jack (复杂插座)。

## VoIP 硬件与接口 {#voip-hardware-interfaces}

### 模拟电话适配器 (ATA) 与网关 {#ata-gateways}

- **HT-503 (Grandstream)**: 一种流行的混合 ATA，具有 1 个 FXS 端口 (用于电话) 和 1 个 FXO 端口 (用于 PSTN 线路)。
  - [Using HT-503 with Raspberry Pi (Asterisk)](https://theworklife.com/graham-miln/2017/09/24/telephone-calls-via-ht-503-raspberry-pi/)
- **Digium TDM2400PLF**: 使用 **RJ21** 连接器的高密度 PCI 卡，用于多线模拟电话。

### Raspberry Pi / SBC 集成 {#rpi-sbc-integration}

- **SwitchPi (lixinswitchpi)**:
  - [SwitchPi 官网](https://switchpi.com/)
  - [lixinswitchpi on GitHub](https://github.com/lixinswitchpi)
    - C, C++, MPL 1.1 / CC BY-NC-SA 3.0
    - PiTDM (FXS/FXO), PiGSM, 和 OAK 系列 IP PBX 设备的开源设计。
    - [PiTDM Module Installation Manual](https://switchpi.com/2018/01/14/manual-of-install-pitdm-module/)
- **OpenUSB FXS**: 创建 USB 转 FXS 接口的开源项目。
  - [OpenUSB FXS Blog](https://openusbfxs.wordpress.com/)
- **IRIS Series (eicss)**:
  - [IRIS1000 (FXO/FXS for RPi 1)](http://www.eicss.com/Home/iris1000)
  - [IRIS4000 (Dual FXO for Orange Pi Zero)](http://www.eicss.com/Home/iris4000)

## 组件技术参考 {#component-technical-refs}

- **Si3217x + Si32911/19 (Silicon Labs)**: 用于 FXS 应用的单芯片 ProSLIC®。
  - [Silicon Labs ProSLIC Product Page](https://www.silabs.com/products/voice/slic/si3217x-si32911-si32919-single-chip-proslic)
- **MAX3232**: RS232 转 TTL 电平转换器，通常用作嵌入式硬件的 "刷机线"。
  - [Add a 9-pin Serial Port to Raspberry Pi](http://www.davidhunt.ie/add-a-9-pin-serial-port-to-your-raspberry-pi-in-10-minutes/)

## 软件音频 {#software-audio}

- **JACK Audio Connection Kit**: 专业的声音服务器守护进程 (不要与物理 RJ 连接器混淆)。
  - [JACK Audio 官网](http://jackaudio.org/)
  - [JACK Audio (Wikipedia)](https://en.wikipedia.org/wiki/JACK_Audio_Connection_Kit)
