---
title: Switch
tags:
  - Network
  - Switch
  - Hardware
---

# Switch

## Tips

位于 OSI 2,3 层 Data Link/Network

1GbE 没有半双工

- [Setting up gateway using iptables and route on Linux](https://www.systutorials.com/1372/setting-up-gateway-using-iptables-and-route-on-linux/)

```bash
sysctl -w net.ipv4.ip_forward=1

iptables -t nat -A POSTROUTING ! -d 192.168.0.0/16 -o eth1 -j SNAT --to-source 1.2.3.4

iptables -t nat -A POSTROUTING ! -d 192.168.0.0/16 -o eth1 -j MASQUERADE

# However, please note that, for static IPs, SNAT is suggested

iptables -A FORWARD -i eth0 -s 192.168.0.0/24 -j ACCEPT

iptables -I FORWARD -j ACCEPT
# iptables -t nat -I POSTROUTING –out-interface wen -j MASQUERADE
```

- [OpenVSwitch, pfSense and CARP](https://forum.proxmox.com/threads/openvswitch-pfsense-and-carp.26284/)

```bash
ip ro add 192.168.8.0/22 via 10.10.0.100 dev wen

# https://github.com/brona/iproute2mac
brew install iproute2mac
```

$ iptables -L
Chain INPUT (policy ACCEPT)
target prot opt source destination
ACCEPT udp -- anywhere anywhere udp dpt:domain
ACCEPT tcp -- anywhere anywhere tcp dpt:domain
ACCEPT udp -- anywhere anywhere udp dpt:bootps
ACCEPT tcp -- anywhere anywhere tcp dpt:bootps
ACCEPT udp -- anywhere anywhere udp dpt:domain
ACCEPT tcp -- anywhere anywhere tcp dpt:domain
ACCEPT udp -- anywhere anywhere udp dpt:bootps
ACCEPT tcp -- anywhere anywhere tcp dpt:bootps

Chain FORWARD (policy DROP)
target prot opt source destination
ACCEPT all -- anywhere 192.168.122.0/24 ctstate RELATED,ESTABLISHED
ACCEPT all -- 192.168.122.0/24 anywhere
ACCEPT all -- anywhere anywhere
REJECT all -- anywhere anywhere reject-with icmp-port-unreachable
REJECT all -- anywhere anywhere reject-with icmp-port-unreachable
ACCEPT all -- anywhere 192.168.122.0/24 ctstate RELATED,ESTABLISHED
ACCEPT all -- 192.168.122.0/24 anywhere
ACCEPT all -- anywhere anywhere
REJECT all -- anywhere anywhere reject-with icmp-port-unreachable
REJECT all -- anywhere anywhere reject-with icmp-port-unreachable
DOCKER-USER all -- anywhere anywhere
DOCKER-ISOLATION all -- anywhere anywhere
ACCEPT all -- anywhere anywhere ctstate RELATED,ESTABLISHED
DOCKER all -- anywhere anywhere
ACCEPT all -- anywhere anywhere
ACCEPT all -- anywhere anywhere

Chain OUTPUT (policy ACCEPT)
target prot opt source destination
ACCEPT udp -- anywhere anywhere udp dpt:bootpc
ACCEPT udp -- anywhere anywhere udp dpt:bootpc

Chain DOCKER (1 references)
target prot opt source destination

Chain DOCKER-ISOLATION (1 references)
target prot opt source destination
RETURN all -- anywhere anywhere

Chain DOCKER-USER (1 references)
target prot opt source destination
RETURN all -- anywhere anywhere

## 如何选择

- [All Switches Products](http://www.cisco.com/c/en/us/products/switches/product-listing.html)
- [What to consider when choosing the best Ethernet switch](https://searchnetworking.techtarget.com/feature/What-to-consider-when-choosing-the-best-Ethernet-switch)
- [Cisco Switch Selector](https://www.cisco.com/c/dam/assets/prod/switches/cisco-switch-selector-how-to/index.html)
- [Network Switch 101](http://www.tomshardware.com/reviews/network-switch-basics,4123.html)
- [Backplane Speed](https://www.linkedin.com/learning/networking-foundations-network-media-wans/backplane-speed)

考虑维度:

- 尺寸
- 端口数
- 速度和可靠性

Backplane:

- 背板吞吐量
- 背板的吞吐量为所有端口速度总和

L3 Switch:

- 关心转发率
- how fast it can actually route packets
- 单位一般为 packets per second
- 吞吐量为 megabit or gigabit per second

- [Throughput vs Bandwidth](https://arstechnica.com/civis/viewtopic.php?f=10&t=1228607)

端口均具备线速转发能力

支持端口自动翻转（Auto MDI/MDIX）功能

支持MAC地址自学习；支持全双工工作模式

支持IEEE 802.3x全双工流控和Backpressure半双工流控。
网络标准 :IEEE 802.3 、IEEE 802.3u、IEEE 802.3ab、IEEE 802.3x

性能

: 存储转发
: 支持2K的MAC地址表深度
