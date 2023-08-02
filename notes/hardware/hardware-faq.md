---
title: Hardware FAQ
tags:
  - FAQ
---

# Hardware FAQ

- 哈曼 - 哈曼国际工业公司 - Harman International Industries, Incorporated
- 哈曼卡顿 Harman/Kardon
  - 1953
  - 2016年11月14日 -> 三星
- AKG Acoustics
  - 1947
  - 1994 -> 哈曼
- JBL
  - 1946 洛杉矶
  - 1969 -> 哈曼

## 10GbE

- 10 Gigabit Ethernet, 10GE, 10GbE, 10 GigE
- 万兆网络
- 需要交换机支持
  - 交换机需要注意背板带宽
- 需要服务器支持
  - 通过 PCIe 扩展卡
- 区分光口，电口 - 目前电口较多
- e.g.
  - UBNT Flex 10 GbE **USW-Flex-XG**
    - **$300**
    - 4×10GbE
    - 1×1GbE+PoE
    - 规格
      - Total non-blocking throughput 41 Gbps
      - Switching capacity 82 Gbps
      - Forwarding rate 61.012 Mpps
  - UBNT Enterprise XG 24 **USW-EnterpriseXG-24**
    - **$1300**
    - (24) 10 GbE ports
    - (2) 25G SFP28 ports

<!--
https://store.ui.com/us/en/collections/unifi-switching-utility-10-gbps-ethernet
https://store.ui.com/us/en/collections/unifi-switching-pro-ethernet
-->

## 视网膜屏幕

- 人眼对像素辨识度为 300 PPI
- 超过 300 PPI 则可认为是 视网膜屏幕
- 苹果 LCD 330 PPI, OLED 458 PPI

## 内存 套条

- S/N 相邻的内存条 - 颗粒相同
- 一般没必要，营销手段

## 功耗

| Component        | Power     | Note                      |
| ---------------- | --------- | ------------------------- |
| SAS Idle         | 7w        |
| SAS Full load    | 14w       |
| SSD Idle         | < 2w      |
| DRAM             | 1.5w - 3w |
| Rack Cooling Fan | < 24w     | 服务器里小风扇，一般 8 个 |

| Consumer Level     | Power       |
| ------------------ | ----------- |
| HDMI               | 0.5w        |
| CPU FAN            | 0.2w - 2.4w |
| WiFi               | 0.5w        |
| PCIe x1 8 FXO Idle | ~2.8w       |
| FAN 2800 RPM       | 1.5w        |
| FAN 3800 RPM       | 2.8w        |
| FAN 5000 RPM       | 7w          |

---

- FAN
  - 一般 12v
  - 功耗取决于转速 - 转速是动态的
  - 服务器内小风扇能达到 10,000 RPM
- Memory
  - 取决于 Bank、冗余、容量
- 硬盘
  - 容量高，功耗也会偏高
- CPU TDP/Full load
  - 最高功率受核心数影响
  - 区分性能模式和节能模式

**参考**

- https://poweradvisorext.it.hpe.com/
- [HPE Power Advisor](https://www.hpe.com/psnow/doc/4aa5-9121enw)
- https://www.seagate.com/cn/zh/products/enterprise-drives/exos-e/7e10/

## SoC vs SBC

- SoC
  - 单个芯片
  - 可独立使用
  - 使用量大、尺寸小、价格便宜、功能固定
  - 通常直接烧录代码或运行 RTOS 或非常小的系统
  - 需要专业工具和知识、功能单一、通常用于成形产品
- SBC
  - 印刷版
  - 一般需要外设 - 例如 树莓派需要存储
  - 使用量小于 SoC、尺寸更大、价格较高、功能灵活
  - 通常运行完整系统 - Linux
  - 易于使用、功能完善、通常用于开发实验

## 厂家

- SanDisk
  - WD 2016 年收购 SanDisk
- Kioxia/铠侠
  - 2018 年 06 月 东芝拆分出 东芝记忆体株式会社
  - 2019 年 10 月 更名为 Kioxia/铠侠

## IC vs ID

- RFID
  - 常见 125KHz ID
  - 可复制
  - 手机不可模拟
  - read-only unique 64b anti-rewrite password
  - 低成本
  - EEPROM
- Access control IC card
  - 常见 13.56MHz
  - non-contact radio frequency IC card - MF1 card
    - mifare one card
- Access control CPU card

## SFP

- SFP
  - Small Form-factor Pluggable
  - 小型的光纤模块接口
  - 支持多种传输介质，如光纤、铜缆等
  - 支持 1Gbps、10Gbps
- SFP+
  - Enhanced Small Form-factor Pluggable
  - 通常 10Gbps
- SFP28
  - 通常 25Gbps

## 10GBASE-T vs SFP+

> 有条件就 光口/SFP+

|       - | 10GBASE-T | SPF+     |
| ------: | --------- | -------- |
| 💵 价格 | 低        | 高       |
| 🕐 延迟 | 高 2.6ms  | 低 0.1ms |
| 🔋 功耗 | 高 2-5w   | 低 0.7w  |
|    距离 | 短        | 长       |

- 10GBASE-T - 电口
  - RJ45 口 - **兼容** 旧的速度
  - 建议 < 20 米
  - 价格更低
  - 通常 Cat6, Cat6a, Cat7
  - 功耗更高 - 2-5w/port/endpoint - 距离长功耗更高
  - 延迟更高
    - block encoding
- SFP+ - 光口
  - 需要光电转换
    - 价格更高
  - 功耗更低 - 0.7w/port - 距离无关
  - 延迟更低

<!--
http://www.datacenterknowledge.com
-->
