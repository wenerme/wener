---
title: sysctl
---

# sysctl

- [/etc/sysctl.d](https://man7.org/linux/man-pages/man5/sysctl.d.5.html)
- [sysctl.8](https://man7.org/linux/man-pages/man8/sysctl.8.html)
- 配置文件
  - `/etc/sysctl.d/*.conf`
  - `/run/sysctl.d/*.conf`
  - `/usr/local/lib/sysctl.d/*.conf`
  - `/usr/lib/sysctl.d/*.conf`
  - `/lib/sysctl.d/*.conf`
  - `/etc/sysctl.conf`
- /proc/sys
- [networking/ip-sysctl.txt](https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt)
- https://sysctl-explorer.net/
  - [proudier/sysctl-explorer](https://github.com/proudier/sysctl-explorer)

```bash
sysctl -p       # 加载 文件 - 默认为 /etc/sysctl.conf
sysctl --system # 加载所有系统配置
```

```ini
net.ipv4.tcp_fwmark_accept    =0

net.ipv4.tcp_keepalive_time   = 75    # 在第一次keep alive请求发送后，不活动连接的时间
net.ipv4.tcp_keepalive_probes = 9     # 在这个连接被认为是断开之前，keep alive请求被重发的次数
net.ipv4.tcp_keepalive_intvl  = 7200  # keep alive探测的时间间隔
```

## tuning.conf

```conf
vm.max_map_count=262144
```

## bbr.conf

```conf
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr
```

## fs.conf

```conf
fs.inotify.max_user_instances=8192
```

**相关错误信息**

> failed to create inotify: No file descriptors available
