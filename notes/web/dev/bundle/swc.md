---
title: swc
---

# swc

- [swc-project/swc](https://github.com/swc-project/swc)
  - Speedy Web Compiler
  - Rust-based platform for the Web
  - 开发者被 vercel 收编
  - 早期定位是 compiler - bundling & minifition not ready
- https://swc.rs/docs/benchmarks
  - 性能上和 esbuild 差距并不大
- 参考
  - https://kdy1.dev/posts/2022/1/tsc-go
    - 开发者在尝试使用 go 重写 tsc

# FAQ

## swc vs esbuild

- esbuild
  - production ready
  - 不能 bundle systemjs,amd
- swc
  - compiler 功能完备
  - 能 bundle 更多格式
