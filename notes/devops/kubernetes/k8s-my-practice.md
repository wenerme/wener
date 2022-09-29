---
title: 我的 K8S 实践
tags:
  - Practices
  - Thoughs
---

# 我的 K8S 实践

- 一定节点规模后注意节点角色划分
  - 存储
  - 计算
  - 边缘 - Ingress
- 如果要分布式存储，可优先考虑 分布式 数据 而不是 分布式存储+数据库
  - 优先支持分布式的数据库 弹性更好、性能更好
  - 分布式存储+数据库 性能尴尬，且需要维护额外的分布式存储服务
  - 通用的 分布式存储服务 对 带宽和磁盘要求非常高

## Disto 选择很重要

- 基础投入，但持续收益
- 如果规模小优先选择裁剪过的 disto - k0s, k3s
- 确定好核心状态如何存储、备份、恢复

## 优先手写 Yaml

- 手写 Yaml 更更好理解部署逻辑
- 运维需要对运维的服务有充分了解

:::tip 主要难点

- 知道当前 Pod 信息
  - [使用 fieldRef 获取](./k8s-faq.md#pod-fieldref)
  - 通过 API 获取
- 知道多节点信息
  - [citus.sts.yaml#L46-L76](https://github.com/wenerme/kube-stub-cluster/blob/d373937971ae53ea2d17f82b852e684058920234/citus/citus.sts.yaml#L46-L76)
  - [keydb.sts.yaml#L22-L36](https://github.com/wenerme/kube-stub-cluster/blob/d373937971ae53ea2d17f82b852e684058920234/keydb/keydb.sts.yaml#L22-L36)
- 使用 init shell 初始化环境

:::

- 一开始使用 Helm 可能能用，但升级维护有风险 - 不敢随意动
  - 能调整的参数有限
  - Helm 不一定能满足需求 - 例如: 一些密钥信息要明文
  - 满足封装复用需求
  - 倾向于一个 Helm Chart 一个部署
- 一开始使用 Operator 会隐藏更多细节
  - 完全黑盒，可控性更低
  - Operator 可以将部署变为服务 - 例如: DBaaS
  - 满足更高阶需求

```bash
# 获取 replicas
curl https://kubernetes/apis/apps/v1/namespaces/ \
  -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" < NAMESPACE > /statefulsets/ < STATEFULSET > -k \
  | jq '.spec.replicas'
```

## 服务之间讲求配合

- 所以才需要编排
- 例如: 倾向于 nginx 而不是 traeifk
- 例如: 使用 cert-manager 而不是 web server 自带的 acme

## 注意事项

- 部署混合架构
  - 注意部分组件限定了 Linux
    - metallb
  - 镜像需要支持多架构 - 大多镜像都是单架构
  - 除非有明显的需要，否则避免混合架构
  - 可以考虑部署一个纯 aarch64 架构也不要和 x86 混合
- 分布式存储/非本地存储
  - 除非必要否则不要使用分布式存储
  - 思考分布式存储的目的和收益
  - 分布式存储都有十分明显的副作用
  - 当需要状态的时候可以考虑购买服务或者额外提供相关服务
    - 数据库
    - 对象存储
- StatefulSet 其他作用
  - 可以用于获取稳定的 Hostname 和 IP - 不一定是因为需要使用存储
  - Pod 的名字可以更短 - 避免超出限制或被截取
- 集群小的时候 mount 主机目录或者使用 local pvc 也不失为管理存储的办法

## 资源

- Prometheus 会占用较多内存和部分 CPU
  - 建议尽量复用，避免重复部署
  - linkerd 会部署 prometheus
  - lens 会部署 prometheus
  - consul 相关服务也可以集成 prometheus
- 关注 DaemonSet
  - ingress 部署为 DS 方便使用 - 因为是 nginx+controller， 内存大约 100M - request 100m, 90Mi
  - consul 部署会有一个节点 agent DS - limit 100，100
  - node-exporter 会部署为 DS - 资源占用非常小 - r 10m, 24Mi, limit: 200m, 100Mi
  - metallb 会部署 DS 作为 speaker
