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
# -seq 使用序列而非时间戳 - 000001
migrate create -ext sql -dir migrations -seq create_users_table
```
