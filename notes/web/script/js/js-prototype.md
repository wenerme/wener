---
title: JavaScript Prototype
---

# JavaScript Prototype

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
  - Reflect.getPrototypeOf()
  - Reflect.setPrototypeOf()
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
// 会调用 __proto__ 上的 c
console.log({ a: 1, b: 2, __proto__: { c: 3 } }.c);

//
const knowns = new Map([
  [Object, 'Object'],
  [Function, 'Function'],
  [Array, 'Array'],
  [Object.prototype, 'Object.prototype'],
  [Function.prototype, 'Function.prototype'],
  [Array.prototype, 'Array.prototype'],
]);
console.log(knowns.get(Object.getPrototypeOf({})));

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

// Object 没有上级继承对象
// null
Object.getPrototypeOf({}).__proto__;
// Array 的上级继承对象是 Object
Object.getPrototypeOf([]).__proto__ === Object.prototype;
Array.prototype.__proto__ === Object.prototype;

//
class Clazz1 {}
class Clazz2 extends Clazz1 {}
// 默认 constructor - 没有修改
console.assert(typeof Clazz1 === 'function');
console.assert(Clazz1.constructor === Function);
console.assert(Clazz2.constructor === Function);
console.assert(Clazz2.__proto__ === Clazz1);
console.assert(Object.getPrototypeOf(Clazz2) === Clazz1);
console.assert(Object.getPrototypeOf(Clazz1) === Function.prototype);
console.assert(new Clazz2().constructor === Clazz2);


```

- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
