---
title: Typescript Version
tags:
  - Version
---

# Typescript Version

| version                          | stable date |
| -------------------------------- | ----------- |
| [Typescript 4.7](#typescript-47) | 2022-05-24  |
| [Typescript 4.6](#typescript-46) | 2022-02-28  |
| [Typescript 4.5](#typescript-45) | 2021-11-17  |

## Typescript 4.7

- **支持 ESM**
- `"type": "module"`
  - js 支持 TLA
  - 相对路径 import 需要包含后缀 `import "./foo"` -> `import "./foo.js"`
- `.cts` 作为 commonjs 处理
- `.mts` 作为 module 处理
- 类型
  - Control-Flow Analysis for Bracketed Element Access
    - `obj[key]` 增强 key 的识别
  - Improved Function Inference in Objects and Methods
    - 增强函数参数的类型推导

```json title="tsconfig.json"
{
  "compilerOptions": {
    // esm
    "module": "node16",
    // 新增
    // import "./foo" -> ./foo.ios.ts, ./foo.native.ts, ./foo.ts
    "moduleSuffixes": [".ios", ".native", ""]
  }
}
```

```json title="package.json"
{
  // 能识别
  "type": "module",
  "exports": {
    // 能识别
    ".": {
      "import": "./esm/index.js",
      // 支持 - 默认基于 import - ./esm/index.d.ts
      "types": "./types/index.d.ts",
      "require": "./commonjs/index.cjs"
    }
  }
}
```

```ts
// 新增 resolution-mode
/// <reference types="pkg" resolution-mode="require" />
/// <reference types="pkg" resolution-mode="import" />

type FirstIfString<T> =
    // 支持 extends 限定 infer
    T extends [infer S extends string, ...unknown[]]
        ? S
        : never;

// 支持 in out 限定
// 影响类型匹配上下界限
type Getter<out T> = () => T;
type Setter<in T> = (value: T) => void;
interface State<in out T> {
    get: () => T;
    set: (value: T) => void;
}
```

---

- [Announcing TypeScript 4.7](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/)

## Typescript 4.6

- target es2022

```ts
class Base {
  // ...
}

class Derived extends Base {
  someProperty = true;

  constructor() {
    // 允许 - 但不能引用 this
    doSomeStuff();
    super();
  }
}
```

---

- [Announcing TypeScript 4.6](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/)

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
