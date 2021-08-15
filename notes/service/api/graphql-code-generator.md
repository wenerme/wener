---
title: graphql-code-generator
---

# graphql-code-generator

- [dotansimha/graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) 是什么？
  - 基于 GraphQL 的代码生成工具
  - 支持的前端框架 urql, apollo, react-query, react, vue, svelte
  - 支持的后端 Java Resolver, Kotlin, Java, Java Apollo Android

```yaml
overwrite: true
# 接口
schema: 'http://localhost:8080/api/v1/graphql'
# 扫描文件
documents: 'src/**/*.graphql'
generates:
  # 生成定义
  src/generated/graphql.ts:
    plugins:
      - typescript:
      # 生成 query / mutation / subscription / fragment
      - typescript-operations
      - typed-document-node
      - typescript-urql:
          urqlImportFrom: ../client/urql
          documentMode: external
          # in same file - fake import
          importDocumentNodeExternallyFrom: '../client/urql'
    config:
      # URQL 生成 useQuery, useMutation
      withHooks: true
      useTypeImports: true
  # 生成 introspection
  ./graphql.schema.json:
    plugins:
      - 'introspection'
  # 生成 URQL 用的 Schema - 相对小一点
  src/generated/urql.schema.json:
    plugins:
      - 'urql-introspection'
```
