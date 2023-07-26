---
title: refine
---

# refine

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

```bash
npm add @refinedev/core

# inferencer
npm add @refinedev/inferencer @refinedev/react-hook-form @refinedev/react-table @tanstack/react-table

# antd
npm add @refinedev/antd antd dayjs
```

- IDataContextProvider
  - getList
  - getMany
  - getOne
  - create
  - createMany
  - update
  - updateMany
  - deleteOne
  - deleteMany
  - getApiUrl
  - custom
- Many 接口可选
- @refinedev/simple-rest
  - `${apiUrl}/${resource}` - `[{id}]`

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
