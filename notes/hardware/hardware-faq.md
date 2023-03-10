---
title: Hardware FAQ
tags:
  - FAQ
---

# Hardware FAQ

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

## 采购 {#purchase}

**2023-03**

|                     unit | price |
| -----------------------: | ----- |
|        平台 1U @2015 年+ | 1500+ |
|        平台 2U @2015 年+ | 1500+ |
|        平台 1U @2018 年+ | 1800+ |
|        DDR4 16G @2133MHz | 120   |
|        DDR4 32G @2133MHz | 200   |
|        DDR3 16G @1866MHz | 50    |
| CPU E5-2696V4 2.2G22C44T | 900   |
| CPU E5-2686V4 2.3G18C32T | 200   |
| CPU E5-2699V3 2.3G18C32T | 410   |
|     SAS 2.5 15K 600G128M | 120   |
|     SAS 2.5 10K 1.2T128M | 300   |
|      SAS 3.5 7.2K 6T256M | 320   |
|     SAS 3.5 7.2K 10T256M | 550   |

- 其他
  - 网卡 - 10gbe
  - 电源
  - HBA
  - UPS
  - SSD
  - USB
- 先确定平台
  - 影响 CPU/内存/硬盘
- 按需 配置 CPU/内存/硬盘
- v3 v4 同平台

---

例如：

- 36核心72线程 384G 4.8T = 2000+3000+1000 = ¥6000
- 36核心72线程 768G 4.8T = 2000+5000+1000 = ¥8000
- 44核心88线程 768G 80T = 3500+5000+5000 = ¥13500
- 类似阿里云
  - 64 vCPU	256 GiB ￥7000/月
  - 高效云盘 ¥0.35/GB/月 - ¥350/T/月
  - 1年~=¥9万/年

---

- 36核心72线程 ~= ¥2000
  - CPU E5-2686V4 * 2 = ¥400
  - 平台  1500 - CPU 挑机器
- 44核心88线程 ~= ¥3500
  - CPU E5-2696V4 * 2 = ¥1800
  - 平台  1500 - CPU 挑机器
- +DDR4 16G * 24 = 384G ~= ¥3000
- +DDR4 32G * 24 = 768G ~= ¥5000
- +SAS 2.5 15K 600G128M * 8 = 4.8T ~= ¥1000
- +SAS 3.5 7.2K 10T256M * 8 = 80T ~= ¥5000
