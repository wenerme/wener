---
id: db-schema
title: Tenant DB Schema
---

# Database Schema for multi-tendency

## FAQ

### Tenant Schema vs Shared Table vs Tenant View

租户数据库设计与租户场景关系

| 应用场景 | Tenant Schema<br/>租户库 | Shared Table<br/>共享表 | Tenant View<br/>租户视图 |
| -------- | ------------------------ | ----------------------- | ------------------------ |
| 租户多少 | 少                       | 多                      | 多                       |
| 租户大小 | 大                       | 中                      | 中                       |
| 租户定制 | 高                       | 低                      | 低                       |
| 维护成本 | 中                       | 低                      | 中                       |
| 开发成本 | 低                       | 高                      | 低                       |
| 安全隔离 | 高                       | 低                      | 中                       |

- Tenant Schema
  - 对开发友好，适用于大型强业务租户
  - 租户多时 Schema 升级难
- Shared Table
  - 适用于租户内容相对简单，但租户量特别多的场景
  - 单一 Schema，结构维护简单，但只能使用同一版本结构，不能定制表列
- Tenant View
  - 依赖 DB 特性，例如 PG 的可写视图，MySQL 不支持这种模式
  - 两者的一个综合，集成了两者不好的点
  - 但对开发相对友好一点
  - 定制化可通过表的 JSON 字段，在 租户视图 中作为列，但无法更新 - 实现更新可以使用 trigger 或 rule，但相对麻烦
  - 定制化也可以通过 JOIN 外部表实现
- 参考
  - [PostgreSQL's schemas for multi-tenant applications](https://stackoverflow.com/questions/44524364)
  - [Designing your SaaS Database for Scale with Postgres](https://docs.citusdata.com/en/latest/articles/designing_saas.html)
