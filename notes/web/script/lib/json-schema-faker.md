---
title: json-schema-faker
tags:
  - JSONSchema
---

# json-schema-faker

- [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)
- generate - 同步生成，不 处理 ref
- resolve - 异步生成
  - 依赖 [json-schema-ref-parser](./json-schema-ref-parser.md), jsonpath-plus
- schema 包含 circular 生成有问题
  - 内部是使用 bundle，因此提供的 schema 也得是 bundle 或者直接提供 resolved kv 列表

```js
// resolve bundle schema
$RefParser
  .bundle(cwd, schema, {
    resolve: {
      file: { order: 100 },
      http: { order: 200 },
      fixedRefs,
    },
    dereference: {
      circular: 'ignore',
    },
  })
  .then((sub) => run($refs, sub, container));
```
