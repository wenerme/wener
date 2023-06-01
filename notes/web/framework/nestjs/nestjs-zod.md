---
title: NestJS Zod
---

# NestJS Zod

:::caution

 - Query 参数没生成
  - https://github.com/risen228/nestjs-zod/issues/23
  - 只能用 DTO - 但定义的额外参数会被 filter，获取不到
  - 额外的参数可以考虑 `@ApiParam({ name: 'id', schema: paramsSchema.properties.id })`
  - 或者控制 `@UsePipes(ZodValidationPipe)` 作用范围

:::
