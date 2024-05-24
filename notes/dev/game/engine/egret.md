---
title: egret
---

# egret

- [egret-labs/egret-core](https://github.com/egret-labs/egret-core)
  - 2021 开发公司破产，开发停止,
- 参考
  - 中文文档 https://www.egret.uk/
  - [egret make --egretversion xxxx 到底做了什么？](https://www.cnblogs.com/hackerl/p/13547519.html)
  - [domchen/typescript-plus](https://github.com/domchen/typescript-plus)

## typescript-plus

- emitReflection
- `__reflect(prototype,className,[baseClassName])` 类似于 tsc 的 `__extends`
  - https://github.com/domchen/typescript-plus/blob/master/tools/reflection.ts
  - `__class__` 类名
  - `__types__` 实现的类名字 - 会包含自己

```ts
function __reflect(e, t, o) {
  e.__class__ = t;
  o ? o.push(t) : (o = [t]);
  e.__types__ = e.__types__ ? o.concat(e.__types__) : o;
}
```

```ts
{
  let TRACE = (globalThis.TRACE = globalThis.TRACE || {});

  function __reflect(e, t, o) {
    e.__class__ = t;
    o ? o.push(t) : (o = [t]);
    e.__types__ = e.__types__ ? o.concat(e.__types__) : o;

    TRACE.classes = TRACE.classes || {};
    TRACE.classes[t] = { type: e, name: t, types: e.__types__ };
  }

  globalThis.__reflect = __reflect;
}
```

```js
copy(
  JSON.stringify(
    Object.values(TRACE.classes).map((v) => {
      return {
        name: v.name,
        types: v.types,
        props: Object.getOwnPropertyNames(v.type).filter((v) => !['__class__', '__types__','__hashCode__', 'constructor'].includes(v)),
      };
    }),
    null,
    2,
  ),
);
```
