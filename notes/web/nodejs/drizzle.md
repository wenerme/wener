---
title: drizzle
---

# Drizzle

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
