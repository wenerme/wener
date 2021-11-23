---
title: React Location
---

# React Location

- [tannerlinsley/react-location](https://github.com/tannerlinsley/react-location)

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
