---
title: pg_prewarm
---

# pg_prewarm

- [pg_prewarm](https://www.postgresql.org/docs/current/pgprewarm.html)

```sql
CREATE EXTENSION pg_prewarm;
```

```
pg_prewarm(regclass, mode text default 'buffer', fork text default 'main',
           first_block int8 default null,
           last_block int8 default null) RETURNS int8

autoprewarm_start_worker() RETURNS void
autoprewarm_dump_now() RETURNS int8
```

- mode
  - read
    - 同步读
  - buffer
    - 读到 buffer cache
  - prefetch
    - async os request
    - 需要系统支持

**后台运行**

```ini title="postgresql.conf"
shared_preload_libraries = 'pg_prewarm'

pg_prewarm.autoprewarm = true
pg_prewarm.autoprewarm_interval = 300s
```

- autoprewarm.blocks
