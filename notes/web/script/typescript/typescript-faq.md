---
tags:
  - FAQ
---

# Typescript FAQ

:::caution

- 部分类型参数推导 [#26242](https://github.com/microsoft/TypeScript/issues/26242)
- monorepo 类型问题 [TypeScript#25376](https://github.com/microsoft/TypeScript/issues/25376)
  - 目前就 npm monorepo 工作相对正常
- `abstract static` [TypeScript#34516](https://github.com/microsoft/TypeScript/issues/34516)

:::

## tsconfig.tsbuildinfo

- `--incremental`

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

> Array function use generic type parameter

```ts
const identity = <T>(value: T): T[] => {
  return [value];
};
```

```tsx
// TSX
const identity = <T,>(arg: T): T => arg;
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
- nextjs
  - https://github.com/vercel/turbo/discussions/620

### ts-node

- esm 有问题 https://github.com/TypeStrong/ts-node/discussions/1450#discussion-3563207

```bash
npm add -D tsconfig-paths
```

```json
{
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  }
}
```

- https://github.com/TypeStrong/ts-node#paths-and-baseurl

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

- [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts)
  - 不支持 path
- [rollup-plugin-ts](https://github.com/wessberg/rollup-plugin-ts)
- [timocov/dts-bundle-generator](https://github.com/timocov/dts-bundle-generator)
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

## Polymorphic React Props

```ts
import * as React from "react";

type BoxProps<E extends ElementType> = Omit<ComponentProps<E>, 'as'> & {
  as?: E;
};

const Box = <E extends ElementType = 'div'>({ as, ...props }: BoxProps<E>) => {
  const TagName = as || 'div';
  return <TagName {...props} />;
};

type PolymorphicProps<P extends { as?: T }, T extends React.ElementType> = P &
  Omit<React.ComponentPropsWithoutRef<T>, keyof P>;

type ButtonProps<T extends React.ElementType> = PolymorphicProps<
  {
    as?: T;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  },
  T
>;

function Button<T extends React.ElementType = "button">({
  as,
  ...props
}: ButtonProps<T>
) {
  const Component = as || "button";
  return <Component {...props} />;
}
```

- [Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdMAnmFnAAoQA2TI0YAC2C52xMKgA87OFgAeMLADsAJugDeKVAH4AXHAAqcAL4AaAzPlLVmKjAB0AUS5YQSmPpZYAfHAC8HOAAyOjg4AHkQYBgJbDx7AGESSEU3UQhxAHUogQgAVxhsAgl9LzMAaywmCAIOL3pGTzgAIXyYCEU08WKLBRV0WPxHZ1dFd0b-AHIAI1b2iZ9-Th4+KEFhTskQuDUt0LRdA3pQ0OF2g4H7C4A5CGUsI+PcIS5lSkVz2ztr2-ut0y39HQ6gwCLlFPhgO1mrNFN05L1rBchi43B5WH5yDMYG1FGQvAAKHZ7VAmLZ2clgMSoOhGPQtbHtDbFLx0ACU2y2uHaqHgiXA7TcGLQcAAPiLMTDaFtKDBclBFHAJHzkoK1OS7JT0qgjHAAPTAowMYCjLBQAh4NgAZVwlGQkUUAHN6TiNhzQq5UKhkA6sHoeVBjQ76Ia6KDwTBIQrrbb7U6YYS4B6vT7jHpozhY87GVT2US4DK5QqJFicXBmKxfGQS+0yHB2vEuMIyr41Pj2b4fMhnLB8UnvVhWUYvA2m4msABCCS66uKA1G-mwbZwZUC0YbMxOFGjNFsHVEEhwCa2-ATerlthNCCyJkOHpWdCbkZjVgLcKRaIrlJrqkSBylQ9oPMQRupoBwOMG9RcooPLNFeGK-nefRwI+qLjIeyjAAAbvMCZoGY6qauIqawdeP5-u2Ph5lBMH6N6Vx2mw-jCmK6FYae0pYLK8qKrRDr0a42wEVSOr6hBDChmCEJQgAgmAYBtiBBbcfiuyKiyxzHBIWazgAkigpDIHAM5Ttp6kaYq2maJWyC1gIlAEJWup4npdooHAjaKGUJkwmZGlaTCcB2VgDlkE5XguaQigQPAhkeWUZioBAgX2XAwDoFFMVwJhXbAMocCEd5DKzqpoT+UVVlqOmdqBtpOp9j6lYABJYFwXBJQA7tALy1vqJUWQF9VYE1LVtXAnVQN14X6XAGVuagNoZoGRkBYlY6ev2qXpdFbnZY2eUFbqpl9VpcFBQ5Ey6hdvmaZeshWRMyATMlwW+BdV3Hbd90Ydhz3nZdvV+QDcCssGDBAA)

## namespace

- https://github.com/babel/babel/issues/8244
- https://github.com/microsoft/TypeScript/issues/30994
