---
title: libsql
---

# libsql

:::tip

- 支持 replica sync - read 访问本地 sqlite，write 访问远程
- 支持 CS 结构
- 支持协议
  - HTTP
  - WebSocket
  - SQLite API - embed

:::

- [tursodatabase/libsql](https://github.com/tursodatabase/libsql)
  - MIT, C
  - fork of SQLite
  - 社区运营，接受贡献
  - [特性](https://github.com/tursodatabase/libsql/blob/main/libsql-sqlite3/doc/libsql_extensions.md)
    - `ALTER TABLE ... ALTER COLUMN ...`
    - WASM UDF
    - RANDOM ROWID
    - Virtual WAL - 可以 hook WAL 实现
    - libsql_close_hook
- [tursodatabase/libsql/libsql-server](https://github.com/tursodatabase/libsql/tree/main/libsql-server)
  - MIT, Rust
  - 服务端
- 参考
  - [tursodatabase/libsql-client-ts](https://github.com/tursodatabase/libsql-client-ts)
  - [tursodatabase/libsql-client-go](https://github.com/tursodatabase/libsql-client-go)
  - [tursodatabase/libsql-client-rs](https://github.com/tursodatabase/libsql-client-rs)
  - [tursodatabase/libsql-js](https://github.com/tursodatabase/libsql-js)
    - better sqlite API
  - DataGrip 支持 [DBE-21330](https://youtrack.jetbrains.com/issue/DBE-21330)
  - 扩展 https://docs.turso.tech/libsql#extensions

```bash
brew install libsql
sqld --http-listen-addr 0.0.0.0:8080 --grpc-listen-addr 0.0.0.0:5001 --db-path ./db/ --admin-listen-addr 0.0.0.0:8088 --enable-namespaces
# 服务端的 DB
sqlite3 db/dbs/default/data ".table"

# SQLD_DB_PATH
# SQLD_HTTP_AUTH=basic:${base64('user:pass')}
# SQLD_AUTH_JWT_KEY_FILE
# -e SQLD_NODE=replica -e SQLD_PRIMARY_URL=https://<host>:<port>
docker run --rm -it \
  -v $PWD/data:/var/lib/sqld \
  -p 8080:8080 \
  -e SQLD_NODE=primary \
  --name sqld ghcr.io/tursodatabase/libsql-server:latest

# Multitenancy
# AMIN
curl -X POST http://localhost:8088/v1/namespaces/wener/create -v --json '{}'
# wener.local 会从 host 获取 namespace - 因为 grpc 默认情况不支持 path
```

```ts
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'http://localhost:8080',
});

await client.execute('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)');
await client.execute('INSERT INTO users (name) VALUES (?)', ['Alice']);
const result = await client.execute('SELECT * FROM users');
console.log(result.rows);

// 本地副本
const client = createClient({
  url: 'file:path/to/db-file.db',
  authToken: '...',
  syncUrl: '...',
  syncInterval: 60,
});
```

## Notes

- ADMIN
  - `POST /v1/namespaces/:namespace/create` `{"dump_url":""}`
  - `DELETE /v1/namespaces/:namespace`
  - `POST /v1/namespaces/:namespace/fork/:to`
- replica sync 需要本地存储
- frame = 4kB
- https://github.com/tursodatabase/libsql/blob/main/docs/USER_GUIDE.md
