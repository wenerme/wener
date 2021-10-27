---
title: 树莓派常见问题
tags:
- FAQ
---

## 树莓派 4B 键盘不工作

- 可能是因为供电不足导致
- 或者使用 ssh 访问

```bash
echo max_usb_current=1 >> /boot/config.txt
```

## 树莓派 4 TypeC 设计缺陷

- 用不带 Emark Cable 的普通 USB-C 线缆来供电
- 苹果的 TypeC 线不行
- 最高 15W - 5V3A
- 参考
  - [Raspberry Pi admits to faulty USB-C design on the Pi 4](https://arstechnica.com/gadgets/2019/07/raspberry-pi-4-uses-incorrect-usb-c-design-wont-work-with-some-chargers/)
