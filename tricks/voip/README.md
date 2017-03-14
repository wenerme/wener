# VOIP

https://www.linphone.org/

## 术语

### VOIP
* Voice over IP
* 泛指基于网络的多媒体通信
* 主要关注基于 DSL,Wi-Fi/3G(VoWiFi/3G),LTE (VoLTE),Rich Communication Suite (RCS) 的通讯

### WebRTC
* 与 VOIP 关注的内容有很大重叠,但面向的对象不同
* 主要关注基于浏览器的通讯

__参考__
* [WebRTC vs VoIP](http://www.voip-info.org/wiki/view/WebRTC+vs+VoIP)

### SIP
* Session Initiation Protocol
* 是一个工业标准
* 是一个 VOIP 的实现
* 可交换语音和视频
* 基于文本与传输层无关的的应用层协议,协议借鉴了 HTTP 和 SMTP 的很多元素
* 主要用于初始化协议,其内部的数据交换使用其他协议
* 传输层大多使用 RTP 或 SRTP, 可使用 TLS 加密

__参考__

* [SIP vs VOIP - whats difference/](http://www.sip.us/sip-vs-voip-whats-difference/)
* [SIP:wikipedia](https://en.wikipedia.org/wiki/Session_Initiation_Protocol)
* [rfc3261](https://tools.ietf.org/html/rfc3261)

### SDP

### PSTN
* Public Switched Telephone Network
* 公共交换电话网
* 也可指 POTS - Plain Old Telephone System
* PSTN的核心目前几乎已完全数字化

### PBX

### RTP/SRTP
* Real-time Transport Protocol
* Secure Real-time Transport Protocol

### PRi
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






### ISDN
* Integrated Services Digital Network
* 综合业务数字网
* 数字线路
* 在数据传输上呗 DSL 淘汰

__参考__
* [ISDN:Wikipedia](https://en.wikipedia.org/wiki/Integrated_Services_Digital_Network)
