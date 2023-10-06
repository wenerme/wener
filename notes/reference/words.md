---
id: words
title: 词汇对比
---

## order vs sort

- order - 顺序
  - 强调固有顺序
- sort - 排序
  - 强调分类 - 形式不固定

## tag vs label

- tag - 标记
  - 标识性
- label - 标签
  - KV 性质

## message vs event vs command

- event
  - 只关心发出
  - fire and forget
- message
  - 有明确目标
  - 通信方式
- command
  - 有明确寓意

## event bus vs message queue

- event bus
  - 强调实时通信
  - 一般没有缓冲机制
  - 可能同步执行
- message queue
  - 强调队列、阻塞、缓冲
  - 可能被批处理
  - 一般异步执行

## relation vs association

- relation
  - 泛指关系
  - ERM - 实体关系模型
  - relate - 名词 - 关系
- association
  - 具体关系
  - User associated with Order
  - 用户与账单一对多的关联关系
  - associate - 动词、名词 - 关联

## relationship vs relation

- relation
  - 如何进行关联的 - how to connect
- relationship
  - 关联本身 - the connection

## property vs attribute

- property
  - 固有属性
  - 改变 property 则不是同一个物体
- attribute
  - 自有属性
  - 相同 property 下每个物体有不同的属性

## state vs status

- state
  - 一般指瞬时，当前状态
  - 例如 任务的状态：停止
  - 例如 物体的状态：液态的、固态的
  - 固有的状态
- status
  - 一般可枚举，指有那些状态
  - 可指在固定状态中流转
  - 例如 任务状态：停止、运行、初始化
  - 具体情况，例如 status of stop state - 描述停止的原因

## Concurrency vs Parallelism / 并发 vs 并行

- 并发
  - 例如 1 核心的 CPU 运行 4 个线程
- 并行
  - 例如 4 核心的 CPU 运行 4 个线程

摘自 Akka 文档

Concurrency and parallelism are related concepts, but there are small differences.
Concurrency means that two or more tasks are making progress even though they might not be executing simultaneously.
This can for example be realized with time slicing where parts of tasks are executed sequentially and mixed with parts of other tasks.
Parallelism on the other hand arise when the execution can be truly simultaneous.

## Deadlock vs Starvation vs Live-lock / 死锁 vs 饥饿 vs 活锁

- 死锁
  - A B 两个线程， R1 R2 两个资源，A 持有 R1 需要 R2，B 持有 R2 需要 R1
- 饥饿
  - A B 两个线程， R1 R2 两个资源，A 持有 R1 和 R2 需要 R2，B 需要 R1 才能继续进行
- 活锁
  - A B 两个线程， R1 R2 两个资源，A 持有 R1 每隔一段时间检测 R2 是否可用，B 持有 R2 每隔一段时间检测 R1 是否可用
  - 都在允许，但无法进行到下一步

摘自 Akka 文档

Deadlock arises when several participants are waiting on each other to reach a specific state to be able to progress.
As none of them can progress without some other participant to reach a certain state (a “Catch-22” problem) all
affected subsystems stall. Deadlock is closely related to blocking, as it is necessary that a participant thread be
able to delay the progression of other threads indefinitely.
In the case of deadlock, no participants can make progress, while in contrast Starvation happens, when there are
participants that can make progress, but there might be one or more that cannot. Typical scenario is the case
of a naive scheduling algorithm that always selects high-priority tasks over low-priority ones. If the number of
incoming high-priority tasks is constantly high enough, no low-priority ones will be ever finished.
Livelock is similar to deadlock as none of the participants make progress. The difference though is that instead
of being frozen in a state of waiting for others to progress, the participants continuously change their state. An
example scenario when two participants have two identical resources available. They each try to get the resource,
but they also check if the other needs the resource, too. If the resource is requested by the other participant, they
try to get the other instance of the resource. In the unfortunate case it might happen that the two participants
“bounce” between the two resources, never acquiring it, but always yielding to the other.
