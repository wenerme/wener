---
title: JSON Schema
---

# JSON Schema

- [json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec)
- 参考
  - [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/index.html)
  - proptypes-to-json-schema
    - React propTypes -> JSON Schema

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

- 2020-12 - https://json-schema.org/draft/2020-12 - 不兼容 draft-07
  - prefixItems
  - $recursiveRef,$recursiveAnchor -> $dynamicRef,$dynamicAnchor
  - contains+unevaluatedItems 行为变化
  - application/schema+json, application/schema-instance+json
  - 使用 $defs 来 bundle schema
  - [JSON Schema 2020-12 Release Notes](https://json-schema.org/draft/2020-12/release-notes.html)
- draft-07 - 2019-09
  - $recursiveRef/$recursiveAnchor, unevaluatedProperties/unevaluatedItems
- draft-06
- draft-04

## 类型

- number
  - 格式 float, double
  - 校验
    - minimum
    - maximum
    - exclusiveMinimum
    - exclusiveMaximum
    - multipleOf
- integer
  - 格式 int32, int64
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
