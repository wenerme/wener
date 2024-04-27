---
title: Cadence
---

# Cadence

- [uber/cadence](https://github.com/uber/cadence) 是什么？
  - MIT, Golang
  - 分布式，大规模，持久化，高可用的异构调度引擎
  - 用于异步长时间运行的业务逻辑
  - Fault Tolerant Actor Framework
  - fault-oblivious stateful workflow
  - 提供 Java SDK、Go SDK
  - Cadence 更像是一个执行平台 - 例如 BNMP、Airflow DAG 可以在其之上运行
  - [durable function](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview)
- 使用场景
  - 周期执行 / 分布式 CRON
  - 微服务编排
  - Polling - 例如 文件上传下载、网络服务健康、等待外部服务生效
  - 事件驱动编程
  - 存储扫描 - 例如 规整 OSS 中文件元数据
  - 批处理 - 例如 报表
  - 基础设施开通 / Infrastructure provisioning - 例如 开通阿里云 ECS
  - CI/CD 和 部署
  - 运维管理 - 例如 DB 维护、开通账号
  - 交互应用 - 例如 在用户下单的同时后台进行欺诈检测
  - DSL 工作流 - BPMN, Apache Airflow, AWS Step Functions
  - 大数据 和 机器学习
- 组件
  - 请求处理： Microservices、Serverless、Actors
  - 存储： 数据、缓存
    - Cassandra / MySQL / Postgres
    - metric - Prometheus - 可选
    - ElastiCache+Kafka - 支持高级搜索
      - 例如 scanWorkflowExecutions
    - S3 - archival
  - Queues
  - Job Schedulers
  - Consensus： Leader Election、Sharding、Distributed Locks
- 高级特性
  - 高级可视化
  - 工作流归档
  - 跨数据中心复制
- 参考
  - [temporalio/temporal](https://github.com/temporalio/temporal)
    - cadence fork, 开发者的创业项目
  - [uber/cadence-web](https://github.com/uber/cadence-web)
    - 查看运行的流程
  - [uber-go/cadence-client](https://github.com/uber-go/cadence-client)
    - Go 客户端
  - [uber/cadence-idl](https://github.com/uber/cadence-idl)
    - proto,thrift
    - [uber/cadence/api/v1](https://github.com/uber/cadence-idl/tree/master/proto/uber/cadence/api/v1)
  - [yarpc/yarpc-go](https://github.com/yarpc/yarpc-go)
    - RPC - JSON, Thrift, and Protobuf
    - HTTP/1.1, gRPC, and TChannel
    - cadence 正在从 thrift 迁移为 grpc
  - helm banzai-charts [cadence](https://github.com/banzaicloud/banzai-charts/tree/master/cadence)

:::caution

- go thrift 版本冲突 [#1107](https://github.com/uber-go/cadence-client/issues/1107)
  - 用的很老的版本 0.9.3, 2016 年 - cadence 正在迁移为 grpc
- 配置一定 **不要修改** numOfShards - 只有迁移到新集群

:::

:::tip

- 单个 Workflow 限制
  - 50k 事件会告警
  - 200k 事件会被直接终止
  - 最多执行 100k 活动
- 推荐控制在 几千 signal - 通过 ContinueAsNew 避免单个 workflow 膨胀

:::

| port | proto           | service  |
| ---- | --------------- | -------- |
| 7833 | grpc            | frontend |
| 7933 | Thrift TChannel | frontend |
| 7834 | grpc            | history  |
| 7934 | Thrift TChannel |          |
| 7835 | grpc            | matching |
| 7935 | Thrift TChannel |          |
| 7939 |                 | worker   |
| 9090 | http/metrics    |

```bash
# macOS
brew install cadence-workflow
# Docker
docker run --rm ubercadence/cli:master

# CADENCE_CLI_ADDRESS --address
# CADENCE_CLI_DOMAIN --domain
```

## 快速开始

```bash
# 使用 postgres
curl -o docker-compose.yml https://raw.githubusercontent.com/uber/cadence/master/docker/docker-compose-postgres.yml
curl -O https://raw.githubusercontent.com/uber/cadence/master/docker/prometheus_config.yml
# UI http://localhost:8088
# Grafana http://localhost:3000
# postgres :5432,prometheus :9090,grafana :3000,cadence 8000-8003,7933-3935,7939,cadence-web :8088
docker-compose up

# 注册 domain
# --address=host.docker.internal:7932
docker run --network=host --rm ubercadence/cli:master --do test-domain domain register -rd 1 --global_domain=false
# domian 信息
docker run --network=host --rm ubercadence/cli:master --do test-domain domain describe
```

## Golang

- [helloworld/main.go](https://github.com/uber-common/cadence-samples/blob/master/cmd/samples/recipes/helloworld/main.go)

## Java

```java
// 流程接口
public interface TransferWorkflow {
  @WorkflowMethod(executionStartToCloseTimeoutSeconds = WEEK_SECOND)
  void execute(String fromAccountId, String toAccountId, Money amount);

  @SignalMethod // 信号方法
  void doCount(int n);
  @QueryMethod // 查询方法
  int void getCount();
}
// 事件接口
public interface Account {
  @ActivityMethod(scheduleToCloseTimeoutSeconds = 300)
  void debit(String fromAccountId, Money amount);
  @ActivityMethod(scheduleToCloseTimeoutSeconds = 300)
  void credit(String toAccountId, Money amount);
}
public interface TransferWorkflowImpl implements TransferWorkflow {
  // 支持配置自动重试
  private final Account account = Workflow.newActivityStub(Account.class);
  @Override
  public void execute(String fromAccountId, String toAccountId, Money amount){
    // 触发事件 - 阻塞该流程
    // 事件可能执行非常久 - 例如几天
    account.debit(fromAccountId,amount);
    try {
      account.credit(toAccountId,amount);
    } catch (IllegalArgumentException e){
      // 业务补偿逻辑
      account.credit(fromAccountId,amount);
    }

    // 可手动阻塞
    Workflow.sleep(Duration.ofDays(7));
  }

  // 本地状态 - 持久化的
  private int counter;
  @Override
  public void doCount(int n){
    counter += n;
  }
  @QueryMethod
  public int void getCount(){
    return counter;
  }
}
```

## 服务端

- SERVICES - 运行的服务
  - frontend, history, matching, worker
- CADENCE_STORE_PASSWORD
- CADENCE_VISIBILITY_STORE_PASSWORD
- https://github.com/banzaicloud/banzai-charts/blob/master/cadence/templates/server-configmap.yaml

| env                    | desc |
| ---------------------- | ---- |
| SQL_PLUGIN             |
| SQL_HOST               |
| SQL_PORT               |
| SQL_DATABASE           |
| SQL_USER               |
| SQL_PASSWORD           |
| SQL_CONNECT_ATTRIBUTES |
| CASSANDRA_HOST         |
| CASSANDRA_DB_PORT      |
| CASSANDRA_KEYSPACE     |
| CASSANDRA_USER         |
| CASSANDRA_PASSWORD     |

```bash
curl -LO https://raw.githubusercontent.com/uber/cadence/master/docker/config_template.yaml
docker run --rm -it \
  -v $PWD/config_template.yaml:/etc/cadence/config/config_template.yaml \
  -e DB=postgres -e POSTGRES_SEEDS=127.0.0.1 -e POSTGRES_USER=cadence -e POSTGRES_PWD=cadence \
  --name cadence ubercadence/server
```

# 概念 {#concept}

- Domain - 域划分 - 多租户的租户
  - 作为 TaskList 和 Workflow 的命名空间
  - 支持 SecurityToken
  - 配置数据留存时间
- TaskList
  - 任务列表、应用分组
  - 启动的 worker 会 pull 给定的 TaskList
  - 意味着必须要先确定 TaskList 的名字
- Worker
  - 守护进程
  - 本地注册 Workflow、Activity
    - 默认使用 函数名 作为名字
  - 秒级 时间精确度
  - WorkflowWorker
  - ActivityWorker
  - SessionWorker
  - ShadowWorker
- Workflow - 逻辑流程
  - 确定性、幂等性
  - 只能通过用 activity 与外界交互
  - go - workflow.Go
  - chan - workflow.Channel
  - select - workflow.Selector
  - time.Now - workflow.Now
  - time.Sleep - workflow.Sleep
  - log - workflow.GetLogger
  - Future
    - cadence 特有概念 - 异步操作、timer
    - 单个 Selector AddFuture 只会触发一次回调
      - Future 完成后不会再触发，除非重新构建 Selector 或 再次 Add
  - NewContinueAsNewError
    - 为避免 history 过大，建议重启
- Activity - 单个步骤活动
  - 返回必需包含 error
  - TaskToken - 唯一标识 -> DomainName, WorkflowID, ActivityID
- Session
  - 调度多个 Activity 到相同节点
- Replayer
  - 重放检测 workflow 是否变化
- Shadower
  - 从服务端拉取历史进行重放
  - 依赖高级搜索 - Elastic 存储
- Archiver
  - 负责归档和取回历史
  - workflowID + runID 定位
  - 存储: local, S3, Kafka
  - history archival
  - visibility archival
- Advanced visibility
  - 基于 SearchAttributes 进行搜索 - 只支持基础类型
  - 需要 Elastic
  - Memo 列表可见，但不会索引 - 支持任意类型
- ActivityTask
  - 由 activity worker 处理
- DecisionTask
  - 由 workflow worker 处理
  - 处理外部事件 - signal、timer
- 服务角色
  - FE - Front End - 前端 API 服务
  - HS - History Service - 核心工作流编排
    - Cross DC replication
  - MS - Matching Service - workflow/activity <-> worker
  - WS - Worker Service - 内部服务，例如 archiving
  - Worker - 用户编写
- query - 查询流程状态
  - `__stack_trace`
- Event
  - Signal - 外部事件

## Domain

## Activity

- 应用代码
- 长时间运行的 - 心跳
- 异步
- 基于策略重试
- 路由到主机和进程
- 通过队列分发
- Worker 速率和并发限制
- 队列速率限制

概念类似于 Queue

### 实现

- 超时策略
  - ScheduleToStart
  - StartToClose
  - ScheduleToClose
  - Heartbeat
- 重试策略
  - InitialInterval
  - BackoffCoefficient
  - MaximumInterval
  - MaximumAttempts
  - ExpirationInterval
  - NonRetryableErrorReasons

## Workflow

- 虚拟对象 - Java、Go
  - 例如 用户、操作目标 - 支持查询和相关操作
  - 每个虚拟对象都有自己的状态 - 因此系统中的 Entity 都会映射到 Workflow
- 事务性
- 编排 Activities
- 响应外部事件
- 有状态 - 本地变量和栈
- 可查询
- 长时间存在
- 持久化计时器

### 实现

- 每个域下 每个 Workflow 有一个唯一 ID - 通常是业务对象 ID - 例如订单、客户的 ID
  - Domain Name, Workflow ID, Run ID
- 每次执行有 Run ID
- 复用策略
  - AllowDuplicateFailedOnly - 默认 - 允许失败的流程重复执行
  - AllowDuplicate - 如果流程当前未运行
  - RejectDuplicate - 不允许重复执行

### 注意

- 没有直接的 API 操作，通过 Activity 进行响应
- 核心是编排 Activity
- 可以理解为单线程的应用逻辑 - 但实际会迁移到不同主机运行
- 与传统意义 Workflow 不同 - orchestrator、[durable function](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview)
  - 传统意义 Workflow
    - 从某个地方开始，到某个地方结束
    - LCDP / 低代码开发平台 - 图形化替代编码
- 类似于一个方法
- UI 的流程构建最终也是映射为代码层面的执行 - workflow 是 code first
  - Workflow 再去支持 UI 的 graph
- 可以将多个 Task 映射为单个 Workflow - 可通过变量控制
  - 逻辑处理更加清晰
  - 减少 DB Load
  - 思考方式会有所不同
- 异构和 LongRun 的特性
  - 可以用于管理其他平台
    - 管理 CI、CD 执行
    - 管理 Flink、Spark 任务
  - 可用于执行周期性任务
    - 每月报表
    - 各种长短周期任务

## 配置

- /etc/cadence/config/config_template.yaml
  - [docker/config_template.yaml](https://github.com/uber/cadence/blob/master/docker/config_template.yaml)
  - 配置模板
- /etc/cadence/config/dynamicconfig/config.yaml
- https://github.com/uber/cadence/blob/master/common/config/config.go
- https://github.com/uber/cadence/blob/master/common/service/config.go
- domain
  - Retention

```yaml
history:
  # 2K -> SQL
  # 8K -> Cassandra
  numHistoryShards: 4

  # 存储引用
  defaultStore: default
  visibilityStore: visibility
  advancedVisibilityStore: es-visibility
  # 存储配置
  datastores:
    default:
      nosql:
        pluginName: "cassandra"
      sql:
        pluginName: "postgres"
        encodingType: "thriftrw"
        decodingTypes: ["thriftrw"]
        databaseName: {{ default .Env.DBNAME "cadence" }}
        connectAddr: "{{ default .Env.POSTGRES_SEEDS "" }}:{{ default .Env.DB_PORT "5432" }}"
        connectProtocol: "tcp"
        user: {{ default .Env.POSTGRES_USER "" }}
        password: {{ default .Env.POSTGRES_PWD "" }}
        maxConns: 20
        maxIdleConns: 20
        maxConnLifetime: "1h"
        tls:
          enabled: true
          sslmode: require
      elasticsearch:
        version: {{ default .Env.ES_VERSION "" }}
        username: {{ default .Env.ES_USER "" }}
        password: {{ default .Env.ES_PWD "" }}
        url:
          scheme: "http"
          host: "{{ default .Env.ES_SEEDS "" }}:{{ default .Env.ES_PORT "9200" }}"
        indices:
          visibility: {{ default .Env.VISIBILITY_NAME "cadence-visibility-dev" }}
    visibility:
      sql:
        # 一般会用不同的库
        databaseName: {{ default .Env.VISIBILITY_DBNAME "cadence_visibility" }}
    es-visibility:
dynamicConfigClient:
  filepath: /etc/cadence/config/dynamicconfig/config.yaml
  pollInterval: 10s
```

```yaml
# 动态配置
frontend.visibilityListMaxQPS:
  - value: 1000
    constraints:
      domainName: 'domainA'
  - value: 2000
    constraints:
      domainName: 'domainB'
```

```yaml

# 单节点
frontend.persistenceMaxQPS: 2000
# 全局
frontend.persistenceGlobalMaxQPS: 2000
# visibility db
frontend.visibilityListMaxQPS: 10
frontend.esVisibilityListMaxQPS: 30

matching.persistenceMaxQPS: 3000
matching.persistenceGlobalMaxQPS: 3000
matching.persistenceGlobalMaxQPS: 2000

history.persistenceMaxQPS: 9000
history.persistenceGlobalMaxQPS: 9000
history.historyVisibilityOpenMaxQPS:
history.historyVisibilityClosedMaxQPS:
```

## 存储结构

- [schema/postgres](https://github.com/uber/cadence/tree/master/schema/postgres)
- domains
- domain_metadata
- shards
- transfer_tasks
- cross_cluster_tasks
- executions
- current_executions
- buffered_events
- tasks
- task_lists
- replication_tasks
- replication_tasks_dlq
- timer_tasks
- activity_info_maps
- timer_info_maps
- child_execution_info_maps
- request_cancel_info_maps
- signal_info_maps
- buffered_replication_task_maps
- signals_requested_sets
- history_node
- history_tree
- queue
- queue_metadata

## schema

```bash
go build -o cadence-sql-tool github.com/uber/cadence/cmd/tools/sql
# 默认存储 和 visibility 都需要
env $(cat .env | xargs) ./cadence-sql-tool setup-schema -v 0.0
env $(cat .vis | xargs) ./cadence-sql-tool setup-schema -v 0.0
# update - 注意 默认 和 visibility 路径不同
env $(cat .env | xargs) go run ./cmd/tools/sql/ update-schema -d schema/postgres/cadence/versioned/
env $(cat .vis | xargs) go run ./cmd/tools/sql/ update-schema -d schema/postgres/visibility/versioned/
```

```ini title=".env"
SQL_PLUGIN=postgres
SQL_HOST=192.168.1.1
SQL_PORT=5432
SQL_DATABASE=cadence
SQL_USER=cadence
SQL_PASSWORD=
SQL_CONNECT_ATTRIBUTES=sslmode=require
```

:::caution

- postgres 开启 --tls 要求提供 ca - 实际不需要，目前要改检测代码
  - [#4639](https://github.com/uber/cadence/pull/4639)

:::

## Helm

- https://github.com/wenerme/charts/tree/master/banzai/charts/cadence
  - 同步自 banzai charts
  - banzai 国内无法访问
- existingSecret 包含 password 字段

:::caution

- helm schema job 不支持 postgres，不支持使用 existingSecret
  - 建议本地迁移
  - [banzaicloud/banzai-charts#1301](https://github.com/banzaicloud/banzai-charts/issues/1301)
    Setup Job doesn't pull value from secret
- service 未暴露 grpc 端口
  - [banzaicloud/banzai-charts#1305](https://github.com/banzaicloud/banzai-charts/issues/1305)

:::

# FAQ

## Cannot register global domain when not enabled

cli 注册添加 `--global_domain=false`

## Persistence Max QPS Reached

数据库限制

## Persistence Max QPS Reached for List Operations

visibility 数据库限制
