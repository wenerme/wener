---
tags:
  - Scheduler
---

# Design Cron

- Cron 调度
  - 重复
    - pattern
    - every
  - 是否立即开始
  - timezone
    - timezone id
    - utc offset
- 任务调度
  - 是否并行 - 等待上一个完成

```
* * * * * *
```

- 秒
  - 0-59
- 分
  - 0-59
- 时
  - 0-23
- 日
  - 1-31
- 月
  - 1-12
  - JAN-DEC
- 周/星期 - day of week
  - 0-7
  - MIN-SUN
- 年 - 可选

| symbol | for                      |
| ------ | ------------------------ |
| `*`    | all                      |
| `/`    | step                     |
| `,`    | list                     |
| `-`    | range                    |
| `?`    | ignore,no specific value |
| `L`    | last                     |
| `W`    | weekday                  |
| `#`    | nth                      |

| alias     | for                   |
| --------- | --------------------- |
| @reboot   | 重启后执行一次, crond |
| @yearly   | `0 0 1 1 *`           |
| @annually | @yearly               |
| @monthly  | `0 0 1 * *`           |
| @weekly   | `0 0 * * 0`           |
| @daily    | `0 0 * * *`           |
| @midnight | @daily                |
| @hourly   | `0 * * * *`           |

| e.g.           | for                                         | cn                          |
| -------------- | ------------------------------------------- | --------------------------- |
| `6#3`          | third Friday of the month                   | 每月第三个星期五            |
| `30 10 ? * 5L` | 0:30 AM on the last Thursday of every month | 每月最后一个星期五上午10:30 |
| `0 0 0 LW * *` | last weekday of the month at midnight       | 每月最后一个工作日午夜      |

## quartz

- Quartz Scheduler
- org.quartz-scheduler:quartz
- 区分 Job 和 Trigger
- [quartz-scheduler/quartz](https://github.com/quartz-scheduler/quartz)
- https://javadoc.io/doc/org.quartz-scheduler/quartz/latest/org/quartz/JobBuilder.html

## K8S CronJob

- https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
- https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#cronjob-v1-batch

```ts
type CronJobSpec = {
  concurrencyPolicy: string;
  failedJobsHistoryLimit: number; // 保留失败任务的数量
  successfulJobsHistoryLimit: number; // 保留成功任务的数量
  schedule: string; // cron
  startingDeadlineSeconds: number;
  suspend: boolean; // 暂停
  timeZone: string;
  jobTemplate: JobTemplateSpec;
};

type JobTemplateSpec = {
  metadata: ObjectMeta;
  spec: JobSpec;
};
type JobSpec = {
  activeDeadlineSeconds: number; // 超时时间
  backoffLimit: number; // 重试次数
  backoffLimitPerIndex: number; //
  completionMode: string; // 完成模式
  completions: number; // 完成次数
  managedBy: string; // 管理者
  manualSelector: boolean; // 手动选择
  maxFailedIndexes: number; // 最大失败索引
  parallelism: number; // 并行度
  podFailurePolicy: PodFailurePolicy;
  podReplacementPolicy: string; // pod 替换策略
  successPolicy: SuccessPolicy;
  suspend: boolean; // 暂停
  ttlSecondsAfterFinished: number; // 完成后的存活时间
  selector: LabelSelector; // 选择器
  template: PodTemplateSpec; // pod 模板
};
```

## Nomad Perriodic

```ts
type Periodic = {
  /**
   * @deprecated
   */
  cron: string;
  crons: string[];
  prohibit_overlap: boolean;
  time_zone: string;
  enabled: boolean;
};
```

```hcl
job "docs" {
  periodic {
    cron             = "*/15 * * * * *"
    prohibit_overlap = true
  }
}
```

- https://developer.hashicorp.com/nomad/docs/job-specification/periodic

## node cron

- https://github.com/kelektiv/node-cron

```ts
export type CronContext<C> = C extends null ? CronJob : NonNullable<C>;
export type CronCallback<C, WithOnCompleteBool extends boolean = false> = (
  this: CronContext<C>,
  onComplete: WithOnCompleteBool extends true ? CronOnCompleteCallback : never,
) => void | Promise<void>;
export type CronOnCompleteCallback = () => void | Promise<void>;
export type CronSystemCommand =
  | string
  | {
      command: string;
      args?: readonly string[] | null;
      options?: SpawnOptions | null;
    };
export type CronCommand<C, WithOnCompleteBool extends boolean = false> =
  | CronCallback<C, WithOnCompleteBool>
  | CronSystemCommand;

interface BaseCronJobParams<OC extends CronOnCompleteCommand | null = null, C = null> {
  cronTime: string | Date | DateTime;
  onTick: CronCommand<C, WithOnComplete<OC>>;
  onComplete?: OC;
  start?: boolean | null;
  context?: C;
  runOnInit?: boolean | null;
  unrefTimeout?: boolean | null;
  waitForCompletion?: boolean | null;
  errorHandler?: ((error: unknown) => void) | null;
}

export type CronJobParams<OC extends CronOnCompleteCommand | null = null, C = null> = BaseCronJobParams<OC, C> &
  (
    | {
        timeZone?: string | null;
        utcOffset?: never;
      }
    | {
        timeZone?: never;
        utcOffset?: number | null;
      }
  );
```

## BullMQ

- Repeatable
- https://github.com/taskforcesh/bullmq

```ts
/**
 * Settings for repeatable jobs
 *
 * @see {@link https://docs.bullmq.io/guide/jobs/repeatable}
 */
export interface RepeatOptions extends Omit<ParserOptions, 'iterator'> {
  /**
   * A repeat pattern
   */
  pattern?: string;

  /**
   * Custom repeatable key. This is the key that holds the "metadata"
   * of a given repeatable job. This key is normally auto-generated but
   * it is sometimes useful to specify a custom key for easier retrieval
   * of repeatable jobs.
   */
  key?: string;

  /**
   * Number of times the job should repeat at max.
   */
  limit?: number;

  /**
   * Repeat after this amount of milliseconds
   * (`pattern` setting cannot be used together with this setting.)
   */
  every?: number;

  /**
   * Repeated job should start right now
   * ( work only with cron settings)
   */
  immediately?: boolean;

  /**
   * The start value for the repeat iteration count.
   */
  count?: number;

  /**
   * Offset in milliseconds to affect the next iteration time
   *
   * */
  offset?: number;

  /**
   * Internal property to store the previous time the job was executed.
   */
  prevMillis?: number;

  /**
   * Internal property to store de job id
   * @deprecated
   */
  jobId?: string;
}
```
