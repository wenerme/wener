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
  - https://github.com/nodejs/Release
- [发布周期](https://nodejs.org/en/about/releases)
  - 每 6 个月一个大版本
  - 偶数版本为 LTS - 支持 30 个月
- 参考
  - v8 [js/wasm 特性](https://v8.dev/features)

| ver                           | Active LTS | EOL        | v8 ver   |
| ----------------------------- | ---------- | ---------- | -------- |
| [Node v24 LTS](#node-v24-lts) | 2025-10-28 | 2028-04-30 | v8 v13.6 |
| [Node v22 LTS](#node-v22-lts) | 2024-10-29 | 2027-04-30 | v8 v12.4 |
| [Node v20 LTS](#node-v20-lts) | 2023-10-24 | 2026-04-30 | v8 v11.3 |
| [Node v18 LTS](#node-v18-lts) | 2022-10-25 | 2025-04-30 | v8 v10.1 |
| [Node v16 LTS](#node-v16-lts) | 2021-10-26 | 2023-09-11 | v8 v9.0  |
| [Node v14 LTS](#node-v14-lts) | 2020-10-27 | 2023-04-30 | v8 v8.1  |
| [Node v12 LTS](#node-v12-lts) | 2019-10-21 | 2022-04-30 | v8 v7.4  |

:::info Roadmap

- [node:module](https://nodejs.org/api/module.html)
- [node:sqlite](https://nodejs.org/api/sqlite.html)
  - v22.5 +
  - --experimental-sqlite
  - Stability 1
- Websocket
  - [Native WebSockets in node 20](https://github.com/nodejs/node/issues/53684)
- corepack
- [SEA](https://nodejs.org/api/single-executable-applications.html)
  - Stability: 1.1
  - Single Executable Applications - 单文件应用

:::

- [Stability](https://nodejs.org/api/documentation.html#stability-index)
  - ~~Stability: 0~~ - Deprecated
  - Stability: 1 - Experimental
  - Stability: 1.0 - Early development
  - Stability: 1.1 - Active development
  - Stability: 1.2 - Release candidate
  - Stability: 2 - Stable
  - Stability: 3 - Legacy
- https://unofficial-builds.nodejs.org/download/release
  - arm64 musl [nodejs/unofficial-builds#59](https://github.com/nodejs/unofficial-builds/pull/59)

| feature       | version                                     |
| ------------- | ------------------------------------------- |
| [node:sqlite] | 22.5+ --experimental-sqlite , 22.13+, 23.4+ |
| [node:test]   | 16.17+, 18+                                 |

[node:sqlite]: https://nodejs.org/api/sqlite.html
[node:test]: https://nodejs.org/api/test.html

## Node v24 LTS

- V8 13.6
  - RegExp.escape
  - Float16Array
  - Atomics.pause
  - WebAssembly Memory64
  - Explicit Resource Management await using
  - Error.isError
- Experimental Permission Model
  - --experimental-permission -> --permission
- URLPattern
- Undici 7
  - WebSocketStream
  - Composing Interceptors
  - Caching
  - llhttp v9
- npm v11

## Node v22 LTS

- [Typescript](https://nodejs.org/api/typescript.html)
  - Node v22.6+
  - Stability 1.0
  - `--experimental-strip-types`
    - 直接运行 TypeScript，也需要配套解决 resolve 的一些问题
    - strip type 基于 @swc/wasm-typescript
  - `--experimental-transform-types`
    - 启用 TypeScript 转换 - 支持 enum, namespace, legacy module, parameter properties
    - 启用 sourcemap
    - 不会支持旧的 Decorators
    - 不会读取 tsconfig.json
    - 不支持 path
  - 推荐启用 verbatimModuleSyntax
- `--experimental-require-module`
  - 在 ESM 环境下使用 require
- `node --run TASK` - 运行 package.json 里的 script
  - 类似于 npm run TASK
- `node --watch`
- WebSocket 客户端
  - ~~--experimental-websocket~~
- `import {glob, globSync} from "node:fs"`
  - 增加常用的 glob 方法
- v8 v12.4
  - WebAssembly Garbage Collection
  - Array.fromAsync
  - Set methods
  - iterator helpers
  - Maglev Fastest Optimizing JIT - https://v8.dev/blog/maglev

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
- single executable application - SEA - 可执行文件
- globalThis.process?.getBuiltinModule
  - 20.16+
- `Blob#bytes():Uint8Array`
  - 20.16+

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

**getBuiltinModule**

> NodeJS v20.16+

```js
if (globalThis.process?.getBuiltinModule) {
  // Run in Node.js, use the Node.js fs module.
  const fs = globalThis.process.getBuiltinModule('fs');
  // If `require()` is needed to load user-modules, use createRequire()
  const module = globalThis.process.getBuiltinModule('module');
  const require = module.createRequire(import.meta.url);
  const foo = require('foo');

  module.isBuiltin(id);
}
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
