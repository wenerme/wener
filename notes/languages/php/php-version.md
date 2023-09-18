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
| [PHP 7.4](#php-74) | 2019-11-28 | 2022-11-28 |

## PHP 8.2

- readonly 类

```php
<?php
readonly class BlogData
{
    public string $title;

    public Status $status;

    public function __construct(string $title, Status $status)
    {
        $this->title = $title;
        $this->status = $status;
    }
}
```

- Disjunctive Normal Form (DNF) 类型

```php
<?php
class Foo {
    public function bar((A&B)|null $entity) {
        return $entity;
    }
}
```

- null, false, true 作为独立类型
- trait 支持包含 const
- 参考
  - https://www.php.net/releases/8.2/en.php

## PHP 8.1

- fiber
  - amphp
- enum

```php
<?php
enum Status
{
    case Draft;
    case Published;
    case Archived;
}
```

- readonly 属性

```php
<?php
class BlogData
{
    public readonly Status $status;

    public function __construct(Status $status)
    {
        $this->status = $status;
    }
}
```

- first class callable

```php
<?php
// 类似于 获取函数引用
$foo = $this->foo(...);
$fn = strlen(...);
```

- Intersection Types

```php
<?php
function count_and_iterate(Iterator&Countable $value) {
    foreach ($value as $val) {
        echo $val;
    }

    count($value);
}
```

- `never` 类型 - 不返回
- array spread

```php
<?php
$arrayA = ['a' => 1];
$arrayB = ['b' => 2];

// array_merge
$result = ['a' => 0, ...$arrayA, ...$arrayB];
```

- 参考
  - https://www.php.net/releases/8.1/en.php

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
- 命名参数
- Attributes
- Union 类型 `int|float`
- Nullsafe operator - `?->`
- `0 == 'foobar'`
  - `true` -> `false`

```php
<?php
// 类似 python 语法
htmlspecialchars($string, double_encode: false);

// 类似 java annotation、js decorator
class PostsController
{
    #[Route("/api/posts/{id}", methods: ["GET"])]
    public function get($id) { /* ... */ }
}

// 构造函数属性
class Point {
  public function __construct(
    public float $x = 0.0,
    public float $y = 0.0,
    public float $z = 0.0,
  ) {}
}

// Match 表达式
// 类似 go 的 select
echo match (8.0) {
  '8.0' => "Oh no!",
  8.0 => "This is what I expected",
};
```

- 参考
  - https://www.php.net/releases/8.0/en.php

## PHP 7.4

- 属性类型 - `public int $id`
- 限定返回类型
- `??=`
- array spread
- 箭头函数 - `fn($x) => $x * $x`
- 数字 `_` 分割
- FFI
- WeakReference
- 参考
  - https://www.php.net/releases/7_4_0.php

## PHP 7.3

- Array Destructuring
  - 支持引用

## PHP 7.2

- Object typehint

## PHP 7.1

- Nullable
- `void` 返回类型
- Iterable 类型
- list `[]`， 支持 key

## PHP 7.0

- Zend Engine
- Anonymous Classes
- `??` - null coalescing operator

## PHP 5.6
