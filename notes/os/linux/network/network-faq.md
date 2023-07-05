---
title: 网络常见问题
tags:
  - FAQ
---

# 网络常见问题

## Tuning

```bash
sysctl net.ipv4.tcp_{,r,w}mem net.core.rmem_{default,max} net.core.wmem_{default,max} net.core.optmem_max
```

| item                  | value/alpine         | for        | tune                 | as          |
| --------------------- | -------------------- | ---------- | -------------------- | ----------- |
| net.ipv4.tcp_mem      | 189234 252315 378468 |
| net.ipv4.tcp_rmem     | 4096 131072 6291456  | 4k 128k 6m | 10240 88064 12582912 | 10k 86k 12m |
| net.ipv4.tcp_wmem     | 4096 16384 4194304   | 4k 16k 4m  | 10240 88064 12582912 | 10k 86k 12m |
| net.core.rmem_default | 212992               | 218 k      |
| net.core.rmem_max     | 212992               | 218 k      | 12582912             | 12m         |
| net.core.wmem_default | 212992               | 218 k      |
| net.core.wmem_max     | 212992               | 218 k      | 12582912             | 12m         |
| net.core.optmem_max   | 20480                |

```
net.ipv4.tcp_wmem= 10240 88064 12582912
net.ipv4.tcp_rmem= 10240 88064 12582912
net.core.rmem_max= 12582912

net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_timestamps = 1
net.ipv4.tcp_sack = 1
net.ipv4.tcp_no_metrics_save = 1
net.core.netdev_max_backlog = 5000
```

- [rfc1323](https://datatracker.ietf.org/doc/html/rfc1323),[rfc7323](https://datatracker.ietf.org/doc/html/rfc7323)
  - tcp_window_scaling
  - tcp_timestamps - 2: Like 1, but without random offsets.
- RFC1122
- RFC1323
- RFC1337
- RFC1620
- RFC1700
- RFC1812
- RFC2236
- RFC2461
- RFC2861
- RFC3041
- RFC3069
- RFC3168
- RFC3376
- RFC3493
- RFC3704
- RFC3758
- RFC3810
- RFC4191
- RFC4429
- RFC4821
- RFC4861
- RFC5061
- RFC5682
- RFC5961
- RFC6437
- RFC6438
- RFC6636
- RFC6675
- RFC6691
- RFC6724
- RFC6980
- RFC7217
- RFC7413
- RFC7527
- RFC7690
- RFC7829
- 三值分别为 最小，初始，最大 - min,initial,max
- [bbr](./bbr.md)
- https://www.cyberciti.biz/faq/linux-tcp-tuning/
- https://github.com/lucas-clemente/quic-go/wiki/UDP-Receive-Buffer-Size
- https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt

<!--
RFCs
copy(Array.from(new Set([...document.body.innerText.matchAll(/rfc\s*\d+/ig)].map(v=>v[0].replace(/\s+/,'').toUpperCase()))).sort().join('\n'))
-->

## VTI vs XFRM

> XFRM 比 VTI 更好

- VTI - Linux 3.6+
  - L3 通道，指定终端地址
  - 单地址族
  - 只支持通道模式
- XFRM - Linux 4.19+
  - 不需要配置通道地址
    - 避免 VTI SAs:interface 的 1:1 关系
    - SAs peers 共享 interface
  - 同时支持 IPv4 IPv6
  - 支持包括通道的其他模式
  - XFRM interface ID 配置
    - 避免 GRP key 和 XFRM mark 配置

---

- 参考
  - [RouteBasedVPN](https://wiki.strongswan.org/projects/strongswan/wiki/RouteBasedVPN)

## VPN vs Mesh Network

- VPN
  - 通常指传统 VPN - 例如 OpenVPN, IPSec
  - 所有 Endpoint 连上一个 Server, 网络通过指定的节点出
  - 多为 Client, Server 模式
  - 多面消费端 - Consumer
- Mesh Network
  - 用于组建私有网络的技术 - VPN
  - 点对点直连
  - 多为平等节点关系 - Server to Server
  - 多用于基础网络建设

## bridge vs macvlan

- bridge
  - 完整功能
  - 会学习 Mac 地址
  - 会内部转发匹配 Mac 的包
- macvlan
  - 可理解为简单的 bridge
  - 不会学习 Mac 地址，不会内部转发 - 因此稍微会快一点，内存少一点
- [Bridge vs Macvlan](https://hicu.be/bridge-vs-macvlan)

## DROP vs REJECT

:::tip

建议使用 REJECT

:::

- DROP - 不处理直接丢包
  - TCP 会超时
    - TCP 会发起多次，因为 TCP 本身协议可靠会重复发包
  - UDP 认为服务端已经接收
  - 针对恶意攻击会耗费更多客户端资源
    - 但专业的工具一般不受影响
- REJECT 返回失败 - 客户端接收到无法到达
  - 通过 ICMP 返回
  - 可以包含原因
  - 对于恶意攻击可嗅探则会立即返回增加检测速度
  - 用户体验会更好

## mangle vs nat

- 两者都是操作、修改包
- mangle 先于 nat
- mangle
  - 服务类型
  - TTL
  - Mark
  - POSTROUTING 在路由决策之前，因此 mark 标记进入不同的路由表比较重要
- nat
  - 地址转换

## MASQUERADE vs SNAT

> 两者都做 来源地址转换 - Source NAT

- SNAT
  - 固定目标 IP - `--to-source`
- MASQUERADE
  - 动态地址
  - 比 SNAT 慢 - 每个包都需要检测应该使用的地址

```bash
iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -o eth0 -j SNAT --to-source 192.168.8.2
```

## Nginx/HAProxy 端口转发 vs IPTables 端口转发

- IPTables
  - 性能最好
  - 不中断
- Nginx/HAProxy
  - 应用层功能更强

## ifconfig eth0:0 语法

- 是 ifconfig 支持多 ip 的写法，等同于 iproute2 的 `ip addr add`
- 后面的名字是地址的标签, linux 2.0 网络别名, 以设备名字+`:`为开头, 最长 15
- ip addr add 没有标签 ifconfig 则不会显示

```bash
ifconfig eth0:0 192.168.1.2 netmask 255.255.255.0
# 对等语法
ip addr add 192.168.1.2/24 dev eth0 label eth0:0
```

- 参考
  - [ip-address.8](http://manpages.ubuntu.com/manpages/hirsute/en/man8/ip-address.8.html)

## ping: sendto: Invalid argument

## ping Destination Host Unreachable

## IPVS vs IPTables

- IPVS
  - 支持 ping 虚拟 IP
  - 链接 O(1) 处理复杂度 - 不受 节点/服务/Pod 数量影响
  - 支持更多的调度算法
  - 处理流程不同于 iptables
    - 很难配合其他 iptabels 规则
- IPTables
  - 针对 防火墙 设计
  - LB 通过 NAT pre-routing 实现
  - 生态更好
  - O(n) 处理复杂度
    - 在 1000+ 服务时可能会有一点影响
    - keepalive 可减少影响 - 因为 conntrack，不再走规则匹配

---

- https://www.tigera.io/blog/comparing-kube-proxy-modes-iptables-or-ipvs/

## ss netstat 看不到进程

```bash
# 看不到进程
sudo ss -lutp | grep 8472
# -e 显示扩展信息 - 会看到在 cgroup 里 cgroup:/k3s
sudo ss -lutpe | grep 8472

# 获取 8472 对应的 inode - 然后可以用过 inode 反查
INODE=$(sudo ss -lutpe | grep 8472 | grep -Eo 'ino:\d+' | grep -Eo '\d+')

# lsof 看不到 PORT
sudo lsof 2>/dev/null -nPi UDP | head
```

- https://serverfault.com/a/847910/190601

## mlx4_en link ifdown

- 注意线材长度

```bash
lspci | grep Mel
ip li show eth4
lsmod | grep mlx | sort

sudo dmesg -t | grep mlx
sudo lspci -vv -s 04:00.0

ethtool --show-priv-flags eth4
```

```
Mellanox Technologies MT26448
Part number: MNPA19-XTR
```

- `options mlx4_core debug_level=1`
- MNPA19-XTR
  - Mellanox ConnectX-2 EN

```bash
# 没问题
# Broadcom Inc. and subsidiaries NetXtreme II BCM57810 10 Gigabit Ethernet
# 有问题
# Mellanox Technologies MT26448 [ConnectX EN 10GigE, PCIe 2.0 5GT/s]
lspci | grep 'Ethernet controller'
```

**问题**

```bash
ethtool eth4
```

**Not Working**

```
Supported ports: [ FIBRE ]
Supported link modes:   10000baseT/Full
Supported pause frame use: No
Supports auto-negotiation: No
Supported FEC modes: Not reported
Advertised link modes:  10000baseT/Full
Advertised pause frame use: No
Advertised auto-negotiation: No
Advertised FEC modes: Not reported
Speed: 10000Mb/s
Duplex: Full
Auto-negotiation: off
Port: FIBRE
PHYAD: 0
Transceiver: internal
Supports Wake-on: d
Wake-on: d
Current message level: 0x00000014 (20)
                        link ifdown
Link detected: yes
```

- Auto-negotiation: **off**

```bash
ethtool -s eth4 autoneg on
```

```
netlink error: link settings update failed
netlink error: Invalid argument
```

**Working**

```
Supported ports: [ FIBRE ]
Supported link modes:   1000baseT/Full
                        10000baseT/Full
Supported pause frame use: Symmetric Receive-only
Supports auto-negotiation: No
Supported FEC modes: Not reported
Advertised link modes:  10000baseT/Full
Advertised pause frame use: No
Advertised auto-negotiation: No
Advertised FEC modes: Not reported
Speed: 10000Mb/s
Duplex: Full
Auto-negotiation: off
Port: Direct Attach Copper
PHYAD: 1
Transceiver: internal
Supports Wake-on: g
Wake-on: g
Current message level: 0x00000000 (0)

Link detected: yes
```

## Wake-on

```bash
ethtool -s $IFACE wol g
```

```
wol p|u|m|b|a|g|s|d...
          Set Wake-on-LAN options.  Not all  devices  support  this.   The
          argument  to  this  option  is a string of characters specifying
          which options to enable.
          p  Wake on phy activity
          u  Wake on unicast messages
          m  Wake on multicast messages
          b  Wake on broadcast messages
          a  Wake on ARP
          g  Wake on MagicPacket(tm)
          s  Enable SecureOn(tm) password for MagicPacket(tm)
          d  Disable (wake on nothing).  This option clears  all  previous
             options.
```

- Wake on Wireless (WoWLAN, WoW)
- Wake-on-LAN (WoL or WOL)
- Supports Wake-on: d
  - 不支持
- https://man7.org/linux/man-pages/man8/ethtool.8.html
- https://wiki.archlinux.org/title/Wake-on-LAN
