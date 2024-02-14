---
title: psql
---

# psql

| command        | for                      |
| -------------- | ------------------------ |
| `\c <db>`      | switch database          |
| `\dn`          | list schema              |
| `\ds`          | list relation            |
| `\dt *.*`      | list all table           |
| `\dt`          | list public schema table |
| `\du`          | list users               |
| `\dx`          | list extensions          |
| `\l`           | list database            |
| `\df[amptwS+]` | list functions           |

- a - agg
- n - normal
- p - procedure
- t - trigger
- w - window
- S - system object
- `+` - 额外信息

| flag               |
| ------------------ |
| -h,--host=hostname |
| -p,--port=port     |

```bash
brew install libpq # client only
export PATH="$(brew --prefix)/opt/libpq/bin:$PATH"

# brew install postgresql@15 #

# 使用链接字符串
psql "service=myservice sslmode=require"
psql postgresql://dbmaster:5433/mydb?sslmode=require
```

- 配合 [pgpass](./pgpass.md) 避免输入密码
- [psql](https://www.postgresql.org/docs/current/app-psql.html)
