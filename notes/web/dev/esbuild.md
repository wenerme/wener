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
