---
title: 正则表达式
---

# RegExp

- flavor
  - PCRE - Perl Compatible Regular Expressions
    - PostgreSQL
  - [PCRE2] - 2017
    - PHP >= 7.3
    - jit, stack memory -> heap memory mgmt
  - re2
    - [google/re2/wiki/Syntax](https://github.com/google/re2/wiki/Syntax)
  - js
    - v8 Irregexp
    - mdn [Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
  - java
  - .net
  - python
- golang
  - RE2
  - [dlclark/regexp2](https://github.com/dlclark/regexp2)
    - full-featured regex engine in pure Go based on the .NET engine
- tools
  - https://regex101.com/
  - https://www.regexpal.com/
  - https://regexr.com/
  - https://www.debuggex.com/
  - https://regexbuddy.com/
    - Windows 应用
  - https://extendsclass.com/regex-tester.html
    - Visualizer
  - https://www.regexplanet.com/advanced/java/index.html
  - https://www.regextester.com/
- 参考
  - [slevithan/awesome-regex](https://github.com/slevithan/awesome-regex)
  - [RegexNote](https://wener.me/story/regex-note)
  - wikipedia [Regular expression](https://en.wikipedia.org/wiki/Regular_expression)
  - https://www.regular-expressions.info/
  - Tempered Greedy Token
    https://stackoverflow.com/a/37343088/1870054
  - https://benhoyt.com/writings/rob-pike-regex/
    Rob Pike’s simple C regex matcher in Go
    - [HN](https://news.ycombinator.com/item?id=32434412)
  - https://github.com/slevithan/regex
    - 使用 regex 定义的 jinja 解析 https://github.com/davidodenwald/prettier-plugin-jinja-template/blob/master/src/regex_editable.ts

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

```js
// 反匹配 - 除了给的不匹配其他都匹配
const notThis = /^(?:(?!this).)*$/;
// py, java ^(.(?!(some text)))*$
// pcre ^(?:(?!abc|xyz).)*$
```

| type         | regex                                          | e.g.                 |
| ------------ | ---------------------------------------------- | -------------------- |
| phone-number | `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$` | `+(123) - 456-78-90` |
| chinese      | `[\u4e00-\u9fa5]`                              |

- escaped string - 匹配 `'I\'am'`
  - `(["'])((?:(?=(?:\\)*)\\.|.)*?)\1`
  - https://regex101.com/r/mS1zJ8

---

- https://github.com/XHXIAIEIN/split-string-address
- https://github.com/GrapecityXian/PhoneCommand

## JavaScript

:::caution

- RegExp 是有状态的
  - lastIndex
  - 连续执行 `exec()` 可能结果不一样

:::

|                                         synbax | for                             | notes                   |
| ---------------------------------------------: | ------------------------------- | ----------------------- |
|                                           `\N` | Backreference                   |
|                                     `\k<name>` | Named backreference             | Chrome 64+, Safari 11.1 |
|                                   `\c[A-Za-z]` | control character = `char % 32` |
|                                           `\0` | NULL, U+0000                    |
|                             `(?<name>pattern)` | Named capture group             | Chrome 64+, Safari 11.1 |
|                                  `(?:pattern)` | Non-capturing group             |
|                    `(?=pattern)`,`(?!pattern)` | Lookahead assertion             |
|                  `(?<=pattern)`,`(?<!pattern)` | Lookbehind assertion            |
| `(?flags1:pattern)`,`(?flags1-flags2:pattern)` | Modifier, ims, `-flags2` 是关闭 |

- flags
  - i - ignoreCase
  - m - multiline
  - s - dotAll
  - g - global
  - y - sticky
  - d - hasIndices
  - u - unicode
  - v - unicodeSets
- atoms - 正则最基础单元
- `\c[A-Za-z]`
  - 控制字符
  - = `char % 32`
  - 因为大写和小写相差 32 因此 `\cJ` 和 `\cj` 是一样的
  - `\cJ` = `\n`
- replacement - 替换
  - `$$` -> `$`
  - `$&`
  - `$\``
  - `$'`
  - `$<n>`
  - replacer(match,p1,p2,offset,wholeString,namedGroups)
- `/u` -> unicode
  - 影响 `\w`, `\u{HHHH}`, `\uHHHH`
  - `/[\p{L}\p{N}]+/u`
- RegExp `/v`, unicodeSets
  - `/^\p{RGI_Emoji}$/v.test('😵‍💫')`=true - Unicode string properties
  - `/^[\q{😵‍💫}]$/v.test('😵‍💫')`=true - \q for String literals
  - `/^[\p{RGI_Emoji}--\q{😵‍💫}]$/v.test('😵‍💫')`=false - 支持排除
- 参考
  - [Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions)

## re2

- [google/re2/wiki/Syntax](https://github.com/google/re2/wiki/Syntax)

**不支持**

| Syntax    | For                              |
| --------- | -------------------------------- |
| `\g`      | 搜索子文本的开始 (PCRE)          |
| `\G`      | 上次匹配的结束 (PERL)            |
| `\Z`      | 文本的结尾，或文本末尾的换行符前 |
| `(?=re)`  | 匹配 `re` 的文本之前             |
| `(?!re)`  | 不匹配 `re` 的文本之前           |
| `(?<=re)` | 匹配 `re` 的文本之后             |
| `(?<!re)` | 不匹配 `re` 的文本之后           |
| `re&`     | 匹配 `re` 的文本之前 (VIM)       |
| `re@=`    | 匹配 `re` 的文本之前 (VIM)       |
| `re@!`    | 不匹配 `re` 的文本之前 (VIM)     |
| `re@<=`   | 匹配 `re` 的文本之后 (VIM)       |
| `re@<!`   | 不匹配 `re` 的文本之后 (VIM)     |
| `\zs`     | 设置匹配的开始 (= `\K`) (VIM)    |
| `\ze`     | 设置匹配的结束 (VIM)             |
| `\%^`     | 文件开头 (VIM)                   |
| `\%$`     | 文件结尾 (VIM)                   |
| `\%V`     | 屏幕上 (VIM)                     |
| `\%#`     | 光标位置 (VIM)                   |
| `\%'m`    | 标记 `m` 位置 (VIM)              |
| `\%23l`   | 第 23 行 (VIM)                   |
| `\%23c`   | 第 23 列 (VIM)                   |
| `\%23v`   | 第 23 个虚拟列 (VIM)             |

## CJK

```js
const reCJK = /[\p{Unified_Ideograph}\u3006\u3007][\ufe00-\ufe0f\u{e0100}-\u{e01ef}]?/;
const reChinese = /[\u4e00-\u9fa5]/;
```

- https://ayaka.shn.hk/hanregex/
