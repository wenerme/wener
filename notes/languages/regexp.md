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

```js
// https://stackoverflow.com/a/201378/1870054
const emailFull =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const emailSimple = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
const emailW3c =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
```


- https://github.com/XHXIAIEIN/split-string-address
- https://github.com/GrapecityXian/PhoneCommand
