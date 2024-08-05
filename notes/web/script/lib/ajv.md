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
  - https://validatejs.org/

:::caution

- additionalProperties 不能默认为 false
  - [ajv-validator/ajv#634](https://github.com/ajv-validator/ajv/issues/634)

:::

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

| format                    | example                                 | description                                              |
| ------------------------- | --------------------------------------- | -------------------------------------------------------- |
| **ajv-formats**           |
| date                      | 2021-01-01                              | RFC3339 full-date                                        |
| time                      | 14:30:00+01:00                          | time with optional time-zone.                            |
| date-time                 | 2021-01-01T14:30:00+01:00               | date-time from the same source (time-zone is mandatory). |
| duration                  | P3Y6M4DT12H30M5S                        | RFC3339 duration                                         |
| uri                       | https://example.com                     | full URI.                                                |
| uri-reference             | /relative/uri                           | URI reference, including full and relative URIs.         |
| uri-template              | https://example.com/{user}              | RFC6570 URI template                                     |
| ~~url~~                   | https://example.com                     | URL record                                               |
| email                     | user@example.com                        | email address.                                           |
| hostname                  | example.com                             | RFC1034 host name                                        |
| ipv4                      | 192.168.0.1                             | IPv4                                                     |
| ipv6                      | 2001:0db8:85a3:0000:0000:8a2e:0370:7334 | IPv6                                                     |
| regex                     | ^[a-zA-Z0-9]+$                          | RegExp                                                   |
| uuid                      | 123e4567-e89b-12d3-a456-426614174000    | RFC4122 UUID                                             |
| json-pointer              | /pointer                                | RFC6901 JSON-pointer                                     |
| relative-json-pointer     | 0                                       | [draft][relative-json-pointer-00] relative JSON-pointer  |
| **ajv-formats-draft2019** |
| iri                       | https://例子.测试                       | RFC3987 IRN/Internationalized Resource Identifier        |
| iri-reference             | /relative/路径                          | IRI reference, including full and relative IRIs.         |
| idn-hostname              | 例子.测试                               | RFC5890 IDN/Internationalized Domain Name hostname       |
| idn-email                 | 用户@例子.测试                          | RFC6531 Internationalized email address                  |

[relative-json-pointer-00]: https://datatracker.ietf.org/doc/html/draft-luff-relative-json-pointer-00

```ts
// 自定义 format
ajv.addFormat('identifier', /^a-z\$_[a-zA-Z$_0-9]*$/);
// 使用自定义逻辑校验 format
ajv.addFormat('byte', {
  type: 'number',
  validate: (x) => x >= 0 && x <= 255 && x % 1 == 0,
});
ajv.addFormat('int8',{
  type: 'number',
  validate: (x) => x >= -128 && x <= 127 && Number.isInteger(x),
})
```



## standalone validation code

- 生成独立的函数

```bash
npm install -g ajv-cli
ajv compile -s schema.json -o validate_schema.js
```

- https://ajv.js.org/standalone.html

# FAQ

## due to error strict mode: unknown keyword

## ajv schema with key or id already exists

- 如果 schema 有 `$id` 可能会出现
- 如果 schema 是通过反序列化生成的，可能会出现重复 - ref 不一样但 id 一样

## strict mode: unknown keyword

未知关键字，需要添加关键字支持

## 修改校验数据

> 类似 zod.parse 能得到一个解析后的满足验证要求的对象，不过 zod 不会修改传入对象，ajv 只能通过修改传入对象实现，这一点上 ajv 性能更好

- 移除额外
- 添加 defaults
- 强制类型转换
- coerceTypes=true|'array'
  - array 支持 `x` <-> `[x]`

```ts
const ajv = new Ajv({ removeAdditional: true, useDefaults: true, coerceTypes: 'array' });

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    foo: { type: 'array', items: { type: 'number' } },
    bar: { type: 'boolean' },
    num: { type: 'number' },
    name: { type: 'string', default: 'wener' },
  },
};

const data = { foo: '1', bar: 'false', rm: true, num: '10' };

const validate = ajv.compile(schema);

// true
console.log(validate(data));
// {foo: [1], bar: false, num: 10, name: "wener"}
console.log(data);
```

- https://runkit.com/npm/ajv
- https://ajv.js.org/guide/modifying-data.html
