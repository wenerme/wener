---
title: Secretless Broker
---

# Secretless Broker

- [cyberark/secretless-broker](https://github.com/cyberark/secretless-broker)
  - Apache-2.0, Go
  - 凭据注入代理：应用连接 Broker，由 Broker 获取凭据并向上游认证，应用无需持有上游密码或 API Key。
- 参考
  - [官方文档](https://docs.secretless.io/)
- 不提供 Web 管理后台，主要通过 `secretless.yml` 配置服务、凭据来源与认证方式。
- Provider 决定“凭据从哪里获取”，Connector 决定“如何连接上游并注入凭据”。两者独立组合。
- 同一个实例可定义多个 service；同一类型也可以重复配置。数据库通常使用不同监听端口或 Unix socket 区分。
- 应用虽然不持有上游凭据，但可以借助 Broker 使用其权限，因此必须限制谁能访问 Broker。

## Credential Provider

| Provider     | 来源                | 说明                                                      |
| ------------ | ------------------- | --------------------------------------------------------- |
| `vault`      | HashiCorp Vault     | 通过 Vault API 读取 secret；OpenBao 可评估使用此 Provider |
| `conjur`     | CyberArk Conjur     | 从 Conjur 读取凭据                                        |
| `aws`        | AWS Secrets Manager | 从 AWS Secrets Manager 读取凭据                           |
| `kubernetes` | Kubernetes Secrets  | 从 Kubernetes Secret 读取凭据                             |
| `file`       | 本地文件            | 可搭配挂载文件或外部 Agent                                |
| `env`        | 环境变量            | 通过环境变量提供凭据                                      |
| `keychain`   | 系统钥匙串          | 能力与可用性取决于运行平台                                |
| `literal`    | YAML 中的值         | 适合 host、port 等非敏感参数，不建议存放真实密码          |

- 支持通过 Provider 插件接口扩展。
- [Provider 注册表](https://github.com/cyberark/secretless-broker/blob/main/internal/providers/providers.go)
- [Vault Provider](https://github.com/cyberark/secretless-broker/blob/main/internal/providers/vault/README.md)

## Service / Connector

| Connector      | 上游服务             | 认证方式 / 用途                   |
| -------------- | -------------------- | --------------------------------- |
| `pg`           | PostgreSQL           | 数据库用户名、密码                |
| `mysql`        | MySQL                | 数据库用户名、密码                |
| `mssql`        | Microsoft SQL Server | 数据库用户名、密码                |
| `basic_auth`   | HTTP API             | HTTP Basic Authentication         |
| `generic_http` | HTTP API             | 使用模板注入 Header、Query 参数等 |
| `aws`          | AWS HTTP API         | AWS 请求签名                      |
| `conjur`       | Conjur HTTP API      | Conjur 认证                       |
| `ssh`          | SSH                  | SSH 代理；源码标记为实验性实现    |
| `ssh-agent`    | SSH Agent            | 通过 Agent 协议使用托管密钥       |

- `generic_http` 可适配多种 API Key / Bearer Token 服务，支持的产品数量不限于表中条目。
- Redis、MongoDB、NATS、Kafka 没有对应的内置协议 Connector。
- `aws` 和 `conjur` 同时是 Provider 名与 Connector 名：前者表示凭据来源，后者表示认证目标。
- 多 service 不代表任意 Provider 都支持多个独立后端实例；例如 Vault Provider 默认从进程环境读取连接配置。

## 配置

```bash
export VAULT_ADDR=https://bao.example.com
# 由 secret 注入机制提供 VAULT_TOKEN，使用专用最小权限 token。
secretless-broker -f secretless.yml
```

```yaml
version: 2
services:
  postgres-app:
    connector: pg
    listenOn: tcp://127.0.0.1:15432
    credentials:
      host:
        from: literal
        get: pg.internal.example.com
      port:
        from: literal
        get: '5432'
      username:
        from: vault
        get: secret/data/svc/pg#data.username
      password:
        from: vault
        get: secret/data/svc/pg#data.password
      sslmode:
        from: literal
        get: verify-full
      sslrootcert:
        from: literal
        get: /etc/secretless/pg-ca.pem

  internal-api:
    connector: generic_http
    listenOn: tcp://127.0.0.1:18080
    credentials:
      token:
        from: vault
        get: secret/data/svc/api#data.token
    config:
      headers:
        Authorization: 'Bearer {{ .token }}'
      forceSSL: true
      upstreamURL: https://api.example.com
      authenticateURLsMatching:
        - '^http'
```

注意：

- KV v2 的 API 路径包含 `/data/`，字段选择需要 `#data.<field>`；KV v1 通常使用 `path#field`。
- PostgreSQL 上游须提供有效证书，并准备匹配的 CA 文件；客户端所选数据库仍需存在且账号有访问权限。
- HTTP 示例固定 `upstreamURL`，避免将带认证的请求转发到任意目标。
- 示例监听 loopback，适合同机进程。容器部署时需要按网络边界调整监听地址与端口发布；容器内的 `127.0.0.1` 只对该容器可达。
- `sslrootcert` 使用 CA 文件路径，因此用 `literal` 提供路径，并把 CA 文件挂载到 Broker 内；`file` Provider 则用于读取文件内容。

### Vault Provider 限制

根据项目 Vault Provider 文档：

- 仅实现 token 登录，没有直接实现 AppRole 等登录流程。
- 以读取 API 获取 secret，不应将其视为具备完整的动态凭据租约获取、续租和撤销管理。
- 不支持多个字段需要同时变化的场景，例如动态数据库账号的 username/password；分别解析字段可能无法保证来自同一组凭据。
- KV v2 仅支持获取最新版本。

因此，Bao KV 中的固定账号、API Token 是较合适的首个集成目标。动态账号或成对轮换凭据需要单独验证或扩展实现。
