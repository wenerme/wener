---
tags:
  - Glossary
---

# DevOps Glossary

| abbr.  | stand for                  | meaning          |
| ------ | -------------------------- | ---------------- |
| DevOps | Development and Operations | 开发和运维       |
| SRE    | Site Reliability Engineer  | 网站可靠性工程师 |
| SLA    | Service Level Agreements   | 服务等级协议     |
| SLI    | Service Level Indicators   | 服务等级指标     |
| SLO    | Service Level Objectives   | 服务等级目标     |
| SLR    | Service Level Review       | 服务等级评审     |
| SLM    | Service Level Management   | 服务等级管理     |

- DevOps
  - 重视“软件开发人员（Dev）”和“IT运维技术人员（Ops）”之间沟通合作的文化、运动或惯例。
  - 通过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。
  - Development & QA & Operations
  - 一种文化哲学
  - 指明目标
- SRE - Site Reliability Engineering - 站点可靠性工程
  - 一套工程方法论
  - 操作手册
  - 关注生产环境的可靠性、可扩展性和性能
- AIOps 理念
- FinOps - Cloud Financial Operations - 成本优化
- 自动化运维
  - 控制回路 (Control Loop)
- Self-healing
- Self-adapting

## 自动化运维 {#autoops}

1. 基础建设 - 建立统一的指标与状态中心 - The Source of Truth
2. 指标采集 - 实时性能数据注入 - Metrics Collection
3. 智能决策 - 制定并执行策略 - Policy & Intelligence Engine
   1. 自动化熔断 Circuit Breaking
   2. 动态权重调整策略 Dynamic Weighting
4. 执行路由 - 让决策生效 Action & Enforcement

```
[Incoming Request]
       |
       v
    [Proxy] --(1. Read Config)--> [State Center]
       |                                     ^
       | (2. Weighted Routing)               | (4. Update Metrics & State)
       v                                     |
    [Target] --(3. Callback)--> [Metrics Collector]
       |                                     |
       | <-----------------------------------+
       |
       +-----> [Intelligence Engine (runs periodically)]
                    |
                    +-- (Reads metrics from store)
                    |
                    +-- (Calculates circuit status & new weights)
                    |
                    +-- (Writes decisions back to store)
```
