---
title: NodeJS 版本
tags:
  - Version
---

# NodeJS 版本

- 建议只使用 LTS 版本
  - 因为很多使用 gyp 的项目不会对非 lts 有支持
  - lts 版本周期长
- [nodejs release](https://nodejs.org/en/download/releases)
  - Node 版本 <-> 模块版本
- [发布周期](https://nodejs.org/en/about/releases)
  - 每 6 个月一个大版本
  - 偶数版本为 LTS - 支持 30 个月
- 参考
  - v8 [js/wasm 特性](https://v8.dev/features)

| ver                           | Active LTS | EOL        | v8 ver |
| ----------------------------- | ---------- | ---------- | ------ |
| [Node v20 LTS](#node-v20-lts) | 2023-10-24 | 2026-04-30 | v11.3  |
| [Node v18 LTS](#node-v18-lts) | 2022-10-25 | 2025-04-30 | v10.1  |
| [Node v16 LTS](#node-v16-lts) | 2021-10-26 | 2023-09-11 | v9.0   |
| [Node v14 LTS](#node-v14-lts) | 2020-10-27 | 2023-04-30 | v8.1   |
| [Node v12 LTS](#node-v12-lts) | 2019-10-21 | 2022-04-30 | v7.4   |

:::info Roadmap

- corepack

:::

- https://unofficial-builds.nodejs.org/download/release
  - arm64 musl [nodejs/unofficial-builds#59](https://github.com/nodejs/unofficial-builds/pull/59)

## Node v21

- V8 11.8
  - Array grouping
  - ArrayBuffer.prototype.transfer
- 默认 ESM
  - --experimental-default-type=module
- 默认 WASM
  - --experimental-wasm-modules
  - 文件以 `\0asm` 开头 - magic
- Stable fetch/WebStreams
  - WebStreams, FormData, Headers, Request, Response, fetch
- Built-in WebSocket client
  - --experimental-websocket
- navigator.hardwareConcurrency
- https://nodejs.org/en/blog/announcements/v21-release-announce

## Node v20 LTS

- v8 11.3
  - Resizable ArrayBuffer
    - Chrome 111
    - Safari 16.4
  - Growable SharedArrayBuffer
  - String.prototype.isWellFormed
  - String.prototype.toWellFormed
  - Regex `v`
- APIs
  - import.meta.resolve
  - 完善 Web Crypto API
  - 完善 WASI - WebAssembly System Interface
    - https://github.com/nodejs/uvwasi
  - `readdir(dirname, { recursive: true })`
- 支持 `.env`
- --experimental-loader
- --experimental-permission
  - --allow-fs-read
  - --allow-fs-write
  - --allow-child-process
  - --allow-worker
  - ERR_ACCESS_DENIED
  - `process.permission.has('fs.write');`
  - `process.permission.has('fs.write', '/home/me/mydata.json')`
- Test Runner
  - `import { test, describe, it, mock } from 'node:test';`
  - `node --test --watch test.mjs`
- single executable application - SEA

```json title="sea-config.json"
{
  "main": "myscript.js",
  "output": "sea-prep.blob"
}
```

```bash
node --experimental-sea-config sea-config.json
```

```js title="loader.js"
export async function resolve(specifier, parentModuleURL, defaultResolve) {
  console.log('Resolving:', specifier);
  return defaultResolve(specifier, parentModuleURL);
}

export async function load(url, defaultLoad) {
  console.log('Loading:', url);
  return defaultLoad(url);
}
```

```bash
node --experimental-loader=./loader.mjs
```

- https://nodejs.org/en/blog/announcements/v20-release-announce

## Node v18 LTS

:::caution

- fetch 不支持指定 agent 做代理 [#43187](https://github.com/nodejs/node/issues/43187)
  - 使用 undici

:::

- fetch
- Web Streams API
- `node:*` Prefix-only core Modules
- `node:test`, `ode:assert`
  - `import test from 'node:test'`
- Blob
- BroadcastChannel
- V8 10.1 - Chromium 101
- OpenSSL 3
- Blob, BrodcastChannel
- Watch
  - `node --watch`
  - `node --watch-path`

---

- Build-time user-land snapshot
  - –-node-snapshot-main
- Undici
  - HTTP Client

## Node v16 LTS

- V8 9.0
- npm v7
- Apple M1
- 稳定
  - AbortController
  - Source Maps v3
- 实验阶段
  - Web Crypto API

## Node v14 LTS

- v8 版本 v8.1
  - Optional Chaining
  - Nullish Coalescing
  - Intl.DisplayNames
  - Intl.DateTimeFormat
    - calendar
    - numberingSystem
- esm 正常使用 - 不再会有 wanring
- Diagnostic Reporting 稳定
- 实验特性
  - Async Hooks API - async 本地存储
  - WASI - Web Assembly System Interface
- [Node.js 14 ChangeLog](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V14.md)

## Node v12 LTS

- V8 7.4
  - JIT-less V8
  - WebAssembly Threads/Atomics
  - ES6 Module
  - Private Class Fields
  - TLS 1.3
- Top-Level Await - `--experimental-top-level-await`
- API
  - 新增 EventTarget
