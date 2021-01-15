# 生命周期
* app 默认挂载节点
  * `single-spa-application:${appName}`

* 应用
  * bootstrap
  * mount
  * unmount
  * update?
  * unload?
    * 调用 unloadApplication 时发生

single-spa does not solve how code is hosted, built, or deployed

it is recommended to prefer framework components (i.e., React, Vue, and Angular components) over single-spa parcels

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
    name,        // The name of the application
    singleSpa,   // The singleSpa instance
    mountParcel, // Function for manually mounting
    customProps  // Additional custom information
  } = props;     // Props are given to every lifecycle
  return Promise.resolve();
}
```

single-spa will call each application's activity function under the following scenarios:

hashchange or popstate event
pushState or replaceState is called
triggerAppChange api is called on single-spa
Whenever the checkActivityFunctions method is called
