---
title: tsx
---

# tsx

- [esbuild-kit/tsx](https://github.com/esbuild-kit/tsx)
  - MIT, TS
  - 基于 ESBuild
  - 支持 ts path

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
