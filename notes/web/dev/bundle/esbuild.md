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

- --minify
  - --minify-whitespace
  - --minify-identifiers
  - --minify-syntax - 移除 if(false) 代码
  - [Considerations](https://esbuild.github.io/api/#minify-considerations)
- --external:
  - `/assets/*.png`
  - `@foo/bar` 隐含 `@foo/bar/*`
- --target - chrome, edge, firefox, hermes, ie, ios, node, opera, rhino, safari
- --sourcemap
  - linked - `//# sourceMappingURL=`
  - external - 无 sourceMappingURL
  - inline
  - both
- --servedir
  - 配合 script 使用
  - `<script src="js/app.js"></script>`

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
