---
title: OpenBao
---

# OpenBao

- [openbao/openbao](https://github.com/openbao/openbao) 是什么？
  - MPL-2.0, Golang
  - [HashiCorp Vault](../vault/README.md) 的社区 fork，由 Linux Foundation 旗下 [OpenSSF](https://openssf.org/) 托管
  - 功能和架构与 Vault 基本一致：密钥存储、动态密钥、数据加密（Transit）、租约与自动撤销、审计日志
- [openbao.org](https://openbao.org/)
- 为什么有这个 fork
  - HashiCorp 2023-08 把 Vault（及 Terraform 等其他项目）从 MPL-2.0 改为 BUSL-1.1
  - OpenBao fork 自 Vault 最后一个 MPL-2.0 版本（`v1.14.8` 附近），此后独立演进
  - 定位是 Vault 的开源替代，CLI/HTTP API 大体兼容，迁移成本低
- CLI 二进制名为 `bao`（区别于 Vault 的 `vault`），多数子命令和参数与 Vault 一致
- 默认服务端口仍是 8200
- 环境变量
  - `BAO_ADDR` 服务端地址（对应 Vault 的 `VAULT_ADDR`）
  - `BAO_TOKEN` 请求的 Token（对应 Vault 的 `VAULT_TOKEN`）
  - 部分版本仍兼容读取 `VAULT_*` 前缀的环境变量，升级/迁移时注意核对当前版本行为

```bash
# 源码构建
mkdir -p bin
go build -o bin/bao .

# 启动开发模式服务 - 仅用于本地实验，数据不持久化
go run . server -dev
# 或使用编译好的二进制
bao server -dev

export BAO_ADDR='http://127.0.0.1:8200'
bao status
```

```bash
# Docker 启动 - 开发模式
docker run --rm -it \
  -p 8200:8200 \
  --cap-add=IPC_LOCK \
  --name openbao openbao/openbao server -dev

# 生产运行 - 挂载持久化目录，首次访问 UI 会进行初始化
docker run --rm -it \
  -p 8200:8200 \
  -v $PWD/openbao/logs:/openbao/logs \
  -v $PWD/openbao/file:/openbao/file \
  -v $PWD/openbao/config:/openbao/config \
  --cap-add=IPC_LOCK \
  --name openbao openbao/openbao server
```

- 基础操作、approle、KV、动态密钥、密钥引擎等概念与用法参考 [Vault](../vault/README.md)，命令把 `vault` 换成 `bao` 即可
- [Namespace](./openbao-namespace.md) - Vault 没有的多租户隔离特性（社区版即可用），2.3.0 起支持
- [Plugin](./openbao-plugin.md) - 内建/外部插件、插件版本管理、plugin catalog、自行开发插件
- 配置文件格式（HCL/JSON）、存储后端（file、raft、postgresql、consul 等）与 Vault 基本一致，详见官方文档

## FAQ

### vs Vault

- 功能和命令基本一一对应，`vault` → `bao`，`VAULT_*` → `BAO_*`
- 许可证：OpenBao 保持 MPL-2.0（开源），Vault 新版本为 BUSL-1.1（受限的源码可见许可）
- 新特性（如 namespace 支持、PKCS#11 集成）在两个项目中可能不同步，升级/迁移前以官方 Changelog 为准
</content>
