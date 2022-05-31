---
title: valtio
---

# valtio

- [pmndrs/valtio](https://github.com/pmndrs/valtio)
  - ~7k+proxy-compare,use-sync-external-store
  - 基于 proxy 的状态管理
  - 类似 mobx, vue
  - 默认状态变化是异步触发监听
- 参考
  - [dai-shi/proxy-memoize](https://github.com/dai-shi/proxy-memoize)
  - [dai-shi/valtio-yjs](https://github.com/dai-shi/valtio-yjs)
  - [Noitidart/valtio-persist](https://github.com/Noitidart/valtio-persist)

:::tip

- 被 proxy 对象都需要通过 snaoshot 的方式读取数据 - 所以才可以监听嵌套对象的变化

:::

```ts
import { proxy, useSnapshot, ref, subscribe, snapshot } from 'valtio';

import {
  subscribeKey,
  watch,
  devtools,
  derive,
  underive,
  proxyWithComputed,
  proxyWithHistory,
  proxySet,
  proxyMap,
  getVersion,
} from 'valtio/utils';

// 因为基于 proxy - 所以可以直接拆分合并
const state = proxy({
  a: { v: 1 },
  b: { v: 2 },
});
// 拆分
const a = state.a;
// 合并
const s = proxy({
  obj1: a,
  obj2: { v: 3 },
});
```

- proxyWithHistory
  - undo, redo
-
