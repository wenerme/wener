---
title: ifupdown
---

# ifupdown
## Tips
* [networking/ifupdown.c](https://sourcegraph.com/github.com/mirror/busybox/-/blob/networking/ifupdown.c)
* 处理 `/etc/network/interfaces`
* 提供 ifup 和 ifdown
* 只处理 auto
* `/var/run/ifstate` 记录状态 - 有可能在 `/etc/network/run/ifstate`
* 支持方法
  * inet - manual wvdial ppp static bootp dhcp loopback
  * inet6 - static manual loopback v4tunnel
* 使用 ip 或 ifconfig 进行配置
* dhcp 客户端支持 - dhcpcd dhclient pump udhcpc
* 注意
  * 不支持 hotplug
