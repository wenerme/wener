---
title: pgpass
---

# pgpass

- ~/.pgpass
- `%APPDATA%\postgresql\pgpass.conf`
- PGPASSFILE
- 参考
  - https://www.postgresql.org/docs/current/libpq-pgpass.html


```
hostname:port:database:username:password
```

- hostname:port:database:username 可以为 `*` 通配
  - 更具体的放在前面

```bash
touch ~/.pgpass
chmod 0600 ~/.pgpass
```

