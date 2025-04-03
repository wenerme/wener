---
title: Kysely
tags:
  - QueryBuilder
---

# kysely

:::caution kysely 不能平替 knex.js

- knex 会尝试适配不同 dialect, 提供相同的语义
  - e.g. MSSQL 可以使用 limit
  - 因此 knex 相对更复杂
- kysely 要求用户自己熟悉各种 SQL 语法
  - e.g. MSSQL 使用 top, 虽然有 limit 接口，但是生成的语法是错误的
  - kysely 实现更简单, 功能更多
- 一般来说影响不大，不太可能存在需要替换底层实现数据库的情况，除非
  - 本身希望实现 adapter
  - 实现公共 utils

:::

- [kysely-org/kysely](https://github.com/kysely-org/kysely)
  - MIT, TS
  - type-safe typescript SQL query builder
  - inspired by [Knex.js](./knex.md)
  - 支持迁移
- 参考
  - [mikro-orm#5646](https://github.com/mikro-orm/mikro-orm/discussions/5646)
    - 在尝试往 kysely 迁移
