---
title: ESM
---

# ESM

| Can I Use                                                       | Chrome      | Safari       |
| --------------------------------------------------------------- | ----------- | ------------ |
| [module](https://caniuse.com/es6-module)                        | Chrome v61+ |
| [dynamic-import](https://caniuse.com/es6-module-dynamic-import) | Chrome 63+  | Safari 11.1+ |
| [import-maps](https://caniuse.com/import-maps)                  | Chrome 89+  |

- [CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)
  - 动态构建样式表
  - 不支持 @import
- Arbitrary module namespace identifier names https://github.com/tc39/ecma262/pull/2154
- Abstract Module Record https://tc39.es/ecma262/#sec-abstract-module-records
  - link, evaluate, getExportedNames, resolveExport
- 参考
  - https://rollupjs.org/repl
    - 查看 ESM 在 amd, cs, iife, umd, systemjs 之间是如何转换的
    - assert type [rollup#3799](https://github.com/rollup/rollup/issues/3799)
- asert type - https://github.com/tc39/proposal-import-assertions
  - css, json, javascript, webassembly
  - `import("foo.json", { assert: { type: "json" } })`
  - `export { val } from './foo.js' assert { type: "javascript" };`
  - `<script src="foo.wasm" type="module" asserttype="webassembly"></script>`
- [CSS Modules V1 Explainer](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/css-modules-v1-explainer.md)
  - CSS module scripts
    - Chrome 93 - https://chromestatus.com/feature/5948572598009856
- [JSON Module](https://github.com/tc39/proposal-json-modules)
  - Chrome 91 - https://chromestatus.com/feature/5749863620804608

:::caution

- react 没有 esm
  - `import React from "https://esm.sh/react@17"`
- electron 不支持 esm [#21457](https://github.com/electron/electron/issues/21457)

:::

:::tip

- Node 支持 HTTPS import
  - --experimental-loader [nodejs/node#36328](https://github.com/nodejs/node/pull/36328)
- NextJS 支持 - [URL Imports](https://nextjs.org/docs/api-reference/next.config.js/url-imports)

:::

```ts
// reexport default
export {default /* …, */} from 'module-name';

// import 为一个 Module
import * as Reaction from '@wener/reaction'
// 模块 reexport
export * from '@wener/reaction'

import 'data:text/javascript,console.log("hello!");';
import _ from 'data:application/json,"world!"' assert {type: 'json'};

import fs from 'node:fs/promises';

// dyanmic import json
const pkgJsonModule = await import('https://cdn.jsdelivr.net/npm/@wener/reaction@latest/package.json', {assert: {type: 'json'}});
// 通过 toStringTag 判断是否为 Module
console.assert(pkgJsonModule[Symbol.toStringTag] === 'Modoule')
cons {default:{version}} = pkgJsonModule
console.log(version)

// CSS Module
import styles from "./styles.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];
```

- MIME
  - text/javascript
  - application/json
  - application/wasm
- Protocol
  - node:
  - http:
  - https:
- import.meta.url
- `import.meta.resolve(specifier[, parent])`
  - `await import.meta.resolve('./dep', import.meta.url)`
- import.meta.env
  - MODE,BASE_URL,PROD,DEV,SSR - ViteJS
- import.meta
  - tsconfig.json 需要定义 target 为 esnext

---

- [guybedford/es-module-shims](https://github.com/guybedford/es-module-shims)
  - [guybedford/es-module-lexer](https://github.com/guybedford/es-module-lexer)
    shim 时 wasm 快速分析 js 内 import
  - 支持 importmap 的浏览器会更快
- [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

```html
<!--
  JSPM Generator Import Map
  Edit URL: https://generator.jspm.io/#U2NhYGBkDM0rySzJSU1hKEpNTC5xMLTQM9QzAADeRmOTGwA
-->
<script type="importmap">
  {
    "imports": {
      "react": "https://ga.jspm.io/npm:react@18.1.0/index.js"
    }
  }
</script>

<!-- ES Module Shims: Import maps polyfill for modules browsers without import maps support (all except Chrome 89+) -->
<script
  async
  src="https://ga.jspm.io/npm:es-module-shims@1.5.1/dist/es-module-shims.js"
  crossorigin="anonymous"
></script>
```

## import map

- Chrome v89+
- https://github.com/wicg/import-maps
  - [polyfills and tooling](https://github.com/wicg/import-maps#community-polyfills-and-tooling)
- https://modern-web.dev/docs/dev-server/plugins/import-maps/

:::tip

- 目前只支持 web - 不支持 worker
- 可通过脚本动态构建 element
- 只能映射为本地

:::

```html
<script type="importmap">
  {
    "imports": {
      "moment": "/node_modules/moment/src/moment.js",
      "lodash": "/node_modules/lodash-es/lodash.js"
    }
  }
</script>
<!-- application/importmap+json -->
<script type="importmap" src="import-map.importmap"></script>
```

```html title="动态构建"
<script>
  if (HTMLScriptElement.supports && HTMLScriptElement.supports('importmap')) {
    console.log('Your browser supports import maps.');
  }

  const importMap = {
    imports: {
      moment: '/moment.mjs',
      lodash: someFeatureDetection() ? '/lodash.mjs' : '/lodash-legacy-browsers.mjs',
    },
  };

  const im = document.createElement('script');
  im.type = 'importmap';
  im.textContent = JSON.stringify(importMap);
  document.currentScript.after(im);
</script>

<script type="module">
  import _ from 'lodash'; // will fetch the right URL for this browser
</script>
```

```json title="importmap 规范"
{
  "imports": {
    // import moment from "moment";
    "moment": "/node_modules/moment/src/moment.js",
    // 自动映射
    // import localeData from "moment/locale/zh-cn.js";
    "moment/": "/node_modules/moment/src/",
    "lodash": "/node_modules/lodash-es/lodash.js",
    // import fp from "lodash/fp.js";
    "lodash/": "/node_modules/lodash-es/",
    // 无扩展名
    // import fp from "lodash/fp"
    "lodash/fp": "/node_modules/lodash-es/fp.js",

    // remapping - 对 <script> 不生效
    "https://www.unpkg.com/vue/dist/vue.runtime.esm.js": "/node_modules/vue/dist/vue.runtime.esm.js",
    // 前缀 remmaping
    "https://www.unpkg.com/vue/": "/node_modules/vue/",
    "/app/helpers.mjs": "/app/helpers/index.mjs",

    // 常见处理 hash 场景
    "/js/app.mjs": "/js/app-8e0d62a03.mjs"
  },
  // 限定上下文，修改依赖
  "scopes": {
    "/scope2/": {
      "a": "/a-2.mjs"
    },
    "/scope2/scope3/": {
      "b": "/b-3.mjs"
    }
  }
}
```

## CDN

| cdn      | import                            | github           | cjs -> esm |
| -------- | --------------------------------- | ---------------- | ---------- |
| Skypack  | https://cdn.skypack.dev/          |                  | ✅         |
| [esm.sh] | https://esm.sh/                   | [esm-dev/esm.sh] | ✅         |
| jsDelivr | https://cdn.jsdelivr.net/npm/     |                  | ❌         |
| JSPM     | https://ga.jspm.io/npm:pkg@x.y.z/ | [jspm/project]   | ❌         |
| unpkg    | https://unpkg.com/${PKG}?module   | [mjackson/unpkg] | ❌         |

[esm.sh]: https://esm.sh/
[esm-dev/esm.sh]: https://github.com/esm-dev/esm.sh
[jspm/project]: https://github.com/jspm/project
[mjackson/unpkg]: https://github.com/mjackson/unpkg

- JSPM
  - **支持 systemjs**
- jsdelivr 提供 esm.run 别名
  - https://esm.run/react -> https://cdn.jsdelivr.net/npm/react/+esm

### CDN Test

- https://esm.run/react@17 -> https://cdn.jsdelivr.net/npm/react@17/+esm - 依然是 CJS

```bash
for i in $(seq 3); do

  rm bench-*.txt
  for i in $(seq 10); do
    curl -o /dev/null -s -w "%{time_total}\n" https://cdn.skypack.dev/react@17 >> bench-a.txt
    curl -o /dev/null -s -w "%{time_total}\n" https://cdn.jsdelivr.net/npm/react@17/+esm >> bench-b.txt
    curl -o /dev/null -s -w "%{time_total}\n" https://esm.sh/react@17 >> bench-c.txt
  done
  for i in bench-*.txt; do
    echo $i
    awk '{ total += $1; count++ } END { print total/count }' $i
  done

done
```

## esm.sh

- 可以 Selfhosted
- 主服务器在 HK
- 基于 esbuild 构建
- cjs -> esm 使用 swc
- 支持 X-Typescript-Types 头 - demo 类型检测
  - `?no-check` 禁用

```js
import React from 'https://esm.sh/react@17';
// 非模块文件
import 'https://esm.sh/tailwindcss/dist/tailwind.min.css';
// bundle 模式
import {Button} from 'https://esm.sh/antd?bundle';
// 开发模式
import React from 'https://esm.sh/react?dev';
// 依赖控制
import React from 'https://esm.sh/react@16.14.0';
import useSWR from 'https://esm.sh/swr?deps=react@16.14.0';
// 别名
import useSWR from 'https://esm.sh/swr?alias=react:preact/compat&deps=preact@10.5.14';
// 目标版本 - 默认基于 header 判断
import React from 'https://esm.sh/react?target=es2020';
// WebWorker
import editorWorker from '/monaco-editor/esm/vs/editor/editor.worker?worker';
const worker = new editorWorker();
```

## import json

- NodeJS v17.1+ 2021-11-09

```ts
import info from `./package.json` assert { type: `json` };

const { default: info } = await import("./package.json", {
  assert: {
    type: "json",
  },
});
```

# FAQ

## \_\_dirname is not defined in ES module scope

```js
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
```

```ts
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
```

```ts
// 新的 NodeJS 也支持 URL，可以直接 resolve
const foo = new URL('foo.js', import.meta.url);
```

## Failed to resolve module references must start with

```
Failed to resolve module specifier "app". Relative references must start with either "/", "./", or "../".
```

- https://github.com/guybedford/es-module-shims

## An import map is added after module script load was triggered.

- https://github.com/WICG/import-maps/issues/248

## process.env.NODE_ENV

- `import.meta.env.MODE`
- `__DEV__` -> `import.meta.env.DEV`
- import.meta.env.PROD

```ts
declare global {
  interface ImportMetaEnv extends Readonly<Record<string, any>> {
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
```

## Module not found: Default condition should be last one

- default 要放在最后

```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "development": "./dist/esm/wener-reaction.development.js",
      "import": "./lib/esm/index.js",
      "require": "./lib/cjs/index.js",
      "default": "./lib/esm/index.js"
    }
  }
}
```

## NextJS Cannot find module without suffix


1. 配置使用 bundle 后的文件 - 无法 tree-shake
2. 使用 mjs 后缀 - 会忽略 type:module
  - build 后的 import 也要改成带后缀
  - rollup https://github.com/framer/motion/blob/main/packages/framer-motion/rollup.config.js
    - https://unpkg.com/browse/framer-motion@7.3.2/dist/es/index.mjs
  - esbuild external 可以自己加插件 https://github.com/evanw/esbuild/issues/1505
  - [esbuild#2435](https://github.com/evanw/esbuild/issues/2435)
3. 避免 default exports

---

- @wener/reaction/lib/esm/index.js
  - import 了另外一个文件，但是没有后缀，会导致找不到
- https://github.com/vercel/next.js/issues/39375
- https://unpkg.com/browse/framer-motion@7.3.2/package.json

## require() of ES Module not supported

- type=module
