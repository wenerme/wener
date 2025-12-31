---
title: Routing
tags:
  - Network
  - Routing
  - OSPF
  - BGP
---

# Routing

## Tips

- [Quagga](https://quagga.net)
- [FRRouting](https://frrouting.org)
- [BIRD](http://bird.network.cz/)
- OpenBGPd
- OpenOSPFd

- ABR router
  - kind of router that is located near the border between one or more Open Shortest Path First (OSPF) areas. It is used to establish a connection between backbone networks and the OSPF areas. It is a member of both the main backbone network and the specific areas to which it connects, so it stores and maintains separate routing information or routing tables regarding the backbone and the topologies of the area to which it is connected.
- [Domestic mainstream network operators international connection line brief talk](https://zhuanlan.zhihu.com/p/64467370)
- [Multicast address - Wikipedia](https://en.wikipedia.org/wiki/Multicast_address)

Multi WAN:

- [ServerFault: Multi WAN](https://serverfault.com/questions/775728)
- [Netfilter Connmark](https://home.regit.org/netfilter-en/netfilter-connmark/)
- [Multiple default gateways for outbound connections](https://unix.stackexchange.com/questions/345862/is-it-possible-to-have-multiple-default-gateways-for-outbound-connections)

- [BGP Open Source Tools: Quagga vs BIRD vs ExaBGP](https://www.bizety.com/2018/09/04/bgp-open-source-tools-quagga-vs-bird-vs-exabgp/)

## FAQ

### OSPF vs BGP

- OSPF
  - IGP
  - Internal
  - TCP
  - Port 89
  - Link State Routing
  - Fastest path over shortest path
  - For SMB networks
- BGP
  - EGP
  - External
  - IP
  - Port 179
  - Path Vector Routing
  - Best path based on data packets
  - For Large networks - Internet
- Refer
  - [What is the difference between BGP and OSPF?](https://serverfault.com/questions/185635)
  - [Difference Between OSPF and BGP](https://techdifferences.com/difference-between-ospf-and-bgp.html)

### FRR vs Quagga
