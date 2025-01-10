---
title: drizzle
---

# Drizzle

- [drizzle-team/drizzle-orm](https://github.com/drizzle-team/drizzle-orm)
  - Apache-2.0, TS
  - 支持多环境 - Node, Bun, Deno
  - 支持新兴数据库 - libsql, Bun/Expo/OP SQLite, Cloudflare D1, Cloudflare Durable Objects, Vercel Postgres
  - 支持 Serverless 环境
  - 轻量级
  - drizzle-kit 提供辅助功能
- /
  - drizzle.config.ts
  - drizzle/
  - `src/db/schema/*.ts`
- 参考

:::caution

- 不支持 Query Comment
- 不支持 comment [drizzle-team/drizzle-orm#886](https://github.com/drizzle-team/drizzle-orm/issues/886)
- SQLite 存在变量太多的问题 [drizzle-team/drizzle-orm#2479](https://github.com/drizzle-team/drizzle-orm/issues/2479)
  - 需要手动 chunk
- SQLite 不支持 text 作为 Date [drizzle-team/drizzle-orm#3154](https://github.com/drizzle-team/drizzle-orm/issues/3154)

:::

```bash
# PostgreSQL
npm add drizzle-orm pg
npm add -D drizzle-kit @types/pg
```

```ts
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://user:password@host:port/db',
});

// or
const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'db_name',
});

const db = drizzle(pool);
```

## MySQL

```bash
# MySQL
npm add drizzle-orm mysql2
npm add -D drizzle-kit
```

```ts
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: "host",
  user: "user",
  database: "database",
  ...
});

const db = drizzle(poolConnection);
```

## kit

```bash
npx drizzle-kit generate --name base
```

## SQLite

```ts
const myTab = {
  ts: integer('createdAt', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now') * 1000)`),
  ts2: integer('createdAt', { mode: 'timestamp' }).default(sql`(STRFTIME('%s', 'now') * 1000)`),
  // with tz
  created_at: text('created_at').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull()
};
```

# FAQ

## Dynamic Migration

运行时生成 DDL

```ts
// Dynamic require of "fs" is not supported.
const { createRequire } = await import('node:module');
global.require ||= createRequire(import.meta.url);

const { generateDrizzleJson, generateSQLiteMigration, generateSQLiteDrizzleJson, generateMigration } = await import(
  'drizzle-kit/api'
);

const schema = {
  article: WenerArticleTable,
};

const [previous, current] = await Promise.all(
  [{}, schema].map((schemaObject) => generateSQLiteDrizzleJson(schemaObject)),
);
const migrationStatements = await generateSQLiteMigration(previous, current);
console.log(`SQL`, migrationStatements.join('\n'));
```

- https://github.com/drizzle-team/drizzle-orm/discussions/1901
