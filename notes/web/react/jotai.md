---
title: Jotai
---

# Jotai

- [pmndrs/jotai](https://github.com/pmndrs/jotai) 是什么？
  - 7.1kB/2.7kB
  - 大状态拆分小(原子/atom)状态 - 原子状态更利于复用和减小变化影响范围
  - 核心接口 atom, Provider, useAtom, Store
    - jotai/utils 包含其他工具 atom
    - jotai/集成 包含与其他库集成的逻辑 - zustand, xstate, react-query, redux, immer, valtio
    - jotai/devtools - Redux devtool 集成 - `useAtomDevtools(tasksAtom)` - 依赖 debugLabel
  - 类似 Recoli 但使用上更简单
  - 替代 `useState`+`useContext`
  - Suspense
  - vs Recoil
    - jotai: 最小化接口, 不使用字符串标识, TypeScript
      - Jotai advantages over Recoil [#420](https://github.com/pmndrs/jotai/issues/420)
    - recoil: string key, 序列化支持更好
  - [vs zustand](https://github.com/pmndrs/jotai/blob/master/docs/introduction/comparison.md)
- 参考
  - https://blog.axlight.com/posts/jotai-tips/

```bash
# 推荐 focusAtom
npm install jotai optics-ts jotai-optics
```

:::tip

- jotai 提供原子能力，可以与现有状态管理集成使用 - [zustand](./zustand.md), [valtio](./valtio.md), xstate, redux, [urql](../../service/api/urql.md)
- 状态拆分 splitAtom, selectAtom, focusAtom [optics-ts](https://github.com/akheron/optics-ts) 9kB/3kB
- atom 和 async/await 一样有传染性
  - 因此 jotai 提供非常多的集成和辅助
- atom vs [valtio](./valtio.md)
  - valtio
    - 基于代理，不能随便传递 - 接收方明确知道是 代理
    - 更容易 select 部分状态
  - atom
    - 有专门的 wrapper 类型 - 类似 Promise，接收方肯定知道是 atom
    - 侵入性更大，但更不容易出错，可以直接传递使用
    - 依赖 focusAtom、splitAtom、selectAtom 来拆分状态

:::

- Store 为上下文
  - 可以在非 react 环境使用
  - `.get`,`.set`,`.sub`

## utils

- storage - `import { atomWithStorage, RESET } from 'jotai/utils'`
- SSR - `import { useHydrateAtoms } from 'jotai/utils'`
- Async - `import { loadable, atomWithObservable, unwrap } from "jotai/utils"`
  - `loadable` - 避免 Suspense
- reset - `import { atomWithReset, useResetAtom, RESET } from 'jotai/utils'`
  - 重置为之前状态
- Family - `import { atomFamily } from 'jotai/utils'`
  - 创建 factory
  - 支持自定义 equal
- callback - `import { useAtomCallback } from 'jotai/utils'`
  - 动态和 atom 交互，而不是预定义的 atom
- reducer - `import { atomWithReducer } from 'jotai/utils'`
- selectAtom
  - 获取部分状态
  - 监听部分变化
- splitAtom
  - array -> item

```ts
function selectAtom<Value, Slice>(
  anAtom: Atom<Value>,
  selector: (v: Value, prevSlice?: Slice) => Slice,
  equalityFn: (a: Slice, b: Slice) => boolean = Object.is
): Atom<Slice>
```

## 集成

- jotai-trpc - 使用 Vanilla 客户端
  - atomWithQuery
  - atomWithMutation
  - atomWithSubscription
- jotai-tanstack-query
  - atomsWithQuery
  - atomsWithInfiniteQuery
  - atomsWithMutation
- jotai-urql
  - atomWithQuery
  - atomWithMutation
  - atomWithSubscription
- jotai-immer
- jotai-xstate
- jotai-location
  - window.location
- jotai-cache
  - read-only atom with cache
  - 基于状态 memo
- jotai-molecules
  - Molecule pattern
  - https://jotai.org/docs/guides/atoms-in-atom
- jotai-optics
  - 获取部分 state
- jotai-redux
- jotai-relay
- jotai-valtio
  - atomWithProxy
    - valtio -> atom
- jotai-zustand
  - atomWithStore

---

- @swc-jotai/react-refresh
- @swc-jotai/debug-label
- jotai/babel/plugin-react-refresh
- jotai/babel/plugin-debug-label
- jotai/babel/preset
- jotai-devtools
  - useAtomsDebugValue
  - useAtomDevtools
  - useAtomsDevtools
  - useAtomsSnapshot
  - useGotoAtomsSnapshot
