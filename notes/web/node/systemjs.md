---
title: SystemJS
---

# SystemJS

- [systemjs/systemjs](https://github.com/systemjs/systemjs)
  - 代码控制的模块环境
- [Extras](https://github.com/systemjs/systemjs#extras)
- [generator.jspm.io](https://generator.jspm.io/)


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

```js
// rxjs hack
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
