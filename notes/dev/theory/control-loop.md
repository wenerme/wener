---
title: 控制回路
---

# Control Loop

- Control Loop
- vs [Control Theory](./control-theory.md)
  - 控制理论的一个核心模型和实践应用。
  - 具体的、可操作的框架
  - 描述了如何实现一个能自我调节的系统
  - 关注点：传感器 (Sensor)、控制器 (Controller)、执行器 (Actuator) 这三个组成部分如何协同工作。
  - 是控制理论最著名、最广泛的应用范式。
- fundamental building block of [control systems](./control-system.md)
- 负反馈回路 (Negative Feedback Loop)。
- 开环控制 (Open-loop control)
  - 不关心 Feedback、结果
- 闭环控制 (Closed-loop control)
- “观察 -> 分析 -> 行动” (Observe/Measure -> Analyze/Decide -> Act)
- OODA - Observe - Orient - Decide - Act https://en.wikipedia.org/wiki/OODA_loop
  - 认知 (Orient)
    - 将孤立的数据转化为有意义的、可供决策的“情报”和“态势感知”
    - 分析 (Analysis)
    - 综合 (Synthesis): 将多个不同来源的数据和信息组合起来，形成一个整体图像。
    - 结合上下文 (Contextualization): 将当前的图像放入更大的背景中去理解。这是 Orient 最关键的一步。
      - 过往经验: “这个服务上次出问题也是这个现象。”
      - 团队知识: “我们昨天刚刚上线了一个新版本，是不是和它有关？”
      - 环境状态: “是不是云服务商的某个区域出问题了？”
      - 文化和目标: “我们当前的目标是保稳定，而不是推新功能，所以处理这个问题的优先级最高。”
- Actuator Pattern
  - 执行器
  - “写操作”、“执行命令”、“手”
  - 将“决策”与“执行”解耦
  - Spring Boot Acturator
    - 暴露内部状态
    - 提供管理端点 (Expose)
  - 可观测性 (Observability)
  - 可操作性 (Operability)
  - 可自动化 (Automatability)
  - 为一个系统或服务，除了其核心业务逻辑接口外，还应该提供一个独立的、标准化的接口，专门用于对其进行监控、管理和自动化操作。
- 可操作性接口模式 (Operability Interface Pattern)
- 管理平面模式 (Management Plane Pattern)
- Webhook Action Pattern
- 调谐循环 Reconciliation Loop
- Controller / 控制器
- Ochestrator / 编排器
- Regulator / 调节器
- Autopilot / Sentinel / Cortex / Cerebrum / Resilience Engine / Optimizer
- 参考
  - wikipedia [Control Loop](https://en.wikipedia.org/wiki/Control_loop)

---

1. 目标 (Desired State)
1. 测量 (Measure/Observe)
1. 比较与决策 (Compare & Decide)
1. 行动 (Act)
1. 反馈 (Feedback)

---

例如:

1. 目标: 空调 你设定温度为 24°C。
1. 测量: 温度计（传感器）测量到当前室温是 26°C。
1. 比较与决策: 控制器发现 26°C > 24°C，存在偏差 (Error)。
1. 行动: 控制器向压缩机（执行器）发出指令，开始制冷。
1. 反馈: 制冷这个“行动”改变了环境（室温下降），这个变化又被温度计重新测量到，形成了一个闭环。当室温降到 24°C，行动就会停止。
