---
title: Quagga
tags:
  - Network
  - Routing
  - Quagga
  - OSPF
  - BGP
---

# Quagga

- [Quagga Official Site](https://www.quagga.net/)
- [Dual WAN router with dual ISP using BGP and OSPF](https://networkphil.com/2017/05/30/dual-wan-router-with-dual-isp-using-bgp-and-ospf/)
- [OSPF Configuration Examples](https://www.nongnu.org/quagga/docs/docs-multi/OSPF-Configuration-Examples.html)
- [Quagga Documentation](https://www.quagga.net/docs/quagga.html)
- [5 Best Network Simulators for Cisco Exams: CCNA, CCNP, and CCIE](https://www.cbtnuggets.com/blog/career/career-progression/5-best-network-simulators-for-cisco-exams-ccna-ccnp-and-ccie)

Do not create interfaces using Quagga. Use `/etc/network/interfaces`.

## OSPF

- seq id
- router-id
- area

ospf 1 router-id 3.3.3.3
filter-policy ip-prefix ospfin import

area 0.0.0.0
network 192.168.2.2 0.0.0.0

#

ip ip-prefix ospfin index 10 permit 4.4.4.4 24

- GNS3 Advantages:
  - Free Network Emulator
  - Simple, Easy-to-Read Documentation
  - Modifiable Active Topology
  - Multiple Connection Types
  - Community Labs

最小配置
**zebra.conf**

```
hostname Router
password zebra
enable password zebra

log stdout
```

```
hostname OSPFRouter
password ospf
enable password ospf

log stdout
```

```bash
# OSPFv2
tcpdump -i eth0 -n 'ip[9]==89'
# OSPFv3
tcpdump -i eth0 -n ip6 proto 0x59
# BGP
tcpdump -i eth0 tcp proto 179
```

KEYID identifies secret key used to create the message digest. This ID is part of the protocol and must be consistent across routers on a link.

KEY is the actual message digest key, of up to 16 chars (larger strings will be truncated), and is associated with the given KEYID.

service integrated-vtysh-config
saves each daemon-specific configuration file in a separate file. At a minimum for a daemon to start, that daemon must be enabled and its daemon-specific configuration file must be present, even if that file is empty.

/etc/quagga/Quagga.conf

telnet localhost 2601

zebra is an IP routing manager. It provides kernel routing table updates, interface lookups, and redistribution of routes between different routing protocols.

/etc/quagga
zebra.conf
/etc/quagga/vtysh.conf

routing daemons in use, and there is one manager daemon
ripd, ripngd, ospfd, ospf6d, bgpd
zebra

sudo vtysh

/etc/services

```
zebrasrv      2600/tcp                 # zebra service
zebra         2601/tcp                 # zebra vty
ripd          2602/tcp                 # RIPd vty
ripngd        2603/tcp                 # RIPngd vty
ospfd         2604/tcp                 # OSPFd vty
bgpd          2605/tcp                 # BGPd vty
ospf6d        2606/tcp                 # OSPF6d vty
ospfapi       2607/tcp                 # ospfapi
isisd         2608/tcp                 # ISISd vty
babeld        2609/tcp                 # BABELd vty
nhrpd         2610/tcp                 # nhrpd vty
pimd          2611/tcp                 # PIMd vty
ldpd          2612/tcp                 # LDPd vty
eigprd        2613/tcp                 # EIGRPd vty
bfdd          2617/tcp                 # bfdd vty
fabricd       2618/tcp                 # fabricd vty
vrrpd         2619/tcp                 # vrrpd vty
```

## ospf

default-information originate always

default-information originate always metric 10

http://livinginternet.com/i/iw_route_igp_ospf.htm

The main difference between OSPF and RIP is that RIP only keeps track of the closest router for each destination address, while OSPF keeps track of a complete topological database of all connections in the local network.

This was the first search term google returned when I pasted your question there.

To more closely answer your question, if you're maintaing a very small network, RIP is fine, if you go beyond 3 or 4 routers then perhaps look at a more advanced routing protocol like OSPF.

## iBGP
