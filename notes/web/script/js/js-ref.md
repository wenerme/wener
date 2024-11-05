---
tags:
  - Reference
---

# JS References

- [Decorator](./js-decorator.md)
- [Reflect](./js-reflect.md)
- [Prototype](./js-prototype.md)

## bigint

- Chrome 67+, Safari 14.1+, Node 10.4+
- 能表示 int64
- ⚠️ 不能和 number 直接运算
- clamp/截断
  - BigInt.asIntN
  - BigInt.asUintN

## Function

```js
// 检测 AsyncIterator/Generator
// next, return, throw
console.assert('next' in async function* () {}.prototype);
console.assert('next' in function* () {}.prototype);

(function* () {})[Symbol.toStringTag]; // GeneratorFunction
(async function* () {})[Symbol.toStringTag]; // AsyncGeneratorFunction
(async () => {})[Symbol.toStringTag]; // AsyncFunction
```

## Symbol

| Symbol                      | Description                          | Used by                       | Since                             |
| --------------------------- | ------------------------------------ | ----------------------------- | --------------------------------- |
| `Symbol.asyncIterator`      | 返回对象默认的异步迭代器的方法       | `for await...of`              | Chrome 63+, Safari 12+, Node 10+  |
| `Symbol.hasInstance`        | 判断对象是否为某构造函数实例的方法   | `instanceof`                  | Chrome 50+, Safari 10+, Node 6+   |
| `Symbol.isConcatSpreadable` | 指示对象是否可展开为数组元素的布尔值 | `Array.prototype.concat()`    | Chrome 38+, Safari 9+, Node 0.12+ |
| `Symbol.iterator`           | 返回对象默认迭代器的方法             | `for...of`                    | Chrome 38+, Safari 9+, Node 0.12+ |
| `Symbol.match`              | 匹配字符串的方法                     | `String.prototype.match()`    | Chrome 50+, Safari 10+, Node 6+   |
| `Symbol.matchAll`           | 返回所有匹配结果的迭代器的方法       | `String.prototype.matchAll()` | Chrome 73+, Safari 13+, Node 12+  |
| `Symbol.replace`            | 替换字符串中匹配子串的方法           | `String.prototype.replace()`  | Chrome 50+, Safari 10+, Node 6+   |
| `Symbol.search`             | 返回字符串中匹配索引的方法           | `String.prototype.search()`   | Chrome 50+, Safari 10+, Node 6+   |
| `Symbol.species`            | 用于创建派生对象的构造函数           | -                             | Chrome 51+, Safari 10+, Node 6.5+ |
| `Symbol.split`              | 拆分字符串的方法                     | `String.prototype.split()`    | Chrome 50+, Safari 10+, Node 6+   |
| `Symbol.toPrimitive`        | 将对象转换为原始值的方法             | -                             | Chrome 44+, Safari 9+, Node 0.12+ |
| `Symbol.toStringTag`        | 用于修改对象的默认描述字符串         | `Object.prototype.toString()` | Chrome 43+, Safari 9+, Node 0.12+ |
| `Symbol.unscopables`        | 定义对象属性在 `with` 环境中不可见   | -                             | Chrome 38+, Safari 9+, Node 0.12+ |

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols

### Symbol.toStringTag

- Object.prototype.toString()
- `[object ${@@toStringTag}]`
