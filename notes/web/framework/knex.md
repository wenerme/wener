---
title: knex
---

# knex

- [knex](https://github.com/knex/knex)
  - composite - 解耦构建最终 query 的过程
  - 对于基础的访问模式提供跨库支持
- knex-types 基于 db schema 生成 ts
- 参考
  - [kysely](./kysely.md)
  - [Knex QueryLab](https://michaelavila.com/knex-querylab/)
    - Knex to SQL
- pool
  - **默认** `min: 2, max: 10`
  - 推荐 min 0
  - 使用 [vincit/tarn.js](https://github.com/vincit/tarn.js)

```js
const pool = new Pool({
  // 最小 2 - 推荐 0
  min: 2,

  // 最大 - 根据场景性能要求调整
  max: 10,

  // acquire promises are rejected after this many milliseconds
  // if a resource cannot be acquired
  acquireTimeoutMillis: 30000,

  // create operations are cancelled after this many milliseconds
  // if a resource cannot be acquired
  createTimeoutMillis: 30000,

  // destroy operations are awaited for at most this many milliseconds
  // new resources will be created after this timeout
  destroyTimeoutMillis: 5000,

  // Free resources are destroyed after this many milliseconds.
  // Note that if min > 0, some resources may be kept alive for longer.
  // To reliably destroy all idle resources, set min to 0.
  idleTimeoutMillis: 30000,

  // how often to check for idle resources to destroy
  reapIntervalMillis: 1000,

  // how long to idle after failed create before trying again
  createRetryIntervalMillis: 200,

  // If true, when a create fails, the first pending acquire is
  // rejected with the error. If this is false (the default) then
  // create is retried until acquireTimeoutMillis milliseconds has
  // passed.
  propagateCreateError: false,
});
```

```ts
const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: 'test.sqlite3',
  },
  useNullAsDefault: true,
});
db.raw('PRAGMA journal_mode = WAL');
```

# FAQ

## raw in

- 用 `=any(?)`
- pg 的 in 不支持 array
- [knex/knex#2053 (comment)](https://github.com/knex/knex/issues/2053#issuecomment-300523807)
- [knex/knex#1537 (comment)](https://github.com/knex/knex/issues/1537#issuecomment-281888969)
- [knex/knex#1537](https://github.com/knex/knex/issues/1537)

## Reference Snippets

[knex/knex#3186](https://github.com/knex/knex/issues/3186)

Crossdb support for INSERT ... ON CONFLICT / MERGE upsert

[Medium Response](https://medium.com/p/bf410349856c/responses/show)

- knex 的核心理念是 composite - 解耦构建最终 query 的过程
- 对于基础的访问模式提供跨库支持

* knex-types 基于 db schema 生成 ts
