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
