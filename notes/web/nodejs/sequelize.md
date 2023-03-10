---
title: sequelize
---

# sequelize

- [sequelize/sequelize](https://github.com/sequelize/sequelize)
- [src/query-types.ts](https://github.com/sequelize/sequelize/blob/main/src/query-types.ts)
- [依赖](https://deps.dev/npm/sequelize)
  - [dottie](https://github.com/mickhansen/dottie.js)
    - 对象路径
  - [validator](https://github.com/validatorjs/validator.js)
    - 验证
  - inflection, lodash, moment
- 参考
  - v7
    - sequelize -> @sequelize/core
    - nodejs 14+, ts 4.4+
  - [demopark/sequelize-docs-Zh-CN](https://github.com/demopark/sequelize-docs-Zh-CN)
    - https://demopark.github.io/sequelize-docs-Zh-CN/
  - [umzug](https://github.com/sequelize/umzug)
    - migration
  - [sequelize-auto](https://github.com/sequelize/sequelize-auto)
    - db schema -> sequelize schema
  - [sequelize-cli](https://github.com/sequelize/cli)
  - https://sequelize.org/docs/v7/other-topics/resources/
  - [sequelize/sequelize-typescript](https://github.com/sequelize/sequelize-typescript)
    - 注解支持 - 类似 typeorm
    - 会合并到 v7 [#15334](https://github.com/sequelize/sequelize/issues/15334)
- used by
  - [nocobase](https://github.com/nocobase/nocobase)
  - [atulmy/crate](https://github.com/atulmy/crate)

```bash
# v7
npm add @sequelize/core
```

```ts
export enum QueryTypes {
  SELECT = 'SELECT',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  BULKUPDATE = 'BULKUPDATE',
  BULKDELETE = 'BULKDELETE',
  DELETE = 'DELETE',
  UPSERT = 'UPSERT',
  VERSION = 'VERSION',
  SHOWTABLES = 'SHOWTABLES',
  SHOWINDEXES = 'SHOWINDEXES',
  DESCRIBE = 'DESCRIBE',
  RAW = 'RAW',
  FOREIGNKEYS = 'FOREIGNKEYS',
  SHOWCONSTRAINTS = 'SHOWCONSTRAINTS',
}
```

:::caution

- 不支持组合外键 [#311](https://github.com/sequelize/sequelize/issues/311)
- 处于 v6 -> v7 阶段
  - v7 Typescript 更好
  - 但 v7 还是 alpha 阶段
- 不支持 better-sqlit3 [#11400](https://github.com/sequelize/sequelize/issues/11400)
- 关联 many 查询不能 limit [#1897](https://github.com/sequelize/sequelize/issues/1897)
- 不支持 deno [#12836](https://github.com/sequelize/sequelize/issues/12836)
- RFC Decorators [#14298](https://github.com/sequelize/sequelize/issues/14298)
  - Status [#15334](https://github.com/sequelize/sequelize/issues/15334)

:::

:::tip

- Ability to get raw sql query [#2325](https://github.com/sequelize/sequelize/issues/2325)

:::

## builkUpsert

```ts
Model.bulkCreate([], { updateOnDuplicate: ['user_id', 'token', 'created_at'] });
```

## sequelize-cli

- 不支持 typescript
  https://github.com/sequelize/cli/issues/328

```bash
npm add sequelize
npm add -D sequelize-cli

# config/config.json
# models
# migrations
# seeders
npx sequelize init

# 生成模型
# 会生成 migrations
npx sequelize model:create --name User --attributes name:string,state:boolean,birth:date,card:integer,role:enum:'{Admin,Guest}'
```

```json title="config/config.json"
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- --env
  - development
  - test
  - production
- --url

## API

- order

## The number NaN cannot be converted to a BigInt because it is not an integer

- https://github.com/sequelize/sequelize/issues/1774
