---
title: URQL
---

# urql

- [FormidableLabs/urql](https://github.com/FormidableLabs/urql)
  - 流处理实现基于 [kitten/wonka](https://github.com/kitten/wonka)
- 优势
  - 支持泛化缓存
  - Schema 感知
    - 开启后支持部分结果返回 - 请求的字段未被缓存但是是 nullable 则先返回 - 因为不影响语义
    - 页面切换数据显示更顺畅
  - stale 查询 - @urql/exchange-request-policy
  - 支持多框架 - @urlql/core, urql -> react-urql, preact, next, vue, svelte

:::caution

- useQuery 的 context 确保不要变 - useMemo
  - 否则会导致重新请求 - 可能无限循环渲染
- 默认全局 opt-in Suspense
  - createClient 开启 suspense 则默认认为在服务端 - 所有查询开启 suspense
  - useURQL 的 context 可控制关闭 suspense
  - 对于只希望单次查询 suspense 只能封装现有接口

:::

```bash
npm add urql @urql/{core,devtools,exchange-graphcache,exchange-retry,exchange-multipart-fetch}
```

```ts title="根据后端实现选择"
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient as createSubscriptionClient } from 'graphql-ws';
```

```ts
type ExchangeIO = (Source<Operation>) => Source<OperationResult>;
type Exchange = ExchangeInput => ExchangeIO;
```

## Note

- 默认有 Document Caching - 适用于高度依赖静态数据的站点
  - 缓存 key 为 `hash(query,variables)`
  - 根据 mutation 返回类型进行失效
  - 如果返回空 list, 则不会包含 `__typename`, 此时无法失效 - 可在上下文添加 additionalTypenames
- exchange - 扩展点 - 默认 dedupExchange, cacheExchange, fetchExchange
  - 类似 apollo 的 link - 但更通用

**请求策略**

| RequestPolicy     | Desc                                   |
| ----------------- | -------------------------------------- |
| cache-first       | 默认 默认返回 cache 结果，不存在则请求 |
| cache-and-network | 先返回 cache 结果，也请求更新          |
| network-only      | 忽略缓存，直接发起请求                 |
| cache-only        | 返回缓存或者 null                      |

**exchanges**

| exchange                       | desc                                                                  |
| ------------------------------ | --------------------------------------------------------------------- |
| @urql/exchange-graphcache      | 提供泛化图缓存                                                        |
| @urql/exchange-retry           | 重试失败请求                                                          |
| @urql/exchange-execute         | 本地模拟执行，用于测试或服务端                                        |
| @urql/exchange-multipart-fetch | 文件上传                                                              |
| @urql/exchange-persisted-fetch | 基于 hash 查询，避免发送 query                                        |
| @urql/exchange-request-policy  | 缓存失效和更新，将 cache-first 和 cache-only 上升为 cache-and-network |
| @urql/exchange-auth            | 请求添加授权信息，例如 JWT                                            |
| @urql/exchange-refocus         | 窗口获取焦点时重新发起请求                                            |

## @urql/exchange-graphcache

- Normalized Caching -  范化缓存
  - 缓存 key 为 `__typename:id`
  - 会缓存字段和关系
  - 可根据类型自定义缓存 key
  - 无 key 的结构作为嵌入数据依附在上级文档
- Local Resolver - 本地解析
  - 提供 resolvers 直接在客户端处理请求

```ts
cache.readQuery({ query: Todos, variables: { from: 0, limit: 10 } });

// readFragment 只支持 DocumentNodes
cache.readFragment(
  gql`
    fragment _ on Todo {
      id
      text
    }
  `,
  { id: 1 },
);

// 检测所有字段
cache.inspectFields({
  __typename: 'Todo',
  id: args.id,
});
```

```ts
// 基于 offset 和 limit 分页
import { simplePagination } from '@urql/exchange-graphcache/extras';
//
import { relayPagination } from '@urql/exchange-graphcache/extras';

cacheExchange({
  keys: {
    // 自定义 key
    Item: (data) => data.uuid,
    // 显性移除 key
    Image: () => null,
  },
  // 本地 resolve
  // 适用于转换字段类型，模仿服务端请求，减少实际请求
  resolvers: {
    // 类型
    Query: {
      // 集成分页能力
      // mergeMode=inwards
      todos: relayPagination(),

      // { todo(id: 1) { id } } 读取 { todos { id } } 的缓存
      todo(parent, args, cache, info) {
        // 等同于返回缓存 key
        // cache.keyOfEntity({ __typename: 'Todo', id: args.id }),
        return { __typename: 'Todo', id: args.id };
      },
    },
    Todo: {
      // 转换字段类型
      updatedAt: (parent, args, cache, info) => {
        // 也可以访问当前对象上数据 - cache.resolve(info.parentKey)
        // parent.updatedAt || cache.resolve(parent, "createdAt")
        // new Date(cache.resolve(parent, "updatedAt")),
        return new Date(parent[info.fieldName]);
      },
    },
  },
    // 手动更新
  updates: {
    Mutation: {
      // add 过后将返回结果添加到 查询列表
      addTodo(result, args, cache, info) {
        const query = gql`
          {
            todos {
              id
            }
          }
        `;
        cache.updateQuery({ query }, (data) => {
          data.todos.push(result.addTodo);
          return data;
        });
      },

      // 移除 todo 后更新受影响的 list 查询
      removeTodo(_result, args, cache, _info) {
        const TodoList = gql`
          query (skip: $skip) {
            todos(skip: $skip) { id }
          }
        `;

        const fields = cache.inspectFields('Query')
          .filter(field => field.fieldName === 'todos')
          .forEach(field => {
            cache.updateQuery(
              {
                query: TodoList,
                variables: { skip: field.arguments.skip },
              },
              data => {
                data.todos = data.todos.filter(todo => todo.id !== args.id);
                return data;
              }
            });
          });
      },
    },
  },
  // 乐观更新 - 模仿服务端更新行为
  // 当服务端返回后更新会丢弃
  optimistic: {
    favoriteTodo: (variables, cache, info) => ({
      __typename: 'Todo',
      id: variables.id,
      favorite: true,
    }),
  },
});
```

### relayPagination

- Resolver
- 基于 relay 的 connection 进行分页数据合并
  - 支持 first+last
  - 支持 before, after
- mergeMode - 合并模式
  - inwards - 默认 - 往后合并
  - outwards - 往前合并
- 参数变化会重置 - 忽略 first, last, after, before

# FAQ

## URQL vs Apollo

- URLQ
  - 更小更灵活
  - 支持提供 schema 实现更多功能
  - 支持 offline
  - 支持 window focus 触发请求
  - 缓存为可选组件
- [vs Apollo](https://formidable.com/open-source/urql/docs/comparison/)

## production 构建后 urql 返回 null

起因是 gqlgen 不支持 fragment 里包含 alias，不会返回字段，urql 检测少字段认为 cache miss 返回 null。

- [99designs/gqlgen#1271](https://github.com/99designs/gqlgen/issues/1271)
- [FormidableLabs/urql#1557](https://github.com/FormidableLabs/urql/issues/1557)

## Cannot update a component while rendering a different component

- https://github.com/FormidableLabs/urql/issues/1382#issuecomment-778112684
