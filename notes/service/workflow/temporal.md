---
title: temporal
---

# temporal

- [temporalio/temporal](https://github.com/temporalio/temporal)
  - cadence fork, 包含原始团队人员
  - 更适合中小规模
    - 使用更方便
    - 支持更多 SDK - Go, Java, PHP, Typescript
    - 没有 uber 包袱 - 环境、rpc、历史实现

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

# tctl in docker
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
  - 官方不推荐生产直接使用 Helm 部署
  - https://docs.temporal.io/blog/temporal-and-kubernetes/
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

# 健康状态 - 正常为 SERVING
tctl cluster health
tctl --ns default namespace register --rd 7 --desc "Default namespace for Temporal Server."
# 可能需要等一会儿
tctl --ns default namespace describe

# 管理: workflow/wf, shard/shar, history_host/hist, taskqueue/tq, membership, cluster/cl, dlq, db, decode
tctl admin
# 集群管理 - 搜索属性、remote-cluster
tctl admin cluster
```

## Server

- [Temporal Server options](https://docs.temporal.io/docs/server/options)
- authorization.Authorizer
  - 判断是否有权限操作
  - 基于当前 Claim 的 Role
- authorization.ClaimMapper
  - AuthInfo -> Claims -> Namespace&Role
- authorization.TokenKeyProvider
  - alg+kid -> Key
  - 不能获取到当前 Claim 信息
  - 支持配置 RefreshInterval 更新
- fx - temporal 使用 fx 做 IoC
  - 每个 Service 有自己的 fx 上下文
  - ServerFx - root fx.App - Bootstrap
  - ServerImpl.Start 会启动所有的 ServicesMetadata
  - resource.BootstrapParams Service 启动上下文
- 组件
  - frontend - 网关
    - 限流、路由、认证
  - history
    - 维护数据 - 状态、队列、计时器
  - matching
    - 分发任务
  - worker
    - 执行内部后台任务
- 命名空间
  - temporal-system - 内部命名空间 - retention=7d
  - defaulr - 默认命名空间
- 查询
  - `__stack_trace`
  - `__open_sessions`
- 授权
  - Claim `{"permission":["<namespace>:"permission""]}`
  - namespace=system - 特殊 namespace
  - permission <-> role
    - read - Reader
    - write - Writer
    - admin - Admin
    - worker - Worker
    - 其他 - Undefined
  - role 有继承逻辑


```bash
# 实际会运行的服务
temporal-server start --service=history
temporal-server start --service=frontend
temporal-server start --service=matching
temporal-server start --service=worker
# 可以一次性启动
temporal-server start --service=history --service=frontend --service=matching --service=worker
```

- 目录结构
  - ./ - $PWD - $TEMPORAL_ROOT - 根目录
  - config/ - $TEMPORAL_CONFIG_DIR - 配置目录
    - development.yaml - $TEMPORAL_ENVIRONMENT.yaml - 环境配置
    - dynamicconfig/ - 动态配置 - dynamicConfigClient.dynamicconfig

### 配置

- https://docs.temporal.io/docs/server/configuration/
- 配置对象 [go.temporal.io/server/common/config#Config](https://pkg.go.dev/go.temporal.io/server/common/config#Config)

```yaml
log:
  stdout: true
  # debug, info, warn, error or fatal, info.
  level: info
  outputFile:
# 持久化配置
persistence:
  numHistoryShards: 1000
  defaultStore: default
  visibilityStore: visibility
  advancedVisibilityStore: es-visibility
  datastores:
    default:
      sql:
        pluginName: postgres
        databaseName:
        connectAddr: 127.0.0.1:5432
        # tcp,unix
        connectProtocol: tcp
        user:
        password:
        maxConns:
        maxIdleConns:
        maxConnLifetime: 1h
        tls:
          enabled: true
          enableHostVerification: false
        connectAttributes:
          search_path: temporal

# 全局配置
global:
  membership:
    maxJoinDuration: 30s
  authorization:
    jwtKeyProvider:
      keySourceURIs: []
      refreshInterval: 1m
    permissionsClaimName: permissions
    authorizer:
    claimMapper:

# 集群元数据 - 用于多集群复制
clusterMetadata:
  # 是否允许全局命名空间
  enableGlobalNamespace: false
  failoverVersionIncrement: 10
  masterClusterName: 'active'
  # 集群名字 - 启动后便不可变
  currentClusterName: 'active'
  clusterInformation:
    active:
      enabled: true
      initialFailoverVersion: 0
      # 支持 DNS dns:///
      rpcAddress: '127.0.0.1:7233'
  replicationConsumer:
    # kafka,rpc
    type: rpc
```

## Auth

- https://github.com/temporalio/samples-server
  - Authorizer
    - 实现自定义的 auth 逻辑
    - 封装 temporal.NewServer

```json
{
  "permissions": ["namespace:permission"]
}
```


## Bootstrap

- install schema
  - https://github.com/temporalio/temporal/blob/v1.4.2/Makefile#L367-L383
- docker 启动
  - [docker/auto-setup.sh](https://github.com/temporalio/temporal/blob/master/docker/auto-setup.sh)
  - [docker/entrypoint.sh](https://github.com/temporalio/temporal/blob/master/docker/entrypoint.sh)
    - 使用 [dockerize](https://github.com/jwilder/dockerize) 生成配置
    - /etc/temporal/config/config_template.yaml -> /etc/temporal/config/docker.yaml
      - [config_template.yaml](https://github.com/temporalio/temporal/blob/master/docker/config_template.yaml)
  - [docker/start-temporal.sh](https://github.com/temporalio/temporal/blob/master/docker/start-temporal.sh)
- auto-setup
  - https://docs.temporal.io/blog/auto-setup/

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
