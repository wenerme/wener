---
id: db-schema
title: Tenant DB Schema
---

# Database Schema for multi-tendency

## Tenant Schema vs Shared Table vs Tenant View

租户数据库设计与租户场景关系

场景 | Tenant Schema | Shared Table | Tenant View
----|----|----|----
租户多少    | 少 | 多 | 多
租户大小    | 大 | 中 | 中
租户定制    | 高 | 低 | 低
维护成本    | 中 | 低 | 中
开发成本    | 低 | 高 | 低
安全隔离    | 高 | 低 | 中

* Tenant Schema
  * 对开发友好，适用于大型强业务租户
* Shared Table
  * 适用于租户内容相对简单，但租户量特别多的场景
* Tenant View
  * 两者的一个综合，集成了两者不好的点
  * 但对开发相对友好一点

* 参考
  * [PostgreSQL's schemas for multi-tenant applications](https://stackoverflow.com/questions/44524364)