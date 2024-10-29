---
title: inversify
---

# inversify

- [inversify/InversifyJS](https://github.com/inversify/InversifyJS)
  - MIT, TS
  - ~50kB/11kB
  - Reflect.getMetadata, Map, Promise, Proxy
- Decorator
  - `@injectable()`
    - `@inject("token")`
      - `@optional()`
      - `@tagged("key", "value")`
        - 避免 AMBIGUOUS_MATCH
      - `@named("name")`
      - `@targetName("")`
    - `@unmanaged()` - 避免 BaseClass constructor 注入
    - `@multiInject("token")`
    - `@postConstruct()`
    - `@preDestroy()`
- inversify-inject-decorators
  - @lazyInject
  - @lazyInjectNamed
  - @lazyInjectTagged
  - @lazyMultiInject
- 参考
  - https://github.com/inversify/InversifyJS/blob/master/wiki/ecosystem.md
  - https://github.com/Kukkimonsuta/inversify-react

:::tip

- 推荐使用 Symbol - 也可以使用 Class/string 作为 Token

:::

```ts
const TYPES = {
  ServiceFoo: Symbol.for('ServiceFoo'),
  ServiceConf: Symbol.for('ServiceConf'),
  ServiceBar: Symbol.for('ServiceBar'),
};

@injectable()
class ServiceBar implements IServiceBar {
  private _conf: any;
  @inject(TYPES.ServiceFoo) private _foo: IServiceFoo;
  public constructor(@inject(TYPES.ServiceConf) conf: any) {
    this._conf = conf;
  }
}

//
const container = new Container();
container.bind<IServiceBar>(TYPES.ServiceBar).to(ServiceBar);
//
const bar = container.get<IServiceBar>(TYPES.ServiceBar);
// 级联
let childContainer = new Container();
childContainer.parent = parentContainer;

// 外部 Class 可手动修饰
import { decorate, injectable } from 'inversify';
decorate(injectable(), SomeClass);
```

## 核心概念

- ContainerModule
- AsyncContainerModule

```ts
// 模块
let warriors = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
  bind<Ninja>('Ninja').to(Ninja);
});
// 异步 load
let warriors = new AsyncContainerModule(async (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
  const ninja = await getNinja();
  bind<Ninja>('Ninja').toConstantValue(ninja);
});

container.load(warriors); // 加载
await container.loadAsync(warriors, weapons); // 加载异步
container.unload(warriors); // 卸载
```

## Typed Token

collocate service identifier and type

```ts
export interface IFoo {}
export namespace IFoo {
  export const $: interfaces.ServiceIdentifier<IFoo> = Symbol('IFoo');
}

class MyService {
  @inject(IFoo.$)
  private readonly foo!: IFoo;

  constructor(@inject(IFoo.$) foo: IFoo) {}
}
```
