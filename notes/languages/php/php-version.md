---
tags:
  - Version
---

# PHP Version

- 每个版本支持 2 年，+1 年安全修复
- https://www.php.net/supported-versions.php

| Version            | date       | eol        |
| ------------------ | ---------- | ---------- |
| [PHP 8.2](#php-82) | 2022-12-08 |
| [PHP 8.1](#php-81) | 2021-11-25 |
| [PHP 8.0](#php-80) | 2020-11-26 |
| PHP 7.4            | 2019-11-28 | 2022-11-28 |

## PHP 8.1

- enum
- readonly 属性

## PHP 8.0

- JIT
- 语法
  - `match`
  - `static`, `mixed`
  - nullsafe `$user->getBirthday()?->diffForHumans()`
- stdlib
  - WeakMap
  - DateTime
  - Stringable
