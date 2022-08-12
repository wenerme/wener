---
title: JSON Schema
---

# JSON Schema

- [json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec)
- 参考
  - [SchemaStore/schemastore](https://github.com/SchemaStore/schemastore)
  - [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/index.html)
  - proptypes-to-json-schema
    - React propTypes -> JSON Schema
  - https://ajv.js.org/guide/schema-language.html

:::tip

- 自定义属性最好使用 `x-` 前缀
- enum 通过数组定义，无法指定 title `[1,2,3]` - 可以使用 oneOf

:::

- js 推荐使用 ajv 校验

## Awsome

- [APIDevTools/json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser)
  - 合并 ref
- https://schema.org/docs/schemas.html
  - 开放 Schema
- https://json-schema.org/implementations.html
- http://jlblcc.github.io/json-schema-viewer/
- https://www.jsonschema.net/
  - schema from JSON
- [jviotti/awesome-jsonschema](https://github.com/jviotti/awesome-jsonschema)

## 版本

- 2020-12 - https://json-schema.org/draft/2020-12/schema - 不兼容 draft-07
  - prefixItems
  - $recursiveRef,$recursiveAnchor -> $dynamicRef,$dynamicAnchor
  - contains+unevaluatedItems 行为变化
  - application/schema+json, application/schema-instance+json
  - 使用 $defs 来 bundle schema
  - [JSON Schema 2020-12 Release Notes](https://json-schema.org/draft/2020-12/release-notes.html)
- 2019-09
- draft-07 - https://json-schema.org/draft-07/schema
  - $recursiveRef/$recursiveAnchor, unevaluatedProperties/unevaluatedItems
- draft-06
- draft-04

## 类型

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
    "nullable": {"type": ["string", "null"]}
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
      "additionalProperties": {"$ref": "other.json"}
    }
  },
  "$comment": ""
}
```

- number
  - format
    - float
    - double
  - 校验
    - minimum
    - maximum
    - exclusiveMinimum
    - exclusiveMaximum
    - multipleOf
- integer
  - format
    - int32
    - int64
- string
  - 基础
    - email
    - uuid
    - uri
    - hostname
    - ipv4
    - ipv6
    - password - 针对前端的提示
    - byte - Base64 编码数据
    - binary - 二进制数据，用于配合文件使用
    - date - RFC 3339, 5.6, `2017-07-21`
    - date-time - RFC 3339, 5.6, `2017-07-21T17:32:28Z`
  - 校验
    - pattern - 正则匹配
- boolean
- null - 空值
- array - 数组类型
  - 校验
    - minItems
    - maxItems
    - uniqueItems
    - items
- object
  - 修饰
    - additionalProperties
  - 校验
    - required - 不能为空数组
    - minProperties
    - maxProperties
  - 属性修饰
    - readOnly
    - writeOnly

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
