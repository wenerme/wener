---
title: GraphQL Awesome
---

# GraphQL Awesome

## 设计

- [GraphQL 最佳实践](https://graphql.org/learn/best-practices)
  1. 通过 HTTP 提供服务
  2. JSON+Gzip 返回
  3. 对接口进行版本控制 - 利用 deprecated 和 额外字段能
  4. 字段默认 null - 利用 非 null 设计更好的接口
  5. 分页使用 Connection - 通过 first, last, before, after 实现基于 cursor 分页
  6. 服务端批处理和缓存 - 避免 N+1 问题 - 利用 [graphql/dataloader](https://github.com/graphql/dataloader) 处理
- [Gitlab GraphQL API 规范文档](https://docs.gitlab.com/ee/development/api_graphql_styleguide.html)

## Public GraphQL

### GitLab

- [GraphQL Explorer](https://gitlab.com/-/graphql-explorer)
- [文档](https://docs.gitlab.com/ee/api/graphql)
- [GraphQL API 规范文档](https://docs.gitlab.com/ee/development/api_graphql_styleguide.html)
- 全局 ID 格式 `gid://gitlab/MyObject/123`
- [前端 GraphQL 开发文档](https://docs.gitlab.com/ee/development/fe_guide/graphql.html)

```bash
# 生成 schema
bundle exec rake gitlab:graphql:schema:dump
```

### Github

- [schema.docs.graphql](https://docs.github.com/public/schema.docs.graphql)
- [GraphQL Explorer](https://developer.github.com/v4/explorer)

## 参考

- [chentsulin/awesome-graphql](https://github.com/chentsulin/awesome-graphql)
- [APIs-guru/graphql-apis](https://github.com/APIs-guru/graphql-apis)
  - 公共 GraphQL API 列表
