---
title: react-window
---

# react-window

- [bvaughn/react-window](https://github.com/bvaughn/react-window)
- FixedSizeList
- VariableSizeList
- FixedSizeGrid
- VariableSizeGrid

# FAQ

## react-window vs react-virtualized

- react-window - gzipped < 2KB
  - 重写 react-virtualized
  - 更加轻量
  - 通过额外包提供缺少的功能
    - react-virtualized-auto-sizer
    - react-window-infinite-loader
  - 只有 4 个核心组件
- react-virtualized - gzipped 33.5KB
  - 功能更完善
  - 开发更活跃
  - 使用的人更多
  - 5 个核心组件 + 8 个工具组件
  - 支持 2维 非 Grid 渲染
- [How is react-window different from react-virtualized?](https://github.com/bvaughn/react-window#how-is-react-window-different-from-react-virtualized)
- [Windowing wars: React-virtualized vs. react-window](https://blog.logrocket.com/windowing-wars-react-virtualized-vs-react-window)
