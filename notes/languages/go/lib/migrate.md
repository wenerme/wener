---
title: migrate
---

# migrate

- [golang-migrate/migrate](https://github.com/golang-migrate/migrate)
  - DB 迁移工具
  - 可当做库来使用
  - 支持较多的 Source 和 数据库

```bash
# 创建 sql 文件
migrate create -ext sql -dir db/migrations -seq create_users_table
```
