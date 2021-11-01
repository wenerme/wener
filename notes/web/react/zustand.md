---
title: zustand
---

# zustand

- [pmndrs/zustand](https://github.com/pmndrs/zustand) 是什么？
  - out of tree 状态管理
    - 可外部查询、修改、订阅
    - 可多个渲染树使用
  - 支持 react concurrency
  - Context 可选 - 默认全局 store 单例
  - 可在其它框架使用 - 不依赖 react
- subscribeWithSelector

:::tip

- useStore 时推荐 memoize 选择器，避免每次 render 计算
- 可以将选择器定义在外部避免动态创建产生变化
- 可配合 immer 简化操作
- create 包含三个参数 - set,get,api - 可拦截实现中间件模式

:::

## 上下文

```ts
const { Provider, useStore, useStoreApi } = createContext();
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
const useStore = create(set => ({ scratches: 0, ... }))

function Component() {
  // 初始状态
  const scratchRef = useRef(useStore.getState().scratches)
  // 将变化捕获到引用 - 或直接调用外部 set
  useEffect(() => useStore.subscribe(
    scratches => (scratchRef.current = scratches),
    state => state.scratches
  ), [])
  return
}
```
