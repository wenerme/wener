---
title: PostgreSQL Replicate
---

# PostgreSQL Replication

- [PostgreSQL Replication and Automatic Failover Tutorial](https://www.enterprisedb.com/postgres-tutorials/postgresql-replication-and-automatic-failover-tutorial)

## Logical Replication

- 逻辑复制 - v10+
- SQL 语句维度
- PUBLICATION/SUBSCRIPTION
- 简单易用、内置
- 参考
  - [Logical Decoding](https://www.postgresql.org/docs/current/logicaldecoding.html)
    - 实现的内部逻辑
    - 可自行对接协议，然后实现修改 SQL 的能力

:::caution 限制

- 不能复制 DDL - schema 修改
- sequences 不会被复制
- 要求唯一主键 - 复制主键 - 没有则使用整行对比（不建议） - REPLICA IDENTITY
- 不能修改复制内容路径
  - Schema 名字、列名 必须一致
  - 分片表名字必须一致
- 不支持 Large Object

:::

```bash
ALTER SUBSCRIPTION mysub DISABLE;
ALTER SUBSCRIPTION mysub ENABLE;
```

## Streaming Replication
