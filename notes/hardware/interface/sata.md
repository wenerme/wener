---
title: SATA
---

# SATA

- [SATA](https://en.wikipedia.org/wiki/Serial_ATA)
  - Serial ATA
- ATA
  - AT Attachment
- 2003 1.0 1.5 Gbit/s 150 MB/s
- 2004 2.0 3 Gbit/s 300 MB/s
- 2008 3.0 6 Gbit/s 600 MB/s
- 2013 3.2 16 Gbit/s 1969 MB/s
- AHCI - Advanced Host Controller Interface
- OHCI - Open
  - USB 1.1
- EHCI
  - USB 2.0
- UHCI - Universal
- XHCI - Extensible
  - USB 3.0
- WHCI - Wireless

| Spec         |          BW |     Rate |  Encoding | Since   |
| ------------ | ----------: | -------: | --------: | ------- |
| SAS-1        |  3.0 Gbit/s |          |           | 2004    |
| SAS-2        |  6.0 Gbit/s |          |           | 2009-02 |
| SAS-3        | 12.0 Gbit/s |          |           | 2013-03 |
| SAS-4        | 22.5 Gbit/s |          |           | 2017    |
| SAS-5        |   45 Gbit/s |          |           |
| SATA 1.0     |    1.5 Gb/s |  150MB/s |    8b/10b | 2003-01 |
| SATA 2.0     |      3 Gb/s |  300MB/s |    8b/10b | 2004    |
| SATA 3.0     |      6 Gb/s |  600MB/s |    8b/10b | 2009-05 |
| SATA Express |     16 Gb/s | 1969MB/s | 128b/130b |

:::tip Spec vs Connector

- Spec
  - 定义物理层、链路层、端口层、传输层、应用层
- Connector
  - 定义物理接口

:::

| Host     | Pins  | #       |
| -------- | ----- | ------- | ------------------------ |
| SFF-8087 | 36    | 4       | 常见                     |
| SFF-8088 | 26    | 4       | external iPass,iSAS,mSAS |
| SFF-8482 | 29    | 2 lanes | SATA, SAS - 最常见       |
| SFF-8484 | 32,19 | 4,2     |
| SFF-8639 | 67    | 4       | U.2, U.3                 |

- SFF -> Small Form Factor
- SFFWG -> Small Form Factor Working Group
  - 2010

| Connector | Pin |
| --------- | --- | ----------------------------- |
| SATA      | 7   |
| mSATA     |     | 接口同 mini PCI-E, 电信号不同 |
| eSATA     |
| USB 2.0   | 4   |
| eSATAp    |     | Power over eSATA,eSATA+USB    |

- SFF-8087
  - PCie 卡上 1 分 4 接口
  - SFF-8087 -> 4 SFF-8482
- SFF-8482

| abbr. | stand for                                                                |
| ----- | ------------------------------------------------------------------------ | ------------------ |
| SGPIO | Serial general purpose input/output                                      | 串行通用型输入输出 |
| NVMe  | NVM Express, Non-Volatile Memory Host Controller Interface Specification |
| SAS   | Serial Attached SCSI                                                     |

## M.2

- [M.2](https://en.wikipedia.org/wiki/M.2) - NGFF - Next Generation Form Factor
- 用于替换 mSATA
- 物理硬件使用 pcie-mini 的布局
- 更适合于 SSD
- 支持 3.3V
- for thin, power-constrained devices
  - tablet computers, laptops.
- 宽 22 mm
- 长 60, 80, 110 mm

## U.2

- 2.5" SSDs
- SFF-8639
- 支持 3.3 V, 5 V, 12 V
- for enterprise storage systems
  - 2.5", 3.5" 硬盘
- successor
  - EDSFF
  - U.3

## U.3

- SFF-TA-1001

## iSCSI

- [iSCSI](https://en.wikipedia.org/wiki/ISCSI) Internet Small Computer System Interface
- [Linux iSCSI](http://www.linux-iscsi.org)
- [Using iSCSI On Ubuntu 10.04 (Initiator And Target)](https://www.howtoforge.com/using-iscsi-on-ubuntu-10.04-initiator-and-target)
- SCSI commands over network

## SAN

- [SAN](https://en.wikipedia.org/wiki/Storage_area_network) Storage Area Network

# FAQ

## SAS vs SATA

目前功能上已经没有太大区别。

- SATA
  - 家用、消费级产品
- SAS
  - SATA 超集 - SAS 兼容 SATA
  - 服务器、工作站、企业级
  - 基础要求高于 SATA
