---
title: 电信常见问题
---

## 中国 ISP 2G vs 3G vs 4G

|          | 2G   | 3G       | 4G      |
| -------- | ---- | -------- | ------- |
| 中国移动 | GSM  | TD-SCDMA | TDD-LTE |
| 中国联通 | GSM  | WCDMA    | FDD-LTE |
| 中国电信 | CDMA | CDMA2000 | FDD-LTE |

## 关闭 2G 的影响
* 2G 覆盖能力强 - 关闭后部分地区没信号，无法打电话
* 4G LTE 没有通话的功能 - 通话由 VoLTE 提供
  * 4G 信号不好导致关闭 2G 后通话成问题
  * 中国联通 WCDMA 过渡技术 CSFB, eSRVCC - 依赖 3G
  * 中国电信 CDMA 2G 和 CDMA 3G 均不支持通话 - 可能关闭 3G 保留 2G
    * CDMA2000 1X
    * CDMA2000 Ev-Do
  * 中国移动 TD-SCDMA 质量差 - 可能关闭 3G 保留 2G
* 影响 IoT 设备 - 早期(2018前)大多部署 IoT 基于 GSM - 例如 共享单车
  * 这类设备通常使用 5 年以上
  * 迁移到 NB-IoT/4G Cat1
* 参考
  * [关于2G退网，这篇可以说是很全面了](https://network.51cto.com/art/202006/618545.htm)
