---
title: inversify
---

# inversify

- [inversify/InversifyJS](https://github.com/inversify/InversifyJS)
  - MIT, TS
  - ~50kB/11kB

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
