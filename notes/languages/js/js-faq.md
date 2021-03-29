---
title: JavaScript 常见问题
---

# JavaScript 常见问题

## Primitive vs Object

* [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
  * primitive value, primitive data type
  * 不是对象，没有方法，__不可变__
  * 7 种类型 - string, number, bigint, boolean, undefined, symbol, null
  * 除了 null 和 undefined 都有封装类型 - String, Number, BigInt, Boolean, Symbol
* Object
  * 非 Primitive
  * 集成自 Object.prototype
  * Object.create(null)
  * JS 中 __数组为对象__
* typeof
  * 会返回 function, undefined, object, string, number, boolean, bigint, symbol
  * `typeof null` 会返回 `object`

```js
// 最简单直接判断
typeof obj === 'object' && obj !== null

// 判断是否为对象 - 非 Prim
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
function isObject(obj) {
  return obj === Object(obj);
}

// 在 Object.prototype, Object.create(null) 返回 false
val instanceof Object
// null 返回 true
typeof val === 'object'
```

* 参考
  * 性能对比 [typeof vs Object()](https://jsbench.me/epk80dx8xr/1)
    * typeof 更快
