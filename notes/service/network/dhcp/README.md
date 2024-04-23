---
title: DHCP
tags:
  - RFC
  - Protocol
---

# DHCP

- BOOTP - Bootstrap Protocol - 引导协议
  - 不支持 IP 分配
- DHCP - Dynamic Host Configuration Protocol - 动态主机配置协议
  - 前身为 BOOTP
  - 1993年10月 成为标准协议
- 参考
  - [RFC 2131](https://tools.ietf.org/html/rfc2131) - Dynamic Host Configuration Protocol
    - 1997
  - [RFC 2132](https://tools.ietf.org/html/rfc2132) - DHCP Options and BOOTP Vendor Extensions
    - 1997
  - [RFC 3315](https://tools.ietf.org/html/rfc3315) - Dynamic Host Configuration Protocol for IPv6 (DHCPv6)
    - 2003
  - wikipedia [动态主机设置协议](https://zh.wikipedia.org/wiki/动态主机设置协议)

| option | for                      |
| ------ | ------------------------ |
| 3      | Router / Gateway         |
| 6      | DNS / Domain Name Server |

- [DHCP & BOOTP Parameters](https://www.iana.org/assignments/bootp-dhcp-parameters/bootp-dhcp-parameters.xhtml)
