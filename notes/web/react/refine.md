---
title: refine
---

# refine

:::tip

- 接口设计，抽象逻辑值得参考

:::

- [refinedev/refine](https://github.com/refinedev/refine)
  - MIT, React
  - Headless CRUD 组件
  - 支持 NextJS, Remix
  - 默认提供 antd, mui, mantine, chakra
  - 支持集成 ReactTable, KBar, React Hook Form
  - ACL - cerbos, casbin
  - Data Provider - RESTful, GQL, appwrite, nestjs, supabase, medusa
  - Live Providev- appwrite, ably, socket.io, supabase
- @refinedev/nextjs-router
  - @nestjsx/crud-request
    - [nestjsx/crud](https://github.com/nestjsx/crud)
      - fork [gid-oss/dataui-nestjs-crud](https://github.com/gid-oss/dataui-nestjs-crud)
- @aliemir/react-live
  - sucrase
  - prism-react-renderer

```bash
npm add @refinedev/core

# inferencer
npm add @refinedev/inferencer @refinedev/react-hook-form @refinedev/react-table @tanstack/react-table

# antd
npm add @refinedev/antd antd dayjs
```

**组件**

```ts
export interface IResourceComponents {
  list?: ResourceRouteComposition;
  create?: ResourceRouteComposition;
  clone?: ResourceRouteComposition;
  edit?: ResourceRouteComposition;
  show?: ResourceRouteComposition;
}
```

## Notes

- Router -> Resource
  - Resource 定义包含了 Path
  - 使用 Resource 定义生成路由
    - `/NAME/ACTION/:id`
    - createResourceRoutes
  - 自动从当前 Path 识别 Resource
    - matchResourceFromRoute
      - 先生成所有 route -> {action,resource}
      - 通过 Segment 匹配
      - 从结果选择一个最接近的
  - 识别到了 Resource 再推导具体的页面
    - 列表、详情、创建、编辑
- 上下文/Context - 扩展点
  - refine
  - resource
  - router
    - 方法: go, back, parse, Link
    - 实现: react-router, nextjs, remix router
  - ~~router-picker~~ - 用于支持 legacy router
  - translation - i18n
    - 方法: translate, changeLocale, getLocale
    - Hooks: useTranslate, useSetLocale, useGetLocale
  - undoable queue
  - unsaved warn
  - access control - 访问控制 - [casbin](../../service/auth/authz/casbin.md)、[casl](../../service/auth/authz/casl.md)、[cerbos](https://github.com/cerbos/cerbos)、 [accesscontrol.js](https://github.com/onury/accesscontrol)
    - `useCan`
    - `<CanAccess />`
    - action
      - list, create, edit, delete, show
  - audit log
    - 方法
      - create
      - get - 返回列表
      - update - 可为 Log 加名字，作为 milestone
    - `useLog`, `useLogList`
  - auth
    - 必须方法: login, check, logout, onError
    - 可选方法: register, forgotPassword, updatePassword, getPermissions, getIdentity
    - https://refine.dev/docs/api-reference/core/providers/auth-provider/
  - [data](#data-provider)
    - 实现: simple rest, graphql, nestjs CRUD, airtable, strapi, supabase, hasura, appwrite, medusa
    - [medusa](https://github.com/medusajs/medusa)
  - live - 数据实时更新
    - 方法: subscribe, unsubscribe, publish
    - Hooks: useSubscription, usePublish
    - 实现: ably, supabase, hasura, appwrite, nhost
  - notification
    - 方法: open, close
- 组件
  - Provider - antd, mui, mantine, chakra
- useResource
  - resources 所有
  - resource - 当前
  - resourceName
  - id
  - action
  - select
  - identifier - 相同 Resource 识别

## Data Provider

- IDataContextProvider
  - getList -> useList, useInfiniteList
  - create -> useCreate
  - update -> useUpdate
  - deleteOne -> useDeleteOne
  - getOne -> useOne
  - getMany -> useMany
  - createMany -> useCreateMany
  - updateMany -> useUpdateMany
  - deleteMany -> useDeleteMany
  - getApiUrl -> useApiUrl
  - custom -> useCustom
- Many 接口可选
- @refinedev/simple-rest
  - `${apiUrl}/${resource}` - `[{id}]`
