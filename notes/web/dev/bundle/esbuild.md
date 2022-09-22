---
title: ESBuild
---

# ESBuild

- [evanw/esbuild](https://github.com/evanw/esbuild)
  - MIT, Go
  - bundler & minifier
- used by Vite, Snowpack
- [roadmap](https://esbuild.github.io/faq/#upcoming-roadmap)
- https://esbuild.github.io/api/

:::tip

- 可用来 Bundle ESM
- 可用来 Dev 时本地使用
- 推荐生产 Rollup - Vite
- 支持 iife, esm, cjs

:::

:::info

- ES5+
- 不支持 代码切分
- 不支持 HTML, CSS
- 不支持 TLA - WIP, iife
  - `--banner:js='(async () => {' --footer:js='})()'`
  - [#253](https://github.com/evanw/esbuild/issues/253)
- 不支持 systemjs, amd
  - [#192](https://github.com/evanw/esbuild/issues/192)
- 不支持 umd - [#507](https://github.com/evanw/esbuild/issues/507)
- tsconfig.paths 不 bundled 时不会处理 [#394](https://github.com/evanw/esbuild/issues/394)
  - 写库只能用相对路径
- Support dynamic imports [#700](https://github.com/evanw/esbuild/issues/700)
  - dynamic import **不会** 被 bundle
- Support jsx automatic runtime [#334](https://github.com/evanw/esbuild/issues/334)
  - 目前必须 `import React`, 需要调整 lint 配置
  - Bundle 可考虑一次 inject https://esbuild.github.io/content-types/#jsx
  - eslint `'react/react-in-jsx-scope': 'error'`

:::

:::caution

- watch 使用 polling 实现 - 无任何操作也会消耗一点 CPU

:::

```bash
esbuild example.js --outfile=out.js
esbuild --bundle main.ts --outdir=dist --minify --sourcemap

esbuild src/modules/*/{index.tsx,manifest.json} --serve=8000 --splitting --outdir=out --format=esm --bundle --charset=utf8 --target=chrome90 --sourcemap --minify

# stdin -> stdout
echo 'export const OK = process.env.NODE_ENV === "producation"' | pnpm exec esbuild --format=esm
```

| flag                            |
| ------------------------------- | ------------------------- |
| --bundle                        | 包含所有依赖              |
| --loader:.js=jsx                | 允许 js 包含 jsx 语法     |
| --define:DEBUG=true             | 替代 DEBUG                |
| --platform=browser,node,neutral | 默认 browser              |
| --external:@strapi              | 作为外部依赖              |
| --splitting                     | 拆分 chunk - 抽取公共部分 |
| --charset=utf8                  | 避免编码                  |
| --target                        |
| --sourcemap=linked              |
| `--servedir <dir>`              |
| `--format <format>`             | iife, cjs, esm            |

- --platform
  - browser
    - 隐含: --format=iife --condition=browser --define:process.env.NODE_ENV="production" --main-fields=browser,module,main
    - 使用 package.json 中的 [browser](https://gist.github.com/defunctzombie/4339901/49493836fb873ddaa4b8a7aa0ef2352119f69211)
      - 例如: path -> path-browserify
    - main - 如果没有 browser 有 main 和 module 则会先用 main - cjs 更兼容
  - node
    - 隐含: --format=cjs --condition=node --main-fields=module,main --external=fs,url,http
    - 自动 external node 的内建 api
  - neutral
    - 隐含: --format=esm
- --minify
  - --minify-whitespace
  - --minify-identifiers
  - --minify-syntax - 移除 if(false) 代码
  - [Considerations](https://esbuild.github.io/api/#minify-considerations)
- --external:
  - `/assets/*.png`
  - `@foo/bar` 隐含 `@foo/bar/*`
- --target
  - chrome, edge, firefox, hermes, ie, ios, node, opera, rhino, safari
  - 可以更详细
    - esnext, es2020, es5, es5, node12, node12.19
    - chrome90
  - 也可以使用 supported 控制特性
- --supported - https://esbuild.github.io/api/#supported
- --sourcemap
  - linked - `//# sourceMappingURL=`
  - external - 无 sourceMappingURL
  - inline
  - both
- --servedir
  - 配合 script 使用
  - `<script src="js/app.js"></script>`
- --loader
  - js - .js, .cjs, .mjs
  - ts - .ts, .tsx, .mts, .cts
  - jsx/tsx - .jsx
  - json - .json
  - css - .css
  - text - .txt
  - binary
    - Uint8Array
    - uint8array.buffer -> ArrayBuffer
  - base64
  - dataurl
  - file
  - copy
    - 复制文件到 outdir - 修改 import 路径

## 只 bundle 内部文件

```js title="build.cjs"
const path = require('path');
const pkg = require(path.resolve('./package.json'));

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react-is',
  'shallowequal',
  'hoist-non-react-statics',
].sort();

console.log(`externals`, external);

require('esbuild').buildSync({
  entryPoints: ['admin/src/components/Wysiwyg/index.js'],
  loader: {'.js': 'jsx'},
  format: 'esm',
  bundle: true,
  minify: false,
  sourcemap: false,
  target: ['esnext'],
  outfile: 'dist/Wysiwyg.esm.js',
  external,
  logLevel: 'info',
});
```

```bash
grep '^// ' ./dist/Wysiwyg.esm.js                     # bundled
grep '^// ' ./dist/Wysiwyg.esm.js | grep node_modules # bundled externals
```

## Plugins

- https://github.com/esbuild/community-plugins
- https://esbuild.github.io/plugins

## Spliting

- 试验阶段
- 提取多个 entrypoint 的 common 部分
- https://esbuild.github.io/api/#splitting

```bash
esbuild home.ts about.ts --bundle --splitting --outdir=out --format=esm
```

## Dynamic require of "fs" is not supported

- format 为 esm 的时候可能出现
- 添加 banner 解决

```bash
npx esbuild --banner:js="import { createRequire } from 'module';const require = createRequire(import.meta.url);import path from 'path';import { fileURLToPath } from 'url';const __filename = fileURLToPath(import.meta.url);const __dirname = path.dirname(__filename);"
```

```ts
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

- https://github.com/evanw/esbuild/issues/1921

## 文件后缀

- 有些场景需要 esm import 包含后缀，目前 esbuild 不好添加
- 可以考虑 rollup
- https://github.com/evanw/esbuild/issues/2435
