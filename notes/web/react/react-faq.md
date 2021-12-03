---
title: React FAQ
tags:
  - FAQ
---

# React FAQ

## React Pattern

- innerRef, elementRef, forwardRef 透传内部引用

## 如何选择运行时框架

最早的 React 开发一般使用 CRA，但 CRA 基于 webpack，异常的慢，在 2021 年不再值得使用。

---

- 选择依据
  - 单页面 - vite, nextjs
    - 复杂前端
    - 动态模块 - systemjs, dynamic import, esm
  - 多页面 - vite, nextjs, remix
    - 支持多页面 export
  - 单 HTML 入口 vs. 多 HTML 入口
    - vitejs 支持 多 HTMl 入口
    - nextjs 只支持 单 HTML 入口
  - 需要 SEO/SSR - nextjs, remix
  - 全栈 - nextjs, remix
  - 路由类型
    - 客户端控制 - SPA - vite
    - 服务端控制 - nextjs, remix
  - 网站内容类型
    - 管理后台 - 单页、复杂、CS 交互
    - 营销 - SEO、静态、增量
    - 电商 - 数据、SEO、静态
  - 部署方式
    - 静态 - 需要导出
    - 动态 - 启动服务
      - 部署 NodeJS 会比较麻烦 - node_modules 很大
    - Serverless
- 现在 CS 混合渲染越来越多，值得尝试
- React Server Components 也是一个趋势
  - 组建级动态

## Cannot update a component while rendering a different component

- 避免 render 阶段修改状态
- 参考
  - [facebookexperimental/Recoil#12](https://github.com/facebookexperimental/Recoil/issues/12)

```ts
// from
if (storeRef.current && !isEqual(preloadRef.current, props)) {
  console.debug(`DashboardStoreProvider: update preload`);
  preloadRef.current = props;
  storeRef.current.setState(props as any);
}

// to
useDeepCompareEffect(() => {
  if (storeRef.current) {
    storeRef.current.setState(props as any);
  }
}, [props]);
```

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

## 动态加载 script

react-helmet, next/head 支持 script 标签，但无法检测状态。
react-helmet 可以支持一个 onChangeClientState 来检测。

可以考虑 [useScript](https://usehooks.com/useScript/) 自行封装一个。
