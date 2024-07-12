---
title: Remix Router
tags:
  - Router
---

# Remix Router

- [remix-run/react-router](https://github.com/remix-run/react-router)
  - npm:react-router -> @remix-run/router
  - ~~[remix-run/history](https://github.com/remix-run/history)~~ 合并到了 @remix-run/router
  - 支持 ReactDOM 和 ReactNative
  - 支持 MemoryRouter
  - 支持 HashRouter 和 BrowserRouter
  - 支持 Full-Stack
  - 支持 Form
  - remix 核心的路由逻辑也有 @remix/router 实现
    - 基于文件路由
    - 生成路由表

:::caution

- 因为同时兼容支持 ReactDOM、ReactNative、Remix Run - 因此牺牲了很多单个平台的高级特性
  - 现在（2024年）重心在 remix run - 因此主要在 ssr/Server Component 等数据服务相关部分
- 不能嵌套 Router
- children 绝对路径需要包含 parent 前缀
- NavLink 使用 routerState 会每次 rerender
  - [react-router-dom/index.tsx#L427-L501](https://github.com/remix-run/react-router/blob/f722d7fda7a5aff1d90fdc2d8cf51f14f7870376/packages/react-router-dom/index.tsx#L427-L501)
- useNavigate 会 rerender [#7634](https://github.com/remix-run/react-router/issues/7634)
- 无法获取到 history - 除非自己做上下文
  - `useContext(UNSAFE_NavigationContext).navigator as History`
    - unsafe 方式获取 history
  - createHashRouter 和 createBrowserRouter 都无法自己传递 history
  - history 只能做一次 listen - 因此拿到了意义也不大
    - v6.4+
- useSearchParams 会导致任意参数变化都会 rerender - 无法只监听一个参数
  - 只能尝试通过 history 重新封装
  - https://github.com/remix-run/react-router/discussions/9851
- 没有过多暴露 low-level 接口
  - 导致部分特殊功能不好实现

:::

```bash
npm add react-router-dom
```

```ts
// for https://github.com/HTTPArchive/wappalyzer
window.__remixContext; // Remix 全局检测
window.__reactRouterVersion // ReactRouter
```

- CWV - Core Web Vitals
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
- Context
  - DataRouterContext
  - DataRouterStateContext - `Router['state']`
  - LocationContext
  - NavigationContext
  - RouteContext
  - RouteErrorContext
- createMemoryRouter
  - -> createRouter+createMemoryHistory
- https://github.com/remix-run/react-router/blob/main/packages/react-router/index.ts

```ts
interface DataRouterContextObject extends Omit<NavigationContextObject, 'future'> {
  router: Router;
  staticContext?: StaticHandlerContext;
}

interface NavigationContextObject {
  basename: string;
  navigator: Navigator;
  static: boolean;
  future: {
    v7_relativeSplatPath: boolean;
  };
}

interface RouteContextObject {
  outlet: React.ReactElement | null;
  matches: RouteMatch[];
  isDataRoute: boolean;
}
```

## @remix-run/router

- history + Router
- https://github.com/remix-run/react-router/blob/main/packages/router/router.ts

## Router

```ts
/**
 * A Router instance manages all navigation and data loading/mutations
 */
export interface Router {
  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Return the basename for the router
   */
  get basename(): RouterInit['basename'];

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Return the future config for the router
   */
  get future(): FutureConfig;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Return the current state of the router
   */
  get state(): RouterState;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Return the routes for this router instance
   */
  get routes(): AgnosticDataRouteObject[];

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Return the window associated with the router
   */
  get window(): RouterInit['window'];

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Initialize the router, including adding history listeners and kicking off
   * initial data fetches.  Returns a function to cleanup listeners and abort
   * any in-progress loads
   */
  initialize(): Router;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Subscribe to router.state updates
   *
   * @param fn function to call with the new state
   */
  subscribe(fn: RouterSubscriber): () => void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Enable scroll restoration behavior in the router
   *
   * @param savedScrollPositions Object that will manage positions, in case
   *                             it's being restored from sessionStorage
   * @param getScrollPosition    Function to get the active Y scroll position
   * @param getKey               Function to get the key to use for restoration
   */
  enableScrollRestoration(
    savedScrollPositions: Record<string, number>,
    getScrollPosition: GetScrollPositionFunction,
    getKey?: GetScrollRestorationKeyFunction,
  ): () => void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Navigate forward/backward in the history stack
   * @param to Delta to move in the history stack
   */
  navigate(to: number): Promise<void>;

  /**
   * Navigate to the given path
   * @param to Path to navigate to
   * @param opts Navigation options (method, submission, etc.)
   */
  navigate(to: To | null, opts?: RouterNavigateOptions): Promise<void>;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Trigger a fetcher load/submission
   *
   * @param key     Fetcher key
   * @param routeId Route that owns the fetcher
   * @param href    href to fetch
   * @param opts    Fetcher options, (method, submission, etc.)
   */
  fetch(key: string, routeId: string, href: string | null, opts?: RouterFetchOptions): void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Trigger a revalidation of all current route loaders and fetcher loads
   */
  revalidate(): void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Utility function to create an href for the given location
   * @param location
   */
  createHref(location: Location | URL): string;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Utility function to URL encode a destination path according to the internal
   * history implementation
   * @param to
   */
  encodeLocation(to: To): Path;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Get/create a fetcher for the given key
   * @param key
   */
  getFetcher<TData = any>(key: string): Fetcher<TData>;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Delete the fetcher for a given key
   * @param key
   */
  deleteFetcher(key: string): void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Cleanup listeners and abort any in-progress loads
   */
  dispose(): void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Get a navigation blocker
   * @param key The identifier for the blocker
   * @param fn The blocker function implementation
   */
  getBlocker(key: string, fn: BlockerFunction): Blocker;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Delete a navigation blocker
   * @param key The identifier for the blocker
   */
  deleteBlocker(key: string): void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * HMR needs to pass in-flight route updates to React Router
   * TODO: Replace this with granular route update APIs (addRoute, updateRoute, deleteRoute)
   */
  _internalSetRoutes(routes: AgnosticRouteObject[]): void;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Internal fetch AbortControllers accessed by unit tests
   */
  _internalFetchControllers: Map<string, AbortController>;

  /**
   * @internal
   * PRIVATE - DO NOT USE
   *
   * Internal pending DeferredData instances accessed by unit tests
   */
  _internalActiveDeferreds: Map<string, DeferredData>;
}
```

## RouterState

```ts
/**
 * State maintained internally by the router.  During a navigation, all states
 * reflect the the "old" location unless otherwise noted.
 */
export interface RouterState {
  /**
   * The action of the most recent navigation
   */
  historyAction: HistoryAction;

  /**
   * The current location reflected by the router
   */
  location: Location;

  /**
   * The current set of route matches
   */
  matches: AgnosticDataRouteMatch[];

  /**
   * Tracks whether we've completed our initial data load
   */
  initialized: boolean;

  /**
   * Current scroll position we should start at for a new view
   *  - number -> scroll position to restore to
   *  - false -> do not restore scroll at all (used during submissions)
   *  - null -> don't have a saved position, scroll to hash or top of page
   */
  restoreScrollPosition: number | false | null;

  /**
   * Indicate whether this navigation should skip resetting the scroll position
   * if we are unable to restore the scroll position
   */
  preventScrollReset: boolean;

  /**
   * Tracks the state of the current navigation
   */
  navigation: Navigation;

  /**
   * Tracks any in-progress revalidations
   */
  revalidation: RevalidationState;

  /**
   * Data from the loaders for the current matches
   */
  loaderData: RouteData;

  /**
   * Data from the action for the current matches
   */
  actionData: RouteData | null;

  /**
   * Errors caught from loaders for the current matches
   */
  errors: RouteData | null;

  /**
   * Map of current fetchers
   */
  fetchers: Map<string, Fetcher>;

  /**
   * Map of current blockers
   */
  blockers: Map<string, Blocker>;
}
```

# Version

- 2024-06-24 v6.24 支持 Laze Route Discovery/Fog of War
  - 路由没找到时调用 `unstable_patchRoutesOnMiss({ path, patch })`, 在 createBrowserRouter 指定
    - 通过 patch 对 router 进行补丁
  - 也可以考虑在 route 的 handle 增加 自定义逻辑，然后在 onMiss 时发现进行调用
  - https://reactrouter.com/en/main/routers/create-browser-router#optsunstable_patchroutesonmiss
- 2023-10-31 v6.18 增加 Fetcher
  - useFetcher, useFetchers
  - Form, useSubmit 增加 navigate/fetcherKey 可指向 fetcher
  - future.v7_fetcherPersist 可以避免在 unmount 时清除 fetcher 状态
- 2023-10-31 v6.15 增加 redirectDocument 在 loader/action 触发 reload
  - v7 可能会默认为 json
- 2023-06-23 v6.14 Form 提交支持 json/text, 通过 encType 设置
- 2023-06-06 v6.12 支持 React.startTransition, 增加 future.v7_startTransition
- 2023-03-10 v6.9 增加 route.lazy, route.Component, route.ErrorBoundary
  - 可 lazy 的内容 loader, action, element/Component, errorElement/ErrorBoundary, shouldRevalidate, handle
  - 不可以 lazy 的内容 path, index, children
  - 在 loading, submitting 会加载 lazy 的内容
- 2023-01-26 v6.8 允许 `<Link to>` 为外部 url
- 2023-01-18 v6.7 增加 unstable_useBlocker/unstable_usePrompt, `<Form preventScrollReset>`
- 2022-12-16 v6.5 支持 `?` 表示可选 `:lang?/about/us?`
- 2022-09-13 v6.4 增加 Remix Data APIs `<RouterProvider>`
  - 将 remix 的 Data APIs 集成到 react-router 中
  - https://remix.run/blog/react-routering-remix

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

## A history only accepts one active listener

- v6 的 History 只能被 router 监听
