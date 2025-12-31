---
title: Kubernetes Metrics & Monitoring
tags:
  - DevOps
  - Kubernetes
  - Monitoring
  - Metrics
---

# Kubernetes Metrics & Monitoring

- [Kubernetes Monitoring Reference](https://mp.weixin.qq.com/s/7lDC26iwxZUEO-lrHrP1qw)

## Built-in Metrics Interfaces

Kubernetes 生态的组件都会提供 `/metrics` 接口以提供自监控，这里列下我们正在使用的：

- **cAdvisor**: 集成在 Kubelet 中。
- **kubelet**:
  - `10255`: 为非认证端口
  - `10250`: 为认证端口。
- **apiserver** (`6443`): 关心请求数、延迟等。
- **scheduler** (`10251`): 端口。
- **controller-manager** (`10252`): 端口。
- **etcd**: 如 etcd 写入读取延迟、存储容量等。
- **Docker**: 需要开启 experimental 实验特性，配置 metrics-addr，如容器创建耗时等指标。
- **kube-proxy** (`10249`): 默认 127 暴露。外部采集时可以修改为 0.0.0.0 监听，会暴露：写入 iptables 规则的耗时等指标。
- **kube-state-metrics**: Kubernetes 官方项目，采集 Pod、Deployment 等资源的元信息。
- **node-exporter**: Prometheus 官方项目，采集机器指标如 CPU、内存、磁盘。
- **blackbox_exporter**: Prometheus 官方项目，网络探测，DNS、ping、http 监控。
- **process-exporter**: 采集进程指标。
- **NVIDIA Exporter**: 我们有 GPU 任务，需要 GPU 数据监控。
- **node-problem-detector (NPD)**: 准确的说不是 Exporter，但也会监测机器状态，上报节点异常打 taint。
- **应用层 Exporter**: MySQL、Nginx、MQ 等，看业务需求。
