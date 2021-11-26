---
title: zustand
---

# zustand

- [pmndrs/zustand](https://github.com/pmndrs/zustand) 是什么？
  - out of tree 状态管理
    - 可外部查询、修改、订阅
    - 可多个渲染树使用
  - 支持 react concurrency
  - Context 可选
  - 默认全局 store 单例
  - 可在其它框架使用 - 不依赖 react
- subscribeWithSelector

:::tip

- useStore 时推荐 memoize 选择器，避免每次 render 计算
- 可以将选择器定义在外部避免动态创建产生变化
- 可配合 immer 简化操作
- create 包含三个参数 - set,get,api - 可拦截实现中间件模式

:::

:::caution

- 上下文模式必须要求有 Provider/Context - 否则会异常

:::

```ts
import create from 'zustand';
const useStore = create((set) => ({
  count: 0,
  reset: () => set({ count: 0 }),
}));

// shallow compare
import shallow from 'zustand/shallow';
const { count } = useStore(({ count }) => ({ count }), shallow);
// useCallback 可避免每次 render 都计算
const count = useStore(useCallback((state) => state.count, []));
// 定义在组建之外也可以避免
const selectCount = (state) => state.count;
const Counter: React.FC = () => {
  const count = useStore(selectCount);
  return <div>{count}</div>;
};

// vanilla 可在 react 之外使用
import createVanilla from 'zustand/vanilla';
const store = createVanilla(() => ({}));
const { getState, setState, subscribe, destroy } = store;

// 支持订阅 - 之前是内置的
import { subscribeWithSelector } from 'zustand/middleware';
const useStore = create(subscribeWithSelector(() => ({ count: 0 })));
const unsub = useStore.subscribe((state) => state.count, console.log);

// log to redux devtool
import { devtools } from 'zustand/middleware';
const useStore = create(devtools(store));

// 上下文模式
import createContext from 'zustand/context';
// 可以在组建内 初始化
// 可以提供多个 context
interface DemoState {}
const { Provider, useStore, useStoreApi } = createContext<DemoState>();
const createStore = () => create((set, get, api) => ({}));
const Demo = ({ children }) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};
```

## 在外部触发状态

因为 react 是同步处理 setState，因此建议包装在 batchedUpdates 处理。

```ts
import { unstable_batchedUpdates } from 'react-dom'; // or 'react-native'

const useStore = create((set) => ({
  fishes: 0,
  increaseFishes: () => set((prev) => ({ fishes: prev.fishes + 1 })),
}));

const nonReactCallback = () => {
  unstable_batchedUpdates(() => {
    useStore.getState().increaseFishes();
  });
};
```

## 通过引用方式优化快速变化的状态

- 不直接 useStore - 避免 react

```ts
const useStore = create((set) => ({ scratches: 0 }));

function Component() {
  // 初始状态
  const scratchRef = useRef(useStore.getState().scratches);
  // 将变化捕获到引用 - 或直接调用外部 set
  useEffect(
    () =>
      useStore.subscribe(
        (scratches) => (scratchRef.current = scratches),
        (state) => state.scratches,
      ),
    [],
  );
  return;
}
```
