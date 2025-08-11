---
title: 容器
hide_title: true
---

# 容器

- CRI - Container Runtime Interface - 运行时抽象
  - [kubernetes/cri-api](https://github.com/kubernetes/cri-api)
  - 抽象容器运行接口
  - 先是用于 [Kubernetes](https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/) - 2016-12 v1.5
  - 实现
    - docker
    - containerd
- OCI - Open Container Initiative - 开发容器组织 - 定义容器标准
  - [opencontainers/image-spec](https://github.com/opencontainers/image-spec)
  - [opencontainers/runtime-spec](https://github.com/opencontainers/runtime-spec)
    - [opencontainers/runc](https://github.com/opencontainers/runc)
    - kata-container
- CNI - Container Network Interface - 网络层抽象
  - [containernetworking/cni](https://github.com/containernetworking/cni)
- CSI - Container Storage Interface - 存储层抽象
  - [container-storage-interface/spec](https://github.com/container-storage-interface/spec)
- CRI-O - OCI-based implementation of Kubernetes Container Runtime Interface
  - [cri-o/cri-o](https://github.com/cri-o/cri-o)
- 其他运行时
  - rkt - Rocket - 2020 废弃
  - lxc
  - [hpcng/singularity](https://github.com/hpcng/singularity)
- 类 VM 容器
  - Kata Containers
    - 源自 OpenStack
    - 底层 QEMU
    - [架构](https://github.com/kata-containers/documentation/blob/master/design/architecture.md)
  - Nabla
    - 源自 IBM
    - Unikernel
  - Firecracker
    - Virtual Machine Manager - 类似 QEMU
  - gVisor
    - 源自 Google
    - syscall 拦截模拟
- containerd
  - 基于 runc 实现 cri
  - ctr 目录
- 参考
  - [Container Runtime](https://insujang.github.io/2019-10-31/container-runtime)

## 集群调度

![](https://cdn-images-1.medium.com/max/1600/1*x6-_NFEL4HhVIEelzrEQnw.png)

- Monolithic scheduling
  - Apache Hadoop YARN denote by Yahoo
  - 用于高性能计算
  - an architecture that enforces capacity, fairness and deadlines.
  - 执行大量短期计算任务
- Two-level scheduling
  - Mesos
- Shared-state scheduling
  - Google Omega
  - Kubernetes
  - an architecture that gives control to the developers, assuming that they respect the rules concerning the priority of their jobs in the cluster
  - 执行少量长期运行服务
- [Comparison of Container Schedulers](https://medium.com/@ArmandGrillet/comparison-of-container-schedulers-c427f4f7421)
- [Inproving kubernetes schedulers performance](https://coreos.com/blog/improving-kubernetes-scheduler-performance.html)
