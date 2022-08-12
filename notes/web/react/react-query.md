---
title: React Query
---

# React Query

- [TanStack/query](https://github.com/TanStack/query)
- 默认
  - 开启 refetchOnMount, refetchOnWindowFocus, refetchOnReconnect
  - cacheTime 5 分钟 - 不再使用的的数据保留 5 分钟
  - retry=3, retryDelay exponential
- 参考
  - [vs SWR vs Apollo Client](https://react-query.tanstack.com/docs/comparison)
    - vs SWR - 支持修改，更好的缓存状态管理
    - vs Apollo - 支持 GraphQL 和 一般请求，针对 GraphQL 的 entity 缓存没有 apollo 强
  - [dano-inc/react-query-helper](https://github.com/dano-inc/react-query-helper)
  - [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
  - [Important Defaults](https://react-query.tanstack.com/guides/important-defaults)

| -                | condition                             | note                             |
| ---------------- | ------------------------------------- | -------------------------------- |
| **status**       |
| idle             | isIdle                                | enabled:false 或 mutation 未执行 |
| loading          | isLoading                             |
| error            | isError,isLoadingError,isRefetchError |
| success          | isSuccess                             |
| initialData      |
|                  | isFetching                            | loading 或 后台请求              |
|                  | isFetched                             |
|                  | isFetchedAfterMount                   | 避免显示缓存数据                 |
|                  | isRefetching                          | isFetching && !isLoading         |
| **options**      |
| staleTime        | isStale                               |
|                  | isPlaceholderData                     |
| keepPreviousData | isPreviousData                        |

:::caution

- mutation 状态不共享 [#2304](https://github.com/tannerlinsley/react-query/issues/2304)
- useQueries suspense 不是一次性等待完成 [#1523](https://github.com/tannerlinsley/react-query/issues/1523)

:::

## Persist

> **Note**
>
> 整体 persist 而不是单条记录维度 - [#2649](https://github.com/TanStack/query/discussions/2649)

- PersistQueryClientProvider
  - 会从 persistQueryClient unsubscribe
  - 会处理 restore - persistQueryClient 返回的 promise 被 resolve

```ts
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

ReactDOM.createRoot(rootElement).render(
  <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
    <App />
  </PersistQueryClientProvider>,
);

//
const [unsubscribe, promise] = persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
```

## broadcast

- 实现基于 broadcast-channel
- 监听 Cache 事件，广播到其他 tab

# Version

## React Query v4

- `@tanstack/react-query`
- Keys 必须为数组
- [Migrating to React Query 4](https://react-query-alpha.tanstack.com/guides/migrating-to-react-query-4)

## React Query v3

- 拆分 QueryCache 为 QueryClient 和更底层的 MutationCache, QueryCache
- useQueryCache -> useQueryClient
- QueryClientProvider 取代 ReactQueryConfigProvider 和 ReactQueryCacheProvider
- 新增 useQueries
- 包含 devtools - `react-query/devtools`
- useQuery 参数不再是 key
  - 推荐通过 lambada 传递参数
  - 如果还是要 key `useQuery(['post', id], context => fetchPost(context.queryKey[1]))`
  - enabled 选项必须为 boolean - 否则会警告
  - 支持 select 部分数据 - 减少重新渲染
    - `useQuery('user',fetchUser,{select:user=>user.username})`
- 废弃 usePaginatedQuery, 添加 `keepPreviousData: true` 实现类似功能
- useInfiniteQuery 支持前后双向查询
- useMutation
  - 返回对象
    - 之前 `const [mutate, { status, reset }] = useMutation()`
    - 现在 `const { mutate, mutateAsync, status, reset } = useMutation()`
      - mutate 不返回 promise, mutateAsync 返回 promise
      - mutate 支持回调 `mutate('todo',{onSuccess(){},onError(){},onSettled(){}})`
  - 支持 retry - 断线重联会重试，默认失败不会重试
  - 支持持久化然后恢复
- QueryObserver, InfiniteQueryObserver, QueriesObserver - 可用于监听数据变化
- useIsFetching - 支持 key 参数
- [v3](https://react-query.tanstack.com/guides/migrating-to-react-query-3) - 2020-12-15

## React Query v2.x

```ts
import {useQuery, QueryCache, ReactQueryCacheProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query-devtools';

const queryCache = new QueryCache();

export default function App() {
  return (
    <>
      {/* 缓存 */}
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Example />
      </ReactQueryCacheProvider>
      {/* 开发工具 */}
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
```

```ts
const key = '';
const {
  data, // 获取到的数据或者是上次缓存的数据
  error, // 错误
  failureCount,
  status, // 状态 - idle, loading, error, success
  isError = status == 'error',
  isIdle = status == 'idle',
  isLoading = status == 'loading',
  isSuccess = status == 'success',
  isFetched, // 已经获取
  isFetchedAfterMount, // 是否在 mount 后获取过
  isFetching, // 是否正在获取
  isStale, // 数据已失效
  isPreviousData, // 使用的上次数据
  isPlaceholderData, // 使用的占位数据
  refetch, // 从新获取 - 除非 throwOnError 否则异常只会 log
  remove, // 从缓存移除查询
} = useQuery(
  key,
  /* fetcher */ (...key) => fetch(key.join()).then((v) => v.json()),
  /* config */ {
    enabled: true, // 是否查询

    // 失效控制
    cacheTime: 1000 * 6 * 5, // 5m
    staleTime: 0, // 失效时间 - 默认返回即失效 - 设置失效时间可减少请求 - 设置为 Infinity 不失效
    // 重试控制
    retry: 3, // 重试判断 - Boolean | Int | Function(failureCount, error) => shouldRetry | Boolean
    retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000), // 重试延迟 - Function(retryAttempt: Int) => Int
    // 刷新控制
    refetchInterval: false, // 刷新间隔 - Boolean | Integer
    refetchIntervalInBackground: false, // 后台刷新 - Boolean
    refetchOnMount: true, // 在 mount 时刷新 - boolean | 'always'
    refetchOnReconnect: true, // 网络恢复时刷新
    refetchOnWindowFocus: true, // 窗口获取焦点时刷新

    // 初始
    initialData: undefined, // 初始数据 - any | ()=>any
    initialStale: true, //  初始失效 - 如果设置了则初始数据认为是有效数据 - 会被缓存 - boolean | ()=>boolean
    placeholderData: undefined, // 占位数据 - loading 的时候用 - any | ()=>any

    // 状态变化回调
    notifyOnStatusChange: true, // 状态变化 rerender - 设置为 false 则 data 或 error 变化时才 rerender
    onSuccess: undefined, // 成功回调 - (data)=>data
    onError: undefined, // 错误回调 - (error)=>void
    onSettled: undefined, // 完成回调 - (data,error)=>data
    suspense: false, // 启用 react suspense 模式 - loading 和 error 时会 suspense

    queryFnParamsFilter: undefined, // 查询参数过滤 - args=>filteredArgs
    queryKeySerializerFn: undefined,
    isDataEqual: undefined, // 自定义比较操作
    keepPreviousData: false, // 保留上次数据 - key 变化时
    structuralSharing: true, // 结构化共享 - 跨查询缓存共享
    useErrorBoundary: false,
  },
);

// 分页查询
const {
  data = undefined,
  resolvedData, // 上次成功数据 - 忽略 key
  latestData, // 本次查询数据
  ...queryInfo
} = usePaginatedQuery(queryKey, queryFn, options);

// 瀑布流 - queryFn 会多接受一个 fetchMoreVariable
const {
  isFetchingMore, // false | 'next' | 'previous'
  fetchMore, // Function(fetchMoreVariableOverride) => Promise<TResult | undefined>
  canFetchMore,
  ...queryInfo
} = useInfiniteQuery(queryKey, queryFn, {
  ...queryOptions,
  getFetchMore: (lastPage, allPages) => fetchMoreVariable,
});
```

### useMutation

```ts
const [
  mutate, // 修改操作
  {status, isIdle, isLoading, isSuccess, isError, data, error, reset},
] = useMutation(mutationFn, {
  onMutate,
  onSuccess,
  onError,
  onSettled,
  throwOnError,
  useErrorBoundary,
});

const promise = mutate(variables, {
  onSuccess,
  onSettled,
  onError,
  throwOnError,
});
```

# FAQ

## isLoading vs isFetching

- isLoading 是 status=loading
  - 适用于第一次 loading 判断
- isFetching 是后台正在获取
  - 即便是正在获取，isLoading 也可能为 false - 因为有上次数据
  - 适用于数据加载判断 - 刷新加载过程显示
