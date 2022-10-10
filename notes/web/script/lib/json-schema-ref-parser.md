---
title: json-schema-ref-parser
tags:
  - JSONSchema
---

# json-schema-ref-parser

- [@apidevtools/json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser)
  - MIT, JS
- $RefParser
  - schema
    - parsed/bundled/dereferenced JSON Schema object
    - 当前操作 schema
  - $refs
  - dereference
    - 处理所有 $ref
    - **会** 包含循环引用
  - bundle
    - $ref 会处理为 pointer
    - 合并 schema
    - **不会** 包含循环引用
  - parse
    - 不处理 $ref
  - resolve
    - 内部实现使用

:::caution

- 需要 browserfiy
  - url, buffer
  - http, https - 禁用内置 http resolver
  - fs - 禁用内置 file resolver
  - js-yaml - 禁用 yaml parser

:::
