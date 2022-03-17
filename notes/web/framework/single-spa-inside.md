---
title: inside single-spa
tags:
  - Insight
---

# 生命周期

- app 默认挂载节点
  - `single-spa-application:${appName}`
- 应用 生命周期
  - load - js 执行时
  - bootstrap
  - mount
  - unmount
  - update
  - unload
    - 调用 unloadApplication 时发生

:::tip

- single-spa 不解决 托管、构建、部署 问题
- 优先使用框架组件 （例如： React, Vue, Angular 组件） 而不是 single-spa parcels

:::

```js
singleSpa.registerApplication({
  name: 'myApp',
  app: () => import('src/myApp/main.js'),
  activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
  customProps: (name, location) => ({
    some: 'value',
  }),
});
```

```js
function bootstrap(props) {
  const {
    name, // The name of the application
    singleSpa, // The singleSpa instance
    mountParcel, // Function for manually mounting
    customProps, // Additional custom information
  } = props; // Props are given to every lifecycle
  return Promise.resolve();
}
```

- 触发时机
  - hashchange, popstate 事件
  - pushState, replaceState
  - triggerAppChange
  - checkActivityFunctions
