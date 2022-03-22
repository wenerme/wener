---
title: PowerDNS FAQ
tags:
  - FAQ
---

# PowerDNS FAQ

## Attempt to bind more parameters than query has

```
Backend reported permanent error which prevented lookup (GSQLBackend unable to lookup 'example.com|ANY':Attempt to bind more parameters than query has: SELECT content,ttl,prio,type,domain_id,disabled::int,name,auth::int
```

可能是 schema 不对导致的,所有的 schema 位于 [PowerDNS/pdns/modules](https://github.com/PowerDNS/pdns/tree/master/modules).

## 展开 CNAME

- v4.1.0+
- 使用 [ALIAS](https://doc.powerdns.com/authoritative/guides/alias.html) 记录
- 配置允许展开和 resolver

```ini
resolver=[::1]:5300
expand-alias=yes
```

### TSIG is provided, but domain is not secured with TSIG. Processing continues

- 通过 nsupdate 修改 - 操作会成功
- zone 允许 tsig - 但未通过 tsig 加密

## validates as Bogus

DNSSEC 验证失败 - DNS 污染

```
Dec 04 16:00:22 Answer to google.com|A for 127.0.0.1:50371 validates as Bogus
```
