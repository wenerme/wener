---
title: DNS Service
---

# DNS Service

| server        | e.g.        | for                                                     |
| ------------- | ----------- | ------------------------------------------------------- |
| DNS AS        | [pdns],bind | 提供权威 DNS 记录                                       |
| DNS Recursor  | [unbound]            | 递归从 root 开始解析                                    |
| DNS Forwarder |             | 转发到其他 server - 例如: 实现协议适配，通过 proxy 代理 |
| DNS Cache     | [dnsmasq]   | 缓存 DNS 记录 - 通常也提供 DHCP 能留                    |

[unbound]: ./unbound.md
[dnsmasq]: ./dnsmasq.md
[pdns]: ./powerdns/README.md

- DHCP 与 DNS
  - DHCP 提供 IP 管理和配置下发
  - 客户端请求带上 HOSTNAME
  - DHCP 附带的 DNS 能将 HOSTNAME 解析到 IP
- 参考
  - wikipedia [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System)
  - [Comparison of DNS server software](https://en.wikipedia.org/wiki/Comparison_of_DNS_server_software)
  - [List of DNS record types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
