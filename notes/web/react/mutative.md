---
title: mutative
---

# mutative

- [unadlib/mutative](https://github.com/unadlib/mutative)
  - MIT, TS
  - 类似于 [immer](./immer.md)
    - 默认不 freeze
    - 使用重放的机制 - 性能更好
      - shallow copy
    - 暴露更多内部可配置功能 - 更高的定制化能力
    - 没有全局配置
    - 支持 async
    - 使用 json patch

## Notes

- markSimpleObject

```ts
export const markSimpleObject = (value: unknown) => {
  if (isSimpleObject(value)) {
    return dataTypes.immutable;
  }
  return;
};

const isSimpleObject = (value: unknown) => {
  if (!value || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null) {
    return true;
  }
  const constructor = Object.hasOwnProperty.call(prototype, 'constructor') && prototype.constructor;

  if (constructor === Object) return true;

  return typeof constructor === 'function' && Function.toString.call(constructor) === constructorString;
};
```
