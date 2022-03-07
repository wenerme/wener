---
title: 正则表达式
---

# RegExp

- flavor
  - PCRE - Perl Compatible Regular Expressions
  - [PCRE2] - 2017
    - PHP >= 7.3
    - jit, stack memory -> heap memory mgmt
  - re2
    - [google/re2/wiki/Syntax](https://github.com/google/re2/wiki/Syntax)
- tools
  - https://regex101.com/
  - https://www.regexpal.com/
- 参考
  - wikipedia [Regular expression](https://en.wikipedia.org/wiki/Regular_expression)
  - https://www.regular-expressions.info/

[pcre2]: https://github.com/PhilipHazel/pcre2

```js
// https://www.noulakaz.net/2007/03/18/a-regular-expression-to-check-for-prime-numbers/
// https://news.ycombinator.com/item?id=30564287
const isPrime = (n) => !/^1?$|^(11+?)\1+$/.test('1'.repeat(n));
```
