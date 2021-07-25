---
title: K8S Distro Compare
slug: k8s-distro-compare
tags:
  - kubernetes
  - devops
---

# K8S Distro K3S vs K0S

K8S 作为最原始的项目，派生出来很多 分支/发布版。

Kubernetes 的核心能力为资源调度，主要资源为 Pod/容器组/计算资源。
因为是分布式多节点，所以对网络有要求。Pod 调度主要提供计算能力，实际使用还会需要存储能力。
也就是说 Kubernetes 涉及到核心的三元素

- 计算
- 网络
- 存储

Kubernetes 核心调度计算资源，但对于网络和存储是 无意见/Unopinioned ，但实际部署使用时这时候又不可避免的要面对这些问题。
因此不同的 发布版/Distribution 就是对这些问题不同的看法。

<!-- more -->

## K8S 要求

Kubernetes 由 Google 开发，但不是所有人都有那么大规模的问题，而大多数时候都是小规模，先让 K8S “跑起来”。

Kubernetes 自身因为对基础设施层 无意见/Unopinioned，因此默认是没有部署工具，只有要求：

- 要求节点运行在平坦网络
- 要求 etcd 能力的状态存储
- 要求 cloud-controller 提供节点信息
- 要求 容器运行时

在这些基础之上，Kubernetes 提供基于状态的 接口 进行资源调度。

## K8S 部署

除了满足 K8S 的要求，在实际使用时还希望能方便快捷的管理部署。
K8S 提供了 kubeadm 进行安装，不同的发布版也需要提供类似的工具，但工具区分为两部分

1. 远程开通部署
   - SSH
   - 控制节点通过工具部署到多个节点
2. 开通部署的提前准备
   - CA 证书
   - ETCD/存储初始化
   - 网络设置
   - Bootstrap

kubeadm 和 k0s, k3s 都属于第二种场景，第一种场景的工具例如

- autok3s
- rke
- ansible

## 对比

| vs.          | [k0s]                             | [k3s]                               |
| ------------ | --------------------------------- | ----------------------------------- |
| 版本号       | 独立版本<br/>例如 v1.0.0          | 版本基于 k8s <br/> 例如 1.19.1+k3s1 |
| 商业公司     | Mirants                           | Rancher/SUSE                        |
| Since        | 2020-06                           | 2019                                |
| Stars        | [![][k0s-stars]][k0sproject/k0s]  | [![][k3s-stars]][k3s-io/k3s]        |
| Issues       | [![][k0s-issues]][k0sproject/k0s] | [![][k3s-issues]][k3s-io/k3s]       |
| ETCD         | kine                              | kine                                |
| 网络组件/CNI | Kube-Router/calico                | flannel                             |
| 容器网络     | ?                                 | 10.42.0.0/16                        |
| 服务网络     | ?                                 | 10.43.0.0/16                        |
| coredns      | ?                                 | 10.43.0.10                          |
| cri          | containerd                        | containerd                          |
| 打包         | 单可执行文件                      | 单可执行文件                        |
| 文档         | ⭐️                               | ⭐️⭐️⭐️                           |
| 成熟         | ⭐️⭐️                            | ⭐️⭐️⭐️                           |

[k0s-issues]: https://img.shields.io/github/issues/k0sproject/k0s
[k0s-stars]: https://img.shields.io/github/stars/k0sproject/k0s
[k0s]: https://wener.me/notes/devops/kubernetes/distro/k0s
[k0sproject/k0s]: https://github.com/k0sproject/k0s
[k3s-io/k3s]: https://github.com/k3s-io/k3s
[k3s-issues]: https://img.shields.io/github/issues/k3s-io/k3s
[k3s-stars]: https://img.shields.io/github/stars/k3s-io/k3s
[k3s]: https://wener.me/notes/devops/kubernetes/distro/k3s

**内置组件**

- [k3s] - 通过 helm 部署
  - helm-controller
  - traefik
  - klipper-lb
  - local-path-provisioner
  - coredns
- k0s
  - coredns

k3s 默认包含较多组件，部署后 可使用性 更高，但部分组件不建议生产使用，提供这些组件更多是保证功能完备。

## 组件简介

- [kine](https://wener.me/notes/devops/kubernetes/distro/kine)
  k3s 和 k0s 最核心组件
  - 提供 kine 能力
  - 后端支持 etcd,sqlite,mysql,postgresql,dqlite
- [traefik](https://wener.me/notes/devops/kubernetes/network/traefik-ingress)
  - 提供 Ingress 能力
- [local-path-provisioner](https://wener.me/notes/devops/kubernetes/storage/local-path-provisioner/)
  - 基于本地路径提供 volume
- [k3s-io/klipper-lb](https://github.com/k3s-io/klipper-lb)
  - 基于 iptable 提供 ClusterIP 能力
  - 类似组件 [metallb](https://wener.me/notes/devops/kubernetes/network/metallb/)
- [k3s-io/helm-controller](https://github.com/k3s-io/helm-controller)
  - 支持部署 helm chart
  - 通过 CDR 控制
- [cloudnativelabs/kube-router](https://github.com/cloudnativelabs/kube-router)
