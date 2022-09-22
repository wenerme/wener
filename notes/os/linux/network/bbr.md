---
title: BBR
---

# BBR

- BBR - Bottleneck Bandwidth and Round-trip propagation time
  - 基于模型主动探测
    - TCP 拥塞控制 - 通常 基于丢包来作为降低传输速率的信号
  - 有更高的吞吐量和更低的延迟
- Linux 5.1 BBRv2
- 默认为 CUBIC
- 参考
  - https://datatracker.ietf.org/meeting/104/materials/slides-104-iccrg-an-update-on-bbr-00
  - [google/bbr](https://github.com/google/bbr)

```bash
sysctl net.ipv4.tcp_available_congestion_control  # 可用的拥塞控制协议 - 默认 reno,cubic
sysctl net.ipv4.tcp_congestion_control            # 当前的协议 - 默认 cubic

# 启用 BBR
modprobe tcp_bbr
echo tcp_bbr >> /etc/modules-load.d/bbr.conf
echo net.core.default_qdisc=fq >> /etc/sysctl.d/bbr.conf
echo net.ipv4.tcp_congestion_control=bbr >> /etc/sysctl.d/bbr.conf
sysctl -p /etc/sysctl.d/bbr.conf
# 验证
sysctl net.ipv4.tcp_available_congestion_control
sysctl net.ipv4.tcp_congestion_control
```
