---
title: Display FAQ
tags:
  - FAQ
---

# 显示器常见问题

## 接口

- LVDS - Low Voltage Differential Signaling 40Pin
  - 低压差分信号
  - 330mV, min 250mV, max 450mV
  - 100Mbps - 1Gbps
  - 专用于视频传输
- eDP - Embedded Display Port 30Pin
  - 基于 DisplayPort 架构和协议
  - DP 内部接口
  - 平板电脑、笔记本电脑
- Vbyone
- MiniLVDS
- MIPI 12/25/30PIN 31/34/39/40PIN 45/50/60PIN
- 8bit\10bit, VASA, JEIDA
- 60Hz、120Hz、240Hz
- 4 路、8 路、16 路 V-by-One（30/60/120Hz）信号

| -                    | eDP                                    | LVDS                             |
| -------------------- | -------------------------------------- | -------------------------------- |
| Data line            | 1-4 pairs of data lines                | More data lines                  |
| Clock line           | No                                     | Yes                              |
| Bit rate/pair        | 1.6,2.7,5.4Gbps                        | 945Mbps                          |
| Total capacity       | 1.6-21.6Gbps                           | 7.56Gbps                         |
| Clock                | Embedded                               | clock line/channel               |
| Transmission type    | video, audio, data, extensible formats | Uncompressed video signal        |
| Two way data channel | 1Mbps, 720Mbps                         | 100kbps                          |
| Channel coding       | ANSI 8B/10B                            | Serialized at 7x pixel clockrate |
| Content protection   | HDCP                                   | None                             |

---

- https://cjscope2016.pixnet.net/blog/post/69757737
- http://www.auo-lcd.com/solution/98.html

## LCD 背板类型

- IPS
- TN
- VA
- TFT

## LED 背板类型

> LED 也是 LCD, 只是背光不同

- LED
- OLED

## IPS vs TN vs VA

- IPS
  - Pros
    - Outstanding color accuracy and consistency
    - Maximum available viewing angles
    - Response times sufficient for most users
    - Virtually eliminates color/contrast shift seen with some VA displays
  - Cons
    - Below average static contrast ratio
    - Potential white glow from off-angles when viewing dark content. Usually only an issue with lower-end & off-brand IPS monitors
    - More motion blur than a TN monitor
    - IPS Monitor Best Uses:
  - When
    - Color-critical professional applications
    - Technology enthusiasts
    - Higher-level business/home use
    - Gamers who value image quality over response time
- TN
  - Pros
    - Rapid response time
    - Lower price
    - Sufficient contrast for most business/general purpose use
    - TN Monitor Drawbacks:
  - Cons
    - Most restrictive viewing angles, especially in vertical plane
    - Not recommended for color-critical applications
  - When
    - Gaming
    - Entry-level
    - General use
- VA - P-MVA, S-MVA, AMVA (Advanced MVA).
  - Pros
    - Maximum available viewing angles
    - High contrast ratios
    - Response times sufficient for most users
    - Mid-range to high-end pricing options
  - Cons
    - Response times slower than TN
    - Off-center contrast shift with some models
    - VA Monitor Best uses:
  - When
    - Movies
    - Photography/Videography
    - Content creation
    - Home use
    - Gamers who value image quality over response time
- OLED
- LCD
  - 使用背光 - 可能发光有误
  - 动态图像模糊
- OLED
  - 主动 - 避免屏幕发光 - 黑色更黑
  - 比 LCD 更贵
- CRT
- TFT

---

- 参考
  - https://www.viewsonic.com/library/photography/what-is-an-ips-monitor-panel/

## DCR

- Dynamic Contrast Ratio
- 对比度优化技术，自动判断画面整体亮度, 通过减弱较暗区域亮度,有效地对不同色阶层次精准还原，使画面细节更清晰,层次更分明。
