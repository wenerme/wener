---
title: Typescript Version
tags:
  - Version
---

# Typescript Version

| version                           | date       |
| --------------------------------- | ---------- |
| [Typescript 4.5](#Typescript 4.5) | 2021-11-17 |

## Typescript 4.5

- Awaited 类型
- lib 支持 node_modules - 默认查找 `@typescript/lib-*` - 之前是 bundle 内置
  - [@types/web](https://www.npmjs.com/package/@types/web)
- --module es2022 - 支持 top-level await
- import 名字 type 修饰
  - `import { someFunc, type BaseType } from "./some-module.js";`
- Template String Types as Discriminants
- Tail-Recursion Elimination on Conditional Types
- `--preserveValueImports` - 用于无法检测导入是否被使用的场景 - eval, 其他语言
- Private Field Presence Checks
- Import Assertions
- Const Assertions and Default Type Arguments in JSDoc
- Faster Load Time with realpathSync.native
- 参考
  - [Announcing TypeScript 4.5](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5)

```json
{
  "dependencies": {
    // dom 重定向
    "@typescript/lib-dom": "npm:@types/web"
  }
}
```
