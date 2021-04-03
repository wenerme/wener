---
title: Linux Device
---

# Linux Device
* [List of device bit rates](https://en.wikipedia.org/wiki/List_of_device_bit_rates)
* 参考
  * [linux设备模型之kset/kobj/ktype分析](https://mp.weixin.qq.com/s/PybqqhyJejNJbeSdlEaYWQ)
* /sys/class/tty

```bash
# 查看所有 USB
ls -l /sys/class/tty/ttyUSB*
# 使用的驱动
# usb/drivers/cdc_acm
# pnp/drivers/serial
# platform/drivers/dw-apb-uart
# platform/drivers/serial8250
# usb-serial/drivers/ch341-uart
# usb-serial/drivers/option1
ls -l /sys/class/tty/*/device/driver
```
