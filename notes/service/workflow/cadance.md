---
title: Cadence
---

# Cadence

- 是什么？
  - 分布式，大规模，持久化，高可用的异构调度引擎
  - 用于异步长时间运行的业务逻辑
- [uber/cadence](https://github.com/uber/cadence)
  - Golang
  - 提供 Java SDK、Go SDK
  - Cadence 更像是一个执行平台 - 例如 BNMP、Airflow DAG 可以在其之上运行
  - fault-oblivious stateful workflow
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
    - ElastiCache+Kafka - 高级搜索
    - S3 - archival
  - Queues
  - Job Schedulers
  - Consensus： Leader Election、Sharding、Distributed Locks
  - 服务
    - Frontend
    - Matching
    - History
      - 包含 Cross DC replication
    - Worker
- 参考
  - [uber/cadence-web](https://github.com/uber/cadence-web)
    - 查看运行的流程

```bash
# macOS
brew install cadence-workflow
# Docker
docker run --rm ubercadence/cli:master
```

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

# 概念

## Activity

- 应用代码
- 长时间运行的 - 心跳
- 异步
- 基于策略重试
- 路由到主机和进程
- 通过队列分发
- Worker 速率和兵法限制
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
  - AllowDuplicate
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
