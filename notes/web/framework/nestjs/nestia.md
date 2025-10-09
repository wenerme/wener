---
title: nestia
---

# nestia

- 基于 [NestJS](./README.md)
- 生成类似 tRPC 的客户端
- 使用 ts-patch 注入自定义 ts 插件实现高级功能
  - 使用 [typia](../typia.md)

```bash
pnpm add -D nestia @nestia/sdk
pnpm add @nestia/core
```

**tsconfig.json**

```json
{
  "strict": true,
  "strictNullChecks": true,
  "compilerOptions": {
    "plugins": [{ "transform": "@nestia/core/lib/transform" }, { "transform": "typia/lib/transform" }]
  }
}
```
