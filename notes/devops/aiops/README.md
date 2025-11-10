---
title: AIOps
---

# AIOps

| 维度     | 传统运维                   | AIOps                        |
| -------- | -------------------------- | ---------------------------- |
| 运维姿态 | 被动响应                   | 主动控制                     |
| 数据处理 | 数据孤岛，手动分析         | 数据聚合，实时AI驱动分析     |
| 告警机制 | 静态阈值，高噪音，告警疲劳 | 动态基线，事件关联，噪音抑制 |
| 根因分析 | 手动、缓慢的“作战室”模式   | 自动化、快速的因果关系确定   |
| 故障修复 | 手动执行预案，依赖人工干预 | 自动化、闭环式修复           |
| 主要目标 | 维持系统稳定               | 保障服务性能与优化用户体验   |

| 层级            | 主要功能                                       | 关键技术方法                                                |
| --------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| 数据层 (观察)   | 数据采集与聚合；日志管理、指标收集、分布式追踪 | Kafka, Fluentd, Prometheus, OpenTelemetry                   |
| 分析层 (参与)   | 异常检测、事件关联、预测性分析、根因分析       | 统计建模、聚类算法、分类算法、深度学习、TensorFlow、PyTorch |
| 自动化层 (行动) | 工作流编排、自动化修复、ITSM集成               | Ansible, 运行手册自动化, Webhooks, APIs                     |
| 呈现层          | 统一仪表盘、拓扑映射、报告、自然语言查询       | Kibana, Grafana, 自然语言处理 (NLP) 引擎                    |

- FinOps - 云与资源优化
- SecOps - 安全运维
- 架构
  - Detection (检测)：检测系统异常
  - Localization (定位)：定位异常位置
  - Analysis (分析)：分析根本原因
  - Mitigation (缓解)：修复和缓解异常
- “被动响应” -> “主动控制”
- “阈值判断” -> “统计分析”
- 基础
  - 关键指标 (Observed Key Metrics)
  - 熔断器 (Circuit Breaker) - 闭合、断开、半开
  - 权重调整与流量整形 (Weight Adjustment & Traffic Shaping)
    - 精确地控制用户流量的流向
  - 自愈 (Self-healing)
- 高级 - 渐进式交付 (Progressive Delivery)
  - 金丝雀发布
  - 蓝绿部署
  - 灰度发布
  - 滚动发布
- Agent-Based AIOps
- MAS - Multi-Agent System - 多智能体系统
- SRE 角色特点
- 自治性 (Autonomy)
- 本地感知
- 主动响应
  - 自我恢复
  - 精确诊断
  - 协作求助
- 协作
- OODA
  - Observe - 观察
    - 指标、日志、追踪、事件
  - Orient - 认知
    - 服务画像、模式匹配、异常检测、关联分析
  - Decide - 决策
    - 决策树
    - 自我修复、深入诊断、协作与求助、上报与隔离
  - Act - 行动
- 指标 - 定量
  - 已知-已知
- 日志 - 定性
  - 未知-未知
  - Log -> Metrics
- Closed-loop Automation - 闭环自动化
- Open-loop Automation - 开环自动化 - Human in the loop
- Event Correlation - 事件关联

| abbr. | stand for                       | meaning          |
| ----- | ------------------------------- | ---------------- |
| MTTD  | Mean Time To Detection          | 平均检测时间     |
| MTTR  | Mean Time To Repair             | 平均修复时间     |
| MTBF  | Mean Time Between Failures      | 平均故障间隔时间 |
| MTTF  | Mean Time To Failure            | 平均故障时间     |
| MTTR  | Mean Time To Recovery           | 平均恢复时间     |
| MTTA  | Mean Time To Alert              | 平均告警时间     |
| RCA   | Root Cause Analysis             | 根因分析         |
| MOO   | Multiple Objective Optimization | 多目标优化       |
| SOO   | Single Objective Optimization   | 单目标优化       |

| en                      | cn                 |
| ----------------------- | ------------------ |
| Anomaly Detection       | 异常检测           |
| Root Cause Analysis     | 根因分析           |
| Mitigation              | 缓解               |
| Self-Healing            | 自愈               |
| Progressive Delivery    | 渐进式交付         |
| Canary Release          | 金丝雀发布         |
| Blue-Green Deployment   | 蓝绿部署           |
| Gray Release            | 灰度发布           |
| Observed Key Metrics    | 关键指标           |
| Traffic shaping         | 流量整形           |
| Weight adjustment       | 权重调整           |
| Progressive Delivery    | 渐进式交付         |
| Weight-based Routing    | 权重路由           |
| Content-based Routing   | 基于请求内容的路由 |
| Gradually Shift Traffic | 渐进式流量迁移     |
| Circuit Breaker         | 熔断器             |
| Blast Radius Control    | 爆炸半径控制       |
| Chaos Engineering       | 混沌工程           |
| Fault Injection         | 故障注入           |
| Resilience Testing      | 弹性测试           |

- Observed Key Metrics
  - 最原始、直接观测到的系统健康数据。
  - 实时监控与告警，是所有分析的基础和数据源。
- 事件管理生命周期
  - 事件报告
  - 根因分析
  - 事件缓解
  - 事件复盘分析

## AIOps 定义 {#what-is-aiops}

2016年被称为“算法IT运维”（Algorithmic IT Operations），意在成为IT运维分析（ITOA）的下一代演进 。
然而，在一年左右的时间里，Gartner将其调整为“面向IT运维的人工智能”（Artificial Intelligence for IT Operations）。

- by Gartner
- https://www.gartner.com/en/information-technology/glossary/aiops-artificial-intelligence-operations

> AIOps combines big data and machine learning to automate IT operations processes, including event correlation, anomaly detection and causality determination.
> AIOps 结合大数据和机器学习，自动化 IT 运维流程，包括事件关联、异常检测和因果关系确定。

# Awesome

- [microsoft/AIOpsLab](https://github.com/microsoft/AIOpsLab)
  - 评估框架
  - 编排器 (Orchestrator)
  - 智能体-云接口 (Agent-Cloud Interface, ACI)
  - 观测器 (Telemetry Observer)
  - 故障注入器
  - 生成工作负载
- [spinnaker/kayenta](https://github.com/spinnaker/kayenta)
- [argoproj/argo-rollouts](https://github.com/argoproj/argo-rollouts)
- [keephq/keep](https://github.com/keephq/keep)
  - AIOps 和告警管理平台
- [awslabs/aiops-modules](https://github.com/awslabs/aiops-modules)
  - SageMaker
  - FMOps/LLMOps
  - MLflow
- [Jun-jie-Huang/awesome-LLM-AIOps](https://github.com/Jun-jie-Huang/awesome-LLM-AIOps)
- [OpsPAI/awesome-AIOps](https://github.com/OpsPAI/awesome-AIOps)
- [alibaba/SREWorks](https://github.com/alibaba/SREWorks)
  - DataOps, AIOps
- LogPAI (日志分析)
- PyOD (异常值检测)
- Chaos Mesh (故障注入)
- IRM / Incident Response Management / 事件响应管理
  - “确保在正确的时间通知正确的人”
  - PagerDuty
  - OpsGenie
  - BetterStack
- 传统 AIOps 平台
  - BigPanda
  - Moogsoft
  - Splunk ITSI
- Grafana OnCall, Alerta, GoAlert

# FAQ

## AIOps vs. 金融量化交易

- “数据驱动自动化”框架
- AIOps
  - “诊断与修复”的协作的游戏
  - 对手是系统熵增和复杂性
- 量化交易
  - “预测与博弈”的零和或正和游戏
  - 对手是整个市场

| 维度          | AIOps（智能运维）                                                                                                                                                                                      | 金融量化交易（Quantitative Trading）                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 核心目标      | 系统可靠性与效率：保障服务稳定，满足服务水平目标（SLO），最小化故障平均解决时间（MTTR）。                                                                                                              | 利润最大化：在可接受的风险范围内，通过市场波动实现盈利。                                                                                                                                                                    |
| 数据源/指标   | **系统遥测数据 (Telemetry)：**<br/>- 指标 (Metrics)：CPU使用率、内存、API延迟、错误率。<br/>- 日志 (Logs)：系统事件、错误堆栈、用户行为记录。<br/>- 追踪 (Traces)：分布式系统中请求的完整路径。        | **市场数据及另类数据：**<br/>- 价格/成交量：开盘价、最高价、最低价、收盘价、成交量（OHLCV）。<br/>- 订单簿：买卖盘口的深度和流动性。<br/>- 新闻/舆情：社交媒体情绪、新闻公告。<br/>- 另类数据：卫星图像、信用卡交易数据等。 |
| 信号/触发器   | **异常模式 (Anomaly Patterns)：**<br/>- 指标偏离动态基线。<br/>- 罕见的错误日志模式出现。<br/>- 多个告警事件的高度相关性。<br/>- 预测性告警（如磁盘即将写满）。                                        | **阿尔法信号 (Alpha Signals)：**<br/>- 技术指标交叉（如移动平均线金叉/死叉）。<br/>- 统计套利机会。<br/>- 市场情绪的突然转变。<br/>- 基于机器学习模型预测的价格方向。                                                       |
| 操作/行动     | **自动化修复/响应 (Automated Remediation)：**<br/>- 重启服务实例（Pod）。<br/>- 调整资源配额（水平/垂直扩缩容）。<br/>- 切换流量（如蓝绿部署、金丝雀发布）。<br/>- 触发熔断器。<br/>- 创建并指派工单。 | **执行交易 (Trade Execution)：**<br/>- 下达买入/卖出/做空订单。<br/>- 调整投资组合头寸。<br/>- 对冲风险。<br/>- 算法执行（如VWAP、TWAP）以减小市场冲击。                                                                    |
| 核心逻辑/大脑 | **AIOps引擎/智能体 (Agent)：**<br/>- 统计模型、机器学习模型。<br/>- 根因分析（RCA）算法。<br/>- 基于LLM的自主智能体，具备推理、规划和工具使用能力。                                                    | **量化模型/策略引擎：**<br/>- 统计模型（如协整、回归）。<br/>- 机器学习模型（如LSTM、梯度提升树）。<br/>- 投资组合优化算法。<br/>- 高频交易策略。                                                                           |
| 环境本质      | 协作与修复：AIOps面对的是一个物理或虚拟系统，其行为遵循物理和逻辑定律。目标是理解并修复这个系统，使其恢复“健康”。                                                                                      | 对抗与博弈：量化交易面对的是一个由无数理性与非理性参与者构成的复杂市场。目标是在与其他参与者的博弈中获利。                                                                                                                  |
