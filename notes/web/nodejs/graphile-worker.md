---
title: graphile-worker
---

# graphile-worker

- [graphile/worker](https://github.com/graphile/worker)
  - MIT, TS
  - 支持 cron
  - PostgreSQL
    - LISTEN/NOTIFY
      - pgbouncer 需要 connection 模式
    - 默认 schema graphile_worker

```bash
npm add graphile-worker
```

```bash
docker run \
  --init \
  --rm -it \
  --network=host \
  -v "$PWD/tasks":/worker/tasks \
  graphile/worker \
  -c "postgres://postgres:postgres@localhost:5432/postgres"
```

- GRAPHILE_ENABLE_DANGEROUS_LOGS
- GRAPHILE_LOGGER_DEBUG

## Library

```ts
// worker
import { run, quickAddJob } from 'graphile-worker';
import type { Task, WorkerUtils } from 'graphile-worker';

const runner = await run({
  connectionString: 'postgres:///my_db',
  concurrency: 5,
  // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
  noHandleSignals: false,
  pollInterval: 1000,
  // you can set the taskList or taskDirectory but not both
  taskList: {
    hello: async (payload, helpers) => {
      const { name } = payload;
      helpers.logger.info(`Hello, ${name}`);
    },
  },
  // or:
  //   taskDirectory: `${__dirname}/tasks`,
});

await runner.promise;

// 任务定义
export interface TaskSpec {
  // 一个 queue 里会顺序运行
  queueName?: string;
  // 未来的运行时间 - 默认 now
  runAt?: Date;
  // 任务按优先级的数字升序执行（数字较小的优先级的任务先运行）。(默认值：0)
  priority?: number;
  // 这个任务应该尝试几次？最小值为1，此时任务只会尝试一次，不会重试。 (默认值：25)
  maxAttempts?: number;
  // 任务的唯一标识符，如果需要，可以用来稍后更新或删除它。 (默认值：null)
  jobKey?: string;
  // 修改`jobKey`的行为；当为'replace'时，所有属性都会被更新，当为'preserve_run_at'时，除'run_at'外的所有属性都会被更新，当为'unsafe_dedupe'时，只有在不存在具有匹配任务键的现有任务（包括锁定的任务和永久失败的任务）时，才会添加新任务。 (默认值：'replace')
  jobKeyMode?: 'replace' | 'preserve_run_at' | 'unsafe_dedupe';
  // 任务的标志，可以用来动态过滤哪些任务可以在运行时运行，哪些任务不能运行。 (默认值：null)
  flags?: string[];
}
```

```
┌───────────── UTC minute (0 - 59)
│ ┌───────────── UTC hour (0 - 23)
│ │ ┌───────────── UTC day of the month (1 - 31)
│ │ │ ┌───────────── UTC month (1 - 12)
│ │ │ │ ┌───────────── UTC day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │ ┌───────────── task (identifier) to schedule
│ │ │ │ │ │    ┌────────── optional scheduling options
│ │ │ │ │ │    │     ┌────── optional payload to merge
│ │ │ │ │ │    │     │
│ │ │ │ │ │    │     │
* * * * * task ?opts {payload}
```

- parsedCronItems
- graphile.config.ts

```ts title="graphile.config.ts"
import type {} from "graphile-config";
import type {} from "graphile-worker";

const preset: GraphileConfig.Preset = {
  worker: {
    connectionString: process.env.DATABASE_URL,
    maxPoolSize: 10,
    pollInterval: 2000,
    preparedStatements: true,
    schema: "graphile_worker",
    crontabFile: "crontab",
    concurrentJobs: 1,
    fileExtensions: [".js", ".cjs", ".mjs"],
  },
};

export default preset;
```
