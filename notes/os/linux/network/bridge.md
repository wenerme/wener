---
title: 桥接网络
---

# Bridge

## STP

- BPDU - Bridge Protocol Data Unit

**角色**

| Role | Name            | Chinese  | Desc                                                                         |
| ---- | --------------- | -------- | ---------------------------------------------------------------------------- |
| RB   | Root Bridge     | 根桥     | ID 最小桥                                                                    |
| RP   | Root Port       | 根端口   | 最佳路径端口                                                                 |
| DP   | Designated Port | 指定端口 | 每一个网段选择到根桥最近的网桥作为指定网桥, 该网桥到这一网段的端口为指定端口 |
| AP   | Alternated Port | 可选端口 | 即阻塞端口, 既不是指定端口, 也不是根端口的端口                               |

**端口状态**

| Status     | Data | BPDU | Learn Address |
| ---------- | ---- | ---- | ------------- |
| Disabled   | no   | no   | no            |
| Blocking   | no   | recv | no            |
| Listening  | no   | yes  | no            |
| Learning   | no   | yes  | start         |
| Forwarding | yes  | yes  | yes           |

- Blocking(20s) –> Listening(15s) –> Learning(15s) –> Forwarding

* 参考
  - [mstpd/mstpd](https://github.com/mstpd/mstpd) - Multiple Spanning Tree Protocol Daemon
  - wikipedia [Spanning Tree Protocol](https://en.wikipedia.org/wiki/Spanning_Tree_Protocol)
  - wikipedia [生成树协议](https://zh.wikipedia.org/wiki/生成树协议)
  - [Linux STP 介绍](https://www.cnblogs.com/hzl6255/p/3259909.html)
  - [Linux BRIDGE-STP-HOWTO](https://tldp.org/HOWTO/BRIDGE-STP-HOWTO/)
  - [Spanning Tree Protocol](http://www.embeddedlinux.org.cn/linux_net/0596002556/understandlni-CHP-16-SECT-16.html)
  - [Linux: bridges, VLANs and RSTP](https://serverfault.com/questions/824621)

# FAQ

## 桥接网卡不使用实际网卡 Mac 地址

> 桥接网卡 MAC 地址会变导致 dhcp 获取的地址不稳定

默认选择最低 mac - 排序最前，一般虚拟网卡的 mac 会比实际的更低，导致被优先选择。

brctl addif 添加 slave 的时候也会变

1. 添加 slave 的时候记录 mac 再设置回去
2. 将虚拟网卡的 mac 设置高一点

```bash
# 1
mac=$(cat /etc/tinc/br0/address)
ip li set $IFACE master br0
ip li set br0 address $mac

# 2
ip link set $IFACE address fe:12:34:56:78:9a
```

- 参考
  - [Bridge Interface MAC address assignment](https://lists.linuxfoundation.org/pipermail/bridge/2006-January/003036.html)
  - [hansode/linux-bridge-mac-addresses-and-dynamic-ports](https://github.com/hansode/linux-bridge-mac-addresses-and-dynamic-ports)
