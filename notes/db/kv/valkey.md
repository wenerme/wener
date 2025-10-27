---
title: valkey
---

# valkey

- [valkey](https://github.com/valkey-io/valkey)
  - BSD-3, C
  - placeholderkv -> valkey
  - Redis 7.2 BSD fork
- [valkey-io/valkey-glide](https://github.com/valkey-io/valkey-glide)
  - Apache-2.0, Rust, Java, Python, Go, TypeScript
  - 多语言官方 Client 库
  - core driver in **Rust**
  - npm:@valkey/valkey-glide
  - Valkey GLIDE - General Language Independent Driver for the Enterprise
  - 支持 Valkey 7.2+, Redis 6.2,7.0,7.2
  - sponsored and supported by AWS
- 参考
  - Wishlist [valkey-io/valkey#17](https://github.com/valkey-io/valkey/issues/17)

# Version

## Valkey 9.0

- HASH field ttl
  - HEXPIRE
  - HEXPIREAT
  - HEXPIRETIME
  - HGETEX
  - HPERSIST
  - HPEXPIRE
  - HPEXPIREAT
  - HPEXPIRETIME
  - HPTTL
  - HSETEX
  - HTTL
- CLuster 模式支持多 DB
- 原子 SLOT 迁移
