---
tags:
  - NodeJS
---

# BullMQ

:::tip

- 只依赖 Redis
- 支持 delay, debounce, flow(parent,children), repeat, rate limit

:::

- [taskforcesh/bullmq](https://github.com/taskforcesh/bullmq)
  - MIT, TS, Redis
- [OptimalBits/bull](https://github.com/OptimalBits/bull)
  - MIT, JS, Redis
  - maintenance mode, 推荐 BullMQ
- queueName vs jobName
  - Worker 使用 queue 来区分
  - job 包含 jobName - 不能用来分流给 Worker，但可以让 Worker 处理多种 job
- 去重机制
  - debounce - 会生成 debounced 事件
  - jobId - 会生成 duplicated 事件

**Client**

```ts
import { Queue } from 'bullmq';

const queue = new Queue('Paint');

queue.add('cars', { color: 'blue' });
```

**Worker**

```ts
import { Worker } from 'bullmq';

const worker = new Worker('Paint', async (job) => {
  if (job.name === 'cars') {
    await paintCar(job.data.color);
  }
});
```

**Listener**

```ts
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId }) => {
  console.log('done painting');
});

queueEvents.on('failed', ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
  console.error('error painting', failedReason);
});
```

## Notes

- 处理中可以 job.moveToDelayed 然后 throw DelayedError
  - 让 job 进入等待状态
- 处理中可以 job.moveToWaitingChildren 然后 throw WaitingChildrenError
  - 让 job 进入等待 children 的状态
- throw UnrecoverableError 可以避免 retry
- throw throw Worker.RateLimitError 可以实现手动 rate-limit

# FAQ

## BullMQ vs Bull

| vs                          | bullmq                           | bull   |
| --------------------------- | -------------------------------- | ------ |
| Year                        | 2019                             | 2013   |
| job event                   | stream                           | pubsub |
| Workers and Event listeners | separate                         | same   |
| Scheduler Process           | 单独 Scheduler                   | same   |
| Job Dependencies            | 有                               | 无     |
| Priority Queueing           | 有,支持 rate-limited, scheduling | 有     |
