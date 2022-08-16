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
```

| flag                | for |
| ------------------- | --- |
| --tsconfig `<FILE>` |
| --no-cache          |
