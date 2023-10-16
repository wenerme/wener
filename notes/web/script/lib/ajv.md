---
title: ajv
---

# ajv

- [ajv-validator/ajv](https://github.com/ajv-validator/ajv)
  - JSON Schema 校验
  - 支持 JTD serialize/parse
    - 类似于 [fastify/fast-json-stringify](https://github.com/fastify/fast-json-stringify)
- 参考
  - [ajv-validator/ajv-keywords](https://github.com/ajv-validator/ajv-keywords)
    增加自定义关键字
    - typeof, instanceof
    - ~~select, selectCases, selectDefault~~ -> discriminator
    - dynamicDefaults
    - number: range, exclusiveRange
    - string: regexp, transform
      - transform 允许验证时修改字符串内容
    - array: uniqueItemProperties
    - object: allRequired, anyRequired, oneRequired, patternRequired, prohibited, deepProperties, deepRequired
  - https://ajv.js.org/json-schema.html

```bash
npm add ajv ajv-formats ajv-keywords ajv-errors
```

```ts
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import Ajv2020 from 'ajv/dist/2020';

const ajv = new Ajv2020();
addFormats(ajv);
addKeywords(ajv);

// 添加自定义 keyword 避免失败
ajv.addKeyword('x-meta');
```

## due to error strict mode: unknown keyword
