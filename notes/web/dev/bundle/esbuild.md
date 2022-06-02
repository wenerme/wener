---
title: ESBuild
---

# ESBuild

- [evanw/esbuild](https://github.com/evanw/esbuild)
  - MIT, Go
  - bundler & minifier
- used by Vite, Snowpack
- [roadmap](https://esbuild.github.io/faq/#upcoming-roadmap)

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

:::

```bash
esbuild example.js --outfile=out.js
esbuild --bundle main.ts --outdir=dist --minify --sourcemap
```

| flag                            |
| ------------------------------- | --------------------- |
| --bundle                        | 包含所有依赖          |
| --loader:.js=jsx                | 允许 js 包含 jsx 语法 |
| --define:DEBUG=true             | 替代 DEBUG            |
| --platform=browser,node,neutral | 默认 browser          |
| --external:@strapi              | 作为外部依赖          |

- --minify
  - --minify-whitespace
  - --minify-identifiers
  - --minify-syntax
- --external:
  - `/assets/*.png`
  - `@foo/bar` 隐含 `@foo/bar/*`

# 只 bundle 内部文件

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
  loader: { '.js': 'jsx' },
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
