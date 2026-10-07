---
title: ESP8266 MINI Weather Clock
---

# ESP8266 MINI Weather Clock

- ESP8266 迷你天气时钟
- ESP-01S Mini OLED
- 56DZMiniWtClock
  - SSD1306 OLED
    - 0.96 英寸蓝色 I²C OLED
    - 分辨率 128×64，地址 0x3C
    - 方向为 A0/C0，contrast 为 0xCF。
  - SH1106
  - https://www.56dz.com/

| spec         | SSD1306                | SH1106              |
| ------------ | ---------------------- | ------------------- |
| res          | 128 × 64               | 128 × 64            |
| ram          | 128 × 64 位            | 132 × 64            |
| 寻址模式     | 支持页、水平、垂直寻址 | 仅支持页寻址        |
| 硬件滚动     | 支持硬件级滚动指令     | 不支持              |
| 对应屏幕尺寸 | 多见于 0.96 英寸屏幕   | 多见于 1.3 英寸屏幕 |
| I2C 显存读取 | 不支持                 | 支持                |

- ob26030101
- dst-015
  - Display Structure / Technology
