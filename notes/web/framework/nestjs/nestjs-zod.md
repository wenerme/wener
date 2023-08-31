---
title: NestJS Zod
---

# NestJS Zod

## zod-plugins

- [anatine/zod-plugins](https://github.com/anatine/zod-plugins)
  - 能正常处理 Query 参数
- @anatine/zod-openapi
  - 只依赖 ts-deepmerge
  - 代码量少
  - 为 ZodSchema patch 了 openapi 方法
    - 等同于 `extendApi(this, metadata)`
  - 提供
    - `generateSchema`
    - `extenndApi`
      - 合并 metaOpenApi 属性
- @anatine/zod-nestjs
  - patchNestjsSwagger
  - createZodDto

```bash
npm add openapi3-ts zod @anatine/zod-openapi @anatine/zod-nestjs
```

## nestjs-zod

- [risen228/nestjs-zod](https://github.com/risen228/nestjs-zod)

:::caution

- Query 参数没生成
  - https://github.com/risen228/nestjs-zod/issues/23
  - 只能用 DTO - 但定义的额外参数会被 filter，获取不到
  - 额外的参数可以考虑 `@ApiParam({ name: 'id', schema: paramsSchema.properties.id })`
  - 或者控制 `@UsePipes(ZodValidationPipe)` 作用范围

:::
