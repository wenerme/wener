---
title: TLS
---

# TLS

- TLS - Transport Layer Security
- ECH - Encrypted Client Hello
- Redis 支持 TLS
  - `redis-cli -u "rediss://default:$REDIS_PASSWORD@redis.example.com:443" --sni redis.example.com info`
- Postgres 17 支持 TLS
  - PG17 支持 `?sslnegotiation=direct&sslmode=require`
    - alpn postgresql
    - https://www.postgresql.org/docs/17/protocol-flow.html#PROTOCOL-FLOW-SSL
  - 旧版本 应用层实现的 SSL
  - PJJDBC v42.7.4
  - https://github.com/pgjdbc/pgjdbc/blob/master/pgjdbc/src/main/java/org/postgresql/PGProperty.java#L696
- SSH 不支持 TLS
  - 使用的应用层协议
- https://docs.kernel.org/networking/tls.html
- 不支持 TLS 的可以使用 stunnel/frp 等 tunnel - 但是需要额外运维
