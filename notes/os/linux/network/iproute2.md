---
id: iproute2
title: IPRoute2
---

# IPRoute2

## Tips

- [iproute2](https://en.wikipedia.org/wiki/Iproute2)
- [Linux Advanced Routing & Traffic Control HOWTO](http://lartc.org/howto/)
- [IPROUTE2 Utility Suite Howto](http://www.policyrouting.org/iproute2.doc.html)
- [iproute2+tc notes](http://www-online.kek.jp/~yasu/ATLAS/QoS/iproute2-notes.html)
- [iproute2 cheatsheet](http://baturin.org/docs/iproute2/)
  - https://github.com/dmbaturin/iproute2-cheatsheet
- IPIP (IPv4 in IPv4), SIT (IPv6 in IPv4), IP6IP6 (IPv6 in IPv6), IPIP6 (IPv4 in IPv6), GRE (virtually anything in anything), and, in very recent versions, VTI (IPv4 in IPsec).
- [Linux BRIDGE-STP-HOWTO](https://www.tldp.org/HOWTO/BRIDGE-STP-HOWTO/index.html)
- [6. Set Up The Bridge](https://www.tldp.org/HOWTO/BRIDGE-STP-HOWTO/set-up-the-bridge.html)
- STP(Spanning Tree Protocol)即生成树协议，标准为 IEEE802.1D-1998。
  - STP 是一种二层冗余技术，利用 STA 算法构建一个逻辑上没有环路的树形网络拓扑结构，并且可以通过一定的方法实现路径冗余。
- [Linux STP 介绍](http://www.cnblogs.com/hzl6255/p/3259909.html)
- [How can I bridge two interfaces with ip/iproute2?](https://unix.stackexchange.com/q/255484/47774)
- ip, ss, bridge, rtacct, rtmon, tc, ctstat, lnstat, nstat, routef, routel, rtstat, tipc, arpd, devlink, tc
- [iproute2 rules and iptables NAT… what is the difference?](https://serverfault.com/q/135053/190601)
- [Task-centered iproute2 user guide](https://baturin.org/docs/iproute2)

| Command | Desc |
| ------- | ---- |
| ip      |
| ss      |
| tc      |

| Legacy utility | Obsoleted by               | Note                               |
| -------------- | -------------------------- | ---------------------------------- |
| ifconfig       | ip addr, ip link, ip -s    | Address and link configuration     |
| route          | ip route                   | Routing tables                     |
| arp            | ip neigh                   | Neighbors                          |
| iptunnel       | ip tunnel                  | Tunnels                            |
| nameif         | ifrename, ip link set name | Rename network interfaces          |
| ipmaddr        | ip maddr                   | Multicast                          |
| netstat        | ip -s, ss, ip route        | Show various networking statistics |

## bridge

- [docker/libnetwork#2310](https://github.com/docker/libnetwork/issues/2310) - docker 不能在不影响 docker0 的前提下使用现有的 bridge 网口
- docker network [macvlan](https://docs.docker.com/network/macvlan)

```bash
# 添加桥接
ip li add name br0 type bridge
# 添加 if
ip li set dev eth0 master br0
# 移除 if
ip li set dev eth0 nomaster
# 同时给 br0 添加多个地址可在保证网络访问的同事进行桥接
# 因为桥接, 所以 gw 的信息要手动配置
# 默认网关
ip route add 0.0.0.0/0 via 10.0.2.2

# 删除最上层的默认网关
ip ro del default

ip li set dev eth0  mtu 9000

ip route flush table main

ip route flush 172.17.0.0/16

ip route flush cache

ip -s route show cache

# greptap
# ==============================
# GRE bridging, IPsec and NFQUEUE http://backreference.org/2013/07/23/gre-bridging-ipsec-and-nfqueue/
# Layer 2 over Layer 3
#
# A
ip link add gretap0 type gretap local 172.31.0.1 remote 172.31.0.2
ip link set dev gretap0 up
ip link set dev eth0 up
brctl addbr br0
brctl addif br0 gretap0
brctl addif br0 eth0
ip addr add 10.10.10.1/24 dev br0
ip link set br0 up
# B
ip link add gretap0 type gretap local 172.31.0.2 remote 172.31.0.1
ip link set dev gretap0 up
ip link set dev eth0 up
brctl addbr br0
brctl addif br0 gretap0
brctl addif br0 eth0
ip addr add 10.10.10.2/24 dev br0
ip link set br0 up
```

## veth - Virtual Ethernet Device - 虚拟以太网设备

- [veth.4](http://man7.org/linux/man-pages/man4/veth.4.html)
- https://superuser.com/a/765078/242730

```bash
ip li add veth0 type veth
```

### 相同网口进出

```
auto eth2
iface eth2 inet static
  address 192.168.2.101
  netmask 255.255.252.0
  mtu 9000
  pre-up ip ro li tab tgbe &>/dev/null || echo '10 tgbe' >> /etc/iproute2/rt_tables
  post-up ip ru add from 192.168.2.101 table tgbe
  post-up ip ro add default via 192.168.2.1 dev eth2 table tgbe
```

## table

- Table 映射配置 `/etc/iproute2/rt_tables`

* local
  - 特殊表
  - 包含高优先的本地路由和广播地址
* main
  - 包含所有非策略路由
* default
  - 空的

```bash
# 所有路由表规则
ip route show table all
# 有效 table 列表
ip route show table all | grep -Po 'table \K[^\s]+' | sort -u

# 清除 table
ip route flush table 11
```

## rule

- routing policy database - RPDB - 路由策略数据库
- [ip-rule.8](https://man7.org/linux/man-pages/man8/ip-rule.8.html)
- 传统路由基于目标地址，策略路由可基于包的其他字段
  - 来源地址、IP 协议、端口、包内容
- rule=selector+action predicate
- 使用降序 - 数字越低越优先
- 类型
  - unicast
  - blackhole
  - unreachable
  - prohibit
  - nat

```ini
# 默认
# local = 255
0:      from all lookup local
# main = 254
32766:	from all lookup main
# default = 253
32767:	from all lookup default
```

## mark

- [iproute rt_table and mark not working on linux](https://serverfault.com/questions/733705)
- https://superuser.com/questions/950031/routing-subnet-to-specific-routing-table-with-fwmark-direct-to-isp-and-vpn

## macvlan

## FAQ

### Stateless NAT with iproute2

- [Stateless NAT with iproute2](http://linux-ip.net/html/nat-stateless.html)
