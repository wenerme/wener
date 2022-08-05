---
title: valtio
---

# valtio

- [pmndrs/valtio](https://github.com/pmndrs/valtio)
  - 7kB/2.5kB - use-sync-external-store+proxy-compare
  - 基于 proxy 的状态管理
  - 类似 mobx, vue
  - 默认状态变化是异步触发监听
  - 可以使用 Class 作为 被代理对象
- 参考
  - [pmndrs/eslint-plugin-valtio](https://github.com/pmndrs/eslint-plugin-valtio)
  - [dai-shi/proxy-memoize](https://github.com/dai-shi/proxy-memoize)
  - [dai-shi/valtio-yjs](https://github.com/dai-shi/valtio-yjs)
  - [Noitidart/valtio-persist](https://github.com/Noitidart/valtio-persist)
  - [How valtio works](https://github.com/pmndrs/valtio/wiki/How-valtio-works)
  - [valtio-render-test](https://codesandbox.io/s/valtio-render-test-lzqhf7)

:::tip

- 大状态好拆分合并
- 被 proxy 对象都需要通过 snaoshot 的方式读取数据 - 所以才可以监听嵌套对象的变化
  - snaoshot 返回的是 不可变 对象
- 修改会进行 batch - input 时 useSnapshot 可能需要加 sync
- 特殊值需要特殊处理
- ref/object 赋值都会触发变化，不会判断是否相等

:::


:::note

- support async in watch [#507](https://github.com/pmndrs/valtio/issues/507)

:::

```tsx
import {proxy, useSnapshot, ref, subscribe, snapshot} from 'valtio';

// 不依赖 react
import {proxy, subscribe, snapshot} from 'valtio/vanilla';

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
  a: {v: 1},
  b: {v: 2},
});
// 拆分
const a = state.a;
// 合并
const s = proxy({
  obj1: a,
  obj2: {v: 3},
});

// 可在任意地方订阅变化
const unsubscribe = subscribe(state, () => console.log('changed to', state));
// 订阅部分对象
const unsubscribe = subscribe(state.a, () => console.log('changed to', state));
// 订阅 primitive value
const unsubscribe = subscribeKey(state, 'a.v', () => console.log('changed to', state));

// 基于使用订阅
const stop = watch((get) => {
  console.log('state has changed to', get(state)); // auto-subscribe on use
});

// React 组件内使用 snapshot 订阅变化
const Counter = () => {
  const snap = useSnapshot(state);
  // 直接读状态，不订阅
  const {count} = state;
  return (
    <div>
      {/* 订阅 count 变化 */}
      {snap.count}
      <button
        onClick={() => {
          // 操作 state 进行直接修改
          ++state.count;
        }}
      >
        +1
      </button>
    </div>
  );
};

function TextBox() {
  // 修改默认会 batch - sync 则避免 batch
  // https://github.com/pmndrs/valtio/issues/270
  const snap = useSnapshot(state, {sync: true});
  return <input value={snap.text} onChange={(e) => (state.text = e.target.value)} />;
}

// useSnapshot 时候会 Suspense
const state = proxy({post: fetch(url).then((res) => res.json())});

// 特殊值 - ref 不跟踪
const state = proxy({
  count: 0,
  // ref 不跟踪
  dom: ref(document.body),
});
// Set 接口
const state = proxySet([1, 2, 3]);
// Map 接口
const state = proxyMap([
  ['key', 'value'],
  ['key2', 'value2'],
]);

// derive - 计算状态
const derived = derive({
  doubled: (get) => get(state).count * 2,
});

// alternatively, attach derived properties to an existing proxy
derive(
  {
    tripled: (get) => get(state).count * 3,
  },
  {
    proxy: state,
  },
);

// 计算状态
import memoize from 'proxy-memoize';
import {proxyWithComputed} from 'valtio/utils';

const state = proxyWithComputed(
  {
    count: 1,
    firstName: 'Alec',
    lastName: 'Baldwin',
  },
  {
    doubled: memoize((snap) => snap.count * 2),
    // 包含 setter、getter
    fullName: {
      get: memoize((snap) => snap.firstName + ' ' + snap.lastName),
      set: (state, newValue) => {
        [state.firstName, state.lastName] = newValue.split(' ');
      },
    },
  },
);

// state 支持 undo、redo
const state = proxyWithHistory({count: 0});

// Redux DevTool
const unsub = devtools(state, {name: 'state name', enabled: true});

// 更松散的 类型 - 默认 readtonly T
declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}
```

- `import {proxy} from 'valtio/vanilla'` - 跟踪修改 写入
- `import {createProxy} from 'proxy-compare'` - 跟踪使用 读取
- snapshot - 创建不可变对象
  - 未 resolve 值会 throw error
- useSnapshot - 封装 snapshot 结果，配合 createProxy 跟踪使用
- 内部使用版本号跟踪变化
- React.memo 无法处理代理对象
  - 可以使用 react-tracked 里的 memo
  - 可以在组件内使用 useSnapshot 读取传入对象
  - 可以读取原始值进行传递

## Context

```tsx
import {createContext, useContext} from 'react';
import {proxy, useSnapshot} from 'valtio';
const MyContext = createContext();

const MyProvider = ({children}) => {
  const state = useRef(proxy({count: 0})).current;
  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

const MyCounter = () => {
  const state = useContext(MyContext);
  const snap = useSnapshot(state);
  return (
    <>
      {snap.count} <button onClick={() => ++state.count}>+1</button>
    </>
  );
};
```

## yjs

```js
import * as Y from 'yjs';
import {proxy} from 'valtio';
import {bindProxyAndYMap} from 'valtio-yjs';

const ydoc = new Y.Doc();
const ymap = ydoc.getMap('mymap');

const state = proxy({});

bindProxyAndYMap(state, ymap);
```

- [dai-shi/valtio-yjs](https://github.com/dai-shi/valtio-yjs)

## useProxy marco

```tsx
import {useProxy} from 'valtio/macro';
// useProxy 会变成 useSnapshot
// read state 的地方会变味 snapshot
const Component = () => {
  useProxy(state);
  return (
    <div>
      {state.count}
      <button onClick={() => ++state.count}>+1</button>
    </div>
  );
};
```

- [babel-plugin-macros](https://www.npmjs.com/package/babel-plugin-macros)

```bash
npm i --save-dev aslemammad-vite-plugin-macro babel-plugin-macros
```

```js title="vite.config.js"
import {defineConfig} from 'vite';
import macro from 'valtio/macro/vite';

export default defineConfig({
  plugins: [macro],
});
```

# FAQ

## 'set' on proxy: trap returned falsish for property 'validated'

尝试修改 snapshot 返回值
