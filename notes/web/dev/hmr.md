---
title: hmr
---

# hmr

- live reload - 检测到变化刷新页面
  - 通常使用一个 EventSource - SSE
  - [esbuild#802](https://github.com/evanw/esbuild/issues/802#issuecomment-819578182)
- HMR - Hot Module Replacement - Hot Module Reload
  - 强调保留状态
  - Webpack
    - [Concept](https://webpack.js.org/concepts/hot-module-replacement/)
    - [API](https://webpack.js.org/api/hot-module-replacement)
  - Vite [HMR API](https://vitejs.dev/guide/api-hmr.html)
    - 接口与 Webpack 类似但不相同
- React Fast Refresh
  - HMR 更进一步 - 组件纬度
  - 支持的 bundler
    - rn, parcel2, webpack, cra, nextjs, vite
  - 检测到变化，更新组件，re-render
  - 如果 exports 不止 react 组件，还会更新其他 import 依赖
  - prevExports
    - 上次的组件
  - https://reactnative.dev/docs/fast-refresh
  - [react-hot-loader](https://github.com/gaearon/react-hot-loader)
    - fast refresh 之前的方案

## Vite HMR

```ts
interface ImportMeta {
  // 判断当前是否为 HMR 环境
  readonly hot?: ViteHotContext;
}

type ModuleNamespace = Record<string, any> & {
  [Symbol.toStringTag]: 'Module';
};

interface ViteHotContext {
  // 持久化数据
  readonly data: any;

  // 接受新的模块 - HMR boundary
  accept(): void;
  accept(cb: (mod: ModuleNamespace | undefined) => void): void;
  accept(dep: string, cb: (mod: ModuleNamespace | undefined) => void): void;
  accept(deps: readonly string[], cb: (mods: Array<ModuleNamespace | undefined>) => void): void;

  // 销毁前回调
  dispose(cb: (data: any) => void): void;
  // 不可 HMR
  decline(): void;
  invalidate(): void;

  // vite:beforeUpdate, vite:beforeFullReload, vite:beforePrune, vite:invalidate, vite:error
  // `InferCustomEventPayload` provides types for built-in Vite events
  on<T extends string>(event: T, cb: (payload: InferCustomEventPayload<T>) => void): void;
  send<T extends string>(event: T, data?: InferCustomEventPayload<T>): void;
}
```

## react refresh

- [react/packages/react-refresh](https://github.com/facebook/react/tree/main/packages/react-refresh)
  - [react#16604](https://github.com/facebook/react/issues/16604#issuecomment-528663101)
  - `$RefreshReg$`
  - `$RefreshSig$`
- [pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- `$RefreshHelpers$`

```js
// reload
/* @refresh reset */
```
