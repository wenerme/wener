---
title: udev
---

# udev

- udev
  - systemd 一部分
  - wikipedia [udev](https://en.wikipedia.org/wiki/Udev)
  - archlinux [udev](https://wiki.archlinux.org/index.php/udev)
- eudev
  - Gentoo's fork of udev
  - gentoo wiki [eudev](https://wiki.gentoo.org/wiki/Eudev)
  - 非 systemd 环境一般使用 eudev
- busybox 的 mdev 是个更加简化的版本
- 功能
  - 设备管理器
  - 取代 hotplug，hwdetect
- `/etc/udev/rules.d/*.rules`
- /etc/udev/rules.d
- /run/udev/rules.d
- /lib/udev/rules.d
- https://github.com/micronucleus/micronucleus/blob/master/commandline/49-micronucleus.rules

```bash
apk add eudev
service udev start
rc-update add udev sysinit

udevadm monitor

# 设备信息
udevadm info -p /devices/pci0000:00/0000:00:14.0/usb1/1-1
udevadm info -q path -n input/mouse1
udevadm test /devices/pci0000:00/0000:00:14.0/usb1/1-1

udevadm control --reload-rules
```

# FAQ

## unable to create temporary db file '/run/udev/data/c189:39.tmp': Permission denied

- udevadm test 出现
- 使用 sudo 即可
