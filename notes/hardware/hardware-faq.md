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

| Component        |
| ---------------- | --------- | ------------------------- |
| SAS Idle         | 7w        |
| SAS Full load    | 14w       |
| SSD Idle         | < 2w      |
| DRAM             | 1.5w - 3w |
| Rack Cooling Fan | < 24w     | 服务器里小风扇，一般 8 个 |

| Consumer Level     |
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
