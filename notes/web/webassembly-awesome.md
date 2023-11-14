---
title: WASM Awesome
tags:
  - Awesome
---

# WASM Awesome

:::tip

- 推荐 rust, c, c++, zig
- 推荐 js 加嵌入类型的 engine - duktape, quickjs
- emscripten 可以将 llvm 支持的任意语言编译为 wasm

:::

- [WebAssembly/wasi-nn](https://github.com/WebAssembly/wasi-nn)
  - https://github.com/WasmEdge/WasmEdge/tree/master/plugins/wasi_nn/thirdparty/ggml
- [AssemblyScript/assemblyscript](https://github.com/AssemblyScript/assemblyscript)
  - 直接输出 wasm
  - 类 TypeScript 语法
  - https://www.assemblyscript.org/status.html
  - https://www.assemblyscript.org/built-with-assemblyscript.html
- [Rust & Wasm](https://rustwasm.github.io/book/introduction.html)
- [roadmap](https://webassembly.org/roadmap/)
- bytecodealliance
  - [bytecodealliance/lucet](https://github.com/bytecodealliance/lucet)
    Sandboxing WebAssembly Compiler.
    - Apache-2.0, Rust
  - [bytecodealliance/wasmtime](https://github.com/bytecodealliance/wasmtime)
    JIT-style runtime for WebAssembly
    - Apache-2.0, Rust
  - [bytecodealliance/wasm-micro-runtime](https://github.com/bytecodealliance/wasm-micro-runtime)
    wasm Micro Runtime
    - Apache-2.0, C
  - [bytecodealliance/wizer](https://github.com/bytecodealliance/wizer)
    - Apache-2.0, Rust
    - WebAssembly Pre-Initializer
    - 空间换时间
  - [bytecodealliance/wit-bindgen](https://github.com/bytecodealliance/wit-bindgen)
- [wasmerio/wasmer](https://github.com/wasmerio/wasmer)
  WebAssembly Runtime supporting WASI and Emscripten
  - MIT, Rust
  - [wasmerio/wasmer-go](https://github.com/wasmerio/wasmer-go)
    runtime for Go
- [aduros/wasm4](https://github.com/aduros/wasm4)
  - Build retro games using WebAssembly
- [wasm3/wasm3](https://github.com/wasm3/wasm3)
  - MIT, C
  - interpreter
- [suborbital/sat](https://github.com/suborbital/sat)
  - Apache-2.0, Go
  - Tiny, blazing fast WebAssembly compute
  - [HN](https://news.ycombinator.com/item?id=28788303)
    - 包含作者选型原因
- [WasmEdge/WasmEdge](https://github.com/WasmEdge/WasmEdge)
  - Apache-2.0, C++
  - WebAssembly runtime for cloud native, edge, and decentralized applications
  - [second-state/dapr-wasm](https://github.com/second-state/dapr-wasm)
    - [WasmEdge Runtime for Dapr](https://www.infoq.com/articles/webassembly-dapr-wasmedge/)
- https://webvm.io/
  - https://github.com/leaningtech/webvm
  - https://github.com/leaningtech/cheerpx
- [zandaqo/iswasmfast](https://github.com/zandaqo/iswasmfast)
- [wasmx/fizzy](https://github.com/wasmx/fizzy)
- [WAVM/WAVM](https://github.com/WAVM/WAVM)
  - WebAssembly Virtual Machine
- [ewasm/design](https://github.com/ewasm/design)
  - Ethereum flavored WebAssembly
- [suborbital/atmo](https://github.com/suborbital/atmo)
  - framework for cloud native WebAssembly
- [lunatic-solutions/lunatic](https://github.com/lunatic-solutions/lunatic)
  - Erlang-inspired runtime for WebAssembly
- [wasmCloud/wasmCloud](https://github.com/wasmCloud/wasmCloud)
- [deislabs/hippo](https://github.com/deislabs/hippo)
  - WebAssembly PaaS
- [WebAssembly/component-model](https://github.com/WebAssembly/component-model)
- https://wapm.io/
- [CosmWasm/cosmwasm](https://github.com/CosmWasm/cosmwasm)
  - building smart contracts in Wasm for the Cosmos SDK
- [EOSIO/eos-vm](https://github.com/EOSIO/eos-vm)
  - WebAssembly Backend Library
- https://krustlet.dev/
  - [krustlet/krustlet](https://github.com/krustlet/krustlet)
  - Run WebAssembly workloads in Kubernetes
- https://v8.dev/blog/emscripten-standalone-wasm
- [fermyon/spin](https://github.com/fermyon/spin)
  - Apache-2, Rust
  - developer tool for building and running serverless applications

## Golang

**Host**

- [tetratelabs/wazero](https://github.com/tetratelabs/wazero)
  - Apache-2.0, Go
  - 无依赖

## JS

- duktape
- [jerryscript-project/jerryscript](https://github.com/jerryscript-project/jerryscript)
- quickjs
  - ES2020
  - wasm 1MB 左右
  - [justjake/quickjs-emscripten](https://github.com/justjake/quickjs-emscripten)
  - [second-state/wasmedge-quickjs](https://github.com/second-state/wasmedge-quickjs)
- ~~[mbbill/JSC.js](https://github.com/mbbill/JSC.js)~~
- [maple3142/wasm-jseval](https://github.com/maple3142/wasm-jseval)
- `<iframe sandbox="allow-scripts"/>`
- 参考
  - [How to build a plugin system on the web and also sleep well at night](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)
  - [An update on plugin security](https://www.figma.com/blog/an-update-on-plugin-security/)
  - [Making JavaScript run fast on WebAssembly](https://bytecodealliance.org/articles/making-javascript-run-fast-on-webassembly)
    - [HN](https://news.ycombinator.com/item?id=27370138)
    - 使用 wizer 预初始化
    - [cretz/go-wasm-bake](https://github.com/cretz/go-wasm-bake)
      - 对 Go 的 Wasm 就行预初始化
    - [facebook/prepack](https://github.com/facebook/prepack)
      - 类似的对 js bundle 就行预初始化
      - [repl](https://prepack.io/repl.html)

## Web

- [slipHQ/run-wasm](https://github.com/slipHQ/run-wasm)

## Misc

- [turbolent/w2c2](https://github.com/turbolent/w2c2)
  - wasm to c

## 参考

- YT [WebAssemblySummit](https://www.youtube.com/c/WebAssemblySummit)
- [modfy/modfy.video](https://github.com/modfy/modfy.video)
- [Introduction to WebAssembly components](https://radu-matei.com/blog/intro-wasm-components/)
- [grain-lang](https://grain-lang.org/)

## Learn

- https://wiki.polkadot.network/docs/learn-wasm

## emscripten

- [emscripten-core/emscripten](https://github.com/emscripten-core/emscripten)
  - LLVM-to-WebAssembly Compiler
- [WebAssembly/binaryen](https://github.com/WebAssembly/binaryen)
