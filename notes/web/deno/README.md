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
- ~/.deno/bin - deno install 位置

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

```bash
# bundle 为单个文件 - 输出为 js
deno bundle scripts/main.ts cli.js
deno run cli.js

# compile 为可执行文件 - 打包 deno - 约 70MB
# -A 给所有权限
# --target 生成其他平台 - 第一次执行会下载 deno 到 DENO_DIR
# x86_64-unknown-linux-gnu, x86_64-pc-windows-msvc, x86_64-apple-darwin, aarch64-apple-darwin
deno compile -o cli --allow-write --allow-read scripts/main.ts
./cli
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

## deno deploy

- deno 官方提供的 serverless 服务
- [定价 & 限制](https://deno.com/deploy/docs/pricing-and-limits)
  - 100k req/day, 1000 req/min
  - 512 MB, 每次请求 50 ms
- 参考
  - https://deno.com/deploy
  - https://crux.land
    - 免费托管 ≤ 20kB 的 deno 模块
