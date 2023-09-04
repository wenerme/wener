---
tags:
  - FAQ
---

# Typescript FAQ

:::caution

- monorepo 类型问题 [TypeScript#25376](https://github.com/microsoft/TypeScript/issues/25376)
  - 目前就 npm monorepo 工作相对正常
- `abstract static` [TypeScript#34516](https://github.com/microsoft/TypeScript/issues/34516)

:::

## type vs interface

建议优先 interface

- 更直观 - 写法和功能上
- 对熟悉其他语言的人来说更好理解
- 弱于 `type` - 避免太复杂

---

- `type`
  - Type alias
  - 可以表示任意类型
  - 支持 union、mapped type、conditional type、tuple
  - 隐含 `Record<PropertyKey, unknown>`
- `interface`
  - 可以 extends - 会比 type `&` 快一点
  - 同名会做合并 - 通常是不希望的结果

---

- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
  - 建议优先 interface
- https://www.totaltypescript.com/type-vs-interface-which-should-you-use

## 为每个方法添加一个参数

- https://stackoverflow.com/a/49479117/1870054

## Expected 3 type arguments, but got 1

- TS 5.0 不支持部分参数推导
- https://stackoverflow.com/a/55754981/1870054
- [#10571](https://github.com/Microsoft/TypeScript/issues/10571)
  Allow skipping some generics when calling a function with multiple generics
- [#26242](https://github.com/Microsoft/TypeScript/issues/26242)
  Partial Type Argument Inference

## 箭头函数使用泛型参数

```ts
const identity = <T>(value: T): T[] => {
  return [value];
};

// TSX
const identity = <T>(arg: T): T => arg;
```

## Path alias

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- https://www.npmjs.com/package/module-alias
- self link
  - PNPM
    - https://pnpm.io/aliases
    - https://github.com/pnpm/pnpm/issues/6316
    - dependencies `"src": "workspace:web@^"`
  - https://yarnpkg.com/configuration/yarnrc#nmSelfReferences

## I 接口命名前缀

- 觉得需要用的时候就用
  - 类和接口同时存在
- 如果只有接口没有实现时，不要加前缀

```ts
// user.ts
// IUserService 仅提供给使用方
export class UserService implements IUserService {}
export interface IUserService {}

// index.ts
// 对外只暴露接口，避免 import 的时候导入源码增加 bundle
export { type IUserService } from 'user.ts';

// client.ts
import type { IUserService } from 'server';
// 客户端不需要 bundle 源码
const svc = getService<IUserService>('user');
```

---

- https://stackoverflow.com/a/41967120/1870054

## DEV

```ts title="types.d.ts"
declare var __DEV__: boolean;
```

## 使用 pnpm 安装，Typescript 报类型错误

- 尝试 preserveSymlinks

```json
{
  "compilerOptions": {
    "preserveSymlinks": true
  }
}
```

- https://github.com/microsoft/TypeScript/issues/29808

## Types of property 'propTypes' are incompatible

## method-signature-style

```ts
interface Example {
  // method shorthand syntax
  func(arg: string): number;

  // regular property with function type
  func: (arg: string) => number;
}
```

- method args - bivariant
- function args - contravariant
- https://github.com/microsoft/TypeScript/pull/18654

## as const

- const assertions
- 不会让类型变宽 - `'hello'` 不会变为 `string`
- 都是 readyonly
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions

## bundle/rollup d.ts

- rollup-plugin-dts
  - 不支持 path
- rollup-plugin-ts
- https://github.com/Microsoft/TypeScript/issues/4433
- bun bundle 逻辑
  - 都是 d.ts 好处理些
  - https://github.com/oven-sh/bun/blob/main/packages/bun-types/scripts/bundle.ts

> The inferred type of '' cannot be named without a reference to sequelize

[TypeScript#42873](https://github.com/microsoft/TypeScript/issues/42873)

```bash
# tsconfig 可以调整为 include 需要的内容
pnpm tsc -p ./tsconfig.json --noEmit false --emitDeclarationOnly true --declaration true --outDir ./dist/types

# 直接生成
pnpm tsc --target ESNext --jsx preserve --declaration --strict --pretty --out ./dist/server.js --module system --moduleResolution node --emitDeclarationOnly ./src/server/routers/_app.ts
```

## Module 'wechat4u' resolves to an untyped module at , which cannot be augmented.

将所有的类型定义都放在 declare module 里

## TS6133: 'React' is declared but its value is never read.

- jsx: react
- https://github.com/microsoft/TypeScript/issues/41882

## SyntaxError: This experimental syntax requires enabling one of the following parser plugin(s): "decorators", "decorators-legacy".

```js
export default {
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
};
```

- https://github.com/trivago/prettier-plugin-sort-imports/issues/120

## mixin

- https://www.typescriptlang.org/docs/handbook/mixins.html
