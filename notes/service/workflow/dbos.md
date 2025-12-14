---
tags:
  - Scheduler
---

# DBOS

- DBOS
  - 存储使用 Postgres
    - 表结构 https://docs.dbos.dev/explanations/system-tables
- [dbos-inc/dbos-transact-ts](https://github.com/dbos-inc/dbos-transact-ts)
  - MIT, TypeScript
  - Ultra-Lightweight Durable Execution in TypeScript
  - npm:@dbos-inc/dbos-sdk
- [dbos-inc/dbos-transact-py](https://github.com/dbos-inc/dbos-transact-py)
  - MIT, Python
  - Ultra-Lightweight Durable Execution in Python
- [dbos-inc/awesome-dbos](https://github.com/dbos-inc/awesome-dbos)
- 参考
  - https://supabase.com/blog/durable-workflows-in-postgres-dbos
    - https://news.ycombinator.com/item?id=42379974

## ts

- https://github.com/dbos-inc/dbos-transact-ts/blob/main/src/dbos.ts

```ts
class Example {
  @DBOS.step()
  static async step_one() {}

  @DBOS.step()
  static async step_two() {}

  @DBOS.workflow()
  static async workflow() {
    await Example.step_one();
    await Example.step_two();
  }
}

import { DBOS } from '@dbos-inc/dbos-sdk';

function runServer() {
  DBOS.launch();
}
```

- DBOS.workflow
  - **deterministic**
  - DBOS.step
    - at least once
  - DBOS.transaction
    - exactly once
    - DBOS.drizzleClient
    - DBOS.knexClient
    - DBOS.typeORMClient
    - DBOS.prismaClient
- DBOS.scheduled
  - 注册方法 crontab
  - 是本地调度启动的
  - 通过 WorkflowID 去重 const workflowUUID = `sched-${this.scheduledMethodName}-${nextExecTime.toISOString()}`;`
- DBOS.workflowID - UUID
- DBOS.startWorkflow
  - 开启一个新的工作流
  - `DBOS.startWorkflow(Example).hello("Wener")`
- DBOS.retrieve_workflow
- DBOS.setEvent
  - 设置 KV
- DBOS.getEvent - 获取 KV by workflowID
- HTTP
  - @DBOS.postApi
  - @DBOS.getApi
  - @DBOS.putApi
- `DBOS.send(destinationID,message,topic)`
- `DBOS.recv(topic,timeoutSeconds)`
- DBOS.withNextWorkflowID
- WorkflowQueue
  - 控制并行
  - Rate Limit
  - In-Order Processing
- `DBOS.logger`
- Auth
  - DBOS.defaultRequiredRole
  - DBOS.requiredRole
  - @Authentication - 提供 Auth 信息
- @StoredProcedure - 存储过程
  - 第一个参数 ctxt: StoredProcedureContext
  - @dbos-inc/dbos-compiler
- 实例化的 Class
  - `DBOS.configureInstance(MyClass, 'myname', args)`
  - `extends ConfiguredInstance`
- Testing
  - await DBOS.setUpHandlerCallback()
- Admin API
  - `GET /dbos-healthz`
  - `GET /dbos-perf`
  - `POST /dbos-workflow-recovery`

```ts
export interface StepConfig {
  retriesAllowed?: boolean; // 是否允许重试失败？（默认 false）
  intervalSeconds?: number; // 第一次重试前等待的秒数（默认 1）。
  maxAttempts?: number; // 最大重试次数（默认 3）。如果错误发生次数超过此值，则抛出异常。
  backoffRate?: number; // 重试间隔增加的倍数（默认 2）。
}

// 提供 workflowID
await DBOS.withNextWorkflowID('very-unique-id', async () => {
  return await Example.exampleWorkflow('one', 'two');
});

class ScheduledExample {
  // 定时任务
  // mode: SchedulerMode.ExactlyOncePerInterval 一个周期内只执行一次
  @DBOS.scheduled({ crontab: '*/30 * * * * *' })
  @DBOS.workflow()
  static async scheduledFunc(schedTime: Date, startTime: Date) {
    DBOS.logger.info(`I am a workflow scheduled to run every 30 seconds`);
  }
}
```

```yaml title="dbos-config.yaml"
# To enable auto-completion and validation for this file in VSCode, install the RedHat YAML extension
# https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml

# yaml-language-server: $schema=https://raw.githubusercontent.com/dbos-inc/dbos-transact/main/dbos-config.schema.json

language: node
database:
  hostname: localhost
  port: 5432
  username: postgres
  password: ${PGPASSWORD}
  connectionTimeoutMillis: 3000
  # drizzle, knex, prisma, typeorm
  app_db_client: knex
  local_suffix: false
  migrate:
    - npx knex migrate:latest
  rollback:
    - npx knex migrate:rollback
runtimeConfig:
  start:
    - node dist/main.js
```

## schema

```sql
-- DBOS 系统库最终表结构（已折叠全部 alter，schema 默认 dbos）
CREATE SCHEMA IF NOT EXISTS dbos;

-- 迁移版本记录
CREATE TABLE dbos.dbos_migrations (
  version bigint PRIMARY KEY -- 迁移版本号
);

-- 工作流状态主表
CREATE TABLE dbos.workflow_status (
  workflow_uuid text PRIMARY KEY, -- 工作流唯一标识
  status text, -- 状态（ENQUEUED/PENDING/SUCCESS/ERROR/CANCELLED等）
  name text, -- 工作流函数名
  class_name varchar(255), -- 类名（若为类方法）
  config_name varchar(255), -- 配置名
  authenticated_user text, -- 认证用户
  assumed_role text, -- 运行时假设角色
  authenticated_roles text, -- 认证角色列表（序列化）
  request text, -- 请求上下文（序列化）
  output text, -- 最终输出（序列化）
  error text, -- 最终错误（序列化）
  executor_id text, -- 执行器 ID（本地/VM）
  application_version text, -- 应用版本
  application_id text, -- 应用标识
  created_at bigint NOT NULL DEFAULT (EXTRACT(EPOCH FROM now())*1000)::bigint, -- 创建时间 ms
  updated_at bigint NOT NULL DEFAULT (EXTRACT(EPOCH FROM now())*1000)::bigint, -- 更新时间 ms
  recovery_attempts bigint DEFAULT 0, -- 恢复/重试次数
  queue_name text, -- 队列名
  workflow_timeout_ms bigint, -- 超时时长 ms
  workflow_deadline_epoch_ms bigint, -- 截止时间戳 ms
  inputs text, -- 输入参数（序列化）
  started_at_epoch_ms bigint, -- 实际开始时间戳 ms
  deduplication_id text, -- 队列去重 ID
  priority integer NOT NULL DEFAULT 0, -- 队列优先级（数字越小越高）
  queue_partition_key text, -- 队列分区键
  forked_from text, -- 分叉来源 workflow_uuid
  owner_xid varchar(40) -- 拥有者事务 ID（乐观并发）
);

CREATE UNIQUE INDEX uq_workflow_status_queue_name_dedup_id
  ON dbos.workflow_status (queue_name, deduplication_id);
CREATE INDEX workflow_status_created_at_index
  ON dbos.workflow_status (created_at);
CREATE INDEX workflow_status_executor_id_index
  ON dbos.workflow_status (executor_id);
CREATE INDEX workflow_status_status_index
  ON dbos.workflow_status (status);
CREATE INDEX idx_workflow_status_queue_status_started
  ON dbos.workflow_status (queue_name, status, started_at_epoch_ms);
CREATE INDEX idx_workflow_status_forked_from
  ON dbos.workflow_status (forked_from);

-- 工作流入参（归档）
CREATE TABLE dbos.workflow_inputs (
  workflow_uuid text PRIMARY KEY
    REFERENCES dbos.workflow_status(workflow_uuid) ON UPDATE CASCADE ON DELETE CASCADE,
  inputs text NOT NULL -- 输入参数（序列化，写一次）
);

-- 步骤/事务输出，幂等结果缓存
CREATE TABLE dbos.operation_outputs (
  workflow_uuid text NOT NULL
    REFERENCES dbos.workflow_status(workflow_uuid) ON UPDATE CASCADE ON DELETE CASCADE,
  function_id integer NOT NULL, -- 步骤编号
  output text, -- 输出（序列化）
  error text, -- 错误（序列化）
  function_name text NOT NULL DEFAULT '', -- 步骤函数名
  child_workflow_id text, -- 子工作流 ID（若有）
  started_at_epoch_ms bigint, -- 开始时间 ms
  completed_at_epoch_ms bigint, -- 完成时间 ms
  PRIMARY KEY (workflow_uuid, function_id)
);

-- 异步消息（send/recv），带通知触发器
CREATE TABLE dbos.notifications (
  message_uuid text PRIMARY KEY DEFAULT uuid_generate_v4(), -- 消息 ID
  destination_uuid text NOT NULL
    REFERENCES dbos.workflow_status(workflow_uuid) ON UPDATE CASCADE ON DELETE CASCADE,
  topic text, -- 主题
  message text NOT NULL, -- 消息体
  created_at_epoch_ms bigint NOT NULL DEFAULT (EXTRACT(EPOCH FROM now())*1000)::bigint -- 创建时间 ms
);
CREATE INDEX idx_workflow_topic
  ON dbos.notifications (destination_uuid, topic);
-- 触发器：INSERT 时 pg_notify('dbos_notifications_channel', destination_uuid||'::'||topic)

-- 事件存储（setEvent/getEvent），带通知触发器
CREATE TABLE dbos.workflow_events (
  workflow_uuid text NOT NULL
    REFERENCES dbos.workflow_status(workflow_uuid) ON UPDATE CASCADE ON DELETE CASCADE,
  key text NOT NULL, -- 事件键
  value text NOT NULL, -- 事件值
  PRIMARY KEY (workflow_uuid, key)
);
-- 触发器：INSERT 时 pg_notify('dbos_workflow_events_channel', workflow_uuid||'::'||key)

-- 调度状态（scheduled workflow 上次执行时间）
CREATE TABLE dbos.scheduler_state (
  workflow_fn_name text PRIMARY KEY, -- 工作流函数名
  last_run_time bigint NOT NULL -- 上次运行时间 ms
);

-- 队列元数据（排队、并发、去重）
CREATE TABLE dbos.workflow_queue (
  workflow_uuid text PRIMARY KEY
    REFERENCES dbos.workflow_status(workflow_uuid) ON UPDATE CASCADE ON DELETE CASCADE,
  queue_name text NOT NULL, -- 队列名
  created_at_epoch_ms bigint NOT NULL DEFAULT (EXTRACT(EPOCH FROM now())*1000)::bigint, -- 入队时间 ms
  started_at_epoch_ms bigint, -- 开始执行时间 ms
  completed_at_epoch_ms bigint, -- 完成时间 ms
  executor_id text, -- 执行器 ID
  deduplication_id text, -- 队列去重 ID
  priority integer NOT NULL DEFAULT 0, -- 队列优先级
  UNIQUE (queue_name, deduplication_id)
);

-- 事件分发状态存储（外部服务用）
CREATE TABLE dbos.event_dispatch_kv (
  service_name text NOT NULL, -- 服务名
  workflow_fn_name text NOT NULL, -- 工作流函数名
  key text NOT NULL, -- 键
  value text, -- 值
  update_seq decimal(38,0), -- 版本序号
  update_time decimal(38,15), -- 更新时间
  PRIMARY KEY (service_name, workflow_fn_name, key)
);

-- 流式输出数据（writeStream）
CREATE TABLE dbos.streams (
  workflow_uuid text NOT NULL
    REFERENCES dbos.workflow_status(workflow_uuid) ON UPDATE CASCADE ON DELETE CASCADE,
  key text NOT NULL, -- 流键
  value text NOT NULL, -- 序列化流值
  offset integer NOT NULL, -- 偏移
  function_id integer NOT NULL DEFAULT 0, -- 写入的步骤/函数 ID
  PRIMARY KEY (workflow_uuid, key, offset)
);

-- 工作流事件历史（保留每次写入）
CREATE TABLE dbos.workflow_events_history (
  workflow_uuid text NOT NULL
    REFERENCES dbos.workflow_status(workflow_uuid) ON UPDATE CASCADE ON DELETE CASCADE,
  function_id integer NOT NULL, -- 对应步骤/函数 ID
  key text NOT NULL, -- 事件键
  value text NOT NULL, -- 事件值
  PRIMARY KEY (workflow_uuid, function_id, key)
);
```
