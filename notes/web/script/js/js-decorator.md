---
title: Decorator
---

# Decorator

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
  // TS 5.2
  metadata?: Record<string | number | symbol, unknown>;
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
    set: (value: unknown) => void;
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
  - TS 5.0
- [proposal-decorator-metadata](github.com/tc39/proposal-decorator-metadata)
  - TS 5.2
- [typescript 5.0 decorators](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)
  - 没有 `--experimentalDecorators` flag
    - 也能用
    - 生成逻辑不同
    - 有类型检查
  - 新的逻辑不支持 `--emitDecoratorMetadata`

## Typescript legacy

```ts
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol | undefined,
  parameterIndex: number,
) => void;
```

```ts
const ExposeService = (): ClassDecorator => (target) => target;
const ExposeMethod = (): MethodDecorator => (target) => target;
const ExposeField = (): PropertyDecorator => (target) => target;

@ExposeService()
class MyService {
  @ExposeField()
  url: string = 'https://wener.me';

  @ExposeMethod()
  hello(name: string): string | undefined {
    return '';
  }
}
```

```js
'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
const ExposeService = () => (target) => target;
const ExposeMethod = () => (target) => target;
const ExposeField = () => (target) => target;
let MyService = class MyService {
  constructor() {
    this.url = 'https://wener.me';
  }
  hello(name) {
    return '';
  }
};
__decorate([ExposeField(), __metadata('design:type', String)], MyService.prototype, 'url', void 0);
__decorate(
  [
    ExposeMethod(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Object),
  ],
  MyService.prototype,
  'hello',
  null,
);
MyService = __decorate([ExposeService()], MyService);
```

- emitDecoratorMetadata
- [Playground](https://www.typescriptlang.org/play?experimentalDecorators=true&emitDecoratorMetadata=true&target=99&ts=5.2.2#code/MYewdgzgLgBAogDwA4ggUwMpoE4DcCWwaMAvDABQCUAXAMIA2AhhBACJqjaNQjYkB85KI2wBzNFEoDhYiQG4AsAChlAAUQp0WPITRVlwJixgBZAJ7aCRAN4BfZUA)

## Typescript next

```ts
const ExposeService = () => (value: any, ctx: ClassDecoratorContext) => {};
const ExposeMethod = () => (value: any, ctx: ClassMethodDecoratorContext) => {};
const ExposeField = () => (value: any, ctx: ClassFieldDecoratorContext) => {};

@ExposeService()
class MyService {
  @ExposeField()
  url: string = 'https://wener.me';

  @ExposeMethod()
  hello(name: string): string | undefined {
    return '';
  }
}
```

```js
'use strict';
var __esDecorate =
  (this && this.__esDecorate) ||
  function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function') throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target = !descriptorIn && ctor ? (contextIn['static'] ? ctor : ctor.prototype) : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done) throw new TypeError('Cannot add initializers after decoration has completed');
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor' ? { get: descriptor.get, set: descriptor.set } : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object') throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
const ExposeService = () => (value, ctx) => {};
const ExposeMethod = () => (value, ctx) => {};
const ExposeField = () => (value, ctx) => {};
let MyService = (() => {
  let _classDecorators = [ExposeService()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _url_decorators;
  let _url_initializers = [];
  let _hello_decorators;
  var MyService = class {
    static {
      _classThis = this;
    }
    constructor() {
      this.url =
        (__runInitializers(this, _instanceExtraInitializers),
        __runInitializers(this, _url_initializers, 'https://wener.me'));
    }
    static {
      const _metadata = typeof Symbol === 'function' && Symbol.metadata ? Object.create(null) : void 0;
      _url_decorators = [ExposeField()];
      _hello_decorators = [ExposeMethod()];
      __esDecorate(
        this,
        null,
        _hello_decorators,
        {
          kind: 'method',
          name: 'hello',
          static: false,
          private: false,
          access: { has: (obj) => 'hello' in obj, get: (obj) => obj.hello },
          metadata: _metadata,
        },
        null,
        _instanceExtraInitializers,
      );
      __esDecorate(
        null,
        null,
        _url_decorators,
        {
          kind: 'field',
          name: 'url',
          static: false,
          private: false,
          access: {
            has: (obj) => 'url' in obj,
            get: (obj) => obj.url,
            set: (obj, value) => {
              obj.url = value;
            },
          },
          metadata: _metadata,
        },
        _url_initializers,
        _instanceExtraInitializers,
      );
      __esDecorate(
        null,
        (_classDescriptor = { value: _classThis }),
        _classDecorators,
        { kind: 'class', name: _classThis.name, metadata: _metadata },
        null,
        _classExtraInitializers,
      );
      MyService = _classThis = _classDescriptor.value;
      if (_metadata)
        Object.defineProperty(_classThis, Symbol.metadata, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: _metadata,
        });
      __runInitializers(_classThis, _classExtraInitializers);
    }
    hello(name) {
      return '';
    }
  };
  return (MyService = _classThis);
})();
```

- https://www.typescriptlang.org/play?target=99&ts=5.2.2&ssl=15&ssc=1&pln=1&pc=1&emitDecoratorMetadata=true&experimentalDecorators=true#code/MYewdgzgLgBAogDwA4ggUwMpoE4DcCWwaMAvDABQCUJAfObgIYA2ArmgFwNgCeANMFATsAwkwYQIAETShsDKCGzDwUNAijUaAbwC+AbgCwAKFCRYiFOgCyaKAAsQAE1IVN9Zm049+gkWIk29k7SsvKKymCq6pq6hibg0PDIqGgAYvhoTM5kVLTurBxcfAJCouIQ6ZmOIYphSipqGrSxxsYAAhYpWHiEaFTGwP4QMFbc3QREWsYwMzAdyeiVWf1GszAs2Ezs0Nj4YADmLgDkdlBQSBDsAPRXAO5oYDgAdAC2aEetq7PzlmiBDo4Vms7JkmCByGAGG9tlBdgdKDC4fsAD4sMCONAAMz2aEcUy+axm2FsGzAMCOHwJMB0xhpRiAA
