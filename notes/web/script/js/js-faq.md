---
title: JavaScript 常见问题
tags:
  - FAQ
---

# JavaScript 常见问题

- Promise 在创建时便会请求，而不是在 then 时请求 - eager eval

## 内存泄露

- 常见场景
  1. 全局变量
  1. 闭包
  1. DOM
  1. 定时器
  1. EventListener
  1. console.log

## Membrane

- isolate two object graphs
- 影响实现的 GC 逻辑

---

- [ajvincent/es-membrane](https://github.com/ajvincent/es-membrane)
- [salesforce/observable-membrane](https://github.com/salesforce/observable-membrane)
- [privacycg/js-membranes](https://github.com/privacycg/js-membranes)
- https://tvcutsem.github.io/js-membranes
- https://tvcutsem.github.io/membranes

## tbody to array

```js
Array.prototype.map.call($0.querySelectorAll('tr'), ($tr) =>
  Array.prototype.map.call($tr.querySelectorAll('td'), ($td) => $td.innerText),
);
```

## NaN self compare

```js
const a = Number('a');
console.log(a === a); // false
```

- https://github.com/FormidableLabs/react-fast-compare/blob/d42bfe0b02de1e52023a7f94a074d356270718a7/index.js#L114
- https://eslint.org/docs/latest/rules/no-self-compare

## Primitive vs Object

- [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
  - primitive value, primitive data type
  - 不是对象，没有方法，**不可变**
  - 7 种类型 - string, number, bigint, boolean, undefined, symbol, null
  - 除了 null 和 undefined 都有封装类型 - String, Number, BigInt, Boolean, Symbol
- Object
  - 非 Primitive
  - 集成自 Object.prototype
  - Object.create(null)
  - JS 中 **数组为对象**
- typeof
  - 会返回 function, undefined, object, string, number, boolean, bigint, symbol
  - `typeof null` 会返回 `object`

```js
// 最简单直接判断
typeof obj === 'object' && obj !== null;

// 判断是否为对象 - 非 Prim
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
function isObject(obj) {
  return obj === Object(obj);
}

// 在 Object.prototype, Object.create(null) 返回 false
val instanceof Object;
// null 返回 true
typeof val === 'object';
```

- 参考
  - 性能对比 [typeof vs Object()](https://jsbench.me/epk80dx8xr/1)
    - typeof 更快

## substr vs substring

- [substr]`(startPos, newLen)`
  - 废弃
- `substring(startPos, endPos)`
  - `substr(startPos, newLen)` -> `substring(startPos, startPos+newLen)`

[substr]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
[string.prototype.substr]: https://tc39.es/ecma262/#sec-string.prototype.substr

## Performance

- [JavaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)

## TypeError: Function.prototype.toString requires that 'this' be a Function

Function.prototype.toString 方法中 this 不是函数则会异常。

## Object.create(null)

- `{}` 同 `Object.create(Object.prototype)`
  - 继承 Object
  - hasOwnProperty
  - isPrototypeOf
  - propertyIsEnumerable
  - toString/toLocaleString
  - valueOf
- `Object.create(null)` - 不继承任何方法
  - 作为 Map 使用

```ts
console.assert(!Object.create(null).hasOwnProperty); // 不存在
console.assert({}.hasOwnProperty); // 存在

String({}); // 有 toString 方法
String(Object.create(null)); // 失败 - 不可以转 string
// throws error: Cannot convert object to primitive value
```

## ArrayBuffer vs Blob

- ArrayBuffer
  - 通用数据 - 内存
  - 通过 DataView/TypedArray 可操作
- Blob
  - 类似文件 - 可能在磁盘
  - 不可变
  - 可创建 URL - `window.URL.createObjectURL()`

---

- Blob -> ArrayBuffer
  - FileReader.readAsArrayBuffer()
- ArrayBuffer -> Blob
  - `new Blob(arrayBuffer)`

## Promise.race vs Promise.any vs Promise.allS vs Promise.allSettled

> 完成/fulfilled = resolve or reject

- Promise.race
  - 任意一个 Promise 成功/resolve or 失败/reject
- Promise.any
  - 任意一个 Promise 成功
  - 所有失败返回 AggregateError
- Promise.all
  - 所有 Promise 成功
  - 一个失败则返回失败
- Promise.allSettled
  - 所有 Promise 完成/fulfilled
  - 不区分成功失败
  - 返回所有结果
  - `{status:'reject'|'resolve',reason}`

## peek Promise

- 仅获取 Promise 结果，不触发 then
- state: pending, fulfilled, rejected

---

- https://bun.sh/docs/api/utils#bun-peek

## polyfill vs ponyfill vs shim

- polyfill - 修改全局对象，提供不支持的 API
  - 实现某个 API 或功能
  - 补丁
  - 为旧浏览器提供新特性
- ponyfill - 不修改全局对象
  - 为新特性提供旧浏览器支持
  - 通过引入新库实现
  - [sindresorhus/ponyfill](https://github.com/sindresorhus/ponyfill)
- shim - 修改全局对象，提供环境和 API
  - 需要快速兼容旧环境的场景

```ts
// ponyfill
const exports = {};

// polyfill
for (const prop in exports) {
  if (Object.prototype.hasOwnProperty.call(exports, prop)) {
    Object.defineProperty(globals!, prop, {
      value: exports[prop as keyof typeof exports],
      writable: true,
      configurable: true,
    });
  }
}
```
