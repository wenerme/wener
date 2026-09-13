---
title: Extism
tags:
  - WebAssembly
  - Plugin
---

# Extism

- [extism/extism](https://github.com/extism/extism)
  - BSD-3-Clause, Rust, WebAssembly, Plugin System
  - 用 Wasm 构建可嵌入应用、可跨语言实现的插件系统。

Extism 将普通应用称为 Host，将 `.wasm` 模块作为 Plug-in。Host 通过 Host SDK 加载 plug-in 并调用其 export；插件侧使用 PDK 编写，PDK 负责 Extism ABI、输入/输出和共享内存等低层细节。

## 模型

```text
Host application
  -> Host SDK
    -> Extism runtime
      -> Plug-in (.wasm, exports)
        -> PDK

Plug-in -- Wasm import --> Host Functions --> Host capabilities
```

- Host SDK
  - 嵌入 Host 应用的语言库，负责加载、实例化和调用 plug-in。
- Plug-in
  - 编译后的 `.wasm` 文件，暴露可由 Host 调用的 export。
  - Extism export 的通用边界是可选 bytes input 和可选 bytes output；PDK 可以将其映射为字符串、结构体或语言原生类型。
- PDK
  - Plug-in Development Kit。
  - 面向插件作者，封装 ABI、内存分配、输入/输出、config、variables 与 Host Function 调用。
- Manifest
  - 描述 Wasm 来源、内存上限和 capability 的声明，可代替仅传入一个 Wasm 路径或 URL。
- Host Function
  - Host 注入到 plug-in 的 Wasm import；用于显式提供数据库、业务 API、审计或受控文件操作等能力。

Extism 不负责定义插件的业务协议。Host 与 Plug-in 应独立版本化 export 名称、输入/输出编码、错误语义和 capability contract。

## Rust Plug-in

创建 library crate 并添加 PDK：

```bash
cargo new --lib greet-plugin
cd greet-plugin
cargo add extism-pdk
rustup target add wasm32-unknown-unknown
```

`Cargo.toml`：

```toml
[lib]
crate-type = ["cdylib"]
```

`src/lib.rs`：

```rust
use extism_pdk::*;

#[plugin_fn]
pub fn greet(name: String) -> FnResult<String> {
    Ok(format!("Hello, {name}!"))
}
```

构建并通过 CLI 调用：

```bash
cargo build --release --target wasm32-unknown-unknown

extism call \
  target/wasm32-unknown-unknown/release/greet_plugin.wasm \
  greet \
  --input "Wener"
```

- 不需要系统调用的插件可使用 `wasm32-unknown-unknown`。
- 需要 WASI 系统接口时，选择相应的 WASI target，并由 Host 显式启用 WASI capability。
- `#[plugin_fn]` 导出函数并处理 Extism ABI；需要完全控制 ABI 时才使用 raw export interface。

## Node Host

```bash
npm add @extism/extism
```

```js
import createPlugin from "@extism/extism";

const plugin = await createPlugin(
  "./target/wasm32-unknown-unknown/release/greet_plugin.wasm",
);

const output = await plugin.call("greet", "Wener");
console.log(output.text()); // Hello, Wener!
```

- 一个 Plug-in instance 可重复调用 export。
- `PluginOutput` 可以按 bytes、`text()` 或 `json()` 消费，具体 API 以 Host SDK 为准。
- Plug-in 的所有 Wasm imports 都必须在实例化时满足；使用 Host Function 的插件必须由 Host 提供对应 import。
- Host 应捕获创建和调用错误，并在实例不再使用时释放相应 SDK 资源。

## Manifest

Manifest 是将 Plug-in artifact 与运行约束一起版本化的推荐方式：

```json
{
  "wasm": [
    {
      "path": "./plugins/greet_plugin.wasm",
      "name": "greet",
      "hash": "<sha256>"
    }
  ],
  "memory": {
    "max_pages": 16,
    "max_http_response_bytes": 1048576,
    "max_var_bytes": 65536
  },
  "allowed_hosts": ["api.example.com"],
  "allowed_paths": {
    "/srv/plugin-data": "/data"
  },
  "config": {
    "environment": "production"
  }
}
```

- `wasm` 可以通过 `path`、内存中的 `data` 或远程 `url` 提供。
- 为每个 artifact 设置 SHA-256 `hash`，尤其不能信任远程 URL、对象存储或可变 release 地址时。
- `memory.max_pages` 以 64 KiB Wasm page 为单位；同时限制 HTTP response 和 variables 总字节数。
- `allowed_hosts` 控制插件的 HTTP 出站目标。空列表不允许任何 host；`null` 表示允许所有 host，应避免用于不受完全信任的插件。
- `allowed_paths` 是 Host 路径到插件内路径的映射；只有启用 WASI 后才会生效。空值或 `null` 不授予文件访问。
- `config` 是 Host 提供、插件可读取的静态键值数据；插件不能修改 runtime configuration。

## State And Host Functions

- Config
  - 插件创建时传入的只读配置，适合环境名、功能开关和非敏感常量。
- Variables
  - 插件可读写的键值状态，会跨同一 instance 的调用保留。
  - 调用 `plugin.reset()` 或释放实例后不应假定状态仍然存在；不同 instance 不共享 variables。
- Host Functions
  - Host Function 在插件侧表现为 Wasm import 或 `extern` 声明，插件可以反向调用 Host 代码。
  - 函数签名只使用可映射到 Wasm 的参数和返回类型；大块数据通常通过 Extism 内存与 offset 传递。
  - Host Function 的 user data 生命周期至少覆盖关联的 Plugin；共享 Plugin 或 Plugin pool 时，user data 必须支持并发访问。

Host Function 是最重要的授权边界。按业务操作拆分窄接口，例如 `kv_get`、`kv_put`、`http_fetch`，在 Host 侧做认证、参数校验、超时、配额、审计和错误归一化；不要向插件暴露通用数据库连接、任意 shell 执行或未经限制的内部服务访问。

## WASI And Capabilities

- WASI 是否启用由 Host 决定；仅在插件确实需要系统接口时开启。
- 网络目标通过 `allowed_hosts` 限制，文件系统通过 `allowed_paths` 映射限制。
- 加载远程 Wasm、启用 HTTP、挂载路径和注入 Host Functions 都是独立能力；不要因为启用了 WASI 就默认授予全部权限。
- Extism 的 runtime feature 也会决定可用能力，例如 HTTP plugin 下载、非 WASI 的 HTTP interface、filesystem 注册和 `wasi-nn`；生产环境应固定 runtime 版本与编译 feature。

## 设计检查

- Host 只加载可信 artifact，或通过不可变 URL、SHA-256 校验和签名/发布流程建立来源完整性。
- 明确每个 export 的 schema、最大输入/输出、超时、错误码和兼容策略；把它们视为插件 ABI。
- capability 默认拒绝：WASI、网络、文件系统、Host Function 都按最小范围单独授予。
- 避免让不受信任的插件持有长期密钥；需要访问敏感系统时，通过带鉴权、配额和审计的 Host Function 代理。
- 为 Plugin instance 的复用、`reset()`、并发和状态隔离写测试，防止 variables 或 user data 在租户之间泄漏。
- 将 Manifest schema 校验、Wasm hash 校验和 capability regression test 纳入 CI。

## 参考

- [Extism documentation](https://extism.org/docs/)
- [Extism Host SDKs](https://extism.org/docs/concepts/host-sdk/)
- [Extism PDKs](https://extism.org/docs/concepts/pdk/)
- [Extism Manifest](https://extism.org/docs/concepts/manifest/)
- [Extism Host Functions](https://extism.org/docs/concepts/host-functions/)
- [Extism configuration](https://extism.org/docs/concepts/configuration/)
