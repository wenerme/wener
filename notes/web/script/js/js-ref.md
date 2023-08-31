---
tags:
  - Reference
---

# JS References

## Decorator

:::caution

- 动态类不支持 Decorator 语法, 依赖代码生成

:::

```js
type Decorator = (value: Input, context: {
  kind: string;
  name: string | symbol;
  access: {
    get?(): unknown;
    set?(value: unknown): void;
  };
  private?: boolean;
  static?: boolean;
  addInitializer?(initializer: () => void): void;
}) => Output | void;

type ClassMethodDecorator = (value: Function, context: {
  kind: "method";
  name: string | symbol;
  access: { get(): unknown };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}) => Function | void;

type ClassGetterDecorator = (value: Function, context: {
  kind: "getter";
  name: string | symbol;
  access: { get(): unknown };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}) => Function | void;

type ClassSetterDecorator = (value: Function, context: {
  kind: "setter";
  name: string | symbol;
  access: { set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}) => Function | void;

type ClassFieldDecorator = (value: undefined, context: {
  kind: "field";
  name: string | symbol;
  access: { get(): unknown, set(value: unknown): void };
  static: boolean;
  private: boolean;
}) => (initialValue: unknown) => unknown | void;

type ClassDecorator = (value: Function, context: {
  kind: "class";
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}) => Function | void;

type ClassAutoAccessorDecorator = (
  value: {
    get: () => unknown;
    set(value: unknown) => void;
  },
  context: {
    kind: "accessor";
    name: string | symbol;
    access: { get(): unknown, set(value: unknown): void };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => {
  get?: () => unknown;
  set?: (value: unknown) => void;
  init?: (initialValue: unknown) => unknown;
} | void;
```

- kind
  - class
  - method
  - getter
  - setter
  - field
  - accessor
- `Symbol.annotations`
- [proposal-decorators](https://github.com/tc39/proposal-decorators)
- [typescript 5.0 decorators](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)
  - 没有 `--experimentalDecorators` flag
    - 也能用
    - 生成逻辑不同
    - 有类型检查
  - 新的逻辑不支持 `--emitDecoratorMetadata`

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
