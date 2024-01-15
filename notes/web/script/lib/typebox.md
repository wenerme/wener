---
title: typebox
---

# typebox

:::tip

- Json Schema Type Builder with Static Type Resolution for TypeScript
  - 构建的结果是 JsonSchema
  - 同时提供 TypeScript 类型定义
- 非常 Declarative
- 适用于标准类型定义，不适用于带转换逻辑和自定义 transform 场景
  - 例如 Date <-> string
- 需要转换逻辑使用 zod

:::

- [sinclairzx81/typebox](https://github.com/sinclairzx81/typebox)
  - 支持 AOT - Compile
  - 完整的类型系统 - 不只是 validator
  - 类型定义生成 JSONSCHEMA
  - 类型校验
  - 数值操作 - 修改、Patch、Diff
  - adopted by
    - [fastify/fastify-type-provider-typebox](https://github.com/fastify/fastify-type-provider-typebox)
    - [elysia](https://github.com/elysiajs/elysia)
    - feathersjs
- 参考
  - https://moltar.github.io/typescript-runtime-type-benchmarks/
    - 性能非常好
  - https://sinclairzx81.github.io/typebox-workbench/
    - TypeScript to Typebox, zod, io-ts, ark, yup, valibot, JsonSchema, TypeExpression,
  - [sinclairzx81/typebox-codegen](https://github.com/sinclairzx81/typebox-codegen)

:::caution

- Value.Cast 会自动创建默认值
  - Date 会使用 now
  - 类型不匹配会丢掉
- string -> number
  - 使用 Value.Convert
- Value.Default 的返回结果不要修改
  - 可能会修改到 schema 上的 default

:::

```ts
const T = Type.Object(
  {
    n: Type.Number(),
    d: Type.Date(),
    a: Type.Object(
      {
        b: Type.Array(Type.String(), { default: [] }),
      },
      { default: {} },
    ),
  },
  {
    // additionalProperties: false,
  },
);

// 约等于 zod 的 parse
console.log(
  // get T, run transform
  Value.Decode(
    T,
    // remove additional
    Value.Clean(
      T,
      // add missing
      Value.Default(
        T,
        // '1' -> 1
        Value.Convert(T, {
          z: 1,
          n: '1',
          d: new Date(),
        }),
      ),
    ),
  ),
);
```
