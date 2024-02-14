---
title: CreateJS
---

# CreateJS

- [createjs](https://github.com/createjs)
  - 开发不活跃
- easejs
- tweenjs
- soundjs
- preloadjs
- 参考
  - 停止开发 https://github.com/CreateJS/EaselJS/issues/1040

```bash
# 类型定义
yarn add --dev @types/createjs
# 其他的模块可以按需安装, 也可以一次性安装 createjs
```

- 在 angular 中使用需要添加 reference
- 需要在 `.angular-cli.json` 中添加 scripts

```ts
/// <reference path="../../../node_modules/@types/preloadjs/index.d.ts" />
```
