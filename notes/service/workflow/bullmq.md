---
tags:
  - NodeJS
---

# BullMQ

- [taskforcesh/bullmq](https://github.com/taskforcesh/bullmq)
  - MIT, TS, Redis
- [OptimalBits/bull](https://github.com/OptimalBits/bull)
  - MIT, JS, Redis
  - maintenance mode, 推荐 BullMQ

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
