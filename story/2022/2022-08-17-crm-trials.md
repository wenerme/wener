---
slug: crm-trails
title: CRM 实现经历
tags:
  - 思考
  - CRM
---

# CRM 实现经历

| v   | date              |
| --- | ----------------- |
| v1  | 2019.11 - 2021.01 |
| v2  | 2020.01 - 2020.06 |
| v3  | 2020.11 - 2022.07 |
| v4  | 2022.06 - 2022.11 |
| v5  | 2022.11 - 2023.03 |
| v6  | 2023.03 -         |

:::tips Choose

- FE
  - React
  - Vite
  - tailwindcss
  - daisyui
  - headlessui
  - floatingui
  - GraphQL + urlq + CodeGen
  - react-hook-form
  - zustand
- BE
  - PostgreSQL
  - mikro-orm
  - type-graphql
  - NestJS
  - Hono
  - swc+esbuild -> single bundle
  - ts-node+swc -> faster dev
- 不要选择
  - ~~andt~~
  - ~~trpc~~

:::

## v1

- 后端 - Java - 2019.11 - 2021.01
- 前端 - NextJS v9 + Antd - 2019.11 - 2021.3
  - @reduxjs/toolkit

:::tip 总结

非常简单的尝试，很快就失败了，目标并不明确。
对 CRM 并不了解，过于盲目。
堆砌了一些基础前端组件。前端开发能力尚不成熟。

:::

<!-- more -->

## v2

- 2020.01 - 2020.06
- 后端 - Node - nestjs
  - nestjs
  - objection - ORM
  - swagger
- 前端 - Antd v4+NextJS v9
  - react-final-form
  - redux
  - tinacms

:::tip 总结

**后端**

后端尝试构建基于 Schema 的 CRM，但过于动态，过于灵活导致逻辑开发复杂。
对 NodeJS 后端开发并不足够了解，目标更像是一个 low-code 后端，但是支持 CRM 实体。
这个阶段对 CRM 逻辑有了一些了解。

- 需要的是 先 CRM 再 low-code
- 核心逻辑是确定的才能更好开发业务 - 不然要做太多假设
- NodeJS 容器真的很大
- 确定了要走 Schema 的方式 - 前端通过 Schema 做更多的事情

**前端**

前端选择 Antd，发现阻力越来越大，实现定制化很难。
这时的前端开发能力还相对欠缺，对生态还不够了解。

- 探索了前端想要达成的目标 - 窗口、多 Tab
- 不要选择 antd 这种过于全面无法定制的组件库

:::

## v3

- 后端 - Go - 2020.11 - 2022.07
  - gorm + restful - 前期
  - ent + gqlgen - 中期
  - gorm - 非核心 CRM 业务
- 前端 - 2020.11 - 2022.1
  - NextJS
  - BlueprintJS - 前期
  - graphql-codegen
  - urql - GraphQL
  - TailwindCSS - 后期
  - zustand - 后期
  - react-hook-form

:::tip 总结

这个阶段是历时最长的，除了核心的 CRM 还完成了其他的一些附属模块。

**后端**

后端使用 Golang 开发上进行了一些探索，前期 gorm+restful 方式代码量大且重复。
之后选择 ent+gqlgen+自定义生成代码。

- GraphQL 对前端非常友好 - 但选择了先 GraphQL 而非先 GRPC 是比较失误的
- 基于 ent 实现自定义生成逻辑
  - 生成了 schema - 但非标准 jsonschema - 且长期未从后端拉而是直接放在了前端
    - 改动困难
    - 自定义 schema 前期用起来爽，后期维护困难 - 记忆层面和熟悉度层面
  - 生成了 graphql 的 golang resolver 代码 - 通过解析 AST 的方式植入
    - 生成逻辑过于依赖 ent，改动维护困难
    - 生成 golang resolver 逻辑维护困难
- ent 生成过多的东西 - 代码库冗余
- ent 升级有风险
  - 生成逻辑不兼容 - **主要问题** - 不敢随意升级 - 开发阻碍
  - 自身不兼容
- 确定了要先 GRPC 的方式开发
- 基于多 DB 后端的多租户逻辑不好维护
- 优先设计的 On-Prime 模式，未考虑 SaaS，后期尝到了苦头

**前端**

前期基于 Blueprint 快速实现大多功能，但还是因为经验不足，很多东西实现有缺陷。但实现了初期原型，达到了想要的结果。

- Blueprint 提供 CSS 直接使用，非常方便 - 侵入性远远小于 Antd
- Blueprint 升级需要改动所有的 CSS 前缀 - ⚠️
- 后期选择 Tailwind 开发
- 组件传递、自定义经验欠缺 - 做了很多不好维护的扩展
- 基础 Schema 不标准 - 很多东西基于不标准的 schema 开发后结果是往更不好的方向发展
- 优先考虑了用户使用而非管理使用，导致所有管理维护开通都需要人为 - 不可持续
- 期望中的模块化一直未实现

:::

## v4

- 2022.06 -> 2022.11
- 后端
  - 确定了要优先 GRPC，且使用标准 Schema。
    - 因此将 protobuf 的定义作为 Single-Source—Of—Truth Schema。
    - 分离接口 Schema 和 DB - 之前是 ent schema -> graphql schema
  - 虽然选择 GRPC 但也要直接能给前端访问
    - 选择了 connect 协议
    - 实现了 connect-gateway
      - 实现了基于 Redis 服务发现
      - 实现了基于 grpc reflection 自动暴露服务
  - DB 确定不要通过 ORM 自动维护而是手动维护
    - 实现基于 PG RLS 的多租户逻辑而非多 DB 模式
    - 实现 CRM 时 DB Schema 的重要性等同接口
    - 业务沉淀为数据库模型
    - 也因此分离 API 模型和数据库模型
  - Golang -> NodeJS
    - 初期尝试用 Golang 实现
    - 核心问题 ⚠️
      - 开发一段 前端再回到 Golang 会 **痛不欲生** - 上下文切换、开发思路切换
      - Golang 生成代码只能静态生成，NodeJS 可以动态生成
        - NodeJS 更加灵活 - PoC 阶段更有优势
      - 使用 NodeJS 可以和前端在同一个仓库 - 核心逻辑开发维护更容易
  - NodeJS
    - fastify+jsonschema+sequelize
    - 通过 grpc 生成 descriptor, definitoon
    - 启动后通过 descriptor 生成 jsonschema
    - 通过 jsonschema+definitoon 生成 grpc-service - nice-grpc
    - 实现标准的 CRUD 语义
    - fastify POST -> grpc 实现 - 类似 connect 语义
    - grpc-server -> grpc 实现
    - 未来: web -> connect-gateway -> grpc-server -> grpc 实现
- 前端
  - daisyui+tailwindcss - 放弃 ~~Blueprint~~
  - 不再直接选择成熟的 UI 框架，而是选择基于 CSS 的样式库
  - daisyui 提供了一套命名 class 的方式 - 有 Theme
  - 确定 管理功能优先于用户功能
  - 确定 功能能被看到才算开发完成
  - 模块化
    - 仍在尝试中 - 借鉴其他实现
    - 提供开放的 OSS 存储
    - 目前明确方向
      - 分离 os 逻辑和核心 route 逻辑 - 揉在一起困难

## v5

- 2022.11 -> 2023.03
- 方式的调整
  - 不只是独立于业务单纯的思考怎么做 CRM - 没有任何意义/产出的东西不可用
  - 业务层面将以前的思路以 DB Schema 的方式沉淀
  - 贴合现实做一些实际的事情
- 后端
  - RPC over NATS
    - 简单易用
    - 能实现多租户
  - 自定义 RPC
    - 弱 Schema - 一个人维护不过来
  - 重新定义分层
    - DB -> Entity -> EntityService -> RemoteService -> Controller, tRPC, GraphQL
    - 层次更多，但是更清晰
    - 改动相对独立，互不影响
  - 依然全面的 NodeJS/TS/NextJS/NestJS
  - 尝试更加轻量的服务 - HonoJS
  - 尝试更加轻量的前端 - Vite
    - 不能 SSR/SSG/Server Action
    - 添加多个页面相对麻烦
  - 尝试 Typescript 生成 zod/typebox - Single-Source-Of-Truth
- 前端
  - 大部分页面直接使用了 v4 的内容 - 逻辑结构上有一定调整
  - 证明 daisyui+tailwindcss 的移植性的确很好
  - 尝试引入了 shadcn
  - 核心功能能够做到模块化
  - 尝试重新恢复多窗口

## v6

- 2023.3 ->
- 基于 v5 大致内容不变的情况下调整以提升开发效率
- 主要调整内容
  - API 调整 - trpc -> GQL
  - 结构选型调整 - 轻量化, 开发效率优先
- 调整内容
  - ~~Nats RPC + trpc ~~ -> GraphQL
    - trpc 内容多了过后类型推导太慢
    - GraphQL 直接对客户端保留
      - 避免要求通过 RPC+trpc 对客户端
      - 减少开发量
    - RPC 保留为对服务端
  - NextJS -> Vite - 纯静态前端 console
    - 开发反映要快得多
    - 现在的 NextJS 不适合做后台，不适合做太过动态的项目
    - Vite HMR 体验要好得多
  - ~~fastify + NestJS Controller ~~ -> Hono
    - 保留 NestJS 作为 IoC 容器
    - Hono 简单容易维护
    - 缺点是 Hono OpenAPI 使用 zod-openapi
      - 没 NestJS Controller 那么好用
      - 但 可以 share schema 给前端 - 不过使用了 GraphQL Codegen 一般也不需要
  - GraphQL 使用 type-graphql+yoga+urql
  - 大量引入 mixin 来抽象业务逻辑
    - ORM 层 https://github.com/wenerme/wode/blob/main/packages/nestjs/src/entity/mixins/index.ts
    - GQL 层 https://github.com/wenerme/wode/blob/main/packages/nestjs/src/type-graphql/mixins/index.ts
  - Golang -> Bun
    - 将最后依赖 Golang 的 企业微信会话内容存档转为 Bun
    - bun:ffi 能很好的和 c interop
      - [WeWorkFinanceClient.ts](https://github.com/wenerme/wode/blob/main/packages/client/src/wecom/archive/bun/WeWorkFinanceClient.ts)
- 领域开发
  - Follow 固定的 schema 模式 https://wener.me/notes/dev/design/schema
  - 逐渐固化大的业务框架 https://wener.me/notes/dev/design/erp
  - 逐步引入一些公共的业务逻辑
- 结果
  - 目前差不多的前后端部署了 3+ 套
  - 固化下来差不多的前后端框架
    - 前端 https://github.com/wenerme/wode/tree/main/packages/console
    - 后端 https://github.com/wenerme/wode/tree/main/packages/nestjs
  - 外部集成 https://github.com/wenerme/wode/tree/main/packages/client
- 接下来
  - 抽取更多公共业务逻辑
  - 引入更多业务域
  - 文件处理 - 类似网盘
  - 更多外部服务集成
