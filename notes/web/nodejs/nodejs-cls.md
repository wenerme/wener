---
title: NodeJS CLS
---

# NodeJS CLS

- Continuation Local Storage - 连续本地存储
- AsyncLocalStorage - node v12.17+
  - 类似 ThreadLocal
  - getStore, setStore
  - disable
  - enterWith - 当前环境 - AsyncResource 上下文
  - run - callback 内生效
  - exit - callback 内失效
  - AsyncLocalStorage.snapshot
- AsyncResource

```ts
// ALS
// v13.10.0, v12.17.0
import { AsyncLocalStorage, AsyncResource } from 'node:async_hooks';
const asyncLocalStorage = new AsyncLocalStorage();
asyncLocalStorage.run(123, () => {
  console.log(`Store: ${asyncLocalStorage.getStore()}`);
  setImmediate(() => {
    console.log(`setImmediate Store: ${asyncLocalStorage.getStore()}`);
  });
});
```

- [async_hooks](https://github.com/nodejs/node/blob/main/doc/api/async_hooks.md) - node v8+
  - currentId()
  - triggerAsyncId()
  - executionAsyncId()
- https://nodejs.org/api/async_context.html

```ts
// node 8+
import { createHook } from 'async_hooks';
const hook = createHook({
  init: (asyncId, type, triggerId, resource) => {},
  before: (asyncId) => {},
  after: (asyncId) => {},
  destroy: (asyncId) => {},
});
hook.enable();
```

- [@fastify/request-context](https://github.com/fastify/fastify-request-context)
  - asynchronous-local-storage
  - async_hooks
    - `new AsyncResource('fastify-request-context')`
  - onRequest - 包装运行环境
    - als.runWith
      - AsyncResource.runInAsyncScope(done,req,raw)

```ts
const { als } = require('asynchronous-local-storage');
const requestContext = {
  get: als.get,
  set: als.set,
};
```

- https://sequelize.org/docs/v7/other-topics/transactions
  - `const namespace = cls.createNamespace('sequelize-tx');`
  - [useCLS](https://github.com/sequelize/sequelize/blob/fdd713172748a6c86b656500df2aed8cba096492/src/sequelize.js#L1147-L1158)
    - get, set, bind, run
    - `bind(fn,context): ()=>any`
  - prepareEnvironment
    - 开启事务
    - `this.sequelize.Sequelize._cls.set('transaction', this);`
- [asynchronous-local-storage](https://github.com/kibertoad/asynchronous-local-storage)
  - Node.js ALS with fallback to cls-hooked
- [cls-hooked](https://github.com/Jeff-Lewis/cls-hooked)
  - node 4.7+ - async-hook-jl
  - node 8+ - async_hooks
  - fork 自 continuation-local-storage
- [continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage)


```ts
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-very-own-namespace');
```
