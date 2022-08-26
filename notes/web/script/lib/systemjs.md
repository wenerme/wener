---
title: SystemJS
---

# SystemJS

- [systemjs/systemjs](https://github.com/systemjs/systemjs)
  - 代码控制的模块环境
- [Extras](https://github.com/systemjs/systemjs#extras)
- [generator.jspm.io](https://generator.jspm.io/)
  - [React ENV](https://generator.jspm.io/#M2VhYGCzD80rySzJSU1hKEpNTC7RTcnPdTA01zPQM4IKFOWXlqQWgcXNgMKGEGEUNVCOflZxhW5RKdC83FSGqtLiksS8FAdjPTM9E1SeflliXmZOTiIArVqpj4AA)
- https://single-spa.js.org/docs/recommended-setup/#systemjs

:::caution

- [#2013](https://github.com/systemjs/systemjs/issues/2013)
  不支持 ESM
- [#1971](https://github.com/systemjs/systemjs/issues/1971)
  目前热重载支持不好
- [#2064](https://github.com/systemjs/systemjs/issues/2064) - Interop problem: UMD module import default from System.register module
  - UMD 的 default 引入有问题
  - `import Icon from '@ant-design/icons'` 实际应该取 `Icon.default`
  - 参考 [react-microfrontends/api#1](https://github.com/react-microfrontends/api/issues/1)
    - webpack 4.x 有这个问题

:::

```bash
npm add systemjs
npx typesync
```

# FAQ

## 使用现有环境

```js
import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';

System.set(System.resolve('react'), React);
System.set(System.resolve('react/jsx-runtime'), jsxRuntime);

System.set(System.resolve('vue'), window.Vue);
System.set(System.resolve('vue-router'), window.VueRouter);
```

## rxjs hack

```js
const originalResolve = System.resolve;

System.resolve = function (name) {
  if (name === 'rxjs/operators') {
    return 'rxjs-operators.js';
  } else {
    return originalResolve.apply(this, arguments);
  }
};

System.register('rxjs-operators.js', [], (_export) => {
  System.import('rxjs').then((rxjs) => {
    _export(rxjs.operators);
  });
  return {};
});
```
