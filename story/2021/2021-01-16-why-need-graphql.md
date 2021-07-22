---
slug: why-need-graphql
title: 为什么需要 GraphQL
tags:
  - 开发
  - 架构
  - GraphQL
---

# 为什么需要 GraphQL

项目开始时人员配备一般有几种情况

<!-- more -->

- 前后端同一个人
- 前后端同一个团队
- 前后端不同人同一个团队
- 前后端不同人不同团队

开发的应用一般区分为

- 重前端
- 重后端
- 业务性
- 数据性
- 内容性

因此会遇到几个现象

- 前后端开发进度不同
- 前后端相同模块功能复杂度不同
- 不同的后端对象有相同的数据关联
- 相同前端不同模块需要不同数据
- 不同前端需要使用不同数据
- 前端请求一次数据后会再次发起 N 次请求 - N+1
- 前端一个模块需要对应多个后端

那么就会考虑几个场景

- 前端自行选择要哪些数据字段
- 前端提供关联的数据项进行一次性返回
- 后端整合其他服务返回结果进行一次性返回

那么这时候就可以选择使用 GraphQL。

## GraphQL 不适合场景

- 快速进入开发 - 如果项目刚开始想要速度快，那最好还是 REST
- 一个前端一个后端，前端逻辑确定，后端不需要变动则没必要使用 GraphQL

## 应用场景举例

### 选择性的返回较重的请求

```sql
create table users (
  id bigint,
  name text
);
create table orders (
  id bigint,
  user_id bigint,
  title text
);
```

现在 个人页 需要在请求用户时同时返回用户的订单总数，但其他场景不需要。

```graphql
object User {
  id: Int
  name: String
  orderCount: Int # -> select count(*) from orders where user_id = source.id
}
```

通过 GraphQL 可以将选择留给前端，不需要由后端去决定什么时候要返回一个相对“昂贵”的请求。

### 复杂关联关系

```sql
create table users (
  id bigint,
  name text
);
create table articles (
  id bigint,
  title text
);
create table lables (
  id bigint,
  color_id bigint,
  name text
  target_id bigint,
  target_type bigint -- User, Label
);
create table lable_colors (
  id bigint,
  color text
)
```

因为 用户 和 文章 都支持打标签，因此在实现时相同的逻辑需要多次实现。
使用 GraphQL 简化关联对象查询。

```graphql
object User {
  id: Int
  name: String
  lables: Label[] # -> select * from lables where target_id = source.id and target_type = 'User'
}
object Article {
  id: Int
  title: String
  lables: Label[] # -> select * from lables where target_id = source.id and target_type = 'Article'
}
object Lable {
  name: String
  color: LableColor
}
object LableColor {
  color: String
}
```

在查询时即可一次性查询，而且增加额外的关联也相对简单。

```graphql
user:User{
  name
  lables: {
    name
    color: {
      color
    }
  }
}
article:Article {
  title
  labels: {
    name
  }
}
```

### 网关整合服务

- 假设有一个 外部的 邮件服务，现在需要在获取用户时同时返回邮件数量
- 此时可以通过网关将该服务整合到现有的 GraphQL 服务中

```graphql
object User {
  id: Int
  name: String # 该字段由实际后端处理
  emailCount: Int # 该字段由网关层进行处理
}
```

## 总结

需要 GraphQL 的理由其实很简单，就是当后端的查询代码写的 “很烦” 的时候，需要从中解脱出来，那么就可以选择使用 GraphQL，给前端更大的选择和控制权。
