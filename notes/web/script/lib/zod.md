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
  - [Effect-TS/schema](https://github.com/Effect-TS/schema)
    - 有点类似 Typebox 定义 schema 的感觉

:::note

- parse 会返回 clone 的对象
  - 所以性能会差一点 [#205](https://github.com/colinhacks/zod/issues/205)
  - 使用 proxy 对象时需要注意
    - 例如不能配合 immer、valtio 使用
  - [#1769](https://github.com/colinhacks/zod/issues/1769)
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

## openapi

- [asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)

```ts
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// 增加 openapi 方法
extendZodWithOpenApi(z);

// 支持定义额外数据
z.string().openapi({ description: 'Some string' });
```

- 使用 registry 定义接口方法
- 通过 schema 定义的对象默认会包含在 registry 中

```ts
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

const registry = new OpenAPIRegistry();

// Registry 也可以定义 Schema
const UserSchema = registry.register(
  'User',
  z.object({
    id: z.string().openapi({ example: '1212121' }),
    name: z.string().openapi({ example: 'John Doe' }),
    age: z.number().openapi({ example: 42 }),
  })
);

// 定义接口
registry.registerPath({
  method: 'get',
  path: '/users/{id}',
  description: 'Get user data by its id',
  summary: 'Get a single user',
  request: {
    params: z.object({
      id: z.string().openapi({ example: '1212121' }),
    }),
  },
  responses: {
    200: {
      description: 'Object with user data.',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    204: {
      description: 'No content - successful operation',
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

// 生成文档
generator.generateComponents();
```
