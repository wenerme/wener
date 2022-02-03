---
title: deno
---

# deno

- [denoland/deno](https://github.com/denoland/deno)
  - MIT, Rust
  - 基于 V8
  - 内置 包管理、tsc、fmt、test、bundle、lint、lsp 等功能
  - 通过 url 引用外部模块 - 运行时下载
  - 严格的权限管理 - 沙盒功能强
  - 功能理念类似于 golang
    - stdlib 参照 go 实现
- Deno 全局命名空间

```ts
// HTTP 服务器
const listener = Deno.listen({ port: 8000 });
console.log('http://localhost:8000/');

for await (const conn of listener) {
  serve(conn);
}

async function serve(conn: Deno.Conn) {
  for await (const { respondWith } of Deno.serveHttp(conn)) {
    respondWith(new Response('Hello world'));
  }
}
```

## Node vs Deno

| Node               | Deno                                   |
| ------------------ | -------------------------------------- |
| npm i -g           | deno install                           |
| npm i              | not needed                             |
| node               | deno run                               |
| eslint             | deno lint                              |
| prettier           | deno fmt                               |
| rollup/webpack/... | deno bundle                            |
| package.json       | Deno.json, import_map.json             |
| tsc                | not needed - built-in                  |
| documentation      | deno doc                               |
| jest/ava/tap/...   | deno test                              |
| benchmarks         | https://deno.land/std/testing/bench.ts |
| nodemon            | deno run/lint/test --watch             |
| nexe/pkg           | deno compile                           |
| npm explain        | deno info                              |
| nvm                | deno upgrade                           |
| tsserver           | deno lsp                               |
| c8/istanbul        | deno coverage                          |
