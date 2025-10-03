---
title: 树莓派常见问题
tags:
  - FAQ
---

# Raspberry Pi 常见问题

```bash
# SPI & i2c
ls /dev/i2c-*
ls /dev/spidev*

# 使用 haveged 生成随机数，提高随机数生成速度，影响 SSH 等服务的性能
apk add haveged
rc-update add haveged
service haveged start

apk add raspberrypi-utils-vcgencmd
vcgencmd get_throttled # 判断是否被限频 - 电量不足
```

```txt title="/boot/config.txt"
dtparam=spi=on
dtparam=i2c_arm=on
```

- 如果不需要也可以 blacklist
  - i2c_bcm2835
  - spi_bcm2835

## 闪电标志

- 电源不足警告

```bash
vcgencmd get_throttled
```

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

## 没有 wlan0

```bash
lshw -short
dmesg | grep -i "brcmfmac\|firmware"
modprobe brcmfmac
```

- 可能 kernel bug
  - https://github.com/RaspAP/raspap-webgui/discussions/1606

```txt title="/etc/modprobe.d/brcmfmac.conf"
options brcmfmac feature_disable=0x82000
```

## platform regulatory.0: Direct firmware load for regulatory.db failed with error -2

```
platform regulatory.0: Direct firmware load for regulatory.db failed with error -2
cfg80211: failed to load regulatory.db
```

```bash
apk add wireless-regdb
```

## task vchiq-keep/0:427 blocked for more than 362 seconds.

```
INFO: task vchiq-keep/0:427 blocked for more than 362 seconds.
      Not tainted 6.12.31-0-rpi #1-Alpine
"echo 0 > /proc/sys/kernel/hung_task_timeout_secs" disables this message.
task:vchiq-keep/0    state:D stack:0     pid:427   tgid:427   ppid:2      flags:0x00000008
Call trace:
 __switch_to+0xe8/0x140
 __schedule+0x38c/0xb64
 schedule+0x34/0x134
 schedule_preempt_disabled+0x24/0x40
 kthread+0xbc/0x120
 ret_from_fork+0x10/0x20
```

- VCHIQ (Video Core Image Queue)

## brcmf_set_channel: set chanspec 0x100e fail, reason -52
