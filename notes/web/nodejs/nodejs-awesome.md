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
  - Convince me to use better-sqlite3 [#262](https://github.com/WiseLibs/better-sqlite3/issues/262)
- [sequelize/sequelize](./sequelize.md)
  - ORM
  - Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server.
  - 因为需要支持很多 DB 类型，丢失一定的特性
  - Use better-sqlite3 [#11400](https://github.com/sequelize/sequelize/issues/11400)
- prisma
- SQL Builder/Typed Schema/Query
  - [knex/knex](https://github.com/knex/knex)
    - SQL Builder
    - Composite - 解耦构建最终 query 的过程
    - 对于基础的访问模式提供跨库支持
    - Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, Amazon Redshift
    - 🚧 开发缓慢
  - [gajus/slonik](https://github.com/gajus/slonik)
    - PostgreSQL client with strict types
    - string tag
  - [adelsz/pgtyped](https://github.com/adelsz/pgtyped)
  - [kysely-org/kysely](https://github.com/kysely-org/kysely)
    - type-safe typescript SQL query builder
  - [RobinBlomberg/kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen)
    - schema -> ts
- [mikro-orm/mikro-orm](https://github.com/mikro-orm/mikro-orm)
  - MIT, Typescript
  - Data Mapper, Unit of Work, Identity Map
  - 使用注解定义模型
  - 基于 knex
  - 不支持多态关联 [mikro-orm#706](https://github.com/mikro-orm/mikro-orm/issues/706)
- [stephenh/joist-ts](https://github.com/stephenh/joist-ts)
  - TypeScript ORM for Postgres
- [drizzle-team/drizzle-orm](https://github.com/drizzle-team/drizzle-orm)
  - Apache-2.0, TypeScript
  - TypeScript ORM that feels like writing SQL.
- [aerotoad/neboa](https://github.com/aerotoad/neboa)
  - AGPL-3.0, TS
  - Type-safe NoSQL with Node & SQLite
- [Vincit/objection.js](https://github.com/Vincit/objection.js)
  - The future of Objection.js [Vincit/objection.js#2335](https://github.com/Vincit/objection.js/issues/2335)
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
- MongoDB
  - [Automattic/mongoose](https://github.com/Automattic/mongoose)
    - object modeling
- 有趣
  - [tndrle/node-sqlite3-wasm](https://github.com/tndrle/node-sqlite3-wasm)
    - WebAssembly port of SQLite3 for Node.js with file system access
  - [oguimbal/pg-mem](https://github.com/oguimbal/pg-mem)
  - [oguimbal/pgsql-ast-parser](https://github.com/oguimbal/pgsql-ast-parser)
  - [share/sharedb](https://github.com/share/sharedb)
    - MIT, JS
    - Realtime database backend based on Operational Transformation (OT)
  - [derbyjs/derby](https://github.com/derbyjs/derby)
    - MIT, JS
    - MVC framework making it easy to write realtime, collaborative applications that run in both Node.js and browsers

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
- [FNM](https://github.com/Schniz/fnm) Fast Node Manager
  - GPLv3, Rust
- [volta](https://github.com/volta-cli/volta)
  - BSD-2, Rust
- [asdf-vm/asdf](https://github.com/asdf-vm/asdf)
  - MIT, Shell
  - Elixir、Erlang、Node.js、Ruby

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

- job/cron/task/queue
  - bull
  - node-schedule
    - time-based scheduling, not interval-based scheduling
  - node-cron
  - cron
  - [timgit/pg-boss](https://github.com/timgit/pg-boss)
  - [breejs/bree](https://github.com/breejs/bree)
    - job scheduler
  - [agenda/agenda](https://github.com/agenda/agenda)
    - mongodb
    - 独立服务
    - Lightweight job scheduling
  - [kibertoad/toad-scheduler](https://github.com/kibertoad/toad-scheduler)
  - [SGrondin/bottleneck](https://github.com/SGrondin/bottleneck)
- WebSocket
  - [ws](https://github.com/websockets/ws)
    - JS 实现
    - isomorphic-ws 可用于 web
  - [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js)
    - 基于 [uWebSockets](https://github.com/uNetworking/uWebSockets) C++ 库
      - 基于 [uNetworking/uSockets](https://github.com/uNetworking/uSockets)
    - 性能好
    - 针对 Linux 优化
- KV/Cache
  - [jaredwray/keyv](https://github.com/jaredwray/keyv)
- Performance
  - https://github.com/zertosh/v8-compile-cache
    - cjs
- [runk/node-chardet](https://github.com/runk/node-chardet)
  - Character encoding detection
- Concurret/Thread/Worker/async
  - [piscinajs/piscina](https://github.com/piscinajs/piscina)
    - Worker Thread Pool
  - [parallel-js/parallel.js](https://github.com/parallel-js/parallel.js)
    - multi-core processing utilities for Node
  - [greenlet](https://github.com/developit/greenlet)
    - Move an async function into its own thread
- Game Server/Server
  - [colyseus/colyseus](https://github.com/colyseus/colyseus)
    - MIT, TS
    - Multiplayer Framework for Node.js

## Web

- [hono]
- [fastify](./fastify.md)
  - 🌟 推荐
- express
- koa
  - 🚧 开发停滞

## Framework

- [nestjs](../framework/nestjs.md)
  - trpc -> nestjs
    - https://github.com/macstr1k3r/trpc-nestjs-adapter/tree/master/src/lib
    - 只支持 express
- TypeScript
  - [ts-rest](https://github.com/ts-rest/ts-rest)
  - trpc
  - [ecyrbe/zodios](https://github.com/ecyrbe/zodios)
    - zod, axio, nextjs, express
- [t3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app)

## Network

- node-fetch - NodeJS v18 后内置 fetch
- https-proxy-agent
- socks-proxy-agent
- proxy-from-env
- websocket
- [ws](https://github.com/websockets/ws)
- [µWebSockets.js]
  - [uWebSockets](https://github.com/uNetworking/uWebSockets)

## Server

- 日志
  - [pinojs/pino](https://github.com/pinojs/pino)
- Runtime
  - [bytenode/bytenode](https://github.com/bytenode/bytenode)
    - bytecode compiler for Node.js
    - V8 bytecode
- Scraper/爬虫
  - [apify/crawlee](https://github.com/apify/crawlee)
  - [coder-hxl/x-crawl](https://github.com/coder-hxl/x-crawl)
  - https://www.webscrapingapi.com/
  - [rchipka/node-osmosis](https://github.com/rchipka/node-osmosis)
- JQuery/DOM
  - [jsdom/jsdom](https://github.com/jsdom/jsdom)
  - [cheeriojs/cheerio](https://github.com/cheeriojs/cheerio)
- CUI/Command Line/CLI/Arguement Parser
  - [minimistjs/minimist](https://github.com/minimistjs/minimist)
  - [sindresorhus/meow](https://github.com/sindresorhus/meow)
  - [vercel/arg](https://github.com/vercel/arg)
- CLI Builder
  - [tj/commander.js](https://github.com/tj/commander.js)
  - [privatenumber/cleye](https://github.com/privatenumber/cleye)
  - [yargs](https://github.com/yargs/yargs)
    - MIT, JS
  - [oclif](https://github.com/oclif/oclif)
    - MIT, TS
    - by Salesforce
    - 生成
    - used by
      - built out of [heroku/cli](https://github.com/heroku/cli)
      - [salesforcecli/cli](https://github.com/salesforcecli/cli)
      - https://shopify.dev/docs/apps/tools/cli
      - https://www.twilio.com/docs/twilio-cli
- CLI Helper/terminal ui/tui/prompt
  - [chalk](https://github.com/chalk/chalk)
  - execa
  - winston
    - logging
  - [sindresorhus/get-stdin](https://github.com/sindresorhus/get-stdin)
  - [sindresorhus/conf](https://github.com/sindresorhus/conf)
  - [SBoudrias/Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
    - collection of common interactive command line user interfaces
- shell/script
  - [sindresorhus/execa](https://github.com/sindresorhus/execa)
    - MIT, JS+TS
  - [shelljs/shelljs](https://github.com/shelljs/shelljs)
    - BSD-3, JS
    - Portable Unix shell commands for Node.js
  - [google/zx](https://github.com/google/zx)
- [sindresorhus/awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs)

## FFI

- https://dyncall.org/
- node-ffi
  - ffi-napi
- sbffi
- napi-addon
- napi-addon-sb
- bun ffi
- [bitair-org/linker.js](https://github.com/bitair-org/linker.js)
  - Access Python & C-shared from Node.js
  - `@bitair/linker.js`

## Sandbox/VM

- vm
- [justjake/quickjs-emscripten](https://github.com/justjake/quickjs-emscripten)
- v8 Isolate
  - [laverdet/isolated-vm](https://github.com/laverdet/isolated-vm)
  - ~~[patriksimek/vm2](https://github.com/patriksimek/vm2)~~
- [google/nsjail](https://github.com/google/nsjail)
  - light-weight process isolation tool
  - [windmill-labs/windmill](https://github.com/windmill-labs/windmill)
