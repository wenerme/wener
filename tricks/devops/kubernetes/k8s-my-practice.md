---
id: k8s-my-practice
title: 我的 K8S 实践
---

# 我的 K8S 实践

## Tips

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

- StatefulSet 可以用于获取稳定的 Hostname 和 IP - 不一定是因为需要使用存储
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
