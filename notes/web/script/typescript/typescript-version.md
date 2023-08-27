---
title: Typescript Version
tags:
  - Version
---

# Typescript Version

| version                          | date       |
| -------------------------------- | ---------- |
| [Typescript 5.0](#typescript-50) | 2023-03-14 |
| [Typescript 4.9](#typescript-49) | 2022-11-15 |
| [Typescript 4.8](#typescript-48) | 2022-08-25 |
| [Typescript 4.7](#typescript-47) | 2022-05-24 |
| [Typescript 4.6](#typescript-46) | 2022-02-28 |
| [Typescript 4.5](#typescript-45) | 2021-11-17 |

## Typescript 5.3

- --isolatedDeclarations 提升构建速度
  - [#47947](https://github.com/microsoft/TypeScript/issues/47947)
  - [53463](https://github.com/microsoft/TypeScript/pull/53463#issuecomment-1660720127)

## Typescript 5.0

- 支持 decorator
  - 不需要 `--experimentalDecorators`
  - 不支持 `--emitDecoratorMetadata`
  - 不支持 参数 decorator
  - 支持类型检测
  - https://2ality.com/2022/10/javascript-decorators.html
  - [tc39/proposal-decorators](https://github.com/tc39/proposal-decorators)
    - 当前的修饰器提案
    - stage 3
  - [tc39/proposal-decorator-metadata](https://github.com/tc39/proposal-decorator-metadata)
    - 关于 metadata 的 提案
    - stage 2
- 支持 const 修饰 类型参数 - 传入值可以不 as const - 得到更精确的类型
- --moduleResolution bundler
  - 之前 node16/nodenext 要求 import 包含后缀
  - bundler 更好配合现有 bundle 流程，可以无后缀
- --allowImportingTsExtensions
  - 允许 import 后缀 .ts, .mts, .tsx
- --resolvePackageJsonExports
  - 考虑 package.json 的 exports 信息
- --resolvePackageJsonImports
- --allowArbitraryExtensions
  - 之前 import 未知 ext 时会查找 `{basename}.d.{extension}.ts`, 找不到则报错
  - 开启后不报错 - 实际由 bundler 处理
- --customConditions
  - 自定义 exports 的 condition
- --verbatimModuleSyntax
  - 废弃 --importsNotUsedAsValues, --preserveValueImports
- 支持 `export * as ns from "module"`
- JSDoc @satisfies, @overload
- 参考
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/

```ts
function loggedMethod<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  const methodName = String(context.name);

  function replacementMethod(this: This, ...args: Args): Return {
    console.log(`LOG: Entering method '${methodName}'.`);
    const result = target.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    return result;
  }

  return replacementMethod;
}

class Person {
  name: string;
  constructor(/* 不支持参数 修饰 @inject*/ name: string) {
    this.name = name;
  }

  @loggedMethod
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

type HasNames = { readonly names: string[] };
function getNamesExactly<T extends HasNames>(arg: T): T['names'] {
  return arg.names;
}
// 5.0 之前
// 类型为 readonly ["Alice", "Bob", "Eve"]
// 不加 const 类型为 string[]
const names2 = getNamesExactly({ names: ['Alice', 'Bob', 'Eve'] } as const);

// 5.0 支持 const 修饰 类型参数
// 确保得到更精确的类型 - 不再需要 as const
type HasNames = { names: readonly string[] };
function getNamesExactly<const T extends HasNames>(arg: T): T['names'] {
  //                       ^^^^^
  return arg.names;
}
const names = getNamesExactly({ names: ['Alice', 'Bob', 'Eve'] });
```

## Typescript 4.9

- `satisfies`
  - 类似于 as const 但可以要求满足给定类型
- `accessor` 生成 getter 和 setter
- 参考
  - https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/

```ts
class Person {
  accessor name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Person {
  // 生成
  #__name: string;

  get name() {
    return this.#__name;
  }
  set name(value: string) {
    this.#__name = name;
  }

  constructor(name: string) {
    this.name = name;
  }
}
```

## Typescript 4.8

```diff
- type NonNullable<T> = T extends null | undefined ? never : T;
+ type NonNullable<T> = T & {};
```

- 参考
  - [](https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/)

## Typescript 4.7

- **支持 ESM**
- `"type": "module"`
  - js 支持 TLA
  - 相对路径 import 需要包含后缀 `import "./foo"` -> `import "./foo.js"`
- --moduleResolution node16, nodenext
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
  T extends [infer S extends string, ...unknown[]] ? S : never;

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
