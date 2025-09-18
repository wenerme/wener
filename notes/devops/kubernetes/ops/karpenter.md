---
title: Karpenter
---

# Karpenter

- [kubernetes-sigs/karpenter](https://github.com/kubernetes-sigs/karpenter)
  - Apache-2.0, Go
  - Kubernetes Node Autoscaler built for flexibility, performance, and simplicity
- 参考
  - https://karpenter.sh/
  - https://docs.aws.amazon.com/eks/latest/best-practices/karpenter.html

AWS 开源的 Kubernetes 集群弹性伸缩器，直接与调度器协同，根据真实 Pending Pod 需求快速、按需创建或移除节点，避免预先定义复杂的实例模板与节点组。通过实时选型与生命周期优化，提升资源利用率并降低成本。

适用场景：

- 动态/突发型工作负载（批处理、事件驱动、数据/AI 任务）
- 混合 Spot + 按需实例以优化成本
- 需要更快节点启动、减少长时间排队的环境
- 期望自动“整形”与节点整合（Consolidation）减少碎片

核心特性：

- 按 Pod 真实需求（CPU/内存/硬件约束）即时挑选最合适的实例类型
- 支持多可用区与多种容量类型（On-Demand / Spot）
- 自动节点合并与回收，降低空闲浪费
- 支持按标签/拓扑/架构/容量约束进行灵活调度
- 无需预创建 ASG/NodeGroup，减少运维模板膨胀

优点：

- 启动更快：通常显著快于传统 Cluster Autoscaler
- 成本优化：通过动态选型 + Spot + Consolidation 减少浪费
- 更少静态配置：免维护多套 ASG 配置矩阵
- 自动整合与过度配置回收，提高集群资源利用率
- 灵活匹配多实例类型 / 体系结构（x86 / ARM）
- 原生支持临时性与高波动负载

缺点：

- 相对较新：生态与文档成熟度不及传统方案
- Consolidation 可能引发 Pod 重调度（需关注无状态/中断容忍性）
- 仍需精心设计 Provisioner 与限制策略避免滥配
- 不适合强需稳定长生命周期节点的特定场景（如有状态紧耦合本地存储）
- 专注 AWS（多云/本地混合场景支持有限）
- Spot 波动下仍需配合中断处理逻辑（如优雅驱逐）

使用建议：

- 结合 Pod 资源请求治理与 QoS 分类，避免误触发过度扩容
- 启用并逐步评估 Consolidation，先在非核心工作负载验证
- 配合预算/成本观测（Cost & Utilization 监控）形成闭环
- 与 Taint/Toleration、Pod Topology Spread、Node Affinity 等策略协同使用
