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

## react-window vs react-virtualized

:::tip 💡 如何选择

1. 简单场景使用 react-window, 复杂场景使用 react-virtualized
2. 面向客户端，强调性能使用 react-window；后端应用，强调功能使用 react-virtualized

:::tip

---

- react-window - min 24k ![](https://badgen.net/bundlephobia/min/react-window)
  - 重写 react-virtualized
  - 更加轻量
  - 通过额外包提供缺少的功能
    - 7k react-virtualized-auto-sizer
    - 3.5k react-window-infinite-loader
  - 只有 4 个核心组件 - 简单易用
  - 不支持动态行高
    - [bvaughn/react-window#6](https://github.com/bvaughn/react-window/issues/6)
      Support just-in-time measured content
    - 自行实现参考 [dynamic-size-of-react-window-list-items](https://codesandbox.io/s/dynamic-size-of-react-window-list-items-64o9p?file=/src/ChatMessage.js)
- react-virtualized - min 118k ![](https://badgen.net/bundlephobia/min/react-virtualized)
  - 功能更完善
  - 开发更活跃
  - 使用的人更多
  - 5 个核心组件 + 8 个工具组件
  - 支持 2 维 非 Grid 渲染
  - 支持动态行高 CellMeasurer - 自己也可以实现
- [How is react-window different from react-virtualized?](https://github.com/bvaughn/react-window#how-is-react-window-different-from-react-virtualized)
- [Windowing wars: React-virtualized vs. react-window](https://blog.logrocket.com/windowing-wars-react-virtualized-vs-react-window)
