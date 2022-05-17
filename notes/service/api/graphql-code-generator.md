---
title: graphql-code-generator
---

# graphql-code-generator

- [dotansimha/graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) 是什么？
  - 基于 GraphQL 的代码生成工具
  - 支持的前端框架 urql, apollo, react-query, react, vue, svelte
  - 支持的后端 Java Resolver, Kotlin, Java, Java Apollo Android

```bash
# 安装 cli - 依赖插件无法 npx
npm add -D @graphql-codegen/cli @graphql-codegen/typescript
npx -y graphql-codegen init

npx -y graphql-codegen download-schema http://localhost:8080/graphql --output schema.json

# 客户端相关
npm add -D @graphql-codegen/typescript-urql
```

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
      # gql-tag 的 document
      - typescript-document-nodes

      # @graphql-codegen/typed-document-node
      # https://github.com/dotansimha/graphql-typed-document-node
      # 编译后的 Node - JSON 对象 - 不需要 gql-tag
      # 体积会更大 - 但不需要运行时 parse
      - typed-document-node
      # @graphql-codegen/typescript-urql
      # URQL 客户端 - hook
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

## near

```bash
npm add -D @graphql-codegen/near-operation-file-preset
```

```yaml
generates:
src/:
  preset: near-operation-file
  presetConfig:
    extension: .generated.tsx
    # baseTypesPath: types.ts
    baseTypesPath: "~@src/generated/graphql"
  plugins:
    - typescript-operations
```
