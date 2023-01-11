---
title: bun
---

# bun

- [Jarred-Sumner/bun](https://github.com/Jarred-Sumner/bun)
  - MIT, Zig
  - JavaScriptCore,tinycc,libiconv LGPLv2
  - boringssl,libarchive,libiconv,lol-html,mimalloc,picohttp,tinycc,uSockets,zlib-cloudflare,libicu,uWebsockets

> **Note**
>
> - musl 支持 [bun#255](https://github.com/Jarred-Sumner/bun/issues/255)
> - deploy [bun#211](https://github.com/Jarred-Sumner/bun/issues/211)
> - 无 dns 模块 - pg 不支持 [#288](https://github.com/oven-sh/bun/issues/288)
> - 未实现 dns, http2, https, child_process, vm, tls, async_hooks, worker_threads

:::tip

- bun 嵌入了 tinycc，有 jit 能力，因此 ffi 效率非常高
- bun 还处于非常早期开发阶段 - not prodution ready
- 使用 JavaScriptCore - 各有优缺点
- bun 一些点的性能很好，但整体应用性能比不上 node

:::

```bash
curl -LO https://ghproxy.com/https://github.com/Jarred-Sumner/bun/releases/download/bun-v0.1.11/bun-darwin-x64.zip
unzip bun-darwin-x64.zip
mv bun-darwin-x64/bun ~/bin/
xattr -r -d com.apple.quarantine ~/bin/bun
bun -v
```

```bash
bun bun src/index.js
# https://github.com/oven-sh/bun/issues/211
./node_modules.bun > ./node_modules.js
```

## ffi

```ts
import { viewSource } from 'bun:ffi';

// 生成的 C 代码
console.log(
  viewSource(
    {
      hello_world: {
        returns: 'float',
        args: ['float'],
      },
    },
    false,
  )[0],
);
```

# FAQ
