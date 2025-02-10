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
