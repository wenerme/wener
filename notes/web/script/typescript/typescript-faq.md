---
tags:
  - FAQ
---

# Typescript FAQ

:::caution

- monorepo 类型问题 [TypeScript#25376](https://github.com/microsoft/TypeScript/issues/25376)
  - 目前就 npm monorepo 工作相对正常

:::

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
export {type IUserService} from 'user.ts';

// client.ts
import type {IUserService} from 'server';
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
