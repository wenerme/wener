---
title: Directus
---

# Directus

- [directus/directus](https://github.com/directus/directus) 是什么？
  - GPL-3.0, NodeJS+Typescript+Vue
  - Headless CMS
  - Knex
  - DB -> GraphQL+REST
  - 数据库支持 PostgreSQL, MySQL, SQLite, OracleDB, CockroachDB, MariaDB, MS-SQL
  - redis for cluster
- [concepts](https://docs.directus.io/concepts/activity/)

```bash
# http://127.0.0.1:8055
# SQLite
docker run --rm -it \
  -p 8055:8055 \
  -e TELEMETRY=false \
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

```ini
KEY=
SECRET=
TELEMETRY=false

CONFIG_PATH=.env
PUBLIC_URL=/
MAX_PAYLOAD_SIZE=1mb
# 也可以 false
ROOT_REDIRECT=/admin
# admin app
SERVE_APP=true
GRAPHQL_INTROSPECTION=true
HOST="0.0.0.0"
PORT=8055

WEBSOCKETS_ENABLED=true

REDIS=
REDIS_HOST=
REDIS_USERNAME=
REDIS_PASSWORD=

DB_CLIENT="pg"
# DB_CONNECTION_STRING= # works for pg
DB_HOST="localhost"
DB_PORT=5432
DB_DATABASE="directus"
DB_USER=directus
DB_PASSWORD="directus"
# DB_SEARCH_PATH="array:directus,public"

# https://github.com/vincit/tarn.js#usage
# DB_POOL__XXX
# https://nodejs.org/api/tls.html
# DB_SSL__CA
# DB_SSL__CA_FILE


# local, oauth2, openid, ldap, saml
AUTH_PROVIDERS=
```

## extensions

- Add official support for React extensions [#4791](https://github.com/directus/directus/discussions/4791)
- https://docs.directus.io/extensions/introduction.html

```bash
npx create-directus-extension@latest
```

```bash
FROM directus/directus:10.8.3

USER root
RUN corepack enable
USER node

RUN pnpm install directus-extension-package-name
```

```
extensions/
  <extension-name>/
    dist/
      index.js
    package.json
  ...
```

## 内部结构

- directus_activity
- directus_collections
- directus_dashboards
- directus_extensions
- directus_fields
- directus_files
- directus_flows
- directus_folders
- directus_migrations
- directus_notifications
- directus_operations
- directus_panels
- directus_permissions
- directus_presets
- directus_relations
- directus_revisions
- directus_roles
- directus_sessions
- directus_settings
- directus_shares
- directus_translations
- directus_users
- directus_versions
- directus_webhooks
