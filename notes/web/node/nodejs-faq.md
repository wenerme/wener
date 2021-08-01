---
title: NodeJS FAQ
---

# NodeJS FAQ

## 直接执行 typescript 或 esnext

```bash
node -r @ts-node/register app.ts
node -r @babel/register app.js
```

## Package 'OpenEXR', required by 'vips', not found

找不到 brew 安装的 pc

```bash
PKG_CONFIG_PATH=/usr/local/opt/openexr/lib/pkgconfig:/usr/local/opt/imath/lib/pkgconfig npm up
```
