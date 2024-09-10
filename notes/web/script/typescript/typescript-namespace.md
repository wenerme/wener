---
title: TypeScript Namespace
---

# TypeScript Namespace

:::tip

1. namespace 是 TypeScript 特有的一种组织代码的方式。
2. namespace 本质上是全局命名空间中的命名 JavaScript 对象。
3. 推荐使用 `namespace` 而不是 `module`, 避免和 ES6 的 module 混淆。
4. 当存在同名，但不同上下文的时候，使用 namespace 非常便捷。
   - 例如: 项目里有两个 `useResourceId`, 增加 namespace 变成 `FormContext.useResourceId`, `ResourceContext.useResourceId`

:::

```ts
export namespace A {
  export const B = 1;
}
```

**或**

```ts
export module A {
  export const B = 1;
}
```

**等同于**

```js
export var A;
(function (A) {
  A.B = 1;
})(A || (A = {}));
```

:::caution

- namespace 可能会有 tree shaking 的问题, 可以避免单个 namespace 内容过多
- `export * as name` 本质也是 namespace 一种方式，这种方式也是会有 tree shaking 的问题

:::

**Namespace 替代写法**

1. 组织 utils

```ts title='utils.ts'
export { foo } from './foo';
```

```ts title='index.ts'
// 暴露为一个对象，这种场景可直接使用 namespace
export * as utils from './utils';

// 使用时作为 namespace，每次时都要这样定义
import * as utils from './utils';
```

1. 单例对象

```ts
class _Helper {
  foo() {}
}

export const Helper = new _Helper();

// 或者

export class Helper2 {
  static foo() {}
}
```

**Namespace**

> 当功能更多的时候，更好组织代码

```ts
export namespace Helper {
  export function foo() {}
}
```

---

- namespace
  - 没有被 deprecated
  - 另外的一种组织代码的方式
  - 可以用来组织复杂的单文件
  - 可以用来实现 singletone 的工具类
- 大多时候推荐使用 es module 而不是用 namespace
  - module 依赖 module loader/runtime/cjs/esm - 现代环境都有
  - ECMAScript 2015+ / ES6+
- namespace 指代 internal modules
- TypeScript 1.5+
  - `module X` = `namespace X`
- https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html
- https://www.typescriptlang.org/docs/handbook/namespaces.html
- https://github.com/babel/babel/issues/8244
- https://github.com/microsoft/TypeScript/issues/30994
