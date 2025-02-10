---
tags:
  - Scheduler
---

# Design Scheduler

| Feature          | for              |
| ---------------- | ---------------- |
| Priority         | 优先级           |
| Concurrency      | 并发             |
| Delayed          | 延迟任务         |
| Global events    | 全局事件         |
| Rate Limiter     | 速率限制         |
| Pause/Resume     | 暂停/恢复        |
| Sandboxed worker | 沙箱工作         |
| Repeatable jobs  | 可重复任务, cron |
| Atomic ops       | 原子操作         |
| Persistence      | 持久化, 后端存储 |
| UI               | 用户界面         |

- NodeJS
  - BullMQ
    - redis based job queue
  - bree
    - job task scheduler with worker threads
  - Cron
  - [DBOS](https://github.com/dbos-inc/dbos-transact-ts)
    - Ultra-Lightweight Durable Execution in TypeScript
  - `@nestjs/schedule`
    - 封装的 npm:cron
- Java
  - quartz
  - xxl-job
- KEDA - Kubernetes Event-driven Autoscaling
  - Scaler 也可以理解为潜在的 Trigger 方式
  - https://keda.sh/docs/latest/scalers/
- Fission
  - Trigger
    - HTTP
    - Message Queue
    - Timer
  - https://fission.io/docs/usage/triggers/

---

- 重复模式 / Trigger - 核心逻辑是给一个 date 计算下一个 date
  - cron
  - interval
  - calendar
- 场景
  - Job
  - Message
  - Long running task
  - Durable function

## quartz

- Quartz Scheduler
- org.quartz-scheduler:quartz
- 区分 Job 和 Trigger
- [quartz-scheduler/quartz](https://github.com/quartz-scheduler/quartz)
