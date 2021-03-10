---
title: PowerDNS FAQ
---

# PowerDNS FAQ

## Attempt to bind more parameters than query has

```
Backend reported permanent error which prevented lookup (GSQLBackend unable to lookup 'example.com|ANY':Attempt to bind more parameters than query has: SELECT content,ttl,prio,type,domain_id,disabled::int,name,auth::int
```

可能是 schema 不对导致的,所有的 schema 位于 [PowerDNS/pdns/modules](https://github.com/PowerDNS/pdns/tree/master/modules).

## 展开 CNAME
* v4.1.0+
* 使用 [ALIAS](https://doc.powerdns.com/authoritative/guides/alias.html) 记录
* 配置允许展开和 resolver

```ini
resolver=[::1]:5300
expand-alias=yes
```
