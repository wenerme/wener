---
title: PHP Typing
---

# PHP Typing

:::caution

- 不支持 generics

:::

```php
<?php
// PHP 7.4+
declare(strict_types=1)

class MyObject {
  // typed properties by phpdoc
  /** @var Task[] $tasks */
  private array $tasks;
}
```

- 不支持 `void`, `callable`

**支持类型**

- `string`, `int`, `bool` - PHP 7.0+
- `float`, `array`, `iterable`, `object`
- `stdClass`
- `self`, `parent`
- `mixed`
- Nullable types - PHP 7.1+
  - `?string`, `?int`, `?bool`
- Typed Properties - PHP 7.4
- `null`, `false`, `true` - PHP 8.0+
- Union Types - PHP 8.0+
  - `string|null`
  - `string|false`
  - `string|false|null`
- DNF 类型 - PHP 8.2+
  - [DNF](https://en.wikipedia.org/wiki/Disjunctive_normal_form) - Disjunctive Normal Form - 析取范式
  - `A|B|C`
  - `A|B|(C&D)`
  - `(A&B&C)|null`
  - `(JSONResponse&SuccessResponse)|HTMLResponse|string`
  - ~~`A&(B|C)`~~ -> `(A&B)|(A&C)`
  - ~~`A|(B&(C|D))`~~ -> `A|(B&C)|B&D)`
- Typed array `int[]` - PHP 8.3
- Typed Class Constants - PHP 8.3

## 参考 {#reference}

- https://phpstan.org/writing-php-code/phpdoc-types
- https://www.php.net/manual/zh/language.types.declarations.php
- https://wiki.php.net/rfc/typed_properties_v2
- https://wiki.php.net/rfc/typed-properties
