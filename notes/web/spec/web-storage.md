---
title: WebStorage
---

# WebStorage

- https://web.dev/storage-for-the-web/
- chromium [storage/browser/quota/quota_settings.cc](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/storage/browser/quota/quota_settings.cc)
- [Test of localStorage limits/quota](https://arty.name/localstorage.html)
- mdn
  - [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)
  - [StorageManager](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager)
    - 估算使用量

**存储限制**

| name           | limit       |
| -------------- | ----------- |
| sessionStorage | 5 MB        |
| localStorage   | 5 MB        |
| Cookie         | 4 KB        |
| Cookie kv      | 1 KB        |
| IndexedDB      | 10 MB - 2GB |

:::info

- 不同浏览器限制不同，这里列举 安全/常见值

:::

- IndexedDB
  - 持久数据
  - 数据量大
  - 跨 Tab
  - Worker 支持
  - 插入性能弱 - 官方以优化读取性能为主
  - 参考
    - [Why IndexedDB is slow](https://rxdb.info/slow-indexeddb.html)
      - 考虑 relaxed 持久化 - [durability](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/durability)
      - 可以 in-memory 读，write back 到 indexeddb
    - [Storing images and files in IndexedDB](https://hacks.mozilla.org/2012/02/storing-images-and-files-in-indexeddb/)
      - 存储为 Blob
- sessionStorage
  - 持久
  - 小数据
  - KV
  - 可 Observe
  - 跨 Tab
- localStorage
  - 临时存储
  - 敏感信息
  - 可跨 Tab 感知变化
- Cookie
  - 网络通讯 credentials
- [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
  - Response stored in a Cache won't contain headers
  - [The Cache API: A quick guide](https://web.dev/cache-api-quick-guide/)
  - [stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale)

**Performance**

- [Browser database comparison](https://nolanlawson.github.io/database-comparison/)
  - fork [db tx write](https://pubkey.github.io/client-side-databases/database-comparison/index.html)
- [Why IndexedDB is slow and what to use instead](https://rxdb.info/slow-indexeddb.html)

| store        |       10000 |
| ------------ | ----------: |
| localStorage |       110ms |
| IndexedDB    | 1500-2200ms |

> IndexedDB 很慢

## Library

- [dexie](../script/lib/dexie.md)
  - IndexedDB 存储
  - 支持同步 - 但不是开箱即用
  - ~82kB/26kB - 无依赖
- [rxdb](https://github.com/pubkey/rxdb)
  - Apache-2.0, Typescript
  - offline first
  - 有 schema
  - 支持 punchdb, lokijs, dexie 存储
  - 默认支持 REST 和 GraphQL 同步
  - 使用 punchdb 也可以用 CouchDB 的同步
  - Premium: IndexedDB, SQLite, Sharding, Query Optimizer
  - ~114kB/31kB
    - binary-decision-diagram
    - broadcast-channel
    - event-reduce-js
    - spark-md5
    - object-path
    - clone
- [clientdb/clientdb](https://github.com/clientdb/clientdb)
  - Apache-2.0, Typescript
  - **in-memory** database, realtime
- PouchDB
  - CouchDB replication
  - 支持 attachments
  - ~117kB/37kB
    - uuid
    - spark-md5
- [techfort/LokiJS](https://github.com/techfort/LokiJS)
  - **in-memory** database
- [YousefED/SyncedStore](https://github.com/YousefED/SyncedStore)
  - 基于 yjs 同步
  - 构建协作应用
- localForge
  - 类似 localStorage
  - 异步
  - 支持多后端
- [Nozbe/WatermelonDB](https://github.com/Nozbe/WatermelonDB)
  - 定位是 DB - 使用 class+decorator 定义 模型
  - React - LokiJS
  - React Native - SQLite
  - ~155kB - 基于 rxjs
- Absurd-SQL
  - indexeddb
- SQLite
  - empscripten Filesystem API
- DuckDB WASM
- Supabase
- RethinkDB
  - Horizon
- NeDB
  - Node.js, nw.js, Electron, Browser
  - MongoDB 查询语法
  - 项目停止
- [amark/gun](https://github.com/amark/gun)
  - syncing decentralized graph data
- [isaacs/node-lru-cache](https://github.com/isaacs/node-lru-cache)
