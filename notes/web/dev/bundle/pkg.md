---
title: pkg
---

# pkg

- [vercel/pkg](https://github.com/vercel/pkg)
  - Node.js -> exec
  - 主要用于容器环境
  - 会下载添加 nodejs runtime
- [vercel/pkg-fetch](https://github.com/vercel/pkg-fetch)
  - 下载 runtime

:::caution

- 不支持 esm [#1291](https://github.com/vercel/pkg/issues/1291)
  - PR [#1323](https://github.com/vercel/pkg/pull/1323)

:::

```bash
# PKG_CACHE_PATH=$HOME/.pkg-cache

pkg -t node16-macos-x64 dist/servers/index.js
pkg -t node16-alpine-x64 src/server.ts
```
