---
title: swc
---

# swc

- [swc-project/swc](https://github.com/swc-project/swc)
  - Speedy Web Compiler
  - Rust-based platform for the Web
  - 开发者被 vercel 收编
  - 早期定位是 compiler - bundling & minifition not ready
  - swcpack - bundle
    - 开发者现在专注于 Vercel 的 Turbopack，因此 swcpack 开发并不活跃，不推荐使用。
- https://swc.rs/docs/benchmarks
  - 性能上和 esbuild 差距并不大
- 参考
  - https://kdy1.dev/2022-1-26-porting-tsc-to-go
  - https://kdy1.dev/2022-10-27-open-sourcing-stc
  - https://github.com/dudykr/stc
- https://swc.rs/playground
- [swc-project/swc-node](https://github.com/swc-project/swc-node)
  - ~ts-node
  - 不建议使用
  - Cannot find module ts
    - https://github.com/swc-project/swc-node/pull/744
    - https://github.com/swc-project/swc-node/issues/710

```bash
pnpm i -D @swc/cli @swc/core

pnpm swc ./src/main.ts -o ./dist/main.js

# swc + esbuild/tsx - 支持 emitDecoratorMetadata, 利用 esbuild 的 bundle 能力
pnpm swc ./src/ -d ./dist/out
pnpm tsx ./dist/out/main.ts
```

## swcrc

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": false,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": false,
      "decoratorsBeforeExport": false,
      "topLevelAwait": false,
      "importMeta": false
    },
    "transform": null,
    "target": "es5",
    "loose": false,
    "externalHelpers": false,
    // Requires v1.2.50 or upper and requires target to be es2016 or upper.
    "keepClassNames": false
  },
  "minify": false,
  // 依赖 browserslist
  "env": {
    "targets": {
      "chrome": "79"
    },
    "mode": "entry",
    "coreJs": "3.22"
  }
}
```

- https://swc.rs/docs/configuration/swcrc

# FAQ

## keepImportAssertions

- https://github.com/swc-project/swc/issues/7923
- https://github.com/TypeStrong/ts-node/issues/2056
- https://github.com/swc-project/swc/issues/5616

## file extension

- [js extension](./bundle-faq.md#js-extension)

## swc vs esbuild

- esbuild
  - production ready
  - 不能 bundle systemjs,amd
  - 不支持 emitDecoratorMetadata
- swc
  - compiler 功能完备
  - 能 bundle 更多格式

## strip-leading-paths

```bash
# dist/src -> dist
npx swc ./src -d dist --strip-leading-paths
```
