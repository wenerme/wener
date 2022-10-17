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

**应用状态**

| state               | for                               |
| ------------------- | --------------------------------- |
| NOT_LOADED          | 还未加载                          |
| LOADING_SOURCE_CODE | 加载源码                          |
| NOT_BOOTSTRAPPED    | 已加载源码，未启动                |
| BOOTSTRAPPING       | 启动中                            |
| NOT_MOUNTED         | 启动，未挂载                      |
| MOUNTING            | 挂载中                            |
| MOUNTED             | 已挂载                            |
| UPDATING            |
| UNMOUNTING          |
| UNLOADING           |
| LOAD_ERROR          | 源码加载失败                      |
| SKIP_BECAUSE_BROKEN | load,bootstrap,mount,unmount 异常 |

- [src/applications/app.helpers.js#L4-L15](https://github.com/single-spa/single-spa/blob/80682e10ec929644d7a50280ea0d43675d31ee56/src/applications/app.helpers.js#L4-L15)
