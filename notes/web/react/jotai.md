---
title: Jotai
---

# Jotai

- Jotai 是什么？
  - 核心接口 atom, Provider, useAtom
    - jotai/utils 包含其他工具 atom
    - jotai/集成 包含与其他库集成的逻辑 - zustand, xstate, react-query, redux, immer, valtio
    - jotai/devtools - Redux devtool 集成 - `useAtomDevtools(tasksAtom)` - 依赖 debugLabel
  - 类似 Recoli 但使用上更简单
  - 替代 useState+useContext
  - Suspense
  - vs Recoil
    - jotai: 最小化接口, 不使用字符串标识, TypeScript
      - Jotai advantages over Recoil [#420](https://github.com/pmndrs/jotai/issues/420)
    - recoil: string key, 序列化支持更好
  - [vs zustand](https://github.com/pmndrs/jotai/blob/master/docs/introduction/comparison.md)
