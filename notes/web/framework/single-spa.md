---
title: Single SPA
---

# Single SPA

- [single-spa/single-spa](https://github.com/single-spa/single-spa)
- 参考
  - [推荐设置](https://single-spa.js.org/docs/recommended-setup/)
  - [single-spa/single-spa-inspector](https://github.com/single-spa/single-spa-inspector) - 浏览器插件
  - [react-microfrontends](https://github.com/react-microfrontends)
  - [从 0 实现一个 single-spa 的前端微服务](https://juejin.im/post/5e5ca537e51d4526f16e5065)
    - 对比了 qiankun 和 single-spa

:::tip

- 建议使用单个版本框架
- 适用于跨框架 - 如果不 跨框架，建议自行封装一个简单的挂载逻辑

:::

| Topic    | 应用/application | parcel             | 工具/utility |
| -------- | ---------------- | ------------------ | ------------ |
| 路由     | ✅               | 无路由             | 无路由       |
| API      | 定义式 API       | 声明式 API         | ➖           |
| 渲染 UI  | ✅               | ✅                 | ❌           |
| 生命周期 | single-spa 管理  | 自行管理           | ❌           |
| 使用场景 | 核心构建组件     | 多个框架的时候需要 | 公共逻辑     |

## create-single-spa

- [create-single-spa](https://single-spa.js.org/docs/create-single-spa)
- `--moduleType`
  - root-config - import 路由
    - 主要用于配置 import map
      - https://www.jsdelivr.com/
      - https://unpkg.com/browse/@wener/ui/
      - https://unpkg.com/browse/react@16.13.1/
    - 基础的 systemjs 依赖
    - 可以在这里添加公共依赖 - 例如 react、react-dom
  - app-parcel - 应用 - 默认
  - util-module - 工具
- [ts-config-single-spa](https://github.com/single-spa/create-single-spa/blob/master/packages/ts-config-single-spa/tsconfig.json)
- [webpack-config-single-spa-react-ts.js](https://github.com/single-spa/create-single-spa/blob/master/packages/webpack-config-single-spa-react-ts/lib/webpack-config-single-spa-react-ts.js)

```bash
# http://localhost:9000
# 默认 importmap 是在 html 中
# 开启 importmap 开发工具
# localStorage.setItem("devtools", true);
yarn create single-spa --framework react --moduleType root-config --dir root

yarn create single-spa --framework react --dir dash
# localhost:8500
# http://single-spa-playground.org/playground/instant-test?name=@wener-dash/spa&url=8500
# 默认位置 http://localhost:8500/<OrgName>-<ProjectName>.js
# 例如 http://localhost:8500/wener-spa-dash.js
yarn start --port 8500


yarn create single-spa --framework react --moduleType util-module --dir utils \
  --packageManager yarn --typescript

# react + ts 使用的配置
# yarn add --dev webpack-config-single-spa-react-ts webpack-merge
```

## root-config

- 单个 html
- 由服务端生成即可

## index

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Root Config</title>
    <!-- 用于不支持 async/await 的浏览器 -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.5/runtime.min.js"></script> -->

    <!--
    This CSP allows any SSL-enabled host, but you should limit these directives further to increase your app's security.
    Learn more about CSP policies at https://content-security-policy.com/#directive
  -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self' https: localhost:*; script-src 'unsafe-inline' https: localhost:*; connect-src https: localhost:* ws://localhost:*; style-src 'unsafe-inline' https:; object-src 'none';"
    />
    <meta name="importmap-type" content="systemjs-importmap" />
    <!-- 全局样式 -->
    <link href="https://unpkg.com/antd/dist/antd.min.css" rel="stylesheet" />

    <!-- 公共依赖

    1. System.register (preferred when possible) - https://github.com/systemjs/systemjs/blob/master/docs/system-register.md
    2. UMD - https://github.com/umdjs/umd
    3. Global variable

    参考 https://single-spa.js.org/docs/recommended-setup#sharing-with-import-maps.
  -->
    <script type="systemjs-importmap">
      {
        "imports": {
          "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.5.0/lib/system/single-spa.min.js",
          "react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js",
          "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js",
          "antd": "https://unpkg.com/antd@4.3.5/dist/antd-with-locales.min.js"
        }
      }
    </script>

    <!-- 使用外部导入映射  -->
    <!-- <script type="systemjs-importmap" src="/importmap.json"></script> -->

    <!-- 本地开发地址 -->
    <script type="systemjs-importmap">
      {
        "imports": {
          "@wener-spa/root-config": "//localhost:9000/wener-spa-root-config.js",
          "@wener-spa/dash": "//localhost:8081/wener-spa-dash.js"
        }
      }
    </script>

    <!-- 本地开发使用 -->
    <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@1.14.6/dist/import-map-overrides.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/system.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/amd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/named-exports.js"></script>

    <!-- 生产使用
  <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@1.14.6/dist/import-map-overrides.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/system.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/amd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/named-exports.min.js"></script>
  --></head>
  <body>
    <main></main>
    <script>
      // 启动该模块
      System.import('@wener-spa/root-config');
    </script>
    <!-- 开发工具 - 测试 importmap -->
    <import-map-overrides-full show-when-local-storage="devtools" dev-libs></import-map-overrides-full>
  </body>
</html>
```

### config

```ts
import { registerApplication, start } from 'single-spa';

// 注册应用
registerApplication({
  name: '@wener-spa/dash',
  app: () => System.import('@wener-spa/dash'),
  // 前缀匹配的激活路径
  activeWhen: ['/'],
});

// 启动应用
start({
  urlRerouteOnly: true,
});
```

## parcel

### entry

```ts
import React from 'react';
import ReactDOM from 'react-dom';
// 挂载根组件
import rootComponent from './path-to-root-component.js';
// Note that SingleSpaContext is a react@16.3 (if available) context that provides the singleSpa props
import singleSpaReact, { SingleSpaContext } from 'single-spa-react';
const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  },
});
export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
```

### webpack

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'wener-spa',
    projectName: 'dash',
    webpackConfigEnv,
  });

  const config = webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
  // 添加额外的外部依赖 - 默认会添加 react、react-dom 等
  config.externals.push('antd');
  return config;
};
```

## utility

- 没有 entry

## 推荐设置

- [The Recommended Setup](https://single-spa.js.org/docs/recommended-setup/)
- [namecheap/ilc](https://github.com/namecheap/ilc) - Isomorphic Layout Compose
  - SSR 支持
  - [注册中心](https://github.com/namecheap/ilc/blob/master/docs/registry.md) - 应用、页面、配置、模板
