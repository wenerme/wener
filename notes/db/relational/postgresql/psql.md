---
title: psql
---

# psql

| command   | for                      |
| --------- | ------------------------ |
| `\l`      | list database            |
| `\c <db>` | switch database          |
| `\dt`     | list public schema table |
| `\dt *.*` | list all table           |
| `\ds`     | list relation            |
| `\dn`     | list schema              |

| flag               |
| ------------------ |
| -h,--host=hostname |
| -p,--port=port     |

```bash
# 使用链接字符串
psql "service=myservice sslmode=require"
psql postgresql://dbmaster:5433/mydb?sslmode=require
```

- [psql](https://www.postgresql.org/docs/current/app-psql.html)
