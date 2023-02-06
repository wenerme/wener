---
title: Nodejs Awesome
tags:
  - Awesome
---

# Nodejs Awesome

:::tip

- 最好选择 TypeScript 开发的或支持 TypeScript 的
- TypeScript 的 decorator 比 Java 的 Annotation 弱得多
  - 不支持获取字段实际类型信息 - 因为不存在这样的信息

:::

:::caution Nodejs 后端开发不太活跃

最近一两年 (2020-2021)，可能是因为 Go 和 Rust 的盛行，导致 Nodejs 的后端开发弱化了，很多项目开发都不太活跃。

:::

## DB

| driver pkg     | db                   | notes    |
| -------------- | -------------------- | -------- |
| [pg] pg-hstore | PostgreSQL           |
| mysql2         | MySQL                |
| mariadb        | MariaDB              |
| sqlite3        | SQLite               |
| better-sqlite3 | SQLite               | 同步接口 |
| tedious        | Microsoft SQL Server |
| ibm_db         | DB2                  |

[pg]: https://github.com/brianc/node-postgres

- better-sqlite3
  - 支持自定义函数
  - 支持迭代 cursor
  - 支持 int64
  - [Convince me to use better-sqlite3](https://github.com/WiseLibs/better-sqlite3/issues/262)
- [sequelize/sequelize](./sequelize.md)
  - ORM
  - Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server.
  - 因为需要支持很多 DB 类型，丢失一定的特性
  - Use better-sqlite3 [#11400](https://github.com/sequelize/sequelize/issues/11400)
- [knex/knex](https://github.com/knex/knex)
  - SQL Builder
  - Composite - 解耦构建最终 query 的过程
  - 对于基础的访问模式提供跨库支持
  - Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, Amazon Redshift
  - 🚧 开发缓慢
- prisma
- [gajus/slonik](https://github.com/gajus/slonik)
  - PostgreSQL client with strict types
  - string tag
- [mikro-orm/mikro-orm](https://github.com/mikro-orm/mikro-orm)
  - MIT, Typescript
  - Data Mapper, Unit of Work, Identity Map
  - 使用注解定义模型
  - 基于 knex
  - 不支持多态关联 [mikro-orm#706](https://github.com/mikro-orm/mikro-orm/issues/706)
- [koskimas/kysely](https://github.com/koskimas/kysely)
  - type-safe typescript SQL query builder
  - [RobinBlomberg/kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen)
    - schema -> ts
- [Vincit/objection.js](https://github.com/Vincit/objection.js)
  - The future of Objection.js  [Vincit/objection.js#2335](https://github.com/Vincit/objection.js/issues/2335)
  - 🚧 开发停滞
  - SQL-friendly ORM
  - 基于 knex
- [typeorm/typeorm](./typeorm.md)
  - Future of TypeORM [typeorm#3267](https://github.com/typeorm/typeorm/issues/3267)
  - 基于 typescript decoration 的 ORM
  - 🚧 开发缓慢
- [bookshelf/bookshelf](https://github.com/bookshelf/bookshelf)
  - 基于 knex 的 ORM
  - 🚧 开发停止
- [balderdashy/waterline](https://github.com/balderdashy/waterline)
  - 🚧 开发停止 - 2021
- [dmfay/massive-js](https://gitlab.com/dmfay/massive-js)
  - data mapper for Node.js and PostgreSQL

```ts
// PostgreSQL
// 支持的环境变量 https://www.postgresql.org/docs/current/libpq-envars.html
// PGHOST PGPORT PGUSER PGPASSWORD PGDATABASE PGSSLMODE PGOPTIONS
// 修改 search_path PGOPTIONS=-csearch_path=public
const { Client } = require('pg');
const client = new Client();
await client.connect();
const res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message); // Hello world!
await client.end();
```

## Env

- [nvm](./nvm.md)
  - 独立 shell 脚本
  - Alpine https://github.com/nvm-sh/nvm/issues/1102#issuecomment-683291852
- [n](https://github.com/tj/n)
  - node module
  - 👍 推荐
- pnpm setup
  - Could not infer shell type.
    - `SHELL=bash pnpm setup`
    - `export PNPM_HOME="/root/.local/share/pnpm"`
  - `curl -fsSL https://get.pnpm.io/install.sh | bash -`
  - `pnpm env use --global 16`
  - 不支持 MUSL

```bash
# n on alpine
apk add bash curl ca-certificates libstdc++ libgcc
curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
chmod u+x n
install -t /usr/local/bin n

# 官方镜像
# N_NODE_MIRROR=https://unofficial-builds.nodejs.org/download/release ./n --arch x64-musl lts
# 国内镜像
N_NODE_MIRROR=https://npmmirror.com/mirrors/node-unofficial-builds ./n --arch x64-musl lts


# 非 ROOT
export PATH=$HOME/n/bin:$PATH
export N_PREFIX=$HOME/n
```

- N_PREFIX=/usr/local
  - 缓存 n/versions
  - bin, include, lib, share
- 非 root 可以考虑 $HOME/n
- https://npmmirror.com/mirrors/node-unofficial-builds/
- https://registry.npmmirror.com/binary.html?path=node-unofficial-builds/

## Library

- [timgit/pg-boss](https://github.com/timgit/pg-boss)
  - Node.js using PostgreSQL like a boss
- [breejs/bree](https://github.com/breejs/bree)
  - job scheduler
- WebSocket
  - [ws](https://github.com/websockets/ws)
    - JS 实现
    - isomorphic-ws 可用于 web
  - [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js)
    - 基于 [uWebSockets](https://github.com/uNetworking/uWebSockets) C++ 库
      - 基于 [uNetworking/uSockets](https://github.com/uNetworking/uSockets)
    - 性能好
    - 针对 Linux 优化

## Web

- [fastify](./fastify.md)
  - 🌟 推荐
- express
- koa
  - 🚧 开发停滞

## Network

- node-fetch - NodeJS v18 后内置 fetch
- https-proxy-agent
- socks-proxy-agent
- proxy-from-env

## Server

- 日志
  - [pinojs/pino](https://github.com/pinojs/pino)

## Scraper

- [jsdom/jsdom](https://github.com/jsdom/jsdom)
- [cheeriojs/cheerio](https://github.com/cheeriojs/cheerio)
- [rchipka/node-osmosis](https://github.com/rchipka/node-osmosis)
- https://www.webscrapingapi.com/

## 工具

- shell
  - [google/zx](https://github.com/google/zx)

## CLI

- parse args
  - minimist
- framework
  - yargs
  - commander

## FFI

- https://dyncall.org/
- node-ffi
  - ffi-napi
- sbffi
- napi-addon
- napi-addon-sb
- bun ffi
