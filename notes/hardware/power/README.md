---
title: 电源
---

# 电源

- [电池](./battery.md)
- [UPS](./ups.md)

## Power consumption

- SATA - 机械硬盘
  - 2.5" 5400 RPM: 1.7W
  - 2.5" 7200 RPM: 2.5W
  - 3.5" 5400 RPM: 6.5W
  - 3.5" 7200 RPM: 9W
- RasPi0 / Pi Zero W
  - 100 mA: 没有连接外设，WiFi和蓝牙关闭
  - 160 mA: 蓝牙开启
  - 170 mA: WiFi开启
  - 230 mA: 相机连接并捕捉图像
- ESP32
  - Active Mode - RTC + ULP + ESP32 Core + 外设 + Radio + WiFi + BT
    - 160~260mA - WiFi Tx 13dBm~21dBm
    - 120mA - WiFi/BT Tx 0dBm
    - 80-90mA - WiFi/BT Rx & listening
  - Modem Sleep - RTC + UPL + ESP32 Core
  - Light Sleep - RTC + UPL + ESP32 Core Paused
  - Deep Sleep - RTC + UPL
  - Hibernation - RTC

---

- 参考
  - https://raspi.tv/2017/how-much-power-does-pi-zero-w-use
  - https://lastminuteengineers.com/esp32-sleep-modes-power-consumption/

## DC Connector

| en               | cn               |
| ---------------- | ---------------- |
| Barrel Connector | 圆形直流插头     |
| DC Power Adapter | 直流电源适配器   |
| DC Jack          | 直流电源充电接口 |

| 外径 × 内径  | notes |
| ------------ | ----- |
| 6.3 × 4.0mm  |
| 6.3 × 3.0mm  |
| 5.5 × 3.0mm  |
| 5.5 × 2.5mm  | 常用  |
| 5.5 × 2.1mm  | 常用  |
| 5.5 × 1.7mm  |
| 4.8 × 1.7mm  |
| 4.0 × 1.7mm  |
| 4.0 × 1.7mm  |
| 3.5 × 1.35mm |

- 不带针 - “两极插头” (2-pole/2-conductor plug)
  - 外层金属壳：通常是负极 (-) 或接地 (GND)。
  - 内层金属壁：通常是正极 (+)。
- 带针 - “三极插头” (3-pole/3-conductor plug)
  - 外层金属壳：通常是负极 (-) 或接地 (GND)。
  - 内层金属壁：通常是正极 (+)。
  - 中间针：通常是信号线。
