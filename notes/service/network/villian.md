---
title: Villian
---

# Villian

| ip                                              | desc           | detail                             | last seen |
| ----------------------------------------------- | -------------- | ---------------------------------- | --------- |
| 45.134.144.12                                   | VoIP/SIP       | INVITE sip:0067570895619@host      | 2021-3-31 |
| 101.251.200.196                                 | VoIP/SIP       | OPTIONS sip:test1@x.x.x.x          | 2021-3-31 |
| 51.89.20.196<br/>94.26.116.94<br/>89.190.156.53 | sip scanner    | OPTIONS sip:100@51.89.20.196:16700 | 2021-3-31 |
| 176.58.72.188                                   | VoIP/Port scan | UDP 0d0a                           | 2021-3-31 |
| 222.64.7.50                                     | VoIP/Port scan | UDP 0d0a                           | 2021-3-31 |

- 5060/udp 0d0a0d0a - 正常客户端 keepalive 应该也会发
  - 0d0a - CRLF

```bash
# wireshark filter
!(ip.addr == 45.134.144.12 || ip.addr == 176.58.72.188 || ip.addr == 222.64.7.50)
```
