---
title: bignumber.js
---

# bignumber.js

- [MikeMcl/bignumber.js](https://github.com/MikeMcl/bignumber.js)
  - 财务相关推荐使用
  - 18kB/8kB
  - 存储 higher base - 计算会相对 big.js 更快
  - 支持 `0x`
- [MikeMcl/big.js](https://github.com/MikeMcl/big.js)
  - 6.8kB/2.9kB
  - minimalist arbitrary-precision library
  - simplest and smallest
  - 不支持 NaN, Infinity
  - 不支持 其他 base
- [MikeMcl/decimal.js](https://github.com/MikeMcl/decimal.js)
  - 支持 binary, octal, decimal, hexadecimal
  - ⚠️ 开发不活跃，不推荐使用
  - 31kB/12kB
- 参考
  - [big.js vs. bignumber.js vs. decimal.js](https://github.com/MikeMcl/big.js/wiki)

| var | stand for   | 0.123 | -12345.67     |
| --- | ----------- | ----- | ------------- |
| c   | coefficient | 1,2,3 | 1,2,3,4,5,6,7 |
| e   | exponent    | -1    | 4             |
| s   | sign        | 1     | -1            |

| config         | default         |
| -------------- | --------------- |
| DECIMAL_PLACES | 20              |
| ROUNDING_MODE  | 4/ROUND_HALF_UP |
| EXPONENTIAL_AT | `[-7, 20]`      |
| RANGE          | `[-1e+9, 1e+9]` |

## Number

| Number                         | -                                          |
| ------------------------------ | ------------------------------------------ |
| toString(base=10)              |                                            |
| toFixed(digits=0)              | 小数点后 n 位, 0 < digits < 20             |
| toPrecision(precision?)        | 总的 n 个有效数字, 无 precision = toString |
| toExponential(fractionDigits?) | 1.23e+5                                    |
