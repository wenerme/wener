---
title: graphql-code-generator
---

# graphql-code-generator

- [dotansimha/graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) 是什么？
  - 基于 GraphQL 的代码生成工具
  - 支持的前端框架 urql, apollo, react-query, react, vue, svelte
  - 支持的后端 Java Resolver, Kotlin, Java, Java Apollo Android
- 参考
  - https://the-guild.dev/graphql/codegen

```bash
# 安装 cli - 依赖插件无法 npx
npm add -D @graphql-codegen/cli @graphql-codegen/typescript
npx -y graphql-codegen init

npx -y graphql-codegen download-schema http://localhost:8080/graphql --output graphql.schema.json
npx -y graphql-codegen download-schema http://localhost:8080/graphql -H "Authorization: Bearer $TOKEN" --output graphql.schema.json

# 客户端相关
npm add -D @graphql-codegen/typescript-urql

# introspection 生成 schema 方便 IDE 补全
npm add -D @graphql-codegen/introspection
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

## plugins

- @graphql-codegen/client-preset
  - @apollo/client
  - @urql/core
  - @urql/preset
  - urql
  - graphql-request
  - react-query + graphql-request
  - swr + graphql-request
  - Embrace Fragment Masking principles
  - `FragmentType<T>`
  - useFragment/getFragmentData
    - 不是一个 hook
- 参考
  - [Unleash the power of Fragments with GraphQL Codegen](https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen)

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
      baseTypesPath: '~@src/generated/graphql'
    plugins:
      - typescript-operations
```

- https://the-guild.dev/graphql/codegen/plugins

## examples

**codegen.ts**

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'http://127.0.0.:3000/graphql': {
      headers: {
        Authorization: `Bearer ${process.env.GQL_TOKEN}`,
      },
    },
  },
  documents: 'src/**/*.graphql',
  hooks: {},
  generates: {
    'src/gen/gql.ts': { plugins: ['typescript'] },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.gen.tsx',
        baseTypesPath: '~@/gen/gql',
      },
      plugins: ['typescript-operations'],
    },
  },
};

export default config;
```

# FAQ

## Bundle size

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        ['@graphql-codegen/client-preset-swc-plugin', { artifactDirectory: './src/gql', gqlTagName: 'graphql' }],
      ],
    }),
  ],
});
```

- `@graphql-codegen/client-preset-swc-plugin`
- https://the-guild.dev/blog/optimize-bundle-size-with-swc-and-graphql-codegen
