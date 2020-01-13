---
id: glossary
title: 词汇表
---

# VoIP Glossary

## 电话号码
* [Is there a standard for phone numbers?](https://stackoverflow.com/a/21001896/1870054)
* [E.164](https://en.wikipedia.org/wiki/E.164)
* [List of country calling codes](https://en.wikipedia.org/wiki/List_of_country_calling_codes)

## ITU
* [ITU](https://en.wikipedia.org/wiki/International_Telecommunication_Union) - International Telecommunication Union - 国际电信联盟
  * 大部分电信协议规定的制定者
  * 老旧, 难于发生改变
  * [ITU-T Recommendations](http://www.itu.int/zh/ITU-T/publications/Pages/recs.aspx)
* [IETF](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force)
  * [ietf.org](http://ietf.org/)

## 协议

Protocol | Mean | Notes
----|----|----
SIP   | Session Initiation Protocol          | SIP 基于标准的协议,大多数 VoIP 电话和服务都在使用或提供响应支持.
SCCP  | Cisco Skinny Client Control Protocol | SCCP 是私有协议,主要用于 Cisco's Call Manager 和 IP 电话
MGCP  | MGCP 很老的 VoIP 协议,已经很少使用了.
H.323 | 类似于 MGCP , 是很老的 VoIP 协议,已经很少使用了.


## 语音编码

编码 | 速率 | Fidelity
----|----
GSM   | 13 Kbps| 8k
iLBC  | 15 Kbps
G.711 | 64 Kbps
G.722 | 48/56/64 Kbps
G.726 | 16/24/32/40 Kbps
G.728 | 16 Kbps
G.729 | 8 Kbps
SPEEX Narrowband | 14Kps-23Kps | 8k
SPEEX Wideband | 20800-58400 | 16k
OPUS | 6k-51k | 48k
G.722 | 8K-80k | 16k



## 视频编码

H.263 90000


## SLA - Shared Line Appearance

## mrcp

## G.729
https://en.wikipedia.org/wiki/List_of_codecs
https://en.wikipedia.org/wiki/G.729

## VOIP
* Voice over IP
* 泛指基于网络的多媒体通信
* 主要关注基于 DSL,Wi-Fi/3G(VoWiFi/3G),LTE (VoLTE),Rich Communication Suite (RCS) 的通讯

## WebRTC
* 与 VOIP 关注的内容有很大重叠,但面向的对象不同
* 主要关注基于浏览器的通讯
* [WebRTC vs VoIP](http://www.voip-info.org/wiki/view/WebRTC+vs+VoIP)

## SIP
* Session Initiation Protocol
* 是一个工业标准
* 是一个 VOIP 的实现
* 可交换语音和视频
* 基于文本与传输层无关的的应用层协议,协议借鉴了 HTTP 和 SMTP 的很多元素
* 主要用于初始化协议,其内部的数据交换使用其他协议
* 传输层大多使用 RTP 或 SRTP, 可使用 TLS 加密
* 参考
  * [SIP](https://en.wikipedia.org/wiki/Session_Initiation_Protocol)
  * [SIP vs VOIP - whats difference/](http://www.sip.us/sip-vs-voip-whats-difference/)
  * [rfc3261](https://tools.ietf.org/html/rfc3261)

## SDP
* Session Descriptor Protocol
* 会话描述协议

## PSTN
* Public Switched Telephone Network
* 公共交换电话网
* 也可指 POTS - Plain Old Telephone System
* PSTN的核心目前几乎已完全数字化

## POTS
* [POTS](https://en.wikipedia.org/wiki/Plain_old_telephone_service)
* Plain Old Telephone Service

## PBX

## RTP/SRTP
* Real-time Transport Protocol
* Secure Real-time Transport Protocol

## PRi
* Primary Rate interface


Hardphones, Softphones, and ATAs
Hardphones 传统电话
Softphones 软件电话
ATA Analog Terminal Adapters, 模拟转数字
FXS  phones or PBX to a VoIP adapter
FXO  POTS line to a VoIP adapter
SPOOL,Simultaneous Peripheral Operations On-line, 假脱机,数据缓冲
打印机，则是 simultaneous peripheral output on line
IAX2 Inter-Asterisk eXchange protocol
designed to simplify the process of carrying VoIP calls across firewalls
2010 RFC 5456 - IAX: Inter-Asterisk eXchange Version 2
primary advantages of IAX is single-port firewall penetration. All traffic, including signaling and audio data, is transferred over a single UDP port (by default, over port 4569)
 IAX2 is more commonly used to build trunking facilities between Asterisk sys‐ tems,



 FXO and FXS
 模拟线路一般会有两种终端,office(一般为 PSTN 的中心) 和 station(一般为一个电话,但也可能发是一个 modem 或者线路卡)
 office
   对线路供电,一般为 48v 直流
   响铃(Ringing voltage)供电 一般为 90v 交流
   提供拨号声音(dialtone)
   检测联通状态  hook state (off-hook and on-hook)
   发送必要的信号例如被叫 ID
station
   提供响铃,处理 Ringing voltage
   提供拨号面板或发送 DTMF 的方式
   提供线路状态检测检测,Providing a hook switch to indicate the status of the line
 Foreign eXchange(FX) 端口是使用连接到的设备来命名的,而不是他做的事情.
 例如 FXO 实际上是一个 station, 连接到 office.
 FXS 实际上是提供 office 的端口,可以将任意模拟信号设备插入 FXS 端口
 模拟端口一般用在小型办公环境, 不多于 10 条线路 30 个话机.
 主要考虑因素为
   * 当地环境不允许使用数字线路
   * 开销
     * 模拟线路在密度小的时候开销很小,但是在密度高的时候开销很大
   * Logistics
     * 已经有模拟线路了,想要保留
 但从技术角度来说数字线路优于模拟线路

 数字技术
 * 长距离不失真
 * 减少线路噪音(特别是长距离)
 * 一条线路可以支持多个通话
 * 通话建立和拆除更快
 * 信号信息更加丰富(特别是使用 ISDN)
 * 运营商开支小
 * 客户开支小(高密度时)



## DUNDi
* Distributed Universal Number Discovery
* [voip-info/DUNDi](https://www.voip-info.org/dundi)
DUNDi can be used within an enterprise to create a fully federated PBX with no central point of failure, and the ability to arbitrarily add new extensions, gateways and other resources to a trusted web of communication servers, where any adds, moves, changes, failures or new routes are automatically absorbed within the cloud with no additional configuration.

 http://www.dundi.com/
 http://dundi.swissirc.net – web form soliciting DUNDi peers


 https://exain.wordpress.com/2010/07/03/asterisk-basics-and-load-balancing-via-dundi/

## DAHDi
* Digium Asterisk Hardware Device Interface
* [voip-info/DAHDi](https://www.voip-info.org/wiki/view/DAHDi)
* 2008/5/12 之前名字为 Zaptel

## ISDN
* [ISDN](https://en.wikipedia.org/wiki/Integrated_Services_Digital_Network)
* Integrated Services Digital Network
* 综合业务数字网
* 数字线路
* 在数据传输上呗 DSL 淘汰


## CTI - Computer Telephone Integration - 计算机电话集成
* 协议
  * TAPI, TSAPI, CSTA, CTConnect

## ACD - 自动呼叫分配系统

## CMS - Call Management System - 呼叫管理系统

负责为来话呼叫中心管理有关中继线、业务代表、队列、路由选择方案和应用的信息，以协助企业有效地管理他们的资源。

* 基本服务指标
  * 描述整体服务水平, 按日,周,月进行统计
* 系统使用率
  * 系统设备使用情况
  * 按需增减设备安排人员
* 坐席员工记录


## IVR/Interactive voice response - 交互式语音应答
* [IVR:wikipedia](https://en.wikipedia.org/wiki/Interactive_voice_response)
* [VoiceXML](https://en.wikipedia.org/wiki/VoiceXML)
  * 为 [Voice Browser](https://en.wikipedia.org/wiki/Voice_browser) 提供 [Voice User Interface](https://en.wikipedia.org/wiki/Voice_user_interface)
* [ccXML](https://en.wikipedia.org/wiki/Call_Control_eXtensible_Markup_Language)
  * 告知 Voice Browser 进行电话通道控制
* 参考
  * [因子软件 IVR 设置](http://www.yinzisoft.com/help/callcenter/index.htm)
* 硬件
  * NMS, Inetl, Synway
* 多协议, 大容量, 分布式

* 基本功能
  * 根据不同呼入号码实现不同语音导航，分配至相关业务座席。
  * 自动语音应答：如播放语音、菜单选择、收号、录音等。
  * 支持静态传真的自动收发，图形存储格式采用标准的TIF格式，提供多种文字：如中文、英文转换传真的功能。
  * 支持动态传真发送，可将中文、英文字符实时地转换为传真发送出去。
  * 数据库查询采用ODBC与数据库连接，支持MSSQL、Oracle、Sybase等主流数据库。
  * 系统支持通过代理服务器访问数据库，以保证IVR系统访问远程数据库、大型数据库、保密数据库时不受影响。
  * 支持DNIS和ANI自动识别功能。
  * 支持自动拨号，批量外拨，记录外拨结果，外拨方式不仅支持语音，还可支持传真，人工话务员等。
  * 系统能够将客户IVR交互活动记录到电话跟踪数据库中。
  * 支持模拟电话接口（LPS）、BRI（2B+D）、中国一号信令、ISDN（30B+D）、LineSide E1、七号信令（SS7）等多种信令方式。
* 系统安全性及其他
  * 系统可对IVR通道进行实时监控，一旦超出规定值或者系统部件不能正常运行，能够立即以声音形式进行告警，对发生告警的设备能 够准确显示其位置，并生成详细的告警及故障处理文档，确定故障原因以便于工程技术人员及时进行维护。
  * 系统的各种提示音和通知音应能够由用户随时进行方便的修改、添加和删除等。
  * 系统提供开放的应用层接口，动态加载新的业务模块。
  * 支持平滑、自然人性化的Text To Speech语音报读功能（支持中文）；要求有语音编排系统；支持文语转换；支持用户通过 Internet直接访问IVR的方法；
  * 可以加载自动语音识别算法
  * 系统提供功能强大的应用开发环境：图形化的流程编制工具、脚本语音控制、DLL功能加载、人工座席控制等

## T.38
https://en.wikipedia.org/wiki/T.38
fax over IP networks in real time.

UDPTL 用的比 RTP 多
RTP 支持 SRTP 来提升安全性
RTP 可以在另外一个流里发送冗余包

Asterisk 支持 UDPTL

Comparison of T.38 Transmission Over UDPTL or RTP
https://www.vocal.com/voip/t-38-over-udptl-rtp/

https://tools.ietf.org/html/rfc7345
