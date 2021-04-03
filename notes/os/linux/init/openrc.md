---
title: OpenRC
---

# OpenRC
* [OpenRC](https://github.com/OpenRC/openrc) 是什么？
  * 跨平台轻量级 init 系统
    * 支持 Linux, FreeBSD, NetBSD
    * 核心 900k
  * 2 BSD 协议
  * C+Shell 实现
  * 脚本结构上类似于 sysvinit - 但更简单
  * 支持 supervise-daemon 0.21+
  * 支持 /sbin/init - 0.25+

## /etc/inittab
```ini
# /etc/inittab

::sysinit:/sbin/openrc sysinit
::sysinit:/sbin/openrc boot
::wait:/sbin/openrc default

# Set up a couple of getty's
tty1::respawn:/sbin/getty 38400 tty1
tty2::respawn:/sbin/getty 38400 tty2
tty3::respawn:/sbin/getty 38400 tty3
tty4::respawn:/sbin/getty 38400 tty4
tty5::respawn:/sbin/getty 38400 tty5
tty6::respawn:/sbin/getty 38400 tty6

# Put a getty on the serial port
#ttyS0::respawn:/sbin/getty -L ttyS0 115200 vt100

# Stuff to do for the 3-finger salute
::ctrlaltdel:/sbin/reboot

# Stuff to do before rebooting
::shutdown:/sbin/openrc shutdown
```

# FAQ
## failed to add service `sysfs' to runlevel `boot': No such file or directory

```bash
for svc in $BOOT_SERVICES; do ln -fs /etc/init.d/$svc /etc/runlevels/boot; done
```

## is the name of a real and virtual service
* virtual service
  * 是 openrc 中 provide 后面的内容
* real service
  * 是 /etc/init.d 下名字

provide 的名字和实际服务名字冲突
