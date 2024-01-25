---
title: Directus
---

# Directus

- [directus/directus](https://github.com/directus/directus) 是什么？
  - GPL-3.0, NodeJS+Typescript+Vue
  - Headless CMS
  - DB -> GraphQL+REST
  - 数据库支持 PostgreSQL, MySQL, SQLite, OracleDB, CockroachDB, MariaDB, MS-SQL
- [concepts](https://docs.directus.io/concepts/activity/)

```bash
# http://127.0.0.1:8055
docker run --rm -it \
  -p 8055:8055 \
  -e KEY=replace-with-random-value \
  -e SECRET=replace-with-random-value \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=ADMIN_PASSWORD \
  -e DB_CLIENT=sqlite3 \
  -e DB_FILENAME=/directus/database/data.db \
  -e WEBSOCKETS_ENABLED=true \
  -v $PWD/data/database:/directus/database \
  -v $PWD/data/uploads:/directus/uploads \
  -v $PWD/data/extensions:/directus/extensions \
  --name directus directus/directus

npm init directus-project
```

## client

```bash
npm install @directus/sdk
```

```ts
import { createDirectus, rest, graphql } from '@directus/sdk';

interface Article {
	id: number;
	title: string;
	content: string;
}

interface Schema {
	articles: Article[];
}

// Client with REST support
const client = createDirectus<Schema>('http://directus.example.com').with(rest());

// Client with GraphQL support
const client = createDirectus<Schema>('http://directus.example.com').with(graphql());
```

## config

- https://docs.directus.io/self-hosted/config-options.html
- .env
- config.json - KV 同 env
- config.yaml
- config.js - `export default {}`, `export default function(env) {return {}}`,
  - env 为 process.env

```bash
CONFIG_PATH="/path/to/config.js" npx directus start
```
