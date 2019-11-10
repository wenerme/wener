# PowerDNS FAQ

## Attempt to bind more parameters than query has

```
Backend reported permanent error which prevented lookup (GSQLBackend unable to lookup 'example.com|ANY':Attempt to bind more parameters than query has: SELECT content,ttl,prio,type,domain_id,disabled::int,name,auth::int
```

可能是 schema 不对导致的,所有的 schema 位于 [PowerDNS/pdns/modules](https://github.com/PowerDNS/pdns/tree/master/modules).
