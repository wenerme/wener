---
tags:
  - FAQ
---

# React lib FAQ

### Redux vs MobX

:::tip

- 避免使用 MobX
- Redux 是一种 Pattern - 不一定需要使用 Redux
- 大多场景使用 useState, useImmer, zustand 即可

:::

- https://www.reddit.com/r/reactjs/comments/885bxa/redux_vs_mobx/
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
  - by Redux Author

## react-virtual vs react-window vs react-virtualized

:::tip 💡 如何选择

1. 使用 react-virtual
2. 实在不能满足 尝试 react-window 或 react-virtualized

:::tip

---

- [tannerlinsley/react-virtual](https://github.com/tannerlinsley/react-virtual)
  - 基于 hook
  - 开发活跃
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
