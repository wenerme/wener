---
title: OpenBao Namespace
---

# OpenBao Namespace

- [Namespaces | OpenBao](https://openbao.org/docs/concepts/namespaces/)
- [namespace CLI | OpenBao](https://openbao.org/docs/commands/namespace/)
- [Announcing OpenBao Namespaces](https://openbao.org/blog/namespaces-announcement/) - 2025-05-30，随 2.3.0（beta）引入
- Namespace 是 OpenBao 实例内的逻辑分区，用于支持 secure multi-tenancy（SMT）
  - 每个 namespace 相当于一个独立的 mini-OpenBao：有自己的 secret engine、认证方式、ACL/EGP/RGP 策略、密码策略、entity、identity group、token
  - 目的：租户隔离 + 管理委派，让 namespace 管理员自助管理自己的租户环境，减少集群级运维负担
  - 对标 Vault Enterprise 的 Namespace 功能，社区版即可使用
- 这是 [Vault 对比笔记](../vault/README.md) 里提到的、两个项目功能不完全同步的典型特性之一

## 命名限制

- 不能以 `/` 结尾
- 不能包含空格
- 不能是以下保留字：`.`、`..`、`root`、`sys`、`audit`、`auth`、`cubbyhole`、`identity`

## 层级结构

- Child namespace：完全处于另一个 namespace（parent）范围内的 namespace
  - 例如路径 `A/B/C`：`A` 是顶层 namespace（位于 root namespace 之下），`B` 是 `A` 的子 namespace，`C` 是 `B` 的子 namespace（`A` 的孙 namespace）
  - 子 namespace 可以继承父 namespace 的部分元素，例如策略里引用父 namespace 的 entity/group；父 namespace 也可以对子 namespace 内的身份施加策略
- 跨 namespace 身份引用（entity/group）默认不启用

  :::caution

  `unsafe_cross_namespace_identity = true` 用于兼容 Vault Enterprise 的跨 namespace group membership，官方不建议启用；开启后对其他 namespace 可引用的身份/组没有任何限制，等同于打开无边界的权限共享。

  :::

- 子 namespace 管理员不能突破本 namespace 的限制，但可以在自己范围内继续创建更深层级的 namespace

## CLI 操作

```bash
# 在 root 创建一个 namespace
bao namespace create tenants

# 在 tenants 下创建子 namespace
bao namespace create -ns tenants tenant-c

# 在 tenants/tenant-c 下再创建子 namespace
bao namespace create -ns tenants/tenant-c prod

# 创建时附带自定义 metadata
bao namespace create -custom-metadata=foo=abc -custom-metadata=bar=123 ns1/

# 查看单个 namespace 的状态/元数据
bao namespace lookup -ns tenants/tenant-c prod

# 列出当前 namespace 下的子 namespace
bao namespace list
bao namespace list -detailed

# 递归列出所有（子）namespace
bao namespace scan
bao namespace scan -detailed

# 修改已有 namespace 的 metadata（增/删 key）
bao namespace patch -custom-metadata=bar=123 -remove-custom-metadata=foo ns1/

# 删除 namespace（必须先清空内容）
bao namespace delete ns1/
```

## API 中使用 namespace

- 通过 `X-Vault-Namespace` header 指定绝对或相对 namespace 路径
  - 相对路径会被视为“当前调用 namespace 下的子 namespace”
  - 也可以不设置 header，直接把 namespace 路径拼在请求路径最前面
- 以下三种写法等价，都会路由到 `ns1/ns2/secret/foo`：

  | 请求路径             | Header                        |
  | -------------------- | ----------------------------- |
  | `ns1/ns2/secret/foo` | 无                            |
  | `secret/foo`         | `X-Vault-Namespace: ns1/ns2/` |
  | `ns2/secret/foo`     | `X-Vault-Namespace: ns1/`     |

- 管理 namespace 本身用 `/sys/namespaces` API 或 `namespace` CLI 子命令

## 受限 API 路径

- 多数 `sys/*` 系统接口默认只允许 root namespace 调用，或使用 root namespace 下带高权限的 token 调用；子 namespace 无法直接调用
- 典型受限路径（仅 root 可用，子 namespace 不可用）：`sys/audit`、`sys/init`、`sys/seal`、`sys/unseal`、`sys/rekey`、`sys/health`、`sys/metrics`、`sys/raw`、`sys/storage`、`sys/replication/*`、`sys/quotas/*` 等
- 对应的 CLI 子命令也会有同样限制

## Sealable Namespace

- [Sealable Namespaces 概念](https://openbao.org/docs/next/concepts/namespaces/sealable-namespaces/)
- [Getting Started with Sealable Namespaces](https://openbao.org/docs/guides/sealable-namespaces/)
- 让租户对自己的 namespace 拥有独立的加密密钥和 seal/unseal 控制权，和全局 OpenBao seal 分离
- 创建时必须指定父 namespace（因为 namespace 处于 sealed 状态时本身无法接受请求）

```bash
# 在 tenants 下创建一个 Shamir seal 的 sealable namespace
bao namespace create -ns=tenants -key-shares=5 -key-threshold=3 my-tenant

# unseal（和全局 unseal 类似，需要凑够 threshold 份 key）
bao namespace unseal -ns=tenants my-tenant

# seal（立即丢弃内存中的 namespace key，后续请求全部失败直到重新 unseal）
bao namespace seal -ns=tenants my-tenant

# 查看 seal 状态
bao namespace seal-status -ns=tenants my-tenant

# 已 sealed 且无子 namespace 时，可直接删除（需要 sudo 权限）
bao namespace delete-sealed -ns=tenants my-tenant
# 递归删除 sealed namespace 及其所有子 namespace
bao namespace delete-sealed -force ns1
```

:::tip

- 和全局 OpenBao 的 unseal 不同，sealable namespace 不需要每个节点各 unseal 一次，整个集群只需 unseal 一次
- 父 namespace 被 seal 时，其下所有带独立 seal 配置的子 namespace 也会一起被 seal
- 目前不支持在 sealable 和非 sealable 之间迁移现有 namespace

:::

## FAQ

### namespace 是 2.x 的新特性，1.x 升级要注意什么

- Namespace 随 2.3.0（beta，2025-05）引入，1.x 版本不支持
- 如果业务依赖多租户隔离，升级前确认目标版本的 namespace 功能成熟度（beta/GA）和官方 Changelog，不要假设所有 2.x 小版本行为一致
