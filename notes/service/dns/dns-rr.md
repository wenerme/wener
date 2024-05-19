---
title: DNS Records
---

# DNS Records

| type  | rfc           |
| ----- | ------------- |
| HTTPS | [HTTPS Draft] |

[https draft]: https://datatracker.ietf.org/doc/draft-ietf-dnsop-svcb-https


- [List of DNS record types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
- https://simpledns.plus/help/https-records
- PowerDNS [Supported Record Types](https://doc.powerdns.com/authoritative/appendices/types.html)
- Encrypted SNI/Encrypted ClientHello
- Encrypted SNI

| type  | for                | format                                                           |
| ----- | ------------------ | ---------------------------------------------------------------- |
| A     | IPv4               | `IPv4`                                                           |
| AAAA  | IPv6               | `IPv6`                                                           |
| CNAME | Canonical Name     | `CanonicalName`                                                  |
| SOA   | Start of Authority | `PrimaryNS ResponsibleParty Serial Refresh Retry Expire Minimum` |
| SRV   | Service            | `Priority Weight Port Target`                                    |
| ALIAS | Alias              | `CanonicalName`                                                  |
| TXT   | Text               | `Text`                                                           |
| HTTPS | HTTPS              | `Priority Target`                                                |

## SVCB

- SVCB - Service Binding - 服务绑定
- 通用的DNS记录类型
- 用于
  - HTTPS
  - IMAP over TLS
  - SMTP over TLS
- 参数
  - alpn
  - port
  - echconfig

## HTTPS

- SVCB 格式
- alpn
- port
- ipv4hint
- ipv6hint
- SVCB - alpn=h2,h3-19 mandatory=ipv4hint,alpn ipv4hint=192.0.2.1

```
alpn="h2,h3" ipv4hint="93.184.216.34" ipv6hint="2606:2800:220:1:248:1893:25c8:1946"
```

- 避免 HTTP/1 和 HTTP/2 的 Alt-Svc:, 直接使用 HTTP/3
- 支持
  - Apple’s iOS 14
  - Chrom 102+ https://chromestatus.com/feature/5485544526053376
  - curl
    - https://github.com/curl/curl/wiki/HTTPS-record
  - https://datatracker.ietf.org/doc/rfc9460/

## SOA

```
PrimaryNS ResponsibleParty Serial Refresh Retry Expire Minimum
```

- Primary NS（主域名服务器）- 域的主DNS服务器的名称，它拥有关于域的权威数据。
- Responsible party（负责人的电子邮件地址）- 管理域的联系人的电子邮件地址，但是通常使用“.”代替传统电子邮件地址中的“@”。
- Serial（序列号）- 该域的修订版号，每次更新域时都应该增加这个数字。
- Refresh - 从辅助服务器向主服务器查询更新的时间间隔（以秒为单位）。
- Retry - 如果辅助服务器尝试联系主服务器失败后，再次尝试的时间间隔。
- Expire - 辅助服务器在没有联系到主服务器的情况下，将其数据认为是有效的最长时间。
- Minimum TTL（最小生存时间）- 此域中所有记录的默认生存时间。

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

- K8S
  - `_port-name._port-protocol.my-svc.my-namespace.svc.cluster-domain.example`
  - https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#srv-records

## ALIAS

- 行为类似 CNAME
- pdns 可展开 ALIAS
  - `expand-alias=yes`
