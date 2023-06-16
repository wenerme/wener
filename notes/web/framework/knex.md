---
title: knex
---

# knex

- [knex](https://github.com/knex/knex)
  - composite - 解耦构建最终 query 的过程
  - 对于基础的访问模式提供跨库支持
- knex-types 基于 db schema 生成 ts
- 参考
  - https://michaelavila.com/knex-querylab/
    - Knex to SQL

# FAQ

## raw in

- 用 `=any(?)`
- pg 的 in 不支持 array
- https://github.com/knex/knex/issues/2053#issuecomment-300523807
- https://github.com/knex/knex/issues/1537#issuecomment-281888969
- https://github.com/knex/knex/issues/1537
