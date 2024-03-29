---
title: 电信常见问题
tags:
  - FAQ
---

## 中国 ISP 2G vs 3G vs 4G

| ISP      | 2G   | 3G       | 4G      |
| -------- | ---- | -------- | ------- |
| 中国移动 | GSM  | TD-SCDMA | TDD-LTE |
| 中国联通 | GSM  | WCDMA    | FDD-LTE |
| 中国电信 | CDMA | CDMA2000 | FDD-LTE |

| ISP           | Type  |              | Up MHz    | Down MHz  | 屏宽 MHz | 屏宽 MHz |
| ------------- | ----- | ------------ | --------- | --------- | -------- | -------- |
| China Mobile  | 2G    | GSM900       | 890-909   | 935-954   | 19       | 34       |
|               |       | GSM1800      | 1710-1725 | 1805-1820 | 15       |
|               | 3G    | TD-SCDMA/TDD | 1880-1900 | -         | 20       | 35       |
|               |       |              | 2010-2025 | -         | 15       |
|               | 4G    | TD-LTE       | 1880-1900 | -         | 10       | 60       |
|               |       |              | 2320-2370 | -         | 50       |          |
|               | 5G    | IMT-2020     | 2515-2675 | -         | 160      | 260      |
|               |       |              | 4800-4900 | -         | 100      |
| China Unicom  | 2G    | GSM          | 1745-1755 | 1840-1850 | 10       | 10       |
|               | 3G    | TD-SCDMA/TDD | 1905-1920 | 2021-2025 | 15       | 15       |
|               |       | CDMA2000     | 1920-1980 | 2110-2170 | 60       | 60       |
|               |       | WCDMA/FDD    | 1940-1955 | 2130-2145 | 15       | 15       |
|               | 4G    | FDD-LTE      | 1755-1765 | 1850-1860 | 10       | 10       |
|               |       | TD-LTE       | 2300-2320 | -         | 20       | 40       |
|               | 5G    | IMT-2020     | 3500-3600 | -         | 100      | 100      |
| China Telecom | 2G/4G | CDMA/FDD     | 825-840   | 870-885   | 15       | 15       |
|               | 3G    | CDMA2000/FDD | 1920-1935 | 2110-2125 | 15       | 15       |
|               | 4G    | FDD-LTE      | 1755-1765 | 1850-1860 | 10       | 10       |
|               | 4G    | TD-LTE       | 2370-2390 | -         | 20       | 40       |
|               | 5G    | IMT-2020     | 3400-3500 | -         | 100      | 100      |

## 关闭 2G 的影响

- 2G 覆盖能力强 - 关闭后部分地区没信号，无法打电话
- 4G LTE 没有通话的功能 - 通话由 VoLTE 提供
  - 4G 信号不好导致关闭 2G 后通话成问题
  - 中国联通 WCDMA 过渡技术 CSFB, eSRVCC - 依赖 3G
  - 中国电信 CDMA 2G 和 CDMA 3G 均不支持通话 - 可能关闭 3G 保留 2G
    - CDMA2000 1X
    - CDMA2000 Ev-Do
  - 中国移动 TD-SCDMA 质量差 - 可能关闭 3G 保留 2G
- 影响 IoT 设备 - 早期(2018 前)大多部署 IoT 基于 GSM - 例如 共享单车
  - 这类设备通常使用 5 年以上
  - 迁移到 NB-IoT/4G Cat1
- 参考
  - [关于 2G 退网，这篇可以说是很全面了](https://network.51cto.com/art/202006/618545.htm)

## UMTS vs GSM

- UMTS
  - 3G
  - CDMA-based
- GSM
  - 2G, 2.5G
  - TDMA
- 参考
- [Difference between UMTS and GSM](https://www.geeksforgeeks.org/difference-between-umts-and-gsm/)
