---
title: DNS Records
---

# DNS Records

| type  | rfc           |
| ----- | ------------- |
| HTTPS | [HTTPS Draft] |

[https draft]: https://datatracker.ietf.org/doc/draft-ietf-dnsop-svcb-https

- HTTPS
  - Apple’s iOS 14
  - Chrom 102+ https://chromestatus.com/feature/5485544526053376
- [List of DNS record types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
- https://simpledns.plus/help/https-records
- PowerDNS [Supported Record Types](https://doc.powerdns.com/authoritative/appendices/types.html)
- Encrypted SNI/Encrypted ClientHello
- Encrypted SNI

## SRV

- `_SERVICE._PROTOCOL.example.com`
  - SERVICE - ldap
  - PROTOCOL - tcp, udp
  - SRV - `priority weight port target`
- https://tools.ietf.org/html/rfc2782
- Asterisk
  - srvlookup

```
_postgresql.sql.example.com TXT "v=PGSQL1;d=mydb;u=myuser"

_sip._udp.sip.example.com SRV "10 100 5060 s1.sip.example.com"
```

## ALIAS

- 行为类似 CNAME
- pdns 可展开 ALIAS
  - `expand-alias=yes`
