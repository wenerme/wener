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
