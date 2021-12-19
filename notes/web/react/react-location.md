---
title: React Location
---

# React Location

- [tannerlinsley/react-location](https://github.com/tannerlinsley/react-location)
  - 基于/类似 react-router v6 进行调整 - 更面向 CSR
  - 支持插件能力 - 部分 react-router 有的能力在 react-location 中需要插件支持
    - react-location-ranked-routes - 建议开启
    - react-location-simple-cache
    - react-location-elements-to-routes
  - 支持 devtool - react-location-devtools
  - 不支持 SSR - 主要面向 CSR 场景
    - WIP
  - element 支持异步
  - 添加 CSR 辅助功能
    - search 处理
    - loader - 提前异步加载数据，支持缓存
    - Error Element, Pending Element, Pending Timing - 配合 loader 行为
  - 支持 promot - react-router v6 暂不支持
- 参考
  - [vs. React Router](https://react-location.tanstack.com/comparison)

```js
import {
  createHashHistory,
  createMemoryHistory,
  DefaultGenerics,
  MakeGenerics,
  Outlet,
  ReactLocation,
  Route,
  Router,
  useMatch,
  useMatchRoute,
  useRouter,
} from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

const ErrorPanel = () => {
  // 当前错误信息
  const { error } = useMatch();
  return <></>;
};

type LocationGenerics = MakeGenerics<{
  LoaderData: {
    items?: Array<{ id }>;
    data?: any;
    item?: { id };
  };
  Search: {
    itemId?: string;
    pagination?: {
      index?: number;
      size?: number;
    };
    filters?: {
      name?: string;
    };
    desc?: boolean;
  };
}>;

const routes: Route<LocationGenerics>[] = [
  {
    path: 'about',
    element: <h1>About</h1>,
    children: [{ path: 'me' }],
  },
  {
    path: 'items',
    loader: async () => ({
      // load list data
      items: await fetch('/api/items').then((r) => r.json()),
    }),
    errorElement: <ErrorPanel />,
    pendingElement: <div>Loading</div>,
    pendingMs: 1000 * 2, //2s 后才显示
    pendingMinMs: 500, // 至少显示 500ms
    children: [
      { path: '/' }, // list
      {
        path: ':itemId',
        loader: async ({ params: { teamId } }, { parentMatch, dispatch }) => {
          // customize cache time
          dispatch({
            type: 'maxAge',
            maxAge: 1,
          });
          return {
            // reuse parent list data
            data: await parentMatch?.loaderPromise?.then(({ items }) => items?.find((team) => team.id === teamId)),
            // load item data
            team: await fetch(`/api/teams/${teamId}`).then((r) => r.json()),
          };
        },
      },
      {
        path: ':itemId',
        search: (search) => {
          // match search params
          return search.itemId === '0';
        },
      },
      {
        path: '*', // default path - any
        element: <Outlet />, // default element
      },
    ],
  },
];

const PendingIndicator = () => {
  // 加载的数据
  const { data } = useMatch();
  const router = useRouter<DefaultGenerics>();
  // 全局 pending 检测
  const { pending } = router;

  // 测试路由匹配
  const matchRoute = useMatchRoute();
  matchRoute({ to: '/about' });
  return <></>;
};

const App = () => {
  // history
  const hashHistory = createHashHistory();
  // in-memory
  const memoryHistory = createMemoryHistory({
    initialEntries: [{ pathname: '/', search: 'key=123' }, '/items/123'],
    initialIndex: 0,
  });
  // location
  const location = new ReactLocation({
    history: hashHistory,
  });

  return (
    <Router<LocationGenerics> location={location} routes={routes}>
      <Outlet />
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
};
```

## jsurl

- https://github.com/Sage/jsurl

```js
import { ReactLocation } from 'react-location';
import { parseSearch, stringifySearch } from 'react-location-jsurl';

const reactLocation = new ReactLocation({
  parseSearch,
  stringifySearch,
});
```

## Notes

- Router
  - LocationContext
  - routerContext
  - MatchesProvider
- Outlet
  - MatchesProvider
    - 移除当前顶层 match
    - 渲染第一个 match
- Route
  - path 默认 `*`
  - element 默认 `<Outlet />`
- matchRoute
  - matchByPath
    - `parsePathname(pathname?: string): Segment[]`
      - pathname
      - wildcard - `*`
      - param - `:`
    - 对比 segment 是否匹配
  - matchBySearch
- Link
  - Ctrl+Click 或 target!=`_self` 则不会 preventDefault 由浏览器处理点击事件

:::caution

- useMatch 基于 useContext 触发 memo 组件不会被 render
  - [react#15156](https://github.com/facebook/react/issues/15156#issuecomment-474590693)

:::
