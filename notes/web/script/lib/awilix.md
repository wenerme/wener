---
title: awilix
---

# awilix

:::tip

- Awilix is just a container
- 基于 name 进行 resolve
  - 也就是说 context 不是一个黑盒，而是完全需要感知字段名字的，类似于一个大的 context 对象
- 不依赖 decorator - 对环境依赖度低，使用实现简单
- 不支持 async - 建议 user-land 做 https://github.com/jeffijoe/awilix/issues/310#issuecomment-1375445068
- asFunction 会传入 cradle 作为参数，注意 `asFunction(createUserStore)` => `asFunction(()=>createUserStore())`

:::

- [jeffijoe/awilix](https://github.com/jeffijoe/awilix)
  - 0 依赖, 12kB
  - Proxy+Reflect - Chrome >= 49, Safari >= 10
  - 支持代理模式 - 通过访问的字段名字进行 resolve
    - 不支持异步
  - 基于名字进行 resolve
  - 支持浏览器
  - adopted by [medusa](https://github.com/medusajs/medusa)
- lifetime
  - Lifetime.TRANSIENT - **默认**
  - Lifetime.SCOPED - Container 维度 - 例如 子 container
  - Lifetime.SINGLETON
    - 缓存位置 `container.cache`
- 注入模式
  - InjectionMode.PROXY - 默认
    - 参数为代理对象，访问 field 基于名字进行 resolve
    - lazy resolve
  - InjectionMode.CLASSIC - 不推荐，除非完全不修改代码
    - 初始化成本高，但之后快
    - 不适用于需要 minify 场景
    - 通过 函数签名 检测的名字

```ts
import { RESOLVER, Lifetime, InjectionMode } from 'awilix';

export default class AwesomeService {
  constructor(awesomeRepository) {
    this.awesomeRepository = awesomeRepository;
  }
}

// 配置 scope
AwesomeService[RESOLVER] = {
  name: 'superService', // 会被 loadModules 使用作为名字
  lifetime: Lifetime.SCOPED,
  injectionMode: InjectionMode.CLASSIC,
};
```

- AwilixContainer
  - cradle - 代理对象，访问会触发 `resolve`
  - registrations - 只读内部注册信息
  - cache - 例如单例缓存
  - options - 传入参数
  - `resolve<T>(name: string, [resolveOpts: ResolveOptions]): T`
  - `register(name: string, resolver: Resolver): AwilixContainer`
  - `hasRegistration(name: string | symbol): boolean`
  - `createScope`
    - 返回子容器
  - dispose
