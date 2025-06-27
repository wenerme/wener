---
title: bignumber.js
---

# bignumber.js

:::tip

- 如果考虑 bundle size 选择 big.js 否则选择 decimal.js
- 操作对象 Decimal 都是 immutable 的，注意接收处理返回结果

:::

- size: big.js < bignumber.js < decimal.js
- [MikeMcl/big.js](https://github.com/MikeMcl/big.js)
  - 6.8kB/2.9kB
  - minimalist arbitrary-precision library
  - simplest and smallest
  - 不支持 NaN, Infinity
  - 不支持 其他 base
  - 不支持 `0x`
- [MikeMcl/bignumber.js](https://github.com/MikeMcl/bignumber.js)
  - MIT, JS
  - 18kB/8kB
  - 场景: financial
  - 只要不 div 就不会丢失精度
  - 存储 higher base - 计算会相对 big.js 更快
  - 支持 `0x`
- [MikeMcl/decimal.js](https://github.com/MikeMcl/decimal.js)
  - 31kB/12kB
  - 支持 binary, octal, decimal, hexadecimal
  - 支持 非整数次幂 / non-integer powers, 浮点数指数
  - 支持 exp, log, ln, 三角函数
  - 场景: scientific, engineering, financial applications
  - 最大，功能最全
- 参考
  - [big.js vs. bignumber.js vs. decimal.js](https://github.com/MikeMcl/big.js/wiki)
  - https://npmtrends.com/big.js-vs-bignumber.js-vs-decimal.js

```js
new BigNumber('ff.8', 16);
new Decimal('0xff.8');

// 处理小数的逻辑不一样
Bignumber.config({ DECIMAL_PLACES: 3, ROUNDING_MODE: 1 });
var x = new BigNumber('123.456789');
x.plus(1).toString(); // '124.456789'

Decimal.set({ precision: 7, rounding: 4 });
var y = new Decimal('123.456789');
y.plus(1).toString(); // '124.4568'
```

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
