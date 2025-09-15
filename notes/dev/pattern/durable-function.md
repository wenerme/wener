---
title: Durable Function
---

# Durable Function

- 用于实现流程编排
- 编排函数逻辑的状态可恢复重现
- BMPS 使用 XML 描述 workflow -> Durable Functions 使用代码直接定义 workflow
- 参考
  - [Distributed execution flow paradigms](https://metatype.dev/blog/2024/08/27/distributed-execution-flow-paradigms)
    - Event-Driven Architecture with Message Queues
    - Saga
    - Stateful Orchestrators
    - Durable Execution
  - https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview
  - https://github.com/dotnet/orleans

```ts
// 订单流程 / 编排
// 本身是确定性的
// 实际这个流程可能运行 几天
export async function orderProcessingWorkflow(order: OrderDetails): Promise<string> {
  let transactionId: string | null = null;

  try {
    // 检查并预留库存
    await workflow.callActivity(reserveInventory, order.items);

    // 支付处理
    // 幂等操作，自动重试
    const paymentResponse = await workflow.callActivityWithRetry(
      processPayment,
      {
        initialInterval: '10s',
        maximumAttempts: 5,
      },
      order.orderId,
      order.amount,
    );

    transactionId = paymentResponse.transactionId;

    // timer，人工交互
    if (paymentResponse.status === 'REQUIRES_REVIEW') {
      // side effect
      await workflow.callActivity(notifyFraudTeam, order.orderId);

      const approvalEvent = workflow.waitForExternalEvent<boolean>('fraudReviewApproved');
      const timeout = workflow.createTimer('2h');

      // 等待其中一个完成
      const winner = await Promise.race([approvalEvent, timeout]);

      if (winner === timeout) {
        // 如果超时，则认为审核失败，抛出异常以触发补偿逻辑。
        throw new Error('欺诈审核超时');
      }

      const isApproved = await approvalEvent;
      if (!isApproved) {
        // 如果审核被拒绝，也抛出异常。
        throw new Error('欺诈审核被拒绝');
      }
    }

    // side effect
    // 从库存中扣除商品、发送订单确认邮件
    await workflow.callActivity(deductInventory, order.items);
    await workflow.callActivity(sendOrderConfirmationEmail, order.customerId, order.orderId);

    // timer
    // 等到 24 小时后发送跟进邮件
    await workflow.sleep('24h');
    await workflow.callActivity(sendFollowUpEmail, order.customerId, order.orderId);

    return `订单 ${order.orderId} 处理成功。`;
  } catch (error) {
    // 补偿
    if (transactionId) {
      await workflow.callActivity(refundPayment, transactionId);
    }
    console.error(`订单 ${order.orderId} 处理失败:`, error);
    return `订单 ${order.orderId} 处理失败。`;
  }
}
```

**原理**

- 事件溯源 (Event Sourcing)
  - 以 AOL/Append Only Log 的方式记录所有操作
- 检查点 (Checkpointing)
  - 等待进入检查点，记录当前状态
  - 状态记录后，实际的逻辑可以 offload
  - 例如 `await sleep('5m')` 本质是 throw 一个 Error, 外部检测然后 checkpoint
- 重放 (Replay)
  - 通过事件日志重放状态
  - 恢复 逻辑状态，确保与原始执行路径一致
- 确定性的 (deterministic)
  - Workflow 主体是无 side effect 的
  - side effect 抽离到 activity
  - 保障 replay 能进入同样的状态

**场景**

- 任务队列 (Task Queues)
- Saga 模式
- Cron 作业与调度器
- 事件驱动架构 (Event-Driven Architecture, EDA)

**应用模式**

- 函数链接 (Function Chaining) - 用于顺序流程
- 扇出/扇入 (Fan-out/Fan-in) - 用于并行处理
- 异步 HTTP API - 用于长时操作
- 监控 (Monitoring) - 用于状态驱动的轮询
- 人工交互 (Human Interaction) - 用于审批工作流
- 聚合器 (Aggregator) - 用于状态化数据收集

**Awesome**

- 商业
  - Azure Durable Functions
  - [Google Cloud Composer](https://cloud.google.com/composer)
  - [AWS Step Functions](https://aws.amazon.com/step-functions/)
    - Amazon States Language (ASL)
      - https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language.html
    - serverless orchestration service for coordinating distributed applications and microservices into visual workflows
  - Temporal Cloud
- [temporal](../../service/workflow/temporal/README.md)
  - cadence fork
- [cadence](../../service/workflow/cadence.md)
  - by Uber
- [dbos](../../service/workflow/dbos.md)
  - 状态记录在 PostgreSQL, 不需要引入外部服务
- [Azure/durabletask](https://github.com/Azure/durabletask)
  - Apache-2.0, C#
  - Durable Task Framework allows users to write long running persistent workflows in C# using the async/await capabilities.
- [Azure-Samples/Durable-Task-Scheduler](https://github.com/Azure-Samples/Durable-Task-Scheduler)

## Cadence

- Workflow
  - 确定性
- Activity
- Task List
- Signal
  - 异步消息
- Synchronous Query
  - 直接接收同步查询
- Archival
  - 完成的 workflow 归档到 s3，减少主数据库压力

## Temporal

- fork by Cadence 的两位核心创始人 Maxim Fateev 、 Samar Abbas

## Azure Durable Functions

- Orchestrator Functions / Workflow
- Activity Functions / Side effect
- Entity Functions
  - Durable Functions 2.0 引入
  - 对 Actor 进行建模
