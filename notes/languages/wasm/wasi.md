---
title: WASI
tags:
  - WebAssembly
  - System Interface
---

# WASI

- WASI - WebAssembly System Interface
  - WebAssembly 的系统接口标准集合。
- [WASI.dev](https://wasi.dev/)
  - 为可编译到 WebAssembly 的程序提供跨语言、跨运行时的标准系统能力。
- [WebAssembly Component Model](https://component-model.bytecodealliance.org/)
  - WASI 0.2 及之后版本所依赖的组件、WIT 和 Canonical ABI 基础。

WASI 解决的是“Wasm 程序如何访问宿主系统”的接口问题，而不是定义新的 CPU 指令或完整操作系统。文件、时钟、随机数、网络、标准输入输出等能力都由 Host 提供，Wasm 模块或组件只能使用 Host 显式授予的能力。

## 核心概念

- Core Wasm module
  - 遵循 WebAssembly 核心模块格式的 `.wasm`，通常通过 import module 获取 WASI 函数。
  - WASI 0.1/Preview 1 主要使用这一模型，典型 import module 为 `wasi_snapshot_preview1`。
- Component
  - 遵循 WebAssembly Component Model 的组件，使用 WIT 描述接口和 world。
  - WASI 0.2/Preview 2 和 WASI 0.3/Preview 3 以组件模型为基础。
- Host
  - 负责提供 WASI imports、管理资源和 capability，并执行模块或组件。
  - 常见 Host/runtime 包括 Wasmtime、WasmEdge、WAMR、wazero、Wasmer、wasmi、wasm3 和 jco；支持范围因 runtime 和版本而异。
- WIT
  - WebAssembly Interface Type 的接口描述语言，用于定义组件的 package、interface、world、资源和高层类型。
- World
  - 一个组件所需 imports 与提供 exports 的完整接口边界，可理解为组件的 ABI contract。
- Capability
  - Host 授予的受限能力，例如某个预打开目录、环境变量、网络目标或 HTTP 服务。

WASI 应用没有 ambient authority：默认不能访问宿主文件系统、环境变量、网络或时钟以外的额外资源；具体权限取决于 Host 的配置和 runtime 支持。

## 版本

截至 2026 年 9 月 14 日，WASI 官方发布页将 WASI 0.3 列为当前稳定版本，WASI 0.3.1 于 2026 年 8 月 11 日发布；WASI 0.2 仍是许多组件工具链的主要目标，WASI 0.1/Preview 1 因运行时覆盖面广仍大量使用。

| Date       | Version    | Name               | 产物模型    | 主要特点                                                                                                    | 状态                     |
| ---------- | ---------- | ------------------ | ----------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ |
| 2026-08-11 | WASI 0.3.1 | Preview 3          | Component   | 基于 Component Model 的原生 async、`stream`、`future`；0.3.1 增加已采用的 Component Model 类型和 annotation | 当前稳定版本             |
| 2026-06-11 | WASI 0.3.0 | Preview 3          | Component   | 将异步调度和唤醒传播下沉到 Component Model 的 Canonical ABI                                                 | 稳定版本                 |
| 2024-01-25 | WASI 0.2   | Preview 2 / WASIp2 | Component   | WIT 接口、Component Model、可组合组件、跨语言互操作                                                         | 稳定但已被 0.3 supersede |
| 2020-12-15 | WASI 0.1   | Preview 1 / WASIp1 | Core module | POSIX/CloudABI 影响的模块式 API，使用 `wasi_snapshot_preview1`                                              | Legacy，仍广泛使用       |

WASI 0.1 官方概览页没有单独列出发布日期；表中的 2020-12-15 采用官方仓库 `snapshot-01` tag 的发布时间作为版本参考。

选择版本时优先看运行时、语言绑定和部署平台的交集，而不是只看 WASI 的最高版本：

- 需要最大兼容性或已有模块式工具链时，使用 WASI 0.1/`wasm32-wasip1`。
- 新组件项目通常从 WASI 0.2/`wasm32-wasip2` 开始，获得 WIT 和组件组合能力。
- 需要跨组件原生异步、`stream` 或 `future` 时，选择 WASI 0.3，并固定 Wasmtime、jco、wit-bindgen 等工具的兼容版本。
- WASI 0.3 runtime 通常仍可运行 WASI 0.2 组件；迁移不必与 runtime 升级绑定完成。

## WASI 0.1

WASI 0.1 是面向 core module 的旧版接口集合。C/C++、Rust 或其他语言编译出的模块通过导入 `wasi_snapshot_preview1` 使用系统接口：

```text
Wasm module
  imports wasi_snapshot_preview1
    -> args, environ, fd, path, clock, random, proc_exit ...
  exports _start or application functions
```

典型能力包括：

- CLI arguments、environment variables 和标准输入输出。
- 文件和目录操作，通常通过 Host 预打开目录（preopened directory）暴露。
- wall clock、monotonic clock 和随机数。
- 进程退出与错误码。
- 在具体 runtime 支持下提供 sockets 等扩展。

Rust 模块示例：

```bash
rustup target add wasm32-wasip1
cargo new wasi-hello
cd wasi-hello
cargo build --target wasm32-wasip1 --release
wasmtime run target/wasm32-wasip1/release/wasi-hello.wasm
```

`wasm32-wasip1` 是 Rust 对 WASI Preview 1 的目标名称，旧工具链中也可能看到 `wasm32-wasi`。两者不要与 WASI 0.2/0.3 component target 混淆。

## WASI 0.2

WASI 0.2 完成了向 Component Model 的迁移，API 使用 WIT 定义，组件可使用更丰富的类型、资源和组合关系。核心 API 包括：

| API               | 用途                                                          |
| ----------------- | ------------------------------------------------------------- |
| `wasi:cli`        | 参数、环境变量、标准输入输出、命令退出                        |
| `wasi:filesystem` | 文件和目录描述符、预打开目录、文件系统操作                    |
| `wasi:sockets`    | TCP/UDP socket 和 DNS 等网络能力                              |
| `wasi:clocks`     | wall clock 和 monotonic clock                                 |
| `wasi:random`     | 安全和非安全随机数                                            |
| `wasi:http`       | HTTP 请求和响应                                               |
| `wasi:io`         | `pollable`、input/output stream 等 I/O 抽象；在 WASI 0.3 移除 |

WASI 0.2 的异步 I/O 以 `wasi:io` 的 `pollable`、`input-stream`、`output-stream` 和 polling 操作表达。它可以工作，但在组件链路中转发唤醒信号存在限制；WASI 0.3 将异步原语移入 Component Model 解决这一类组合问题。

## WASI 0.3

WASI 0.3.0 于 2026 年 6 月 11 日发布。它将原生异步能力加入 Component Model 的 Canonical ABI，使 runtime 负责调度和跨组件唤醒传播。

### Async primitives

- `async func`
  - 声明异步函数，绑定生成器映射为 Rust `async fn`、JavaScript `Promise` 或其他语言的异步结构。
- `stream<T>`
  - 可跨组件传递的异步、类型化数据流。
- `future<T>`
  - 表示一个异步完成结果。

```wit
package example:async-demo@0.1.0;

interface worker {
    enum error {
        invalid-input,
        unavailable,
    }

    process: async func(input: string) -> result<string, error>;
    receive: func() -> tuple<stream<u8>, future<result<_, error>>>;
}
```

WASI 0.3 常用 stream-plus-future 模式：`stream` 持续传输数据，`future` 表示流关闭后的完成状态或错误。写操作的方向也发生变化：WASI 0.2 通常先取得 `output-stream` 再写入；WASI 0.3 通常传入 `stream` 并获得表示完成状态的 `future`。

### 主要 worlds

- `wasi:cli/command`
  - 可执行命令组件，导出异步 `run`，并使用文件系统、环境变量、标准输入输出、退出、时钟、随机数和 sockets 等接口。
- `wasi:http/service`
  - HTTP server 组件，导出异步 handler。
- `wasi:http/middleware`
  - 同时导入和导出 handler，适合组成 HTTP middleware 链。
- `wasi:cli/imports`、`wasi:sockets/imports` 等 imports world
  - 聚合某个 API 包的接口，方便其他 world 复用。

WASI 0.3 移除了完整的 `wasi:io` package，使用 Component Model 原生的 `async func`、`stream` 和 `future` 替代 `pollable`、显式 polling 及 start/finish 调用对。

## WIT

WIT 描述组件的接口边界，不直接描述具体语言的实现方式：

```wit
package example:greeting@1.0.0;

interface greet {
    greet: func(name: string) -> string;
}

world app {
    export greet;
}
```

- `package` 标识 WIT 包的 namespace、name 和 version。
- `interface` 定义函数、类型、资源和错误。
- `world` 描述组件的完整 imports/exports。
- `export` 表示组件向外提供的能力；`import` 表示组件依赖 Host 或另一个组件提供的能力。
- `result<T, E>`、`option<T>`、`record`、`variant`、`enum`、`list<T>` 和 `resource` 等类型由 Component Model 负责跨语言传递。

组件组合时，只有 imports 被满足且类型、package、interface 和 world 版本兼容，最终组件才能运行：

```text
component A exports example:greeting/greet
component B imports example:greeting/greet
                    |
                    v
              composed component
```

这与 WASI 0.1 中直接依赖固定 import module 和函数签名不同；WIT 使接口拥有更明确的类型和组合语义。

## Rust Component

Rust 的 core module 与 component 使用不同 target：

```bash
# WASI 0.1 module
rustup target add wasm32-wasip1
cargo build --target wasm32-wasip1

# WASI 0.2 component
rustup target add wasm32-wasip2
cargo build --target=wasm32-wasip2
```

一个最小可运行的 WASI 0.2 command component 可以直接使用 `main`：

```rust
pub fn main() {
    println!("Hello from WASI");
}
```

```bash
wasmtime run target/wasm32-wasip2/debug/example.wasm
```

需要自定义 WIT interface 或组合其他组件时，通常使用 `wit-bindgen` 生成绑定，再由 `wasm-tools`、`wac` 等工具完成 component packaging 或 composition。组件必须导出目标 world，例如 `wasi:cli/command`，并且所有 imports 都需要由 Host 或其他组件满足。

WASI 0.3 的 Rust 工具链仍在演进：`wasm32-wasip3` 在当前 Rust 平台支持中属于 Tier 3，通常没有预构建标准库 artifacts。官方组件教程使用 `wasm32-wasip2` 配合 `wit-bindgen` 的 async bindings 作为 WASI 0.3 的过渡构建路径；生产项目应锁定 Rust、wit-bindgen、Wasmtime 和 WIT package 版本。

## Wasmtime

运行 command component：

```bash
wasmtime run ./app.wasm
```

运行 WASI 0.3 component 时，根据 Wasmtime 版本启用 WASI 0.3 ABI 和 Component Model async：

```bash
wasmtime run \
  -Sp3 \
  -W component-model-async=y \
  ./app.wasm
```

- `-Sp3` 启用 WASI 0.3 imports。
- `-W component-model-async=y` 启用 `async func`、`stream` 和 `future`。
- 新版 Wasmtime 可能默认启用这些特性；命令行参数仍适合在 CI 中明确记录运行模式。
- Host 默认不授予组件所有系统资源；需要文件、环境变量或网络时，必须显式配置。
- `wasmtime serve` 可以运行实现 WASI HTTP world 的组件；具体是 0.2 `wasi:http/proxy` 还是 0.3 `wasi:http/service` / `middleware` 取决于组件导出和 runtime 版本。

## Capability And Security

WASI 的安全模型是 capability-based sandbox：

- 默认拒绝
  - 模块或组件没有宿主系统的隐式访问权。
- 显式授予
  - Host 通过预打开目录、环境变量、标准流、网络配置、HTTP handler 或自定义 Host interface 授予能力。
- 能力最小化
  - 只暴露插件实际需要的路径、host、接口和资源；不要把整个根文件系统或任意网络作为默认 capability。
- 资源限制
  - Host/runtime 仍需设置内存、执行时间、并发、文件大小、网络响应和句柄等配额。
- 运行时边界
  - WASI 定义接口，不单独保证 runtime 的实现质量；生产环境需要固定 runtime 版本并执行安全更新和 conformance test。

文件访问示意：

```text
Host: /srv/app/data  ->  guest: /data
Host: /srv/app/cache ->  guest: /cache
```

Wasm 程序只应看到 Host 映射出的 guest path，而不是宿主的真实路径。不同 runtime 的命令行选项不同，不能把某个 runtime 的 `--dir` 或 `--mapdir` 直接当成 WASI 标准 API。

## 与浏览器的关系

- WASI 主要面向 non-web embedding，也可以被浏览器或 JavaScript runtime 部分实现。
- 浏览器页面通常通过 Web API、Web Worker、JavaScript imports 或 Component Model bindings 提供能力，而不是直接暴露本机文件系统。
- `wasi:filesystem`、`wasi:sockets` 和 `wasi:http` 是否可用取决于浏览器 runtime 是否实现并愿意授予这些 capability。
- WASI 不等同于 Emscripten。Emscripten 可生成 WASI 0.1 风格模块或使用自己的 JS glue；需要明确目标 runtime 的 import contract。
- 在浏览器中使用共享内存和多线程时，还要满足 WebAssembly Threads 对 `SharedArrayBuffer`、Worker 和 cross-origin isolation 的要求，见 [WebAssembly Threads](./thread.md)。

## 排障清单

- `unknown import wasi_snapshot_preview1`
  - Host 没有启用 WASI 0.1，或模块目标与 runtime 不匹配。
- `unknown import wasi:cli/...`
  - 组件需要 Component Model/WASI 0.2 或 0.3，而当前 Host 只支持 core module 或旧 world。
- `wrong type` / `no exported instance`
  - WIT package、world、bindings generator 和 runtime 的版本不一致。
- 文件访问失败
  - 检查是否启用 WASI、是否预打开目录、guest path 是否正确，以及 runtime 是否允许对应操作。
- 网络访问失败
  - 检查 sockets/HTTP proposal 支持、Host capability、DNS 和 TLS 层是否由 runtime 提供。
- 异步接口无法实例化
  - 检查 WASI 0.3 ABI、`component-model-async`、WIT 版本和生成器 async feature 是否一致。
- 程序能运行但不便携
  - 检查是否依赖某个 runtime 的额外 import、未标准化 proposal、文件系统布局或 Host 特有环境变量。

## 参考

- [WASI.dev Introduction](https://wasi.dev/)
- [WASI Releases](https://wasi.dev/releases)
- [WASI 0.1](https://wasi.dev/releases/wasi-p1)
- [WASI 0.2](https://wasi.dev/releases/wasi-p2)
- [WASI 0.3](https://wasi.dev/releases/wasi-p3)
- [WASI Security](https://wasi.dev/security)
- [WebAssembly Component Model](https://component-model.bytecodealliance.org/)
- [Component Model Tutorial](https://component-model.bytecodealliance.org/tutorial.html)
- [Rust: Creating Runnable Components](https://component-model.bytecodealliance.org/language-support/creating-runnable-components/rust.html)
- [Wasmtime: Running Components](https://component-model.bytecodealliance.org/running-components/wasmtime.html)
- [Rust `wasm32-wasip1` target](https://doc.rust-lang.org/stable/rustc/platform-support/wasm32-wasip1.html)
- [Rust `wasm32-wasip2` target](https://doc.rust-lang.org/stable/rustc/platform-support/wasm32-wasip2.html)
