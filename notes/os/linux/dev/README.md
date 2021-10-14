---
id: dev
title: Linux Device
---

# Linux Device

- [List of device bit rates](https://en.wikipedia.org/wiki/List_of_device_bit_rates)
- 参考
  - [linux 设备模型之 kset/kobj/ktype 分析](https://mp.weixin.qq.com/s/PybqqhyJejNJbeSdlEaYWQ)
- /sys/class/tty

| dev       | stand for                              |
| --------- | -------------------------------------- |
| /dev/loop | loop devices                           |
| /dev/fd   | file descriptors                       |
| /dev/sr   | CD-ROM devices                         |
| /dev/ram  | ramdisks                               |
| /dev/dm   | device mapper, lvm, luks               |
| /dev/md   | multiple device, software RAID devices |
| /dev/rbd  | rados block device, ceph block devices |
| /dev/zd   | zfs volumes                            |

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
