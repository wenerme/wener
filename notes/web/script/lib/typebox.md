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
- Type.Date, Type.RegExp 之类的使用了自定义 type
  - 导致生成的 jsonschema 是无效的
  - ajv 无法扩展 type

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

:::caution

- Value.Cast 会自动创建默认值
  - Date 会使用 now
  - 类型不匹配会丢掉
- string -> number
  - 使用 Value.Convert
- Value.Default 的返回结果不要修改
  - 可能会修改到 schema 上的 default
- 对 format 支持较少
  - 没有 date, time 等
  - `FormatRegistry.Set('date', value=>true)`
    - 允许未知 format
  - 推荐使用 ajv-formats
  - `Type.Date` 得到的 `{type:"Date"}` 与 ajv 不兼容，ajv 不支持扩展 type
  - https://github.com/sinclairzx81/typebox/issues/856#issuecomment-2365329669

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

- Type.Composite
  - 🌟 推荐
  - `A extends B`
  - 得到单个合并的 schema
- Type.Intersect
  - `A & B`
  - 得到 allOf schema

## codegen

- [sinclairzx81/typebox-codegen](https://github.com/sinclairzx81/typebox-codegen)
- `Date | string` 会得到 `Type.Union([Type.Date(), Type.String()], { title: '扫描时间' })`
  - -> `{anyOf: [{type: 'Date'}, {type: 'string'}]}`
- 参考
  - https://github.com/xddq/ts2typebox
  - https://sinclairzx81.github.io/typebox-workbench/
    - TypeScript to Typebox, zod, io-ts, ark, yup, valibot, JsonSchema, TypeExpression,

```ts
/**
 * @type: string
 * @format: "date-time"
 */
type JsonDateTime = Date | string;

interface Message {
  /**
   * @type: string
   * @format: "date-time"
   */
  date?: Date | string;
  // 折衷方案
  date2?: JsonDateTime;
}
```
