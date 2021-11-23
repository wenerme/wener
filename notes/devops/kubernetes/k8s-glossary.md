---
title: K8S 词汇表
tags:
  - Glossary
---

# K8S 词汇表

- [标准化词汇表](https://kubernetes.io/zh/docs/reference/glossary)

## IaC

- Infrastructure as Code
- 通过代码来定义基础设施
- 例如： CDR 定义部署一个 prometheus，CDR 定义 dns 解析

## Operator

- Software Bot App
- 部署机器人

## ConfigMap

- API 对象 - 以 KV 存储非私密性数据
- 可用作环境变量、命令行参数、挂载为配置文件
- [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)

## Controller

- 控制器
- ReplicaSet - 副本集
- ReplicationController - 副本控制器
- Deployments - 部署
- StatefulSets - 状态集
- DaemonSet - 守护集
- Garbage Collection - 垃圾收集
- TTL Controller for Finished Resources - 完成资源的 TTL 控制器
- Jobs - 单次执行任务
- CronJob - 周期执行任务

# DaemonSet

- 确保每个节点上都执行了 Pod
- 用于部署系统守护进程（例如 日志采集，监控）

## Deployment

- API 对象 - 声明 Pods 和 ReplicaSets 的更新
  - 描述期望状态，控制器会修改实际状态以达到期望值
- 管理应用副本
- 一般运行 Pods 且没有本地状态
- 每个副本为一个 Pod

## Pod

- 最小最简单的对象
- 一个 Pod 标示一组运行的容器
- 可运行 sidecar 来添加额外特性
- 一般由 Deployment 管理

## Rollback

- 回滚

## Rollout

- 发布

## Workload

- 工作负载
- 实际需要执行的资源对象
  - 例如服务定义，是不需要执行的
- = Pod + Controller

## Service

- 将一组 Pod 抽象为一个网络服务
- 通过 selector 来选择目标 Pods
- 服务确保网络能指向到工作的 Pods
- 服务会有 ClusterIP
- 如果服务没有指定 selector 则可以手动指定 Endpoint
  - Endpoint 为 IP+Port
- 定义服务后支持服务发现
  - 环境变量
  - DNS
- [规范](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#service-v1-core)

## Zone

- 可用区
- https://kubernetes.io/docs/setup/best-practices/multiple-zones/
