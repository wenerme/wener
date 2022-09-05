---
title: SystemJS
---

# SystemJS

- [systemjs/systemjs](https://github.com/systemjs/systemjs)
  - 代码控制的模块环境
  - 辅助实现微前端
  - 辅助实现 前端 动态模块化
  - ESM 不受控 - 只能 all in
- extras
  - amd
  - dynamic-import-maps
    - 监听 document 的 addedNodes
    - 然后调用 System.prepareImport(true)
    - spec https://github.com/guybedford/import-maps-extensions#lazy-loading-of-import-maps
  - module-types - json, css, wasm
  - named-register
  - global
- system.js - includes: global, module-types, registry
- s.js
- 参考
  - [systemjs/systemjs-examples](https://github.com/systemjs/systemjs-examples)
  - [Extras](https://github.com/systemjs/systemjs#extras)
  - [generator.jspm.io](https://generator.jspm.io/)
    - jspm 支持动态 transpile
      - https://ga.system.jspm.io/npm:@heroicons/react@2.0.8/24/outline/esm/index.js
    - [React ENV](https://generator.jspm.io/#M2VhYGCzD80rySzJSU1hKEpNTC7RTcnPdTA01zPQM4IKFOWXlqQWgcXNgMKGEGEUNVCOflZxhW5RKdC83FSGqtLiksS8FAdjPTM9E1SeflliXmZOTiIArVqpj4AA)
  - https://single-spa.js.org/docs/recommended-setup/#systemjs
  - https://rollupjs.org/repl/
    - Repl 可查看转译后的 systemjs 逻辑
  - https://github.com/esm-bundle
    - 提供大多无 esm 的包 - 也包含 systemjs

:::caution

- esbuild 不支持 systemjs, rollup 支持的最好, swc 支持 systemjs 但还有问题
- 目前没有 transpile esm 逻辑
  - https://github.com/guybedford/es-module-shims/issues/79
- [#2013](https://github.com/systemjs/systemjs/issues/2013)
  不支持 ESM
- [#1971](https://github.com/systemjs/systemjs/issues/1971)
  目前热重载支持不好
- [#2064](https://github.com/systemjs/systemjs/issues/2064) - Interop problem: UMD module import default from System.register module
  - UMD 的 default 引入有问题
  - `import Icon from '@ant-design/icons'` 实际应该取 `Icon.default`
  - 参考 [react-microfrontends/api#1](https://github.com/react-microfrontends/api/issues/1)
    - webpack 4.x 有这个问题
- type:script 引起的一些问题
  https://github.com/systemjs/systemjs/pull/2246
  https://github.com/systemjs/systemjs/issues/2420
- set async/on-demand import [#2422](https://github.com/systemjs/systemjs/issues/2422)

:::

```bash
npm add systemjs
npx typesync
```

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "react": "./react.js"
    }
  }
</script>
<!-- 触发 import -->
<script type="systemjs-module" src="import:react"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
```

```ts
// 注意顺序
import 'systemjs/dist/system';
import 'systemjs/dist/extras/dynamic-import-maps';
import 'systemjs/dist/extras/module-types';
import 'systemjs/dist/extras/named-register';

// 全局
export function getModuleSystem() {
  return (globalThis as any)['System'] as ModuleSystem;
}

export type ModuleSystem = typeof System;

// 新的 System 实例
const clonedSystem = new System.constructor();
```

:::tip

- 只有 import 和 resolve 支持 bare specifier, 其他都需要 resolve
- bare specifier -> `react`
  - import map 可将 bare specifier 映射为其他 - 例如: `systemjs:react`, `builtin:react`, `/react`
  - resolve 根据映射后的逻辑进行解析

:::

```ts
const System: {
  import: System.ImportFn;

  /**
   * Inserts a new module into the SystemJS module registry. The System.register format is
   * the underlying implementation that allows for ESM emulation.
   * See https://github.com/systemjs/systemjs/blob/master/docs/system-register.md for more details.
   * Register may be called with a name argument if you are using the named-register extra. (See
   * https://github.com/systemjs/systemjs#extras).
   */
  register(dependencies: string[], declare: System.DeclareFn): void;
  register(name: string, dependencies: string[], declare: System.DeclareFn): void;

  // moduleId -> 完整 URL
  // moduleId 不存在会异常
  resolve(moduleId: string, parentUrl?: string): string;

  // System.delete(System.resolve('react'))
  // 返回的函数可用于 re-importing - 重新绑定所有 exports
  delete(moduleId: string): false | System.UpdateModuleFn;

  // System.get(System.resolve('react'))
  get(moduleId: string): System.Module | null;
  get<T>(moduleId: string): T | null;

  // System.has(System.resolve('react'))
  has(moduleId: string): boolean;

  // System.set(System.resolve('react'), window.React)
  set(moduleId: string, module: System.Module): void;

  // Object.fromEntries(System.entries())
  entries(): Iterable<[string, System.Module]>;
};
```

## Hook

```ts
const existingHook = System.constructor.prototype.hookName;
System.constructor.prototype.hookName = function (args) {
  return Promise.resolve(existingHook.call(this, args)).then(function (existingHookResult) {
    // custom hook here
    return;
  });
};
```

# FAQ

## 使用现有环境

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "react": "builtin:react",
      "react/jsx-runtime": "builtin:react/jsx-runtime",
      "react-dom": "builtin:react-dom",
      "react-dom/client": "builtin:react-dom/client"
    }
  }
</script>
<script src="system.js"></script>
<script>
  System.set(System.resolve('react'), window.React);
</script>
```

```js
// 复用 Module
System.set(System.resolve('react'), await import('react'));
System.set(System.resolve('react/jsx-runtime'), await import('react/jsx-runtime'));
System.set(System.resolve('react-dom'), await import('react-dom'));
System.set(System.resolve('react-dom/client'), await import('react-dom/client'));

// 复用全局
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
