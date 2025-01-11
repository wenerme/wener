---
title: mDNS
---

# mDNS

- mDNS - Multicast DNS
- mDNS Reflector
- mDNS Repeater
- mDNS 主要用于发现
- Server
  - [avahi](../service/network/avahi.md)
- 参考
  - [rfc6762](https://datatracker.ietf.org/doc/html/rfc6762) Multicast DNS
  - [Could I use avahi to publish service across subnetworks?](https://stackoverflow.com/a/21005246/1870054)
  - http://www.zeroconf.org/
  - [Using Multicast DNS to protect privacy when exposing ICE candidates](https://tools.ietf.org/id/draft-ietf-rtcweb-mdns-ice-candidates-02.html)
  - [MDNS ON A CORPORATE WI-FI NETWORK](https://wifizoo.org/2018/06/23/mdns-on-a-corporate-wifi-network/)
  - [Advantages of mDNS protocol | disadvantages of mDNS protocol](https://www.rfwireless-world.com/Terminology/Advantages-and-Disadvantages-of-mDNS-protocol.html)

mDNS 在家庭环境下很实用，很多东西能实现自动配置发现，但在企业环境下使用会有 Scale 问题。

- 所有设备需要在相同 subnet 才能发现
- 因为是 Multicast，因此在 WiFi 环境下会占用较多带宽
