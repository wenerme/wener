---
id: kubernetes-vs-openstack
title: Kubernetes vs OpenStack
---

![10年趋势](./2020-09-28-kubernetes-vs-openstack-10y-trend.jpg)

# Kubernetes vs OpenStack

## 简介

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2213_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/g/11b7lxp79d","geo":"US","time":"2010-01-01 2020-09-28"},{"keyword":"/m/0cm87w_","geo":"US","time":"2010-01-01 2020-09-28"}],"category":0,"property":""}, {"exploreQuery":"date=2010-01-01%202020-09-28&geo=US&q=%2Fg%2F11b7lxp79d,%2Fm%2F0cm87w_","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>

<!-- https://trends.google.com/trends/explore?date=2010-01-01%202020-09-28&geo=US&q=%2Fg%2F11b7lxp79d,%2Fm%2F0cm87w_ -->

| vs           | OpenStack                 | Kubernetes                             |
| ------------ | ------------------------- | -------------------------------------- |
| 起源         | 2010 年 NASA              | 1.0 2015 年 Google                         |
| 定位         | 私有云                    | 容器编排                               |
| 主要调度资源 | 计算/VM<br/>存储<br/>网络 | 容器<br/>及配套周边资源<br/>自定义资源 |
| 主要编写语言 | Python                    | Golang                                 |

## 区别

OpenStack 与 Kubernetes 的区别就等同于虚拟机与容器的区别，Docker 与 VirtualBox 的区别。

### OpenStack

OpenStack 的存在主要解决基础设施管理，那年代也正值大数据快速发展，容器还没有出现于公众视野。
OpenStack 提供了一整套的私有云解决方案，提供最为基础的设施层云化。因为是设施层云化，OpenStack 是需要在裸机服务器上运行的，基础平台即需要相当的资源。
OpenStack 出现后兴起过一段潮流，不少企业开始组建云，并提供服务，我印象深刻的便是京东云。但在 2015 年 Kubernetes 1.0 发布后，大量企业开始迁出 OpenStack，转向 Kubernets。

那么什么时候应该使用 OpenStack 呢？

1. __核心业务是提供公有云__
  - 虚拟机
  - 虚拟网络
  - 虚拟存储
2. 有 OpenStack 专用机房
3. 有 OpenStack 专家团队

OpenStack 只负责解决基础设施的管理隔离，不负责解决服务部署运维，不负责支撑 Web 规模的应用。

### Kubernetes
Kubernetes 的出现和兴起是容器发展后的结果。

* 2007 年 cgroups 的出现实现了进程资源隔离 - 来源于 Google
* 2008 年 lxc 基本实现了 Linux 的系统级虚拟化 - 基于 cgroups 和 命名空间
* 2013 年 google 开源可内部容器技术栈 [lmctfy](https://github.com/google/lmctfy) 实现了 Linux 下应用隔离
* 2013 年 Docker 出现在公众视野 - 基于 LXC
* 2014 年 CoreOS 的 RTK 出现，推进容器的发展
  * 只提供容器的系统，就好比 xen 的 dom0 只提供虚拟化
* 2015 年 Kubernetes 1.0
* 2016 年 Windows 支持容器化技术

到今天，Kubernetes 不只是用于调度容器，更像是一个泛用的集群资源调度平台。

Kubernetes 也可以被定义为 IaaS，因为提供了计算、存储、网络的能力，但又与传统的基础设施不太相同，更加轻量便捷。这时候如何选择，就看需要基础设施运维层交付什么样的资源内容。

Kubernetes 的出现使得运维概念更加泛化，DevOps 的概念兴起，基础设施与开发人员距离变得更为接近。
Kubernetes 除了提供基础的容器部署，还提供了实现规模服务需要的所有资源类型，例如 服务、Ingress、配置、密钥 等等，这一层是 OpenStack 不可能涉及的。

什么时候使用 Kubernetes ？

1. 当主机不止一台、应用不只一个
2. 核心交付产品是服务

## 互补
* Kubernetes 可以选择运行在 OpenStack 中
* OpenStack 可以通过 LXD 就行调度容器
* Kubernetes 可以提供虚拟机的体验
  * 容器安装 SSH
  * 使用 Kubvirt 调度虚拟机

## 非常规平台
OpenStack 和 Kubernetes 都是通用的云平台 - 通用计算、通用存储、通用网络。
有些时候平台场景并不是泛用的场景，例如

* 私有存储云
* 流数据处理平台
* 边缘节点调度
* 大数据 - 计算、存储
* GPU 计算

这时候则需要按需选择对应的调度平台或工具。例如 存储使用 Ceph，并不是一定需要部署在 Kubernetes 之上，大批量的边缘节点调度可能 Nomand 会更加适合，大数据平台可能有 Hadoop 更加适合的场景。

但不可否认的是，99% 的企业都是属于通用的一类，因此 99% 的场景选择 Kubernetes 即可。
