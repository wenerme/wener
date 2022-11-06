---
title: use-context-selector
---

# use-context-selector

- [use-context-selector](https://github.com/dai-shi/use-context-selector)
  - 支持 context 选取部分 - 监听部分变化
  - 可以传递更新逻辑 - 支持 suspense
  - 支持 concurrent 模式
  - 提供 BridgeProvider - 多个 render 上下文
  - 无 Consumer
- 参考
  - RFC [useContextUpdate](https://github.com/reactjs/rfcs/pull/119)

```tsx
// 实际 Context 值对象
// React.Provider 的值不会发生变化
type ContextValue<Value> = {
  [CONTEXT_VALUE]: {
    /* "v"alue     */ v: MutableRefObject<Value>;
    /* versio"n"   */ n: MutableRefObject<Version>;
    /* "l"isteners */ l: Set<Listener<Value>>;
    /* "u"pdate    */ u: (thunk: () => void, options?: { suspense: boolean }) => void;
  };
};

// 跟踪 useContextSelector
type Listener<Value> = (action: { n: Version; p?: Promise<Value>; v?: Value }) => void;
```

```ts
import { createContext, useContextSelector } from 'use-context-selector';

const Context = createContext(null);

const StateProvider = ({ children }) => (
  <Context.Provider value={useState({ count1: 0, count2: 0 })}>{children}</Context.Provider>
);
```
