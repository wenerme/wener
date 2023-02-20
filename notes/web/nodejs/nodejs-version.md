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

| ver                           | lts start  | end        | v8 ver |
| ----------------------------- | ---------- | ---------- | ------ |
| [Node v18 LTS](#node-v18-lts) | 2022-10-25 | 2025-04-30 | 10.1   |
| [Node v16 LTS](#node-v16-lts) | 2021-10-26 | 2024-04-30 | 9.0    |
| [Node v14 LTS](#node-v14-lts) | 2020-10-27 | 2023-04-30 | 8.1    |
| [Node v12 LTS](#node-v12-lts) | 2019-10-21 | 2022-04-30 | 7.4    |

:::info Roadmap

- fetch
- corepack

:::

- https://unofficial-builds.nodejs.org/download/release
  - arm64 musl [nodejs/unofficial-builds#59](https://github.com/nodejs/unofficial-builds/pull/59)

## Node v18 LTS

:::caution

- fetch 不支持指定 agent 做代理 [#43187](https://github.com/nodejs/node/issues/43187)

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
