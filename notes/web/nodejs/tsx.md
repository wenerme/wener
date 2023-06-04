---
title: tsx
---

# tsx

- [esbuild-kit/tsx](https://github.com/esbuild-kit/tsx)
  - MIT, TS
  - 基于 ESBuild Transform API - 不支持插件
  - 支持 ts path
  - 不支持 emitDecoratorMetadata - [esbuild-kit/core-utils#14](https://github.com/esbuild-kit/core-utils/issues/14)

```bash
tsx run.ts
# 等同于
ts-node --esm --transpileOnly run.ts

# 按回车可手动重新运行
# --clear-screen=false
tsx watch ./file.ts

NODE_OPTIONS='--loader tsx' node ./file.ts

# transpile
# 假设用到的包 定义了 package.json#exports[.].typescript 指向源码
tsx --conditions=typescript ./src/server.ts
tsx watch --conditions=typescript ./src/server.ts
```

| flag                | for |
| ------------------- | --- |
| --tsconfig `<FILE>` |
| --no-cache          |
