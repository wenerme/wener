---
title: Workflow design
---

# Workflow design

- 业务流程偏向表单设计
- 业务
  - BPMN
- 执行
  - Duration functionn
  - temporal
  - cadence
- Task Queue
- Kubeflow
- argo workflow
- n8n
- nodered
- Dynamic 365 Customer Engagement
  - Workflow=[Process](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/workflow)
    - 基于实体事件创建流程
    - PrimaryEntity - 触发的实体类型
    - 不同事件的开始阶段
      - CreateStage
      - DeleteStage
      - UpdateStage
    - FormId - 可关联一个 Form
  - [NewProcess](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/newprocess?view=op-9-1)
    - 流程实例
    - ActiveStageId - 当前阶段
    - ActiveStageStartedOn - 开始时间
    - CompletedOn
    - State=Active/Inactive
    - Status=Active/Finished/Aborted
  - [ProcessStage](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/processstage?view=op-9-1)
    - StageCategory - Qualify, Develop, Propose, Close, Identify, Research, Resolve, Approval
      - 分类是固定的，不支持任意流程
    - StageName
    - ClientData
    - 所有相关实体上有 StageId 字段反向关联 ProcessStage
      - lead, products, campaing, opportunity, quote, salesorder, invoice, contract, case, knowledgearticle

## Workflow vs Flow

- workflow
  - 着重预定义流程
  - 图形化设计
  - 通常在一个系统内部执行
  - 由内部事件触发
  - 使用更广泛
- flow
  - 更强调动态自由流程
  - 可以通过低代码实现
  - 可以跨多个系统和服务
  - 可以通过外部服务触发
  - 出现时间更晚

## Stage vs Step

- Step
  - 更加细粒度，强调组成部分
  - 顺序执行
- Stage
  - 可能包含多个 Step
  - 不一定顺序执行
  - 比如 CI 里有多个 Stage - Build、Test、Deploy
  - 比如销售里有多个阶段 - Qualify, Develop, Propose, Close, Identify
