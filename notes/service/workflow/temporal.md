---
title: temporal
---

# temporal

- [temporalio/temporal](https://github.com/temporalio/temporal)
  - cadence fork, 包含原始团队人员
  - 更适合中小规模
    - 使用更方便
    - 支持更多 SDK
    - 没有 uber 包袱 - 环境、rpc、历史实现
- temporal-web - 旧的 Web UI
  - fork 自 Cadence
- temporal-ui - 新的 Web UI
  - 功能目前不完善

```bash
# https://github.com/temporalio/docker-compose
# Elasticsearch + PostgreSQL + Web + UI
# temporal-web http://localhost:8088/namespaces
# temporal-ui http://localhost:8080/
# temporal :7233
# postgresql :5432
# elasticsearch :9200
curl -o docker-compose.yml https://raw.githubusercontent.com/temporalio/docker-compose/main/docker-compose-ui-experimental.yml
curl --create-dirs -LO --output-dir dynamicconfig https://raw.githubusercontent.com/temporalio/docker-compose/main/dynamicconfig/development_es.yaml
curl -O --output-dir dynamicconfig https://raw.githubusercontent.com/temporalio/docker-compose/main/dynamicconfig/development.yaml
docker-compose up

alias tctl="docker exec --env TEMPORAL_CLI_ADDRESS=host.docker.internal:7233 temporal-admin-tools tctl"
tctl namespace describe
```

## 部署

- Persistence
  - Cassandra, PostgreSQL, MySQL
  - SQLite WIP
- Workflow search
  - Elasticsearch v6.8+
- Helm https://github.com/temporalio/helm-charts
- 限制 - [Server limits](https://docs.temporal.io/docs/server/production-deployment/#server-limits)
  - gRPC 4MB
  - TransactionSizeLimit 4MB - 事务大小限制
  - Blob size limit - 请求包大小
    - BlobSizeLimitWarn 512KB
    - BlobSizeLimitError 2MB
  - History total size limit - 历史大小
    - HistorySizeLimitWarn 10MB
    - HistorySizeLimitError 50MB
  - History total count limit - 历史事件数量
    - HistoryCountLimitWarn 10000
    - HistoryCountLimitError 50000
  - Search Attributes
    - SearchAttributesNumberOfKeysLimit 100 - 数量
    - SearchAttributesTotalSizeLimit 2KB - 单个属性大小
    - SearchAttributesSizeOfValueLimit 40KB - 中大小
- [Antipatterns & Best practices](https://docs.temporal.io/docs/server/production-deployment#further-things-to-consider)

## 配置

- https://docs.temporal.io/docs/server/configuration/

## tctl

- https://github.com/temporalio/tctl

| env                    | default        |
| ---------------------- | -------------- |
| TEMPORAL_CLI_ADDRESS   | 127.0.0.1:7233 |
| TEMPORAL_CLI_NAMESPACE | default        |

```bash
# install on Host
brew install tctl
# run in Docker
docker run --rm -it --entrypoint tctl --env TEMPORAL_CLI_ADDRESS=host.docker.internal:7233 temporalio/admin-tools
```

## Server

- [Temporal Server options](https://docs.temporal.io/docs/server/options)
- auto-setup
  - https://github.com/temporalio/temporal/blob/master/docker/auto-setup.sh
  - https://docs.temporal.io/blog/auto-setup/
- [docker/start-temporal.sh](https://github.com/temporalio/temporal/blob/master/docker/start-temporal.sh)
- authorization.Authorizer
  - 判断是否有权限操作
- authorization.ClaimMapper
  - AuthInfo -> Claims
- authorization.TokenKeyProvider
  - alg+kid -> Key
  - 不能获取到当前 Claim 信息
  - 支持配置 RefreshInterval 更新
- fx - temporal 使用 fx 做 IoC
  - 每个 Service 有自己的 fx 上下文
  - ServerFx - root fx.App - Bootstrap
  - ServerImpl.Start 会启动所有的 ServicesMetadata
  - resource.BootstrapParams Service 启动上下文

```bash
# 实际会运行的服务
temporal-server start --service=history
temporal-server start --service=frontend
temporal-server start --service=matching
temporal-server start --service=worker
# 可以一次性启动
temporal-server start --service=history --service=frontend --service=matching --service=worker
```

## Auth

- https://github.com/temporalio/samples-server
  - Authorizer
    - 实现自定义的 auth 逻辑
    - 封装 temporal.NewServer

## Bootstrap

- install schema
  - https://github.com/temporalio/temporal/blob/v1.4.2/Makefile#L367-L383

```bash
docker run --rm -it \
  -e DB=postgresql \
  -e DB_PORT=5432 \
  -e POSTGRES_USER=temporal \
  -e POSTGRES_PWD=temporal \
  -e POSTGRES_SEEDS=postgresql \
  --entrypoint bash \
  temporalio/auto-setup:1.14.2
```

- PostgresSQL 支持 search_path, tls
  - --ca search_path=visibility --tls --tls-disable-host-verification

```bash
temporal-sql-tool --ep 127.0.0.1 -p 5432 -u temporal -pw temporal --pl postgres create --db temporal
temporal-sql-tool --ep 127.0.0.1 -p 5432 -u temporal -pw temporal --pl postgres --db temporal setup -v 0.0
temporal-sql-tool --ep 127.0.0.1 -p 5432 -u temporal -pw temporal --pl postgres --db temporal update-schema -d ./schema/postgresql/v96/temporal/versioned
temporal-sql-tool --ep 127.0.0.1 -p 5432 -u temporal -pw temporal --pl postgres create --db temporal_visibility
temporal-sql-tool --ep 127.0.0.1 -p 5432 -u temporal -pw temporal --pl postgres --db temporal_visibility setup-schema -v 0.0
temporal-sql-tool --ep 127.0.0.1 -p 5432 -u temporal -pw temporal --pl postgres --db temporal_visibility update-schema -d ./schema/postgresql/v96/visibility/versioned
```
