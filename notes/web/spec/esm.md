---
title: ESM
---

# ESM

- https://caniuse.com/es6-module
  - Chrome v61+
- https://caniuse.com/es6-module-dynamic-import
  - Chrome v63+
- [CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)
  - 动态构建样式表
  - 不支持 @import

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
export { default, /* …, */ } from "module-name";
```

- [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## import map

- Chrome v89+
- https://github.com/wicg/import-maps
  - [polyfills and tooling](https://github.com/wicg/import-maps#community-polyfills-and-tooling)
- https://modern-web.dev/docs/dev-server/plugins/import-maps/
- 目前只支持 web - 不支持 worker
- 可通过脚本动态构建 element

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
