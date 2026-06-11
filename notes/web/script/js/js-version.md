---
title: ECMAScript Version
tags:
  - Version
---

# ECMAScript Version

- ECMAScript 2015 之后改为年度版本，通常在每年 6 月左右批准并发布。
- TC39 proposal 达到 Stage 4 后会进入规范草案，并按 Expected Publication Year 进入某个年度版本。

| Version | Official Name                       | Date | Description                  |
| ------- | ----------------------------------- | ---- | ---------------------------- |
|         | JavaScript 1.0                      | 1995 | by Brendan Eich              |
| ES1     | ECMAScript 1                        | 1997 | ECMA-262                     |
| ES2     | ECMAScript 2                        | 1998 |                              |
| ES3     | ECMAScript 3                        | 1999 |                              |
| ES4     | ECMAScript 4                        |      | 未发布                       |
| ES5     | [ECMAScript 5](#ecmascript-5)       | 2009 |                              |
| ES6     | [ECMAScript 2015](#ecmascript-2015) | 2015 |                              |
| ES2016  | [ECMAScript 2016](#ecmascript-2016) | 2016 |                              |
| ES2017  | [ECMAScript 2017](#ecmascript-2017) | 2017 |                              |
| ES2018  | [ECMAScript 2018](#ecmascript-2018) | 2018 |                              |
| ES2019  | [ECMAScript 2019](#ecmascript-2019) | 2019 |                              |
| ES2020  | [ECMAScript 2020](#ecmascript-2020) | 2020 |                              |
| ES2021  | [ECMAScript 2021](#ecmascript-2021) | 2021 |                              |
| ES2022  | [ECMAScript 2022](#ecmascript-2022) | 2022 |                              |
| ES2023  | [ECMAScript 2023](#ecmascript-2023) | 2023 |                              |
| ES2024  | [ECMAScript 2024](#ecmascript-2024) | 2024 |                              |
| ES2025  | [ECMAScript 2025](#ecmascript-2025) | 2025 | Stage 4 proposals for 2025   |
| ES2026  | [ECMAScript 2026](#ecmascript-2026) | 2026 | draft / expected publication |
| ES.Next | [Next](#next)                       |      | 下一个版本                   |

## Runtime Target

| Runtime | Ver | Notes                         |
| ------- | --------- | ----------------------------- |
| Node 24 | ES2024    | `nodenext` / TS 5.9+ `node20` |
| Node 22 | ES2023    | `nodenext` / TS 5.9+ `node20` |
| Node 20 | ES2023    | `nodenext` / TS 5.9+ `node20` |
| Node 18 | ES2022    | `node16`                      |
| Node 16 | ES2021    | `node16` / `nodenext`         |
| Node 14 | ES2020    | old LTS                       |
| Node 12 | ES2019    | EOL                           |
| Node 10 | ES2018    | EOL                           |
| Node 8  | ES2017    | EOL                           |

- https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping
- Node 20/22/24 的实际 feature 支持高于 baseline 时很常见，最终仍以运行时/V8 版本和兼容表为准。

:::tip

- 今年达到 Stage 4 的 proposal，通常发布到下一年年度版本，因此 proposal 进入标准和版本号会相差一段时间。
- TypeScript 的 `target` 主要影响语法降级与 helper emit，`lib` 影响类型定义；两者不等价于运行时 polyfill。

:::

## TC39 Process

| stage     | for           | note                       |
| --------- | ------------- | -------------------------- |
| stage 0   | Strawperson   | 初步想法                   |
| stage 1   | Proposal      | 明确问题、用例、Champion   |
| stage 2   | Draft         | 规范草案方向基本明确       |
| stage 2.7 | Draft + tests | 需要测试与实现反馈         |
| stage 3   | Candidate     | 实现、等待用户使用反馈     |
| stage 4   | Finished      | 准备添加到 ECMAScript 标准 |

| proposal                     | stage     | expected | note                      |
| ---------------------------- | --------- | -------- | ------------------------- |
| [temporal]                   | stage 4   | 2027     | 替代 Date                 |
| Explicit Resource Management | stage 4   | 2027     | `using` / dispose         |
| [decorators]                 | stage 2.7 |          | TS 5.0 已支持新版语义     |
| [decorator-metadata]         | stage 2.7 |          | TS 5.2 metadata           |
| [shadowrealm]                | stage 2.7 |          | isolate realm             |
| [async-context]              | stage 2   |          | async context propagation |
| [record-tuple]               | inactive  |          | 不可变值类型，当前非活跃  |
| [binary-ast]                 | inactive  |          | 当前非活跃                |

[async-context]: https://github.com/tc39/proposal-async-context
[record-tuple]: https://github.com/tc39/proposal-record-tuple
[decorators]: https://github.com/tc39/proposal-decorators
[decorator-metadata]: https://github.com/tc39/proposal-decorator-metadata
[binary-ast]: https://github.com/tc39/proposal-binary-ast
[temporal]: https://github.com/tc39/proposal-temporal
[shadowrealm]: https://github.com/tc39/proposal-shadowrealm
[set-methods]: https://github.com/tc39/proposal-set-methods

:::tip 👀

- 近期已经进入或即将进入年度标准的重点：
  - ES2025: Iterator Helpers、Set methods、Import Attributes、JSON Modules、RegExp.escape、Promise.try、Float16。
  - ES2026: Array.fromAsync、JSON.parse source text access、Uint8Array Base64/Hex、Math.sumPrecise、Error.isError、Map/WeakMap upsert、Iterator.concat。
  - ES2027 expected: Temporal、Explicit Resource Management、Atomics.pause、Joint Iteration。
- Stage 3 / 2.7 仍需要关注实现差异：Decorators、ShadowRealm、Source Phase Imports、Import Text、Deferring Module Evaluation、iterator chunking/includes/join。
- [modules-import-hooks-refactor](https://github.com/nicolo-ribaudo/modules-import-hooks-refactor)
  - stage 1
  - import 过程可控
- [Function.memo](https://github.com/tc39/proposal-function-memo)

:::

| syntax  | Chrome   | Name                          | Note       |
| ------- | -------- | ----------------------------- | ---------- |
| `?.`    | Chrome80 | Optional chaining             | ES2020     |
| `??`    | Chrome80 | Nullish coalescing operator   | ES2020     |
| `??=`   | Chrome85 | Nullish coalescing assignment | ES2021     |
| `#name` | Chrome74 | Private class fields          | ES2022     |
| `using` |          | Explicit Resource Management  | ES2027 exp |

| feat       | Version            | note   |
| ---------- | ------------------ | ------ |
| globalThis | Chrome71, NodeJS12 | ES2020 |

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
  - Inactive/Withdrawn Proposals
- [ECMAScript Language Specification](https://tc39.es/ecma262/)
- 参考
  - [tc39/agendas](https://github.com/tc39/agendas)
  - [finished-proposals](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md)
  - [active proposals](https://github.com/tc39/proposals/blob/HEAD/README.md)
  - https://caniuse.com/#search=es6
  - [compat-table](https://compat-table.github.io/compat-table/)
    - [2016+](https://kangax.github.io/compat-table/es2016plus/)
  - https://en.wikipedia.org/wiki/ECMAScript
  - https://www.proposals.es/
  - https://polyfill-fastly.io/
  - https://webstatus.dev/

## Next

- Temporal - ES2027 expected
  - `Temporal.PlainDate`
  - `Temporal.PlainTime`
  - `Temporal.PlainMonthDay`
  - `Temporal.PlainYearMonth`
  - [fullcalendar/temporal-polyfill](https://github.com/fullcalendar/temporal-polyfill)
    - `import 'temporal-polyfill/global';`
    - 部分实现，约 20kb
  - [js-temporal/temporal-polyfill](https://github.com/js-temporal/temporal-polyfill)
    - 没有 global
    - 完整实现，更大，约 56+kb
- Explicit Resource Management - ES2027 expected
  - `Symbol.dispose`
  - `Symbol.asyncDispose`
  - `DisposableStack`
  - `AsyncDisposableStack`
  - `SuppressedError`
  - `using` / `await using`
- Atomics.pause - ES2027 expected
- Joint Iteration - ES2027 expected

```ts
const date = new Temporal.PlainDate(2024, 5, 1);
const time = new Temporal.PlainTime(10, 30);
const md = new Temporal.PlainMonthDay(5, 1);
const ym = new Temporal.PlainYearMonth(2024, 5);
```

```js
using file = openFile();
await using conn = await openConnection();
```

## ECMAScript 2026

- 当前为 draft / Expected Publication Year 2026；最终以 TC39 finished proposals 和 ECMA-262 发布版本为准。
- Upsert
  - `Map.prototype.getOrInsert`
  - `Map.prototype.getOrInsertComputed`
  - `WeakMap.prototype.getOrInsert`
  - `WeakMap.prototype.getOrInsertComputed`
- JSON.parse source text access
  - reviver 增加 context，可访问原始 source text
  - 适合恢复大整数、精确 decimal、保留原始 token 信息
- Iterator Sequencing
  - `Iterator.concat(...)`
  - 把多个 iterable/iterator 串接成一个 iterator
- Uint8Array to/from Base64 and Hex
  - `Uint8Array.fromBase64`
  - `Uint8Array.prototype.toBase64`
  - `Uint8Array.prototype.setFromBase64`
  - `Uint8Array.fromHex`
  - `Uint8Array.prototype.toHex`
  - `Uint8Array.prototype.setFromHex`
- `Math.sumPrecise`
  - 对 iterable number 做更精确求和
  - 类似 Python `math.fsum`
- `Error.isError`
  - 比 `instanceof Error` 更适合跨 realm 判断
- `Array.fromAsync`
  - 从 async iterable 或 iterable of promises 创建 Array

```js
// Upsert
const groups = new Map();
groups.getOrInsertComputed('a', () => []).push(1);

// JSON.parse source text access
const id = JSON.parse('9007199254740993', (key, value, context) => {
  return key === '' ? BigInt(context.source) : value;
});

// Iterator sequencing
const it = Iterator.concat([1, 2], new Set([3, 4]));

// Base64 / Hex
const bytes = Uint8Array.fromBase64('aGVsbG8=');
bytes.toBase64();
bytes.toHex();

// Precise sum
Math.sumPrecise([0.1, 0.2, -0.3]);

// Cross-realm friendly Error check
Error.isError(new TypeError('bad'));

// Async iterable to Array
const arr = await Array.fromAsync(fetchPages());
```

---

- https://github.com/tc39/proposal-upsert
- https://github.com/tc39/proposal-json-parse-with-source
- https://github.com/tc39/proposal-iterator-sequencing
- https://github.com/tc39/proposal-arraybuffer-base64
- https://github.com/tc39/proposal-math-sum
- https://github.com/tc39/proposal-is-error
- https://github.com/tc39/proposal-array-from-async

## ECMAScript 2025

- RegExp duplicate named capture groups
  - 支持在互斥 alternatives 中复用捕获组名
- RegExp Pattern Modifiers
  - 支持调整 modifiers - `/^a(?i:a)(?-i:a)/`
  - 当前主要面向 `i`, `m`, `s` 等可局部修改 flag；`x` 依赖另一个 proposal
- RegExp.escape
  - 把任意字符串转为可安全嵌入 RegExp pattern 的文本
- Set 方法扩展
  - `intersection`, `union`, `difference`, `symmetricDifference`
  - `isDisjointFrom`, `isSubsetOf`, `isSupersetOf`
- Iterator 方法扩展
  - 新增全局 `Iterator` 对象
  - `Iterator.from`
  - `Iterator.prototype.{drop,every,filter,find,flatMap,forEach,map,reduce,some,take,toArray}`
  - [tc39/proposal-iterator-helpers](https://github.com/tc39/proposal-iterator-helpers)
- Promise.try
- Import Attributes
  - `import data from './data.json' with { type: 'json' }`
  - 替代早期 Import Assertions `assert { type: 'json' }`
- JSON Modules
- Float16
  - `Float16Array`
  - `DataView.prototype.getFloat16`
  - `DataView.prototype.setFloat16`
  - `Math.f16round`
- Redeclarable global `eval`-introduced `var`s
  - 语义修正，通常不是业务代码直接使用的功能

```js
// RegExp.escape
const re = new RegExp(`^${RegExp.escape(userInput)}$`);

// Duplicate named capture groups in disjoint alternatives
const date = /(?<year>\d{4})-\d{2}|\d{2}-(?<year>\d{4})/;

// Pattern modifiers
/^a(?i:a)(?-i:a)/.test('aAa');

// Set methods
const both = new Set([1, 2]).intersection(new Set([2, 3]));

// Iterator helpers
Iterator.from([1, 2, 3])
  .map((x) => x * 2)
  .filter((x) => x > 2)
  .toArray();

// Promise.try
Promise.try(() => maybeThrows());

// Import Attributes / JSON Modules
import data from './data.json' with { type: 'json' };

// Float16
const values = new Float16Array([1.5, Math.f16round(1 / 3)]);
```

---

- https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md
- https://github.com/tc39/proposal-regex-escaping
- https://github.com/tc39/proposal-duplicate-named-capturing-groups
- https://github.com/tc39/proposal-regexp-modifiers
- https://github.com/tc39/proposal-set-methods
- https://github.com/tc39/proposal-iterator-helpers
- https://github.com/tc39/proposal-promise-try
- https://github.com/tc39/proposal-import-attributes
- https://github.com/tc39/proposal-json-modules
- https://github.com/tc39/proposal-float16array

## ECMAScript 2024

- Promise.withResolvers
  - `const { resolve, reject, promise } = Promise.withResolvers();`
  - 类似 future
- Array Grouping
  - Object.groupBy
  - Map.groupBy
- RegExp `/v`, unicodeSets
  - `/^\p{RGI_Emoji}$/v.test('😵‍💫')`=true - Unicode string properties
  - `/^[\q{😵‍💫}]$/v.test('😵‍💫')`=true - \q for String literals
  - `/^[\p{RGI_Emoji}--\q{😵‍💫}]$/v.test('😵‍💫')`=false - 支持排除
- ArrayBuffer.prototype.{resize,transfer}
  - SharedArrayBuffers 只能 grow, 且没有 transfer, 因为不支持 transfer
- String.prototype.{isWellFormed,toWellFormed}
- Atomics.waitAsync for SharedArrayBuffer

---

- https://2ality.com/2024/06/ecmascript-2024.html

## ECMAScript 2023

- Change Array by copy - 通过复制修改数组
  - toReversed, toSorted, toSpliced, with
  - for TypedArray, Array
- Array find from last - 从后面查找数组
  - findLast, findLastIndex
- Hashbang Grammar - JS 直接作为可执行脚本
- ~~Temporal~~
- ~~`import mod from './mod.json' assert { type: 'json' }`~~

```js
#!/usr/bin/env node
```

```ts
[1, 2].with(1, 0);
```

## ECMAScript 2022

- at()
  - 支持 负数 索引
  - String.prototype.at
  - Array.prototype.at
  - TypedArray.prototype.at
- Regex `/d` - start and end of the match
- Object.hasOwn
  - `Object.prototype.hasOwnProperty.call(obj, prop)`
- Error cause
- Top-level await
- Class
  - field 定义
  - private field
  - static block

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

- Promise.any
- String.prototype.replaceAll
- WeakReferences
  - FinalizationRegistry
    - 注册 GC 回调
- 数字分隔符 - `1_2_3_4`
- Logical Assignment Operators - 逻辑赋值运算符
  - `||=`, `&&=`, `??=`

```js
String.prototype.replaceAll;

Promise.any;

// WeakRef.prototype.deref
new WeakRef(() => 1);

// Logical Assignment Operators
a ||= b;
a &&= b;
a ??= b;

// Numeric separators
1_000_000_000;
```

## ECMAScript 2020

- BigInt
  - [GoogleChromeLabs/jsbi](https://github.com/GoogleChromeLabs/jsbi)
    - pure-JavaScript implementation of BigInt
- String matchAll()
- `??` Nullish Coalescing Operator - 空值合并运算符
- `?.` Optional Chaining Operator - 可选链运算符
- Promise.allSettled
- `import()` Dynamic Import
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

- String trimStart,trimEnd
- Object fromEntries
- Optional catch binding
- Array flat, flatMap
- Array.sort - 修改为稳定排序
- JSON superset
  - U+2028 LINE SEPARATOR, U+2029 PARAGRAPH SEPARATOR
- Function.prototype.toString [revision](https://tc39.es/Function-prototype-toString-revision/)
  - 修改 Function.toString 返回完整无修改源码
- Well-formed JSON.stringify
  - 修复 JSON.stringify 处理 `\u` 的问题
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

- `**` Exponentiation Operator - 指数操作符
- Array.prototype.includes - 数组包含判断

```js
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
