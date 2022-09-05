---
title: React Route
---

# React Route

- [remix-run/react-router](https://github.com/remix-run/react-router)
  - 核心 [remix-run/history](https://github.com/remix-run/history)

:::caution

- 不能嵌套 Router
- children 绝对路径需要包含 parent 前缀

:::

```bash
npm add react-router-dom
```


- Path
  - `*` - 处理 NotFound
  - `:handle`
    - `const { handle } = useParams()`

## Notes

:::caution v6

- [react-router#7634](https://github.com/remix-run/react-router/issues/7634)
  - useNavigate 会导致 rerender
- [react-router#8139](https://github.com/remix-run/react-router/issues/8139)
  - usePrompt & useBlocker
- [react-router#8254](https://github.com/remix-run/react-router/issues/8254)
  - path regex
- [react-router#8381](https://github.com/remix-run/react-router/issues/8381)
  - Optional routing parameters in v6

:::

- Router - 不能嵌套
  - NavigationContext - { basename, navigator, static }
    - useNavigate
  - LocationContext - { location, navigationType }
    - useLocation
    - useNavigationType
  - stripBasename - 实现 basename 能力
- Routes
  - createRoutesFromChildren
  - useRoutes - 支持自定义 location - 默认使用上下文 location
    - matchRoutes - 匹配移除 parentPathnameBase
    - renderMatches
      - RouteContext - { outlet, matches }
- matchRoutes
  - flattenRoutes
    - computeScore
      - segments.length +
      - splatPenalty=-1 - `*`
      - indexRouteValue=2 - `index: true`
        - index 路由不能有 children
      - dynamicSegmentValue=3 - `:id`
      - emptySegmentValue=1 - `""`
      - staticSegmentValue=10 - `/user`
  - rankRouteBranches
  - matchRouteBranch

# Version

## React Router v6

- 替代 React Router v3,v4,v5, Reach Router
- 支持 嵌套路由
  - `<Outlet/>` 渲染下一个匹配
- 支持 相对路径
- 支持 basename - 路由更加通用，方便嵌套
- 内置 RouterObject - 直接 JS 配置
  - useRoutes
- 纯 Hook 重写 - 要求 React 16.8+
- 不再需要 exact - 使用 `*` 进行任意匹配
- element 替代 component 和 render
- 基于 rank 的路由优先级
- 不再使用 path-to-regexp - 因此路径写法会有区别
  - https://github.com/remix-run/react-router/discussions/8132
  - [What Happened to Regexp Routes Paths?](https://reactrouter.com/docs/en/v6/getting-started/faq#what-happened-to-regexp-routes-paths)
    - 无法 Rank 路径
    - bundle size 较大- 1/3 of react-router
      - path-to-regexp 6kB/2.2kB
      - react-router - 11kB/4kB
        - history - 6kB/2kB
      - react-router-dom + 7kB/2kB
- https://remix.run/blog/react-router-v6

:::caution

- 暂不支持 Prompt
- 不再暴露 history - 使用上有很多不方便
  - 可使用 unstable_HistoryRouter 自己提供 history
  - 可能存在引入不同版本 history 导致冲突的问题

:::

---

- https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-to-react-router-v6
- Switch -> Routes
- Redirect -> Navigate
- Link 移除 component 熟悉
  - 推荐使用默认 `<a>`
  - 使用 useLinkClickHandler 构建自定义 Link
- useHistory -> useNavigate,useSearchParams
  - 接口不一样
  - useHistory 返回 history 实例
  - useNavigate 返回封装后辅助方法
  - 更好的支持 React suspense - useTransition
- `<NavLink exact />` -> `<NavLink end />`
- useRouteMatch -> useMatch

# FAQ

## Switch vs Route

`<Switch>` 只渲染一个路由. 而 `<Route>` 会渲染所有匹配的路由。
