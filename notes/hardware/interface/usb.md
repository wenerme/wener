---
title: USB
---

# USB

- [系统结构](https://en.wikipedia.org/wiki/USB#System_design)
  - Host + one or more downstream ports + multiple peripherals
  - Hubs - 最多 5 层
  - 一个 host 可以有多个控制器，每个控制器可以有一个或多个端口
  - 一个 host 最多 127 设备
  - 一个设备可以有多个逻辑设备 - device functions
  - 组合设备可提供多个功能 - webcam + microphone
  - 复合设备连接逻辑设备到内建 Hub
- 参考
  - https://fabiensanglard.net/usbcheat/index.html

## 速度

| Standard      | 发布日期 | 最大传输速率            |
| ------------- | -------- | ----------------------- |
| USB 1.1       | 1998-08  | Full Speed (12 Mbit/s)  |
| USB 2.0       | 2000-04  | High Speed (480 Mbit/s) |
| USB 3.0       | 2008-11  | SuperSpeed (5 Gbit/s)   |
| Thunderbolt   | 2011     | 10 Gbps                 |
| USB 3.1       | 2013-07  | SuperSpeed+ (10 Gbit/s) |
| Thunderbolt 2 | 2013     | 20 Gbps                 |
| USB Type-C    | 2014     |
| Thunderbolt 3 | 2015     | 40 Gbps                 |
| USB 3.2 Gen 1 |
