---
title: 桥接网络
---

# Bridge

- [networking/bridge](https://wiki.linuxfoundation.org/networking/bridge)
- 工作类似 Switch
- L2 learning and forwarding
- STP
  - 让多路能正常工作

```interfaces
auto eth0
iface eth0 inet manual

auto br0
iface br0 inet dhcp
	bridge-ports eth0
	bridge-stp on
  # 自定义 mac 确保 dhcp 稳定
	# bridge-hw 00:00:00:00:00:00
```

```bash
# ip link set dev $IFACE type bridge ageing_time $IF_BRIDGE_AGEING
# brctl setageing

# ip link set dev $IFACE type bridge priority $IF_BRIDGE_BRIDGEPRIO
# brctl setbridgeprio

# ip link set dev $IFACE type bridge forward_delay $IF_BRIDGE_FD
# brctl setfd

# ip link set dev $IFACE type bridge hello_time $IF_BRIDGE_HELLO
# brctl sethello

# ip link set dev $IFACE type bridge max_age $IF_BRIDGE_MAXAGE
# brctl setmaxage

# bridge link set dev $IFACE cost $IF_BRIDGE_PATHCOST
# brctl setpathcost

# bridge link set dev $IFACE priority $IF_BRIDGE_PORTPRIO
# brctl setportprio

# ip link set dev $IFACE type bridge stp $(yesno $IF_BRIDGE_STP)
brctl stp br0 off

# vlan
# ip link set dev $IFACE type bridge vlan_filtering $(yesno $IF_BRIDGE_VLAN_AWARE)

#
brctl showmacs br0
brctl showstp br0
```

| brctl setATTR **br** _val_      | for                                        |
| ------------------------------- | ------------------------------------------ |
| setageing bridge time           | Set ageing time                            |
| setbridgeprio bridge prio       | Set bridge priority (between 0 and 65535)  |
| setfd bridge time               | Set bridge forward delay                   |
| sethello bridge time            | Set hello time                             |
| setmaxage bridge time           | Set max message age                        |
| setgcint bridge time            | Set garbage collection interval in seconds |
| sethashel bridge int            | Set hash elasticity                        |
| sethashmax bridge int           | Set hash max                               |
| setmclmc bridge int             | Set multicast last member count            |
| setmcrouter bridge int          | Set multicast router                       |
| setmcsnoop bridge int           | Set multicast snooping                     |
| setmcsqc bridge int             | Set multicast startup query count          |
| setmclmi bridge time            | Set multicast last member interval         |
| setmcmi bridge time             | Set multicast membership interval          |
| setmcqpi bridge time            | Set multicast querier interval             |
| setmcqi bridge time             | Set multicast query interval               |
| setmcqri bridge time            | Set multicast query response interval      |
| setmcqri bridge time            | Set multicast startup query interval       |
| setpathcost bridge port cost    | Set path cost                              |
| setportprio bridge port prio    | Set port priority (between 0 and 255)      |
| setportmcrouter bridge port int | Set port multicast router                  |
| sethashel bridge int            | Set hash elasticity value                  |

**bridge**

- [bridge.8](https://man7.org/linux/man-pages/man8/bridge.8.html)
- fdb - Forwarding Database
- mdb - Multicast group database
- BPDU
- link
  - hwmode
    - vepa
    - veb - 硬件 bridge

```bash
bridge li   # link show
bridge fdb  # fdb show
bridge mdb  # mdb show
bridge vlan # vlan show

bridge monitor
```

## STP

- master 每 2s 发送一次 “心跳”/hello 包 `0180c2000000`
- slave 接收到包
  - 20s 内没收到，则认为 master down
  - 30s 内建立好新的 stp - 作为 master
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
- 参考
  - [mstpd/mstpd](https://github.com/mstpd/mstpd) - Multiple Spanning Tree Protocol Daemon
  - wikipedia [Spanning Tree Protocol](https://en.wikipedia.org/wiki/Spanning_Tree_Protocol)
  - wikipedia [生成树协议](https://zh.wikipedia.org/wiki/生成树协议)
  - [Linux STP 介绍](https://www.cnblogs.com/hzl6255/p/3259909.html)
  - [Linux BRIDGE-STP-HOWTO](https://tldp.org/HOWTO/BRIDGE-STP-HOWTO/)
  - [Spanning Tree Protocol](http://www.embeddedlinux.org.cn/linux_net/0596002556/understandlni-CHP-16-SECT-16.html)
  - [Linux: bridges, VLANs and RSTP](https://serverfault.com/questions/824621)

# FAQ

## bridge vs bonding active-backup

- bonding - 用于聚合链路
  - 聚合 - 使用同质的链路
    - 多个链路并行工作
  - active-backup - 可能使用非同质链路 - wlan0+eth0 - eth0 作为 primary
    - 检测链路状态 - 切换时间短
- bridge - 用于学习和转发
  - members 可以是虚拟链路，可以是物理链路
  - STP - 学习需要时间 - 默认前后加起来 50s - 可能更长
  - 理论上来说也能实现 bonding active-backup 的效果

## 桥接网卡不使用实际网卡 Mac 地址

> 桥接网卡 MAC 地址会变导致 dhcp 获取的地址不稳定

默认选择最低 mac - 排序最前，一般虚拟网卡的 mac 会比实际的更低，导致被优先选择。

brctl addif 添加 slave 的时候也会变

1. 添加 slave 的时候记录 mac 再设置回去
2. 将虚拟网卡的 mac 设置高一点

- 推荐

```bash
# 方法 1
mac=$(cat /etc/tinc/br0/address)
ip li set $IFACE master br0
ip li set br0 address $mac

# 方法 2
ip link set $IFACE address fe:12:34:56:78:9a
```

- 参考
  - [Bridge Interface MAC address assignment](https://lists.linuxfoundation.org/pipermail/bridge/2006-January/003036.html)
  - [hansode/linux-bridge-mac-addresses-and-dynamic-ports](https://github.com/hansode/linux-bridge-mac-addresses-and-dynamic-ports)

## tinc 节点避免 mac 冲突

设置高 mac

```bash
ip li set $INTERFACE address fe:fe:12:34:56:78
ip li set $INTERFACE master br0
ip li set $INTERFACE up
ip addr add 10.10.1.1/16 dev br0
```

## received packet on bond0 with own address as source address

影响不大的 log 信息

## bridge: filtering via arp/ip/ip6tables is no longer available by default

- 只是 info log，以前 modprobe bridge 会提供的功能现在需要 modprobe br_netfilter

```
bridge: filtering via arp/ip/ip6tables is no longer available by default. Update your scripts to load br_netfilter if you need this.
```
