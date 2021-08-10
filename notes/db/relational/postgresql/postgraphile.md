---
title: PostGraphile
---

# PostGraphile

- [graphile/postgraphile](https://github.com/graphile/postgraphile) 是什么？
  - GraphQL over PostgreSQL
  - 强调 DB 设计 - 先 DB 后 GraphQL
  - TypeScript+NodeJS 实现
  - 可以独立使用也可以嵌入到 NodeJS 使用
    - 官方推荐作为库使用，因为方便自定义和加插件

```bash
# https://www.graphile.org/postgraphile/usage-cli/

# 开发环境参数
postgraphile \
  --subscriptions \
  --watch \
  --dynamic-json \
  --no-setof-functions-contain-nulls \
  --no-ignore-rbac \
  --no-ignore-indexes \
  --show-error-stack=json \
  --extended-errors hint,detail,errcode \
  --append-plugins @graphile-contrib/pg-simplify-inflector \
  --export-schema-graphql schema.graphql \
  --graphiql "/" \
  --enhance-graphiql \
  --allow-explain \
  --enable-query-batching \
  --legacy-relations omit \
  --connection $DATABASE_URL \
  --schema app_public

# 生产环境
postgraphile \
  --subscriptions \
  --retry-on-init-fail \
  --dynamic-json \
  --no-setof-functions-contain-nulls \
  --no-ignore-rbac \
  --no-ignore-indexes \
  --extended-errors errcode \
  --append-plugins @graphile-contrib/pg-simplify-inflector \
  --disable-graphiql \
  --enable-query-batching \
  --disable-query-log \ # our default logging has performance issues, but do make sure you have a logging system in place!
  --legacy-relations omit \
  --connection $DATABASE_URL \
  --schema app_public
```

## embded

```js
const express = require('express');
const { postgraphile } = require('postgraphile');

const app = express();

/* Example middleware you might want to put in front of PostGraphile */
// app.use(require('morgan')(...));
// app.use(require('compression')({...}));
// app.use(require('helmet')({...}));

app.use(
  postgraphile(process.env.DATABASE_URL || 'postgres:///', 'public', {
    // ...
    pgSettings: {
      statement_timeout: '3000',
    },
  }),
);

app.listen(process.env.PORT || 3000);
```

## 最佳实践

- 外键添加索引
- RLS (Row Level Security) 如果要用建议每个表都启用
- 表授权 SELECT/DELETE，列授权 INSERT/UPDATE
  - 列授权 SELECT 会导致无法优化，不能 `SELECT *`, `RETURNING *`, 不能将行作为函数参数
- 尽量 `LANGUAGE sql`， 避免 `LANGUAGE plpgsql`
- Trigger 添加数字前缀，因为是按序执行的
  - `_200_do_a_thing` / `_800_do_something_else`

## Schema

- https://www.graphile.org/postgraphile/postgresql-schema-design/
