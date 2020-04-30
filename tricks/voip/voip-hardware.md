---
id: hardware
title: 硬件设备
---

# VoIP Hardware

## Tips
https://wiki.freepbx.org/display/PC/Telephony+Card+Hardware+Overview

* PSTN(E1) -> 数字 -> Asterisk -> 模拟 -> FXS -> 座机
* [Digium Board selector](https://store.digium.com/boards)
* 电信光纤 -> ?
  * 电信光纤是怎么转成电话的,是转的数字还是模拟
  * 怎么在同一个光纤中支持多个通道
* 转换器接口类型
  * PCI
  * PCIe
  * USB
    * 较少
* OpenVox
* 回音消除/EC/Echo Cancelation
* RJ48
* RJ45

https://www.voip-info.org/wiki/view/Analog+Telephone+Adapters

* 30B+D
  * 30 路并发, 号码不受影响, 可以是 100 或者 200 个号码
  * D 是数字线路


* 网关类型
  * 媒体网关
    * SIP
    * FXO
    * FOS
  * 融合网关
    * E1/T1
    * SS7
  * 无线融合网关
    * GSM
  * 云通讯

## 语音卡

* https://wiki.freepbx.org/display/PC/Telephony+Card+Hardware+Overview

## 主板
* 主要考虑 PCI 槽数, 考虑 PCIe 即可
* ASROCK/华擎科技 H110 PRO BTC+
  * 14xPCIe
  * 需要排线

## 硬件提供商

### Digium
* [Digium:wikipedia](https://en.wikipedia.org/wiki/Digium)
* [store.digium.com](https://store.digium.com/boards/)
  * 产品选型
* [dtasia](http://dtasia.net/)
  * 亚洲分销商
* [Telephony Cards Datasheet](https://www.digium.com/sites/digium/files/telephony-cards-datasheet.pdf)
* 模型规范
  * A4A/A4B, 单口, PCI/PCIe
  * A8A/A8B, 双口, PCI/PCIe
  * B -  Echo Cancellation
  * TMD/AEX - 四口, PCI/PCIe
  * TE 数字卡
    * 编号 ABC, A 为端口数, B 为版本号, C 如果为单数或0则是 PCIe
  * VPM 回声消除
  * TC 语言处理
    * 一般用于处理 G.729a, G.723.1





## 讯时
* mx60
  * Linux MX60-VoIP-AG 2.6.27 #1 Tue Oct 9 05:52:56 MDT 2012 armv5tejl unknown
* GSM/20,G729A/20,PCMU/20,G723/30,PCMA/20,iLBC/30

### 三汇/Synway
* [三汇](http://www.synway.cn/)


http://www.synway.cn/index.php/product/product-list/14

三汇CTI语音产品分为SHT模拟语音卡、SHD数字中继卡、SHN VOIP语音卡、SHF系列传真卡

SHD-30C-CT/PCI
SHD系列数字中继卡，可分为C型、D型号、E型号、CAS卡，四种类型。C型/D型数字卡，是一种采用PCI总线的数字中继线语音卡，该系列语音卡可以实现采用E1/T1数字中继线接 入的电话语音处理系统所需的绝大部分功能。D型数字卡增强了回波抵消的能力；同时，采用的DMA数据读写方式具有传输速率高和CPU占用率小的优点，进一步提高了系统性能。E型数字中继卡，是采用PCIe总线，CAS语音卡包含SHD-120D-CT/PCI/CAS、SHD-240D-CT/PCI /CAS等2种语音卡，是一种采用PCI总线的数字中继线语音卡，支持E1模式下1号信令的呼叫接续。 - See more at: 

http://www.synway.cn/index.php/product/product-content/14/203#sthash.oi5mAdNR.dpuf


### 鼎信通达 
* [鼎信通达](http://www.dinstar.cn)
* 产品
  * 模拟网关
  * 媒体网关
  * 融合网关
  * 无线融合网关
  * 云通讯


传统 PSTN 线路: 模拟和数字
模拟技术
  没有信号通道,大多数信号通道是电子的
  断开连接通常需要几秒,并且不稳定
  Far-end supervision is minimal
  不同的电路就意味着不同的音频特性,需要进行调整
连接到 Asterisk 的模拟线路需要通过 FOX(Foreign eXchange Office) 端口
如果想要将传统电话连接到 Asterisk 也需要同样的转接卡


数字线路
T1,24路
  加拿大或美国,ISDN-PRI
E1,32路
  世界其他国家,ISDN-PRI 或 MFC/R2
  中国
BRI,2路
  ISDN-BRI, Euro-ISDN

PRI ISDN Primary Rate Interface ISDN (一般称为PRI) 协议主要运行于 DS1(T1/E1)线路
MFC/R2 拉丁美洲和亚洲 (E1)

Phone numbers as used for the purpose of origination are commonly called direct inward dialing numbers (DIDs)
Historically, a DID referred to a phone number associated with a trunk connected to customer premise equipment (CPE).
The number that was dialed is commonly referred to as the Dialed Number Identification Service (DNIS) number

CAS-based protocol (like R2).
PRI terminated in an RJ45 will be an ISDN connection,
BNC Connector


VoIP 适配类型
Single FXS – A single FXS VoIP adapter allows you to connect one telephone. Single FXS VoIP adapters come with either one or two Ethernet ports.
Dual FXS – A dual FXS VoIP adapter allows you to connect up to two telephones. Dual FXS VoIP adapters come with either one or two Ethernet ports.
FXO / FXS – A FXO / FXS VoIP adapter allows you to connect a single telephone and a single POTS line. These combination adapters are typically used to provide fail-over or life-line capabilities.

如果需要超过两个线,则需要使用 VoIP 网关
