---
title: superjson
---

# superjson

- [blitz-js/superjson](https://github.com/blitz-js/superjson)
  - 支持 undefined, bigint, Date, RegExp, Set, Map, Error, URL
  - 不支持 async
- 参考
  - [kiliman/remix-typedjson](https://github.com/kiliman/remix-typedjson)
    - 不支持扩展，用于 remix

```ts
import { Decimal } from 'decimal.js';

SuperJSON.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Decimal(v),
  },
  'decimal.js',
);
```
