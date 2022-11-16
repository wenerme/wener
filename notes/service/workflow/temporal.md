---
title: temporal
---

# temporal

- [temporalio/temporal](https://github.com/temporalio/temporal)
  - cadence fork, 包含原始团队人员
  - Persistence - Cassandra, PostgreSQL, MySQL
  - Workflow search - Elasticsearch v6.8+ - 高级搜索
  - 更适合中小规模
    - 使用更方便
    - 支持更多 SDK - Go, Java, PHP, Typescript
    - 没有 uber 包袱 - 环境、rpc、历史实现
  - [temporalite](./temporalite.md) 支持 SQLite



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

# temporalite
temporalite start -f temporalite.db
```

:::note

- sqlite in production [#3366](https://github.com/temporalio/temporal/issues/3366)
- Replace elastic with zinc [#2380](https://github.com/temporalio/temporal/issues/2380)

:::

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
    - HistoryCountLimitError **50000**
  - Search Attributes
    - SearchAttributesNumberOfKeysLimit 100 - 数量
    - SearchAttributesTotalSizeLimit 2KB - 单个属性大小
    - SearchAttributesSizeOfValueLimit 40KB - 中大小
  - Child Workflow - History 独立于 Parent - 可用于 Partition History 压力
    - 每个 Workflow 最多 1000 Child Workflow
      - Child Workflow 的 Child Workflow 不受影响
      - 可以多层级
    - 尽量在单层 Workflow History 有压力的时候再使用
      - 尽量 Activities 都在一层 Workflow
  - ContinueAsNew - 从新计 History - 用于减缓 History 压力
- [Antipatterns & Best practices](https://docs.temporal.io/docs/server/production-deployment#further-things-to-consider)

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
- Workflow
  - Workflow Task Timeout - 10s
  - ChildWorkflow
    - ParentClosePolicy
      - ABANDON - Parent 结束, Child 不受影响
      - TERMINATE - 立即终止
      - REQUEST_CANCEL - 请求取消
- Activity
  - 状态
    - Scheduled -> Started -> Completed
    - Scheduled -> Started -> Retry Backoff -> Scheduled
  - 超时
    - ScheduleToStart - 默认 ∞
      - 每次 Scheduled -> Started
    - StartToClose - 默认=ScheduleToStart
      - 每次 Started -> Completed
    - ScheduleToClose - 默认 ∞ - 总体绝对时间
      - Scheduled -> \* -> Completed
  - LocalActivity
    - 用于本地快速执行的函数 - < 10s
    - 使用更少的 Temporal 服务资源 - 不记录
    - 本地执行 - 无 队列、流控、限流、路由 能力
    - 不需要 Heartbeating
    - 更低延时
    - 尽量使用 正常 Activity - [LocalActivity vs Activity](https://community.temporal.io/t/local-activity-vs-activity/290/3)
- TaskQueue
  - Sticky Execution - 默认开启 - DisableStickyExecution
    - Worker 完成了 Workflow 的第一个任务，则会开始拉取之后的更新
    - 集群暂时不需要进行调度
    - StickyScheduleToStartTimeout=5s - 当粘性 执行/Pull 超时后，集群恢复调度 Workflow
    - StickyWorkflowCacheSize=10,000
- Signal
  - Recipient - WorkflowExecution=Namespace + Workflow Id
  - Id
  - Name - queue
- AdvancedVisibility
  - [ListFilter](https://docs.temporal.io/docs/content/what-is-a-list-filter/)
  - [默认搜索属性](https://docs.temporal.io/docs/temporal-explained/visibility#default-search-attributes)
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

## temporal-web

- [temporalio/web](https://github.com/temporalio/web)
  - JS+Vue

```bash
docker run --rm -it \
  -v $PWD/config.yml:/usr/app/server/config.yml \
  -p 8088:8088 \
  temporalio/web:latest
```

```yaml title="config.yml"
auth:
  enabled: true # Temporal Web checks this first before reading your provider config
  providers:
    - label: 'Auth0 oidc' # for internal use; in future may expose as button text
      type: oidc # for futureproofing; only oidc is supported today
      issuer: https://myorg.us.auth0.com
      client_id: xxxxxxxxxxxxxxxxxxxx
      client_secret: xxxxxxxxxxxxxxxxxxxx
      scope: openid profile email
      audience: # identifier of the audience for an issued token (optional)
      callback_base_uri: http://localhost:8088
      pass_id_token: false # adds ID token as 'authorization-extras' header with every request to server
```
