---
title: 模块
---

# 模块

## Quectel M25MA-04-STD

- GSM 模块
- 特点
  - 超小四频 LCC 封装 GSM/GPRS 模块
  - 待机电流低至 1.3mA，支持音频功能
  - 支持通信远程升级技术 QuecFOTA®
  - 内嵌网络服务协议栈，支持多路 Socket 连接
  - 产品设计简单，满足客户产品快速上市的要求

| Spec           | Detail                                                           |
| -------------- | ---------------------------------------------------------------- |
| 频段           | GSM850MHz ,EGSM900MHz ,DCS1800MHz ,PCS1900MHz                    |
| 短信           | 点对点短信收发, 文本和 PDU 模式                                  |
| 语音编码方式   | 半速率（HR） ，全速率（FR） ，增强型全速率(EFR） ，自适应（AMR） |
| 音频处理机制   | 回音消除 ，回音抑制，噪音抑制                                    |
| 数据           | GPRS 等级 12 ： 最大 85.6kbps（下行） ，最大 85.6kbps（上行）    |
| PBCCH 编码方式 | CS-1、CS-2、CS-3 、CS-4 USSD                                     |

## Quectel EC20 R2.1

- LTE Cat 4 无线通信模块
- LTE 3GPP Rel.11 / HSPA+
- 封装兼容移远通信 UMTS/HSPA+ UC20 模块以及多网络制式 LTE EC20/EC21/EC25/EG25-G 模块，实现了 3G 网络与 4G 网络之间的无缝切换。
- 内置 GNSS
- USB 2.0
- 支持 Windows, Linux, Android 下 USB 驱动, eCall

**版本**

| 型号        | 内存      | 功能                 | 时间        |
| ----------- | --------- | -------------------- | ----------- |
| EC20 CEHDLG | 128M+128M | 数据                 |
| EC20 CEHCLG | 128M+128M | 数据                 | 2018 年年底 |
| EC20 CEHC   | 128M+128M | 数据                 | 2018 年     |
| EC20 CEFDKG | 256M+128M | 数据                 | 2017 年     |
| EC20 CEFHLG | 128M+128M | 数据,双天线,分集天线 |
| EC20 CEFILG | 128M+128M | GNSS,GPS/北斗,语音   |
| EC20 CEFDLG | 128M+128M | 语音                 |
| EC20 CEFDG  | 412M+256M | 语音                 |
| EC20 CEFAG  | 412M+256M | 全功能               | 2018        |
| EC20 CEFALG | 128M+128M | 全功能,GSP/北斗      |
| EC20 CEFASG |

> 1. CEHDLG 是支持语音的，但是不知道为什么查到的不是
> 2. MiniPCIe 和 LCC 封装

**频段**

| Type     | Detail              | DL/bps                           | UL/bps               |
| -------- | ------------------- | -------------------------------- | -------------------- |
| LTE FDD  | B1/B3/B5/B8         | 150Mbps                          | 50Mbps               |
| LTE TDD  | B34/B38/B39/B40/B41 | 130Mbps                          | 30Mbps               |
| WCDMA    | B1/B8               | WCDMA 394K<br/>DC-HSDPA 42M      | 384K<br/>HSUPA 5.76M |
| TD-SCDMA | B34/B39             | 4.2M                             | 2.2M                 |
| CDMA     | BC0                 | EVDO 3.1M<br/>1X Advanced 307.2K | 1.8M<br/>307.2K      |
| GSM      | 900/1800MHz         | EDGE 296K<br/>GPRS 107K          | 236.8K<br/> 85.6K    |

> WCDMA -> UMTS

**音频**

- 编码 - HR/FR/EFR/AMR/AMR-WB
- 回声消除/噪声抑制
- 数字语音和 VoLTE (Voice over LTE) - 可选

**接口**

- 1 个 USB 2.0 高速接口(最高达 480Mbps)
- 1 个数字语音接口(可选)
- 1.8V/3.0V (U)SIM 接口
- 2 个 NETLIGHT 接口(NET_STATUS 和 NET_MODE)
- 2 个 UART 接口(主串口和 Debug 串口) RESET(低电平有效) PWRKEY(低电平有效) 主天线、分集天线和 GNSS 天线接口
- 2 个 ADC 接口
- 2 个 SDIO 接口(用于 Wi-Fi 和 SD 卡)

**驱动**

- 通用 USB 2.0
- Android 4+ RIL
- Windows 7+ NDIS
- Linux 2.6+ ECM
- Linux 2.6+ Gobinet
- Linux 3.4+ qmi wwan

**协议栈**
TCP/UDP/PPP/FTP/HTTP/NTP/PING/QMI/NITZ/CMUX/HTTPS/SMTP/MMS/FTPS/SMTPS/SSL/FILE

**参考**

- [移远 EC20 测评](https://laidycy.com/2019/09/08/移远ec20-测评/)

### Quectel EC20 CEHDLG-128-SNNS

- eSIM+vSIM+传统实体卡
- 支持语音
- openvox 使用该型号
- 特点
  - 专为 M2M 和 IoT 应用而设计的 LTE Cat 4 无线模块
  - 各网络制式的全面覆盖
  - 集成多星座 GNSS 接收机
  - 支持 DFOTA、`eCall*` 和 DTMF 功能
  - MIMO 技术满足无线通信系统对数据速率和连接可靠性的要求
- 销售

  - 华为云 https://marketplace.huaweicloud.com/product/00301-548038-0--0
    - 105¥

- 串口 - AT, DM, NMEA

## Provider

- [Quectel](https://www.quectel.com) - 移远
  - Quectel Wireless - 上海移远通信技术股份有限公司
- 有方
- 广和通
- 域格
- 宽翼
- 华为云市场 物联网/模组 - https://marketplace.huaweicloud.com/search/internet/804/
