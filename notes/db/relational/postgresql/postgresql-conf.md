---
tags:
  - Configuration
---

# PostgreSQL 配置

```bash
# 使用 socket 连接 - 如果配置了 pg_hba.conf local 则不需要密码
psql -h /var/run/postgresql -U postgres -d postgres

# root -> postgres
su -l postgres -s /bin/bash

# SIGHUP 重载配置
pg_ctl reload -D /var/lib/postgresql/data/pgdata
```

- /var/run/postgresql/
  - .s.PGSQL.5432

```sql
SELECT pg_reload_conf();
```

- [Server Configuration](https://www.postgresql.org/docs/current/runtime-config.html)
- [jberkus/annotated.conf](https://github.com/jberkus/annotated.conf)
- https://pgtune.leopard.in.ua/
- https://pgpedia.info/
- https://postgresqlco.nf/doc/en/param

## SSL

- [libpq-ssl](https://www.postgresql.org/docs/current/libpq-ssl.html)
- [Secure TCP/IP Connections with SSL](https://www.postgresql.org/docs/current/ssl-tcp.html)
- 需要配置 hba 来强制 ssl
