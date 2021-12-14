---
tags:
  - FAQ
---

# React lib FAQ

## react-router vs react-location

- react-router
  - 更成熟，功能更稳定，开发更活跃，文档更完善
  - 支持 SSR，Native
  - 接口功能完善
  - v6 暂无 prompt
  - useSearchParams
    - 需要自行序列化
    - 不能基于之前状态更新
  - 支持 useRoutes - 使用比较方便
  - children 绝对路径需要包含 parent 前缀
- react-location
  - 用户更少， edge case 可能有问题
  - 只支持 CSR - 不支持 SSR，Native
  - 部分 react-router 内置功能通过 plugin 提供
  - 支持 search 处理
    - 序列化
    - 更新
  - 内置 loader 处理 - element 异步、预先 load 数据、pending 逻辑
  - Route 有 Generic 类型 - 使用起来更方便
  - children 绝对路径基于 parent
- 参考
  - react-location [vs. React Router](https://react-location.tanstack.com/comparison)

## Redux vs MobX

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
