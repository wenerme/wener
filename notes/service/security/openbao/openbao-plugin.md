---
title: OpenBao Plugin
---

# OpenBao Plugin


- OpenBao 支持 4 种插件类型：`auth`（认证方式）、`secret`（密钥引擎）、`database`（数据库 provider）、`kms`（Key Management Service provider）
  - 把内建和外部插件都当作可替换的构建块，保持 OpenBao core 精简
  - 插件由 type + name（如 `kv`）+ version（如 `v1.0.0`）唯一标识；version 为空代表内建插件或该插件唯一未带版本号的注册项
  - `auth`/`secret` 插件可以挂载到多个不同路径，每个挂载点可以使用不同版本

## 内建 vs 外部插件

| 类型             | 说明                                                                     |
| ---------------- | ------------------------------------------------------------------------ |
| 内建（Built-in） | 编译进 `bao` 二进制，无需单独安装/升级，覆盖常用集成（如 `kv` 密钥引擎） |
| 外部（External） | 独立二进制，OpenBao 通过 gRPC 与其通信，不随主二进制分发，需单独下载     |

- 外部插件不需要重新编译 OpenBao 本身即可分发，适合组织内部插件、不想开源的专有 API 集成，或在贡献回主项目前先行原型验证

## 使用流程

1. 安装插件（Install）
2. 注册插件（Register）
3. 使用插件（Use）

### 1. 安装（仅外部插件需要）

```hcl
# 配置插件下载/存放目录
plugin_directory = "/opt/openbao/plugins"
```

:::caution

- `openbao` 进程需要对该目录及插件二进制有读和执行权限；启用 auto-download 时还需要写权限
- 必须严格锁定该目录的文件系统权限：任何对该目录有写权限的人都可能放入任意插件，被 OpenBao 加载执行

:::

- 分发方式有两种：
  - 原始二进制（raw binary）：自行下载后放入 `plugin_directory`
  - OCI artifact：OpenBao 从 OCI registry 自动下载并存入 `plugin_directory`，通过 `bao plugin init` 手动触发，或配置 `plugin_auto_download = true` 自动下载

### 2. 注册

- 内建插件默认已注册
- 已注册插件的元数据保存在 OpenBao 的存储后端（plugin catalog），因此使用前 OpenBao 必须已 unseal
- `kms` 插件无需（也不能）注册，因为它必须在 sealed 状态下也可用
- 外部插件可以用两种方式注册：
  1. **声明式（Declarative）**，推荐方式，所有插件类型都支持，写在 server 配置文件里

     ```hcl
     plugin "passthrough-plugin" {
       type    = "secret"
       command = "openbao-plugin-secret-passthrough"
       sha256  = "..."
     }
     ```

     - OCI 分发的插件需要加 `plugin_auto_download = true`
     - 配置好后，OpenBao 启动或收到 `SIGHUP` 时会自动下载/注册这些插件
     - `kms` 插件因为必须在 sealed 状态下可用，只能用声明式方式

  2. **API 驱动（API-driven）**，仅 `auth`、`database`、`secret` 三种类型支持，需要 OpenBao 已 unseal，且 token 有足够权限

     ```bash
     bao plugin register -sha256= passthrough-plugin < sha256 > secret
     # Success! Registered plugin: passthrough-plugin
     ```

```bash
# 列出所有已注册插件（含内建）
bao plugin list
```

### 3. 使用

- 具体用法随插件类型而不同，分别参考 `auth`、`database`、`kms`、`secret` 各自的文档

## 版本管理

- Plugin catalog 支持为外部插件指定 semantic version，同一个插件可以同时注册多个版本
- 创建新 mount 或 tune 现有 mount 时可以指定具体版本；不指定版本时的选择优先级：
  1. 注册时未带版本号的插件
  2. 已注册版本中语义化版本号最新的
  3. OpenBao 内建的版本
- 内建插件的版本号会显示该插件代码在 OpenBao 内作为依赖被构建时的版本，例如：

  ```bash
  bao plugin list
  # Name                           Version
  # approle auth                   v2.0.0+builtin.bao
  # kv secret                      v2.0.0+builtin.bao
  # postgresql-database-plugin     v2.0.0+builtin.bao
  ```

  - 元数据标识 `bao` 表示插件代码位于 OpenBao 仓库内，版本号跟随 OpenBao 自身的 major/minor/patch
  - 元数据标识 `builtin` 是保留字，注册外部插件时不能使用

## 插件开发

:::tip

插件开发属于进阶主题，日常使用 OpenBao 不需要了解；仅在需要自行开发插件时阅读以下内容。

:::

- OpenBao 与插件之间通过 gRPC 通信，因此开发/分发插件不需要重新编译 OpenBao 本身
- 典型用途：组织内部插件、不想开源的专有 API 集成、先原型验证再考虑贡献回主项目
- 插件需要实现对应插件类型的接口（具体定义参考各 backend 类型的文档），且要能处理并发请求
- 启动插件服务（serving）时，调用对应 SDK 提供的入口函数：
  - `auth`/`secret` 插件：`plugin.ServeMultiplex`（`github.com/openbao/openbao/sdk/v2/plugin`）
  - `database` 插件：`dbplugin.ServeMultiplex`（`github.com/openbao/openbao/sdk/v2/database/dbplugin`）
  - `kms` 插件：`Serve`（`github.com/openbao/go-kms-wrapping/plugin/v2`）
- 更多真实示例参考 [openbao-plugins](https://github.com/openbao/openbao-plugins)

```go
package main

import (
	"os"

	hclog "github.com/hashicorp/go-hclog"
	myPlugin "your/plugin/import/path"

	"github.com/openbao/openbao/api/v2"
	"github.com/openbao/openbao/sdk/v2/plugin"
)

func main() {
	apiClientMeta := &api.PluginAPIClientMeta{}
	flags := apiClientMeta.FlagSet()
	flags.Parse(os.Args[1:])
	tlsConfig := apiClientMeta.GetTLSConfig()
	tlsProviderFunc := api.VaultPluginTLSProvider(tlsConfig)

	err := plugin.ServeMultiplex(&plugin.ServeOpts{
		BackendFactoryFunc: myPlugin.Factory,
		TLSProviderFunc:    tlsProviderFunc,
	})
	if err != nil {
		logger := hclog.New(&hclog.LoggerOptions{})
		logger.Error("plugin shutting down", "error", err)
		os.Exit(1)
	}
}
```

- `plugin.ServeMultiplex` 启用插件多路复用（multiplexing）；若运行该插件的 OpenBao 版本不支持多路复用，会自动回退到兼容方式运行
- `TLSProviderFunc` 用于兼容不支持自动双向 TLS 的旧版本 OpenBao；确定不需要向后兼容时可省略
- 插件可以自报语义化版本（需带 `v` 前缀，如 `v1.0.0`、`v2.3.2-beta`），此时注册时无需手动指定版本，OpenBao 会自动读取；若注册时提供的版本与插件自报版本不一致则会报错
  - 基于 `framework.Backend` 的 `auth`/`secret` 插件：设置 `RunningVersion` 变量
  - `database` 插件：直接实现 `PluginVersioner` 接口

## 自定义数据库引擎

- [Custom database secrets engines | OpenBao](https://openbao.org/docs/secrets/databases/custom/)
- 允许自行实现数据库 provider 插件，为任意数据库生成动态凭据，也可以把需要动态链接库的数据库作为插件接入，同时保持这部分代码独立于 OpenBao 核心

# 参考

- [Plugin system | OpenBao](https://openbao.org/docs/plugins/)
- [Plugin Development | OpenBao](https://openbao.org/docs/plugins/plugin-development/)
- [Plugin Author Guide | OpenBao](https://openbao.org/docs/plugins/plugin-authors-guide/)
- [External plugin architecture](https://openbao.org/docs/plugins/plugin-architecture/)
- [openbao/openbao-plugins](https://github.com/openbao/openbao-plugins) - 官方维护的外部插件集合
