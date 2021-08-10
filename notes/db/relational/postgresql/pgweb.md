---
title: pgweb
---

# pgweb

- [sosedoff/pgweb](https://github.com/sosedoff/pgweb)
  - PostgreSQL Web 管理
  - Golang, MIT
  - 0 依赖
  - 导出 CSV/JSON/XML

:::caution

- 不支持表结构修改
- 不支持数据编辑
- 不支持多 Tab

:::

```bash
pgweb --url postgres://user:password@host:port/database?sslmode=[mode]
docker run --rm -it -p 8081:8081 --name pgweb sosedoff/pgweb
```
