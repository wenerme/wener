---
title: Linux Kernel Tuning (sysctl)
tags:
  - Linux
  - Kernel
  - Tuning
  - SysAdmin
  - sysctl
---

# Linux Kernel Tuning (sysctl) {#linux-kernel-tuning}

- Documents:
  - [sysctl.d(5)](https://man7.org/linux/man-pages/man5/sysctl.d.5.html)
  - [sysctl(8)](https://man7.org/linux/man-pages/man8/sysctl.8.html)
  - [ip-sysctl.txt](https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt)
- Tools:
  - [Sysctl Explorer](https://sysctl-explorer.net/) ([GitHub](https://github.com/proudier/sysctl-explorer))

## Configuration Paths

- `/etc/sysctl.d/*.conf`
- `/run/sysctl.d/*.conf`
- `/usr/local/lib/sysctl.d/*.conf`
- `/usr/lib/sysctl.d/*.conf`
- `/lib/sysctl.d/*.conf`
- `/etc/sysctl.conf`
- Runtime: `/proc/sys`

```bash
sysctl -p                              # 加载 文件 - 默认为 /etc/sysctl.conf
sysctl -p /etc/sysctl.d/99-tuning.conf # 加载指定文件
sysctl --system                        # 加载所有系统配置

# 等同
sysctl net.ipv4.ip_forward
cat /proc/sys/net/ipv4/ip_forward
```

- br_netfilter
  - net.bridge.bridge-nf-call-iptables

## tuning.conf

> 面向服务器

```conf
fs.file-max = 2097152
fs.inotify.max_user_instances = 8192

net.ipv4.tcp_timestamps=0
net.ipv4.tcp_rmem=10240 131072 12582912
net.ipv4.tcp_wmem=10240 131072 12582912

net.core.netdev_max_backlog=250000
net.core.rmem_max=12582912
net.core.wmem_max=12582912
net.core.optmem_max=4194304
```

```bash
sysctl net.ipv4.{tcp_fin_timeout,tcp_timestamps,tcp_sack,tcp_rmem,tcp_wmem,tcp_low_latency,tcp_adv_win_scale} net.core.netdev_max_backlog net.core.{rmem_max,wmem_max,rmem_default,wmem_default,optmem_max}
sysctl fs.inotify.max_user_instances fs.file-max

sysctl vm.{max_map_count,swappiness,dirty_{ratio,background_ratio}}
```

**AlpineLinux 3.19**

| conf                          |             default | tuned                 | note                       |
| ----------------------------- | ------------------: | --------------------- | -------------------------- |
| net.ipv4.tcp_timestamps       |                   1 | 0                     |
| net.ipv4.tcp_sack             |                   1 |                       |
| net.ipv4.tcp_rmem             | 4096 131072 6291456 | 10240 131072 12582912 | 4k 128k 6M -> 16k 128k 12M |
| net.ipv4.tcp_wmem             |  4096 16384 4194304 | 10240 88064 12582912  | 4k 16k 4M -> 16k 86k 12M   |
| net.ipv4.tcp_low_latency      |                   0 | 1                     |
| net.ipv4.tcp_adv_win_scale    |                   1 |                       |
| net.ipv4.tcp_keepalive_time   |                7200 |                       | seconds                    |
| net.ipv4.tcp_keepalive_probes |                   9 |                       |
| net.ipv4.tcp_keepalive_intvl  |                  75 |                       | seconds                    |
| net.core.netdev_max_backlog   |                1000 | 250000                |
| net.core.rmem_max             |              212992 | 12582912              | 208k -> 4M                 |
| net.core.wmem_max             |              212992 | 12582912              |
| net.core.rmem_default         |              212992 |                       |
| net.core.wmem_default         |              212992 |                       |
| net.core.optmem_max           |               20480 | 4194304               | 20k -> 4M                  |
| fs.file-max                   |              799457 | 2097152               | ~10K -> ~2M                |
| fs.inotify.max_user_instances |                 128 | 8192                  |
| net.ipv4.tcp_fin_timeout      |                  60 |                       | seconds                    |
| vm.max_map_count              |               65530 |
| vm.swappiness                 |                  60 |
| vm.dirty_ratio                |                  20 |
| vm.dirty_background_ratio     |                  10 |

| value     |  for |
| --------- | ---: |
| 4096      |   4k |
| 10240     |  10k |
| 88064     |  86k |
| 212992    | 208k |
| 4194304   |   4M |
| 12582912  |  12M |
| 134217728 | 128M |

- SACK - Selective Acknowledgments

```conf
# 全局范围内可打开的文件描述符的最大数量
fs.file-max = 2097152
# 每个用户可以创建多达 8192 个监控实例
fs.inotify.max_user_instances = 8192

# VM - Virtual Memory - 虚拟内存
vm.max_map_count=262144

# less swapping
vm.swappiness = 10
vm.dirty_ratio = 60
vm.dirty_background_ratio = 2

# 禁用 TCP 时间戳选项 - 提高 CPU 利用率
# 默认开启
net.ipv4.tcp_timestamps=0
# 启用 TCP 选择确认选项 - 提高吞吐量
# 允许接收方告知发送方哪些数据被成功接收，哪些需要重传。这可以提高在网络条件不稳定时的 TCP 性能。
# 默认 开启
net.ipv4.tcp_sack=1
# 增加处理器输入队列的最大长度
# 这个参数用于调整网络设备在被内核处理之前能够排队的数据包的最大数量。增加这个值可以在高速网络环境下防止数据包丢失。
net.core.netdev_max_backlog=250000
# 使用 setsockopt() 增加 TCP 最大和默认缓冲区大小
# 用于调整 TCP 套接字接收和发送缓冲区的最大值和默认值，以及其他选项缓冲区的最大值
# 增加这些值可以在大容量传输中提高性能。
net.core.rmem_max=4194304 # SO_RCVBUFFORCE - max recv window
net.core.wmem_max=4194304 # SO_SNDBUFFORCE - max send window
net.core.rmem_default=4194304
net.core.wmem_default=4194304
net.core.optmem_max=4194304

# 增加内存阈值以防止数据包丢失
# TCP 套接字的接收和发送缓冲区大小, 最小值、默认值和最大值
net.ipv4.tcp_rmem="4096 87380 4194304"
net.ipv4.tcp_wmem="4096 65536 4194304"

# 启用 TCP 的低延迟模式
# 使 TCP 尽可能减少延迟，适合对时延敏感的应用，如在线游戏或语音通话。
net.ipv4.tcp_low_latency=1
# TCP 窗口缩放和应用程序缓冲区的比例设置
# 1 表示 TCP 窗口大小和应用程序缓冲区将平均分配缓冲区空间。
net.ipv4.tcp_adv_win_scale=1

# 内核是否接受具有 fwmark（防火墙标记）的 TCP 连接
net.ipv4.tcp_fwmark_accept    =0

# 75s 内没有数据传输，发送 keepalive 请求
net.ipv4.tcp_keepalive_time   = 75
# 发多少次 keepalive 请求后，认为对方已经断开连接
net.ipv4.tcp_keepalive_probes = 9
# 认为对方已经断开连接的时间 2h
net.ipv4.tcp_keepalive_intvl  = 7200


# 调整 TCP 连接在关闭过程中等待状态变为完全关闭的时间
# 控制了 TCP 连接在发送最后一个 FIN 包（表示连接关闭的信号）后，还需要等待对方回应 ACK（确认）包的时间
# 等待 60 秒的时间让连接正常关闭
net.ipv4.tcp_fin_timeout = 60
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

```bash
# 128
sysctl fs.inotify.max_user_instances

sudo sysctl fs.inotify.max_user_instances=8192
```

**相关错误信息**

> failed to create inotify: No file descriptors available

## 网络链接

当考虑并发数的时候,先不考虑业务,可直接考虑服务的承载能力,以下以百万并发计算.

```bash
# 查看 Socket 的内存缓冲配置
sysctl -A | grep net | grep mem
```

输出分别为读缓冲,写缓冲和每个缓冲的 最低,默认和最大值,

```
net.ipv4.tcp_mem = 384666       512891  769332
net.ipv4.tcp_rmem = 4096        87380   6291456
net.ipv4.tcp_wmem = 4096        16384   4194304
net.ipv4.udp_mem = 384666       512891  769332
```
