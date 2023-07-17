---
title: zod
---

# zod

- [colinhacks/zod](https://github.com/colinhacks/zod)
  - adpoted by: [tRPC](./trpc.md)
- 参考
  - [zod.dev](https://zod.dev/)
  - [StefanTerdell/zod-to-json-schema](https://github.com/StefanTerdell/zod-to-json-schema)
  - [fabien0102/ts-to-zod](https://github.com/fabien0102/ts-to-zod)
  - [asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)

:::note

- [#2030](https://github.com/colinhacks/zod/discussions/2030)
  - Serialize
  - Serialize 推荐 JSONSchema - 减少部分校验，但能用到更多场景

:::

```ts
// 校验合法 JSON 对象
const LiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof LiteralSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const JsonSchema: z.ZodType<Json> = z.lazy(() => z.union([LiteralSchema, z.array(JsonSchema), z.record(JsonSchema)]));
```
