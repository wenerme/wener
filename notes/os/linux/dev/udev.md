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
udevadm trigger
```

- Predictable Network Interface Names  - 可预测网络接口名称
  - en - Ethernet  - 有线以太网接口
  - wl - Wireless LAN - 无线局域网接口
  - ww - WWAN - 无线广域网接口 - 3G/4G 调制解调器
  - `o<index>` onboard - 主板集成的网络接口
  - `s<index>` - hotplug slot
  - `p<bus>s<slot>[f<function>][d<dev_id>]` - physical/geographic location
    - 表示设备的物理位置（PCI 总线、插槽、功能号）
  - `x<mac>` - MAC 地址
  - `v<vendor_id>p<product_id>` - vendor and product ID
  - `n<name>` - name of the interface
- /lib/udev/rules.d/80-net-setup-link.rules
- QEMU 给相同的 mac 避免名字变化 `-net nic,model=virtio,mac=52:54:00:12:34:56`

```bash
udevadm info /sys/class/net/ens3

journalctl -b 0 -g "renamed from"
```

**/etc/udev/rules.d/70-persistent-net.rules**

```
ACTION=="add", SUBSYSTEM=="net", DEVTYPE!="?*", ATTR{address}=="00:24:9b:0d:6d:54", NAME="startech_en0"
```

# FAQ

## unable to create temporary db file '/run/udev/data/c189:39.tmp': Permission denied

- udevadm test 出现
- 使用 sudo 即可
