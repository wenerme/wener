---
tags:
  - Reference
---

# JS References

- [Decorator](./js-decorator.md)
- [Reflect](./js-reflect.md)

## prototype

- `__proto__` vs `prototype` vs `constructor` vs `class`
- `__proto__`
  - 决定了对象继承关系
  - 通常显示为 `[[Prototype]]`
  - `Object.getPrototypeOf()`
  - `Object.setPrototypeOf()`
  - `Object.create(__proto__)`
  - 对象初始化时 `{__proto__:{}}` 的写法是 推荐的、标准化的、优化了的
  - 当访问一个对象的属性时,如果这个实例上没有找到,就会查找 `__proto__` 指向的原型对象上是否有该属性
  - `Object.prototype.__proto__ `
    - **不是标准**
    - ~~已弃用~~
- `constructor`
  - 与 `__proto__` 一样定义继承关系
  - 很快、引擎有优化
- `class`
  - 定义继承关系
  - 可读性更高
  - 支持私有属性
- `prototype`
  - 定义了继承内容

```js
// 输出 3
console.log({ a: 1, b: 2, __proto__: { c: 3 } }.c);
// true
Object.getPrototypeOf({}) === Object.prototype;
Object.getPrototypeOf([]) === Array.prototype;
Object.getPrototypeOf(/a/) === RegExp.prototype;

function Constructor() {}
// ---> Constructor.prototype ---> Object.prototype ---> null
Object.getPrototypeOf(new Constructor()) === Constructor.prototype;

// 不要这样做
// monkey patching
Array.prototype.myMethod = function () {};
```

- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
