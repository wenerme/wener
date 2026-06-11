---
title: TypeScript Version
tags:
  - Version
---

# TypeScript Version

- 当前 npm `typescript@latest`: 6.0.x
- TypeScript 7.0 是 Go/native compiler 方向，通过 `@typescript/native-preview` / `tsgo` 预览
- TypeScript 6.0 是迁移到 7.0 前的过渡版本，集中调整现代默认值和废弃旧选项
- TypeScript 5.x 是当前大量项目的稳定基线；Node/ESM、bundler、declaration emit、strictness 相关变化较多

| version                          | date       | notes                                   |
| -------------------------------- | ---------- | --------------------------------------- |
| [TypeScript 7.0](#typescript-70) | 2026-03-23 | native-preview / tsgo                   |
| [TypeScript 6.0](#typescript-60) | 2026-03-23 | 7.0 过渡、现代默认值、旧选项废弃        |
| [TypeScript 5.9](#typescript-59) | 2025-07-31 | `node20`、`import defer`、tsconfig init |
| [TypeScript 5.8](#typescript-58) | 2025-02-28 | `node18`、`erasableSyntaxOnly`          |
| [TypeScript 5.7](#typescript-57) | 2024-11-22 | rewrite relative import extensions      |
| [TypeScript 5.6](#typescript-56) | 2024-09-09 | truthy/nullish checks、`noCheck`        |
| [TypeScript 5.5](#typescript-55) | 2024-06-20 | inferred type predicates                |
| [TypeScript 5.4](#typescript-54) | 2024-03-06 | `NoInfer`、`module=preserve`            |
| [TypeScript 5.3](#typescript-53) | 2023-11-20 | import attributes                       |
| [TypeScript 5.2](#typescript-52) | 2023-08-24 | `using` / explicit resource management  |
| [TypeScript 5.1](#typescript-51) | 2023-06-01 | undefined returns、getter/setter        |
| [TypeScript 5.0](#typescript-50) | 2023-03-16 | decorators、const type parameters       |
| [TypeScript 4.9](#typescript-49) | 2022-11-15 | `satisfies`                             |
| [TypeScript 4.8](#typescript-48) | 2022-08-25 | `NonNullable<T>` 简化                   |
| [TypeScript 4.7](#typescript-47) | 2022-05-24 | Node ESM / `node16` / `nodenext`        |
| [TypeScript 4.6](#typescript-46) | 2022-02-28 | ES2022 target                           |
| [TypeScript 4.5](#typescript-45) | 2021-11-17 | `Awaited`、TLA、import assertions       |

## TypeScript 7.0

- Beta
- Go/native compiler 预览，命令为 `tsgo`
- npm 包：`@typescript/native-preview`
- 目标
  - 显著提升 type-check、project references、language service 性能
  - 支持与 `typescript` 包并行安装，便于对比 `tsc` 与 `tsgo`
- 使用

```bash
npm install -D @typescript/native-preview
npx tsgo --version
npx tsgo --project tsconfig.json
```

- 并行与控制
  - checker parallelization
  - project reference builder parallelization
  - 支持 single-threaded mode 便于排障和稳定复现
- 迁移关注
  - 7.0 不支持 TypeScript 6.0 中已经废弃的旧选项
  - 先在 6.0 下清理 deprecation，再尝试 `tsgo`
  - 预览阶段不应直接替代生产 CI 的唯一类型检查器，建议双跑对比

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/
- https://devblogs.microsoft.com/typescript/announcing-typescript-native-previews/

## TypeScript 6.0

- TypeScript 7.0 前的 transition release
- 保持 TypeScript 5.9 API 兼容，但调整默认值、废弃旧配置
- 新增/增强
  - this-less function 的 context sensitivity 调整
  - 支持 `#/` 开头的 subpath imports
  - 支持 `--moduleResolution bundler` 搭配 `--module commonjs`
  - `--stableTypeOrdering`
  - `--target es2025`、`--lib es2025`
  - Temporal 类型定义
  - `Map.getOrInsert` / `WeakMap.getOrInsert` 等 upsert 方法类型
  - `RegExp.escape`
  - `dom` lib 默认包含 `dom.iterable` / `dom.asynciterable`
- 默认值变化
  - `strict: true`
  - `module: esnext`
  - `target` 默认为当前支持的 ES 年份目标，例如 `es2025`
  - `noUncheckedSideEffectImports: true`
  - `libReplacement: false`
  - `rootDir` 默认 `.`
  - `types` 默认 `[]`
- 废弃/移除关注
  - `target: es5` deprecated，最低目标转向 ES2015+
  - `--downlevelIteration` deprecated
  - `--moduleResolution node` / `node10` deprecated
  - `--module amd` / `umd` / `systemjs` / `none` deprecated
  - `--baseUrl` deprecated；`paths` 应写完整前缀
  - `--moduleResolution classic` removed/deprecated
  - `esModuleInterop: false`、`allowSyntheticDefaultImports: false` 不再推荐/不再可设为 false
  - `alwaysStrict: false` deprecated
  - `outFile` removed/deprecated，使用 bundler 代替
  - legacy `module Foo {}` namespace syntax deprecated，使用 `namespace Foo {}`
  - import assertions `assert {}` deprecated，使用 import attributes `with {}`
  - `tsc foo.ts` 在存在 `tsconfig.json` 时会报错，可用 `--ignoreConfig`
- 迁移建议
  - 在升级前显式写出 `strict`、`module`、`target`、`rootDir`、`types`
  - Node 项目通常需要 `"types": ["node"]`，Bun 项目通常需要 `"types": ["bun"]`
  - bundler 项目优先 `moduleResolution: "bundler"`，直接面向 Node 运行时则用 `nodenext` / `node20`
  - 短期可用 `"ignoreDeprecations": "6.0"` 过渡，但不要把它当作 7.0 迁移方案

```json title="tsconfig.json"
{
  "compilerOptions": {
    "strict": true,
    "target": "es2025",
    "module": "esnext",
    "moduleResolution": "bundler",
    "rootDir": "./src",
    "types": ["node"],
    "noUncheckedSideEffectImports": true
  }
}
```

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html

## TypeScript 5.9

- Minimal and updated `tsc --init`
  - 生成更短的 `tsconfig.json`
  - 默认更贴近现代项目：module、target、jsx、types 等配置更明确
- 支持 `import defer`
  - TC39 proposal，用于延迟模块求值
  - 只支持 namespace import 形式
- 支持 `--module node20`
  - 稳定 Node.js 20 行为
  - 包含 `require()` ESM 互操作等能力
- DOM API hover 增加 summary descriptions
- 性能优化
  - cache instantiations on mappers
  - 减少 `fileOrDirectoryExistsUsingSource` 的 closure 创建
- 兼容关注
  - lib.d.ts 变化可能暴露 DOM/标准库类型差异
  - 部分 type argument inference 变化可能改变泛型推导结果

```ts
// import defer: 只加载模块命名空间，实际求值延后到第一次访问
import defer * as feature from "./some-feature.js";

if (needsFeature()) {
  feature.run();
}
```

```bash
npx tsc --init
```

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html

## TypeScript 5.8

- Granular Checks for Branches in Return Expressions
  - return 中的 conditional expression 会分别检查分支是否满足声明返回类型
  - 能更早发现 `any` 污染导致的错误返回
- `--erasableSyntaxOnly`
  - 因为 Node 开始支持 strip type 了，但是部分 TS 特性必须要求 transform
  - 这个 flag 会对需要 transform 的语法报错
  - 主要影响
    - `enum`
    - `namespace` / `module`
    - `tsconfig.json#paths` -> 应迁移到 `package.json#imports` 或运行时可识别的 alias
    - parameter properties，例如 `constructor(private foo: string)`
    - import aliases，例如 `import Bar = container.Bar`
- `--module nodenext` 支持 `require()` ESM
  - 对齐 Node.js 22+ 的 CJS require ESM 能力
  - 含 top-level await 的 ESM 仍不能被 CJS `require()`
- 增加稳定的 `--module node18`
- `--libReplacement`
  - 可关闭 lib replacement 查询，减少额外 module resolution 成本
- declaration emit 保留 computed property names
- program load/update 性能优化
- 行为变化
  - `--module nodenext` 下 import assertions 受限，推荐使用 import attributes `with {}`

```ts
// 会更精细检查每个 return 分支
function getUrlObject(urlString: string): URL {
  return Math.random() > 0.5 ? new URL(urlString) : urlString;
  //                                            ^ Type 'string' is not assignable to type 'URL'
}
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "module": "node18",
    "erasableSyntaxOnly": true
  }
}
```

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html

## TypeScript 5.7

- `--rewriteRelativeImportExtensions`
  - 辅助 node 支持 ts
  - 只处理 `./`, `../`
  - `./foo.{ts,tsx,mts,cts}` -> `./foo.{js,jsx,mjs,cjs}`
- --target es2024, --lib es2024
  - 更多 SharedArrayBuffer, ArrayBuffer 方法
  - Object.groupBy, Map.groupBy, Promise.withResolvers
  - Atomics.waitAsync

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/

## TypeScript 5.6

- Disallowed Nullish and Truthy Checks
  - eslint:no-constant-binary-expression
- 由于名称碰撞原因，引入 BuiltinIterator, BuiltinAsyncIterator
  - Iterator 在之前被作为类型定义
  - 现在 js 有了 Iterator - https://github.com/tc39/proposal-iterator-helpers
  - BuiltinAsyncIterator 目前还不存在 https://github.com/tc39/proposal-async-iterator-helpers
- `--strictBuiltinIteratorReturn`
- `--noUncheckedSideEffectImports`
- `--noCheck`
- region-prioritized diagnostics / region-prioritized checking
  - 优化类型检测性能
  - 更好的编辑体验

## TypeScript 5.5

- Inferred Type Predicates/类型推断
  - filter 能够 narrow 类型了
    - `all.filter(v => v !== undefined)` 返回的数组值不为 undefined
- Control Flow Narrowing for Constant Indexed Accesses
  - 能把 `typeof obj[key] === "string"` 这样检测的结果带到之后访问，以前需要把 `obj[key]` 提取为变量
- Regular Expression Syntax Checking/正则表达式语法检查
- 增加新的 Set 方法定义 - union, intersection, difference, symmetricDifference, isSubsetOf, isSupersetOf, isDisjointFrom
- `--isolatedDeclarations`
- tsconfig.json 配置支持 `${configDir}` 变量
  - 解决在 extends 里配置路径的时候能正确引用 路径

```ts
// 之前返回 boolean
// 现在返回 x is NonNullable<T>
const isNonNullish = <T>(x: T) => x != null;
```

## TypeScript 5.4

- 增加 `NoInfer` 用于提示 ts 不从某个类型参数推导类型
- 增加定义 Object.groupBy, Map.groupBy
- `--moduleResolution=bundler` 支持使用 require

module=preserve 隐含

```json
{
  "moduleResolution": "bundler",
  "esModuleInterop": true,
  "resolveJsonModule": true
}
```

```ts
// 定义支持的 import 属性
interface ImportAttributes {
  type: 'json';
}

// 支持类型检查
import * as ns from 'foo' with { type: 'not-json' }; // 会报错 type
```

## TypeScript 5.3

- --isolatedDeclarations 提升构建速度
  - [#47947](https://github.com/microsoft/TypeScript/issues/47947)
  - [53463](https://github.com/microsoft/TypeScript/pull/53463#issuecomment-1660720127)
- 支持 Import Attributes
- resolution-mode
  - `/// <reference types="pkg" resolution-mode="import" />`
  - `import type { TypeFromImport } from "pkg" with { "resolution-mode": "import" };`
- `switch (true)` Narrowing
  - 多个 case 针对同一个变量时能够正确的 narrow 类型

```ts
//  Import Attributes
import obj from './something.json' with { type: 'json' };
const obj = await import('./something.json', {
  with: { type: 'json' },
});
```

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-5-3/

## TypeScript 5.2

- `using` - Declarations and Explicit Resource Management
  - Symbol.dispose
  - Symbol.asyncDispose
  - DisposableStack
  - AsyncDisposableStack
  - SuppressedError
- Decorator Metadata
  - Decorator 的 context 支持 context.metadata
  - `Symbol.metadata`

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/

## TypeScript 5.1

- 没有返回默认返回 undefined

```ts
function f4(): undefined {
  // 可以不返回
}

// setter getter 类型可以不一样
interface Serializer {
  set value(v: string | number | boolean);
  get value(): string;
}
```

---

- https://devblogs.microsoft.com/typescript/announcing-typescript-5-1/

## TypeScript 5.0

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

## TypeScript 4.9

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

## TypeScript 4.8

```diff
- type NonNullable<T> = T extends null | undefined ? never : T;
+ type NonNullable<T> = T & {};
```

- 参考
  - [](https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/)

## TypeScript 4.7

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

## TypeScript 4.6

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

## TypeScript 4.5

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
