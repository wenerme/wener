---
title: ECMAScript Version
tags:
  - Version
---

# ECMAScript Version

| Version | Official Name   | Date | Description     |
| ------- | --------------- | ---- | --------------- |
|         | JavaScript 1.0  | 1995 | by Brendan Eich |
| ES1     | ECMAScript 1    | 1997 | ECMA-262        |
| ES2     | ECMAScript 2    | 1998 |
| ES3     | ECMAScript 3    | 1999 |
| ES4     | ECMAScript 4    |      | 未发布          |
| ES5     | ECMAScript 5    | 2009 |
| ES6     | ECMAScript 2015 | 2015 |
|         | ECMAScript 2016 | 2016 |
| ES.Next |                 |      | 下一个版本      |

:::tip

- 今年采纳的建议，发布到下一年版本，因此会相差一年版本号

:::

:::tip 👀

- [proposal-temporal](https://github.com/tc39/proposal-temporal)
  - Temporal - 替代 Date
- [Function.memo](https://github.com/tc39/proposal-function-memo)
- `await generateItems().toArray()`
  - [tc39/proposal-iterator-helpers](https://github.com/tc39/proposal-iterator-helpers)
- `Array.fromAsync`
  [tc39/proposal-array-from-async](https://github.com/tc39/proposal-array-from-async)

:::

- es5 和 es6 是一个分界线
  - 2018 年所有浏览器支持 es6
  - 之后统一版本概念变弱 - 都以功能特性为单位
- [tc39/proposals](https://github.com/tc39/proposals)
- [TC39 Process](https://tc39.github.io/process-document/)
  - https://tc39.es/process-document/
  - Finished Proposals
  - Active Proposals
  - Stage 1 Proposals
  - Stage 0 Proposals
  - Inactive Proposals
- [ECMAScript Language Specification](https://tc39.es/ecma262/)
- 参考
  - [finished-proposals](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md)
  - https://caniuse.com/#search=es6
  - [compat-table](https://kangax.github.io/compat-table)
    - [2016+](https://kangax.github.io/compat-table/es2016plus/)
  - https://en.wikipedia.org/wiki/ECMAScript

## ECMAScript 2022

```js
// Class Fields
class Counter extends HTMLElement {
  // 私有
  #val = 0;

  get #x() { return #val; }
  set #x(value) {
    this.#val = value;
  }

  #inc() {
    this.#val ++
  }

  // 静态
  static #blue = "#0000ff";
  static getBlue() {
    return this.#blue
  }
}

// regex 索引
// d -> indices
/a+(?<Z>z)?/d.exec('xaaaz').indices

// Top-level await
await Promise.resolve()

// static block
class C {
  static {
    // statements
  }
}

// error cause
try {
  throw new Error('error', { cause: err });
} catch (e) {
  console.log('Caused by', e.cause);
}

// Array#at
[,-1].at(-1)
```

## ECMAScript 2021

```js
String.prototype.replaceAll;

Promise.any;

// WeakRefs
new WeakRef(() => 1);

// Logical Assignment Operators
a ||= b;
a &&= b;
a ??= b;

// Numeric separators
1_000_000_000;
```

## ECMAScript 2020

- [for-in 顺序](https://tc39.es/proposal-for-in-order/)

```js
// String.prototype.matchAll
// 要求 RegEx 必须有 g 标识
'aa'.matchAll(/a/g);

// 动态 import
import('./foo.js');

// 模块元信息
import.meta;

BigInt;

// Promise.all 会在第一个异常时终止
Promise.allSettled;

globalThis;

// Optional Chaining
undefined?.b;

// Nullish coalescing Operator
undefined ?? null ?? 0 ?? 1;
```

## ECMAScript 2019

- JSON superset
  - U+2028 LINE SEPARATOR, U+2029 PARAGRAPH SEPARATOR
- Function.prototype.toString [revision](https://tc39.es/Function-prototype-toString-revision/)
- Well-formed JSON.stringify
  - 避免返回错误 Unicode escape

```js
// Optional catch binding
try {
} catch {}

Symbol.prototype.description;

Object.fromEntries([['k', 'v']]);

// String.prototype.{trimStart,trimEnd}
' 1 '.trimStart().trimEnd();

String.prototype.matchAll;

// Array.prototype.{flat,flatMap}
[[1], [2]].flat();
[0, 0].flatMap((_, i) => [1]);
```

## ECMAScript 2018

- [Lifting template literal restriction](https://tc39.es/proposal-template-literal-revision/)

```js
// Regex Named Group
/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u.exec('2015-01-02')
// Regex s -> dot all, single line
/foo.bar/s.test('foo\nbar');
// Regex Lookbehind Assertions
/(?<=\D)\d/
/(?<!\D)\d/
// Regex Unicode Property Escapes
// \p{UnicodePropertyName=UnicodePropertyValue}
// General_Category, Script, Script_Extensions
//
// \p{LoneUnicodePropertyNameOrValue}
// Alphabetic, Uppercase, Lowercase, White_Space, Noncharacter_Code_Point, Default_Ignorable_Code_Point, Any, ASCII, Assigned, ID_Start, ID_Continue, Join_Control, Emoji_Presentation, Emoji_Modifier, Emoji_Modifier_Base
//
// http://unicode.org/Public/UNIDATA/PropertyValueAliases.txt
// http://unicode.org/Public/UNIDATA/PropertyAliases.txt
// http://unicode.org/reports/tr18/#RL1.2
/^\p{Decimal_Number}+$/u.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼')

// Object Rest/Spread
const {a,...rest} = {a:1,b:2,...{c:3}}

// Promise#finally
Promise.prototype.finally;

// Asynchronous Iteration
// [Symbol.asyncIterator]
for await (const line of readLines()) {
  console.log(line);
}
async function* readLines(){
  yield await Promise.resolve('Line 1')
  yield 'Line 2'
}
```

## ECMAScript 2017

- [Shared Memory and Atomics](https://tc39.es/ecmascript_sharedmem/shmem.html)

```js
Object.values;
Object.entries;

'1'.padEnd(4, ' ');
'1'.padStart(4, ' ');

Object.getOwnPropertyDescriptors;

// 方法参数容许多余逗号
console.log(true);

// async,await
async function run() {
  await Promise.resolve();
}
```

## ECMAScript 2016

```js
Array.prototype.includes;

// Exponentiation
1 ** 2; // Math.pow(1,2)
```

## ECMAScript 2015

```js
// array function
() => 1;

// let, const
let a = 1;
const b = 1;

// for-of
for (const v of [1]);

// Map, Set
new Map();
new Set();

// Symbol
const mySym = new Symbol();

// class
class Car {
  constructor() {}
}

// promise
Promise.resolve();

// 默认参数, rest 参数
function hello(name = 'world', ...props) {}

const { a, b } = { a: 1, b: 2 };

String.prototype.includes;
String.prototype.startsWith;
String.prototype.endsWith;

Array.from('abc');
[(1, 2)].keys();
[(1, 2)].find((v) => v == 1);
[(1, 2)].findIndex((v) => v == 1);

Math.trunc;
Math.sign;
Math.cbrt;
Math.log2;
Math.log10;

Number.isInteger;
Number.isSafeInteger;

isFinite(1 / 0);
isNaN(false);
```

## ECMAScript 5

```ts
'use strict';

'Hello'.charAt(0);
'Hello'[0];

// 多行 string
console.log(
  'Hello \
Wener!',
);

// 允许关键字作为属性名
const a = { new: 'yes' };

String.prototype.trim;

Array.isArray([]);
Array.prototype.forEach;
Array.prototype.map;
Array.prototype.filter;
Array.prototype.reduce;
Array.prototype.reduceRight;
Array.prototype.every;
Array.prototype.some;
Array.prototype.indexOf;
Array.prototype.lastIndexOf;

JSON.parse('{}');
JSON.stringify({});

Date.now();
Date.prototype.toISOString;
Date.prototype.toJSON;

// getter,setter
const a = {
  get name() {
    return '';
  },
  set name(v) {
    console.log(v);
  },
};

// mgmt
Object.create;
Object.defineProperty;
Object.defineProperties;
Object.getOwnPropertyDescriptor;
Object.getOwnPropertyNames;
Object.getPrototypeOf;
Object.keys;
// protect
Object.preventExtensions;
Object.isExtensible;
Object.seal;
Object.isSealed;
Object.freeze;
Object.isFrozen;

// 允许多余逗号
// {a:1,}
// [1,]
```
