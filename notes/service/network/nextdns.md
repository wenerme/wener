---
title: NextDNS
---

# NextDNS

- DoH 代理客户端 [nextdns/nextdns](https://github.com/nextdns/nextdns)

| conf     | value                                             |
| -------- | ------------------------------------------------- |
| IPv4     | 45.90.28.53<br/>45.90.30.53                       |
| DoT/QUIC | `<ID>.dns.nextdns.io`                             |
| DoH      | `https://dns.nextdns.io/<ID>`                     |
| IPv6     | `2a07:a8c0::<ID>:<ID>`<br/>`2a07:a8c1::<ID>:<ID>` |

**dnsmasq**

```conf
no-resolv
bogus-priv
strict-order
server=2a07:a8c1::
server=45.90.30.0
server=2a07:a8c0::
server=45.90.28.0
add-cpe-id=<ID>
```
