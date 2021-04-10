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
- 客户端模式 Suspense 支持不太好
  - createClient 开启 suspense 则默认认为在服务端 - 所有查询开启 suspense
  - useURQL 的 context 可控制关闭 suspense

:::

```ts
type ExchangeIO = (Source<Operation>) => Source<OperationResult>;
type Exchange = ExchangeInput => ExchangeIO;
```

## Note

- 默认有 Document Caching - 适用于高度依赖静态数据的站点
  - 缓存 key 为 `hash(query,variables)`
  - 根据 mutation 返回类型进行失效
  - 如果返回空 list, 则不会包含 `__typename`, 此时无法失效 - 可在上下文添加 additionalTypenames
- Graphcache - 由 cacheExchange 提供
  - Normalized Caching -  范化缓存
    - 缓存 key 为 `__typename + id`
    - 会缓存字段和关系
    - 可根据类型自定义缓存 key
    - 无 key 的结构作为嵌入数据依附在上级文档
- 请求策略
  - cache-first - 默认
    - 默认返回 cache 结果，不存在则请求
  - cache-and-network
    - 返回 cache 结果，也请求更新
  - network-only
    - 忽略缓存
  - cache-only
    - 返回缓存或者 null
- exchange - 扩展点 - 默认 dedupExchange, cacheExchange, fetchExchange
  - 类似 apollo 的 link - 但更通用

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

# FAQ

## URQL vs Apollo

- URLQ
  - 更小更灵活
  - 支持提供 schema 实现更多功能
  - 支持 offline
  - 支持 window focus 触发请求
  - 缓存为可选组件
- [vs Apollo](https://formidable.com/open-source/urql/docs/comparison/)
