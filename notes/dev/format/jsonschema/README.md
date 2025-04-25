---
title: JSON Schema
---

# JSON Schema

:::tip

- 自定义属性最好使用 `x-` 前缀
- enum 通过数组定义，无法指定 title `[1,2,3]` - 可以使用 oneOf/anyOf
- 推荐使用 2020-12 或 draft-07

:::

| version    | $schema                                | adopted by  | date    |
| ---------- | -------------------------------------- | ----------- | ------- |
| [2020-12]  |                                        | OpenAPI 3.1 |
| [2019-09]  |                                        |             | 2019-09 |
| [draft-07] | http://json-schema.org/draft-07/schema | ajv default | 2018-06 |
| [draft-06] |                                        |
| [draft-04] |                                        |
| draft-00   |                                        | OpenAPI 3.0 |

:::tip

- `$schema` 为 `http://`

:::

[2020-12]: https://json-schema.org/draft/2020-12/schema
[2019-09]: https://json-schema.org/draft/2019-09/schema
[draft-07]: https://json-schema.org/draft-07/schema
[draft-06]: https://json-schema.org/draft-06/schema
[draft-04]: https://json-schema.org/draft-04/schema

- 2020-12 - 不兼容 draft-07
  - prefixItems
  - items 行为变化
  - $recursiveRef,$recursiveAnchor -> $dynamicRef,$dynamicAnchor
  - contains+unevaluatedItems 行为变化
  - application/schema+json, application/schema-instance+json
  - 使用 $defs 来 bundle schema
  - [JSON Schema 2020-12 Release Notes](https://json-schema.org/draft/2020-12/release-notes.html)
- draft 2019-09
  - $recursiveAnchor/$recursiveRef
  - unevaluatedProperties
  - unevaluatedItems
  - dependentRequired
  - dependentSchemas
  - maxContains/minContains
- draft-07 - https://json-schema.org/draft-07/schema
  - $recursiveRef/$recursiveAnchor, unevaluatedProperties/unevaluatedItems
- draft-06
- draft-04
- OpenAPI
  - nullable
  - discriminator
    - 不影响校验
- 版本选择
  - ajv 默认 draft-07
  - typebox 使用 draft-07
- 参考
  - https://github.com/json-schema-org
  - https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-02

```ts
export type JSONSchemaTypeName =
  | 'string' //
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null';
export type JSONSchemaType =
  | string //
  | number
  | boolean
  | JSONSchemaObject
  | JSONSchemaArray
  | null;
type JSONSchemaDefinition = JSONSchema | boolean;

interface JSONSchema {
  $id?: string;
  $ref?: string;
  /**
   * Meta schema
   *
   * Recommended values:
   * - 'http://json-schema.org/schema#'
   * - 'http://json-schema.org/hyper-schema#'
   * - 'http://json-schema.org/draft-07/schema#'
   * - 'http://json-schema.org/draft-07/hyper-schema#'
   *
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-5
   */
  $schema?: string;
  $comment?: string;

  $defs?: Record<string, JsonSchema | boolean>;

  // for any type

  type?: JSONSchemaTypeName | JSONSchemaTypeName[];
  enum?: JSONSchemaType[];
  const?: JSONSchemaType;

  //region keywords for strings
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  contentEncoding?: string; // e.g. base64
  contentMediaType?: string; // e.g. image/png, text/html, application/jwt
  contentSchema?: JSONSchemaDefinition; // for application/jwt e.g. {type:"array"}
  //endregion

  //region keywords for numbers
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  //endregion

  //region keywords for arrays
  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
   */
  items?: JSONSchemaDefinition | JSONSchemaDefinition[] | undefined;
  additionalItems?: JSONSchemaDefinition | undefined;
  contains?: JSONSchemaDefinition;

  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxContains?: number;
  minContains?: number;
  //endregion

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
   */
  //region keywords for objects
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  dependentRequired?: Record<string, string[]>; // draft 2019-09

  properties?: Record<string, JSONSchemaDefinition>;
  patternProperties?: Record<string, JSONSchemaDefinition>;
  additionalProperties?: JSONSchemaDefinition;
  propertyNames?: JSONSchemaDefinition;

  /**
   * renamed to dependentSchemas, dependentRequired
   * @deprecated draft 2019-09
   */
  dependencies?: Record<string, JSONSchemaDefinition | string[]>;
  //endregion

  //region conditional subschemas
  if?: JSONSchemaDefinition;
  then?: JSONSchemaDefinition;
  else?: JSONSchemaDefinition;
  //endregion

  //region logical operations
  allOf?: JSONSchemaDefinition[];
  anyOf?: JSONSchemaDefinition[];
  oneOf?: JSONSchemaDefinition[];
  not?: JSONSchemaDefinition;
  //endregion

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
   */
  format?: string;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
   */
  contentMediaType?: string;
  contentEncoding?: string;

  /**
   * renamed to `$defs` to match `$ref`
   */
  definitions?: Record<string, JSONSchemaDefinition>;

  //region metadata
  title?: string;
  description?: string;
  default?: JSONSchemaType;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: JSONSchemaType;
  //endregion
}
```

```json
{
  "type": "string",
  "nullable": true
}
```

```json
{
  "type": ["string", "null"]
}
```

```json
{
  "type": "integer"
}
```

---

- [json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec)

## Keyword

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/product.schema.json",
  "title": "Product",
  "description": "A product in the catalog",
  "type": "object",
  "properties": {
    "uints": {
      "type": "array",
      "items": {
        // 相对引用
        "$ref": "#/$defs/positiveInteger"
      }
    },

    "objs": {
      "type": "array",
      "items": {
        // 绝对引用
        "$id": "https://example.com/bar",
        "additionalProperties": {}
      }
    },
    // null or string
    "nullable": { "type": ["string", "null"] }
  },
  "required": [],
  "$defs": {
    "positiveInteger": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "single": {
      "$anchor": "item",
      "type": "object",
      "additionalProperties": { "$ref": "other.json" }
    }
  },
  "$comment": ""
}
```

- 元数据
  - title, description
  - $comment
  - default
  - examples
  - readOnly, writeOnly
  - contentEncoding - 例如: base64 https://www.rfc-editor.org/rfc/rfc2045#section-6.1
  - contentMediaType - 例如: image/png https://datatracker.ietf.org/doc/rfc2046/
- number
  - format
    - float
    - double
  - keyword
    - minimum - >=
    - maximum - <=
    - exclusiveMinimum - >
    - exclusiveMaximum - <
    - multipleOf
- integer
  - format
    - int32
    - int64
- string
  - format
    - email - RFC 5321
    - idn-email - RFC 6531
    - uuid
    - uri
    - uri-reference
    - iri
    - iri-reference
    - uri-template
    - json-pointer
    - relarive-json-pointer
    - hostname
    - idn-hostname - RFC5890, section 2.3.2.3.
    - ipv4
    - ipv6
    - password - 针对前端的提示
    - byte - Base64 编码数据
    - binary - 二进制数据，用于配合文件使用
    - date-time - RFC 3339, 5.6, `2017-07-21T17:32:28Z`
    - date - RFC 3339, 5.6, `2017-07-21`
    - time
    - duration - draft 2019-09 - ISO 8601 ABNF for “duration”
      - P3D
  - keyword
    - pattern - 正则匹配
    - minLength, maxLength
- boolean
- null - 空值
- array
  - minItems, maxItems
  - uniqueItems
  - items
  - contains
  - draft 2019-09
    - maxContains， minContains
    - unevaluatedItems
  - draft-2020-12
    - items - 要求为 schema
    - prefixItems - 前置 items 类型
    - additionalItems - 是否允许额外 items
- object
  - minProperties， maxProperties
  - required - 必须的字段
  - properties - 字段定义
  - patternProperties - 根据 key 限定类型
  - additionalProperties - 允许额外字段
  - propertyNames - 限定 key 的 schema
  - draft 2019-09
    - ~~dependencies~~
    - dependentRequired - 字段之间依赖
    - dependentSchemas
    - unevaluatedProperties
  - OpenAPI
    - discriminator

---

**decimal 精度**

```json
{ "type": "number", "multipleOf": 0.01 }
```

## ajv formats

- https://ajv.js.org/packages/ajv-formats.html
- https://ajv.js.org/guide/formats.html

# FAQ

## JSON Schema vs JSON Type Definition

- JSON Schema
  - 优点
    - 使用广
    - OpenAPI 采用
    - 支持复杂校验逻辑
    - 定义限制而非类型结构
  - 缺点
    - 实现复杂
    - 非 RFC，标准处于 draft 状态
- JSON Type Definition
  - 优点
    - 定义类型
    - 简单
    - 实现简单
    - RFC8927
  - 缺点
    - 不支持引用
    - 无 meta-schema
    - 新标准 - 2021-01

---

- https://ajv.js.org/guide/schema-language.html

## int64

```json
{
  "type": "integer",
  "format": "int64"
}
```

- protobufjs 使用 long 包

## Bundle

- `$defs`
- https://json-schema.org/blog/posts/bundling-json-schema-compound-documents
- https://json-schema.org/understanding-json-schema/structuring

