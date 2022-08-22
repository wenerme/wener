---
title: MiniQuery
---

# MiniQuery

SQL Where like **safe** filter expression for ORM.

**目标**

- 类似 SQL 的 Where 语法
  - 学习成本低
  - 语法友好直观 - 对比 GraphQL 和 Mongo
- 提供安全的查询 - 抽取值作为 binding 参数，避免注入
- 尽量泛化关联关系的处理
  - 例如 `profile.name = "wener"`
    - profile 可能为外部关联可能为 JSON 字段

**Raodmap**

- 利用 schema 预先校验
  - 例如 `profile.name = "wener"`
    - 如果实现支持获取 Scheme，那么可以在查询之前提前检测是否可以执行
- 实现 ACL 控制
  - 同 schema 校验逻辑，但利用 acl 信息
  - 控制可用查询 - 例如: 限制耗时高的查询

### 实现

miniquery 语法层松散，具体实现会加限制，例如 column 必须在左边，哪些函数可以用等。
根据实现的库不同，不一定所有逻辑都能暴露出来。

- java-miniquery
  - nutz - 最早实现，用于内部系统
- [go-miniquery](https://github.com/wenerme/go-miniquery)
  - gorm
  - ent - entsql, entql
- [js-miniquery](https://github.com/wenerme/js-miniquery)
  - sequelize
  - NPM ohm-grammar-miniquery

---

- 参考
  - [AIP-160](https://google.aip.dev/160) filter
    - 字段名必须在左边
