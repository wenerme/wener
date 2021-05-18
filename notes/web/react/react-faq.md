---
title: React FAQ
---

# React FAQ

## Cannot update a component while rendering a different component

- 避免 render 阶段修改状态
- 参考
  - [facebookexperimental/Recoil#12](https://github.com/facebookexperimental/Recoil/issues/12)

## 上下文变化但不从新渲染

0. 使用能够 selector 的状态管理库 - 允许读取部分状态
1. 使用能区分 read 和 write 的库 - 允许独立更新

---

- https://github.com/facebook/react/issues/15156#issuecomment-474590693
  - 拆分大对象上下文 - 避免直接修改
    - 区分常变化的上下文和不常变化的上下文
  - 拆分组件，使用 memo hoc 组件
    - 组件避免不必要刷新
  - 单个组件，使用 useMemo 构建组件
    - 逻辑构建不刷新组件
  - 建议不用 context 来传递数据，使用订阅
  - RFC [useContextSelector](https://github.com/reactjs/rfcs/pull/119)
    - [use-context-selector](https://github.com/dai-shi/use-context-selector)
- [Will this React global state work in Concurrent Mode?](https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-mode)
