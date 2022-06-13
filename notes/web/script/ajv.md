---
title: ajv
---

# ajv

- 参考
  - [ajv-validator/ajv-keywords](https://github.com/ajv-validator/ajv-keywords)
    增加自定义关键字
    - typeof, instanceof
    - ~~select, selectCases, selectDefault~~ ->  discriminator
    - dynamicDefaults
    - number: range, exclusiveRange
    - string: regexp, transform
      - transform 允许验证时修改字符串内容
    - array: uniqueItemProperties
    - object: allRequired, anyRequired, oneRequired, patternRequired, prohibited, deepProperties, deepRequired

```bash
npm add ajv ajv-formats
```

```ts
import addFormats from 'ajv-formats';
import addKeyworks from 'ajv-keywords';
import Ajv2020 from 'ajv/dist/2020';

const ajv = new Ajv2020();
addFormats(ajv);
addKeyworks(ajv);
```
