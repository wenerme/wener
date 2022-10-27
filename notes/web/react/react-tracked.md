---
title: react-tracked
---

# react-tracked

- [dai-shi/react-tracked](https://github.com/dai-shi/react-tracked)
  - 通过 proxy 跟踪变化 - 类似 [valtio](./valtio.md)
  - 可以用于 useState, zustand [useStore](./zustand.md), redux useSelector, 主要提供一个匹配的方法即可
  - 使用 proxy-compare
    - getUntracked, createProxy, isChanged
- createTrackedSelector - useSelector -> useTrackedSelector
  - 访问属性会被 watch、select
- createContainer
  - 提供类似 useReducer 的 hook
  - 返回 Provider, useTracked, useUpdate, useTrackedState, useSelector,
  - concurrentMode -> useContextUpdate [use-context-selector](./use-context-selector.md)
    - [useContextUpdate](https://github.com/reactjs/rfcs/pull/119)
- memo - 会处理 proxy 对象值变化
- getUntrackedObject - 获取原始值

:::caution

- useTrackedState 每次返回新的 proxy 对象 - 不等
- React.memo 无法处理传入 proxy 对象，导致值变化但不 rerender
- 传值到 render 之外时记得 getUntrackedObject

:::

```tsx
const reducer = () => {};
const { Provider, useTracked } = createContainer(({ reducer, initialState, init }) =>
  useReducer(reducer, initialState, init),
);

// 直接使用状态的方式
const {} = createContainer(({ initialState = {} }) => useState(initialState));

// 使用 immer 更新
import produce from 'immer';
const useTrackedWithImmer = () => {
  const [state, setState] = useTracked();
  const update = useCallback(
    (updater) => {
      setState((oldVal) => produce(oldVal, updater));
    },
    [setState],
  );
  return [state, update];
};

const App = ({ initialState }) => (
  <Provider reducer={reducer} initialState={initialState}>
    ...
  </Provider>
);
```
