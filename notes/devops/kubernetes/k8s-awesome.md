---
title: K8S Awesome
tags:
  - Awesome
---

# Kubernetes Awesome

- [cncf landscape](https://landscape.cncf.io/)
- [awesome-cloud-native](https://jimmysong.io/awesome-cloud-native)

## 学习

- [K3s 中文文档](https://docs.rancher.cn/k3s/)
  - 从 K3S 入门
  - 单节点，内置 etcd
- [Kubernetes 文档/概念](https://kubernetes.io/zh/docs/concepts/)
  - 了解 K8S 基本概念和使用场景
- 然后
  - 部署服务
    - 迁移 docker 上的服务到 k8s
    - 利用 k8s 简化/优化 现有工作流
  - 了解内置组件，尝试利用和替换内置组件
    - Ingress - nginx, gateway
    - CNI - flannel, calico
    - CSI - openbsd, longhorn, nfs
    - Network - tinc, n2n, wg, metallb
  - 了解配合服务，提升使用体验
    - cert-manager, sealed-secret
    - helm, kustomize
    - 面板 - dashboard, rancher, lens
    - observability - prometheus, vector, fluntbit, jeager, grafana
    - gitops - arogocd, fluxcd
    - mesh - linkerd, istio
  - 了解 operator，部署和利用更多服务
    - operator -> 通过定义 Yaml 来部署新的服务栈 - SaaS 能力
    - 数据库、监控、日志、可视化、服务
  - 了解 cloud native 开发，调整开发利用云特性
    - consul
    - dapr
    - spring cloud, spring alibaba
    - 服务注册、发现、通讯
  - 了解新的平台开发方式
    - serverless
    - faas - fission, openfaas
    - baas
    - low-code
    - sidecar
- 参考
  - [kubernetes-api](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/)
    - 当不确定 Yaml 有什么字段，字段有什么含义的时候查阅
    - `kubectl explain` 也可以

## by Wener

- [wenerme/charts](https://github.com/wenerme/charts)
  - Helm charts 国内镜像
  - https://charts.wener.tech
- [wenerme/container-mirror](https://github.com/wenerme/container-mirror)
  - 容器国内镜像
  - `registry.cn-hongkong.aliyuncs.com/cmi/`
- [wenerme/kube-stub-cluster](https://github.com/wenerme/kube-stub-cluster)
  - 集群部署模板 - 用于快速部署各种服务
  - 依赖 上面 helm 和 容器镜像
- [wenerme/ansible-collection-wenerme-alpine](https://github.com/wenerme/ansible-collection-wenerme-alpine)
  - Ansible Colelction 用于管理 AlpineLinux
  - 支持部署配置 k3s, n2n, tinc, longhorn 等等
- [wenerme/alpine-image](https://github.com/wenerme/alpine-image)
  - 快速构建底层基础镜像

**底层到上层过程**

- alpine-image
  构建镜像 - 虚拟机、云服务商
  - ansible-collection-wenerme-alpine
    快速 setup 和 安装 k3s
    - kube-stub-cluster - 依赖 charts 和 container-mirror
      快速部署一个可用集群

## Awesomes

- [CSI Drivers](https://kubernetes-csi.github.io/docs/drivers.html)
- [kubernetes-sigs/cluster-api](https://github.com/kubernetes-sigs/cluster-api)
  - [Providers](https://cluster-api.sigs.k8s.io/reference/providers.html)
- [alexellis/arkade](https://github.com/alexellis/arkade)
- [kubedex](https://kubedex.com/)
- [devtron-labs/devtron](https://github.com/devtron-labs/devtron)
  - Software Delivery Workflow For Kubernetes
  - Web 界面
  - 部署基于 argo rollout 修改
- [crossplane/crossplane](https://github.com/crossplane/crossplane)
  - 管理基础设施
  - provider alibaba, aws, azure, gcp, rook, helm
- [oam-dev/kubevela](https://github.com/oam-dev/kubevela)
  Modern Application Deployment System Based on Kubernetes and OAM
- [k8snetworkplumbingwg/multus-cni](https://github.com/k8snetworkplumbingwg/multus-cni)
  CNI meta-plugin for multi-homed pods in Kubernetes
- [kubevirt/macvtap-cni](https://github.com/kubevirt/macvtap-cni)
- Validate
  - [instrumenta/kubeval](https://github.com/instrumenta/kubeval)
  - [zegl/kube-score](https://github.com/zegl/kube-score)
  - [Validating Kubernetes YAML for best practice and policies](https://learnk8s.io/validating-kubernetes-yaml)
- DevOps
  - awx
- Kubernetes Basic
  - metallb
  - cert-manager
  - kube-prometheus
- [armosec/kubescape](https://github.com/armosec/kubescape)
  - testing if Kubernetes is deployed securely
- [open-policy-agent/opa](https://github.com/open-policy-agent/opa)
- [anchore/syft](https://github.com/anchore/syft)
- [sigstore/cosign](https://github.com/sigstore/cosign)
- [Tencent/caelus](https://github.com/Tencent/caelus)
- [gardener/gardener](https://github.com/gardener/gardener)
- LoadBalance
  - metallb
  - openelb
  - PureLB
- [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
  - 隔离，进出流量控制

## Dashboard/UI

| ui                     | in     | web | desktop | cli | extensible |
| ---------------------- | ------ | --- | ------- | --- | ---------- |
| lens                   |        |     | ✅      |
| portainer              |        |     | ✅      |
| k9s                    | Golang |     |         | ✅  |
| [octant]               | Golang | ✅  | ✅      |     | ⭐️⭐️⭐️  |
| [kubernetes-dashboard] |        | ✅  |
| rancher                | Golang | ✅  | ✅      |

[kubernetes-dashboard]: https://github.com/kubernetes/dashboard
[octant]: https://github.com/vmware-tanzu/octant

- healmap
- lens
- [kubernetes/dashboard][kubernetes-dashboard]
  - 简洁
- k9s - 命令行
- portainer
  - 早期支持 docker，后来支持 k8s
- [kubernetes-sigs/kui](https://github.com/kubernetes-sigs/kui)
  - 增强 kubectl
  - kubectl kui get pods
- [Web UI (Dashboard)](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
- [vmware-tanzu/octant][octant]
  - Highly extensible platform for developers to better understand the complexity of Kubernetes clusters.
- [weaveworks/scope](https://github.com/weaveworks/scope)
  - Monitoring, visualisation & management for Docker & Kubernetes
- [indeedeng/k8dash](https://github.com/indeedeng/k8dash)
- [hjacobs/kube-ops-view](https://github.com/hjacobs/kube-ops-view)
  - Kubernetes Operational View - read-only system dashboard for multiple K8s clusters
- [hjacobs/kube-resource-report](https://github.com/hjacobs/kube-resource-report)
- [kube-web-view alternatives](https://kube-web-view.readthedocs.io/en/latest/alternatives.html)
- [oslabs-beta/kr8s](https://github.com/oslabs-beta/kr8s)
  - Docker/Kubernetes Visualization Tool

## Distribution

- [Rancher vs. Kubesphere](https://wener.me/story/rancher-vs-kubesphere)
- [K3S vs. K0S](https://wener.me/story/k3s-vs-k0s)

---

- 平台
  - openshift - [openshift/okd](https://github.com/openshift/okd) - openshift 社区版
    - by Red Hat
  - [rancher](https://github.com/rancher/rancher)
    - by SUSE
  - [kubesphere](https://github.com/kubesphere/kubesphere)
    - by 青云
- Edge/Minimal
  - [k3s-io/k3s](https://github.com/k3s-io/k3s)
    - by Rancher, SUSE
  - [rancher/k3os](https://github.com/rancher/k3os)
    - 基于 Alpine 的 K3S 系统镜像
    - 推荐直接使用 Alpine 然后安装 k3s
    ```bash title="alpinelinux 安装 k3s"
    apk add k3s
    ```
  - [k0sproject/k0s](https://github.com/k0sproject/k0s)
    - by Team Lens - mirantis
  - [kubeedge/kubeedge](https://github.com/kubeedge/kubeedge)
    - CNCF, Huawei
- 本地开发
  - microk8s
  - [kubernetes-sigs/kind](https://github.com/kubernetes-sigs/kind) - Kubernetes in Docker
    - Apache-2.0, Golang
  - [rancher/k3d](https://github.com/rancher/k3d) - K3S in Docker
- Installer
  - [rancher/rke2](https://github.com/rancher/rke2)
  - [rancher/rke](https://github.com/rancher/rke)
    - 推荐使用 rke2
  - autok3s
  - [kubeadm](https://github.com/kubernetes/kubeadm)
  - [kubernetes-sigs/kubespray](https://github.com/kubernetes-sigs/kubespray)
    - ansible based
  - [kubernetes/kops](https://github.com/kubernetes/kops)
- 有趣
  - [loft-sh/vcluster](https://github.com/loft-sh/vcluster)
    - 虚拟集群 - 映射集群到 namespace
- 正常发行版
  - [scality/metalk8s](https://github.com/scality/metalk8s)
    - focus on long-term on-prem
- 兼容适配
  - [kcp-dev/kcp](https://github.com/kcp-dev/kcp)
    - 兼容 kubectl api
    - 用于实现自定义 cp
    - 不是实际的 kubernetes
- 偏商业化版本
  - [cloudfoundry/cf-for-k8s](https://github.com/cloudfoundry/cf-for-k8s)
    - 基于 k8s 之上的平台
  - [vmware-tanzu/community-edition](https://github.com/vmware-tanzu/community-edition)
    - Tanzu 社区版
- 不活跃
  - [gravitational/gravity](https://github.com/gravitational/gravity)
    Kubernetes application deployments for restricted, regulated or remote environments

---

- [CNCF certified Kubernetes distributions and platforms](https://www.cncf.io/announcements/2017/11/13/cloud-native-computing-foundation-launches-certified-kubernetes-program-32-conformant-distributions-platforms/)

## servicemesh

- linkerd
- consul
- [openservicemesh/osm](https://github.com/openservicemesh/osm)

## 网络

- [projectcontour/contour](https://github.com/projectcontour/contour)
  Kubernetes ingress controller using Envoy proxy
- [projectcontour/gimbal](https://github.com/projectcontour/gimbal)
  ingress load balancing capable of routing traffic to multiple Kubernetes
- [voyagermesh/voyager](https://github.com/voyagermesh/voyager)
  L7/L4 (HAProxy) Ingress Controller

## Operator

- [kudobuilder/kudo](https://github.com/kudobuilder/kudo)

## Database

- PostgreSQL
  - [zalando/postgres-operator](https://github.com/zalando/postgres-operator)
  - [CrunchyData/postgres-operator](https://github.com/CrunchyData/postgres-operator)
    - [Active-Active PostgreSQL Federation on Kubernetes](https://info.crunchydata.com/blog/active-active-postgres-federation-on-kubernetes?hs_amp=true)
  - [sorintlab/stolon](https://github.com/sorintlab/stolon)
    - Apache-2.0, Go
  - [reactive-tech/kubegres](https://github.com/reactive-tech/kubegres)

## Secret & ConfigMap

- kubed
- sealed-secret

## 应用

- [oam-dev/spec](https://github.com/oam-dev/spec)
  Open Application Model
- [oam-dev/kubevela](https://github.com/oam-dev/kubevela)
- [openkruise/kruise](https://github.com/openkruise/kruise)
  Automate application management

## 开发

- [telepresenceio/telepresence](https://github.com/telepresenceio/telepresence)
- [solo-io/squash](https://github.com/solo-io/squash)
- [goodrain/rainbond](https://github.com/goodrain/rainbond)
  云原生应用管理平台
  - LGPL-3.0, Go
- [open-hand/choerodon](https://github.com/open-hand/choerodon)
  Multi-Cloud Integrated Platform
- [metacontroller/metacontroller](https://github.com/metacontroller/metacontroller)

## 运维

- [robusta-dev/robusta](https://github.com/robusta-dev/robusta)

## Notify

- [bitnami-labs/kubewatch](https://github.com/bitnami-labs/kubewatch)
  - Watch k8s events and trigger Handlers

## Misc

- [vmware-tanzu/sonobuoy](https://github.com/vmware-tanzu/sonobuoy)
  diagnostic tool to understand the state of a Kubernetes cluster by running a set of Kubernetes conformance tests
- [kvdi/kvdi](https://github.com/kvdi/kvdi)
  Kubernetes-native Virtual Desktop Infrastructure
- [kris-nova/naml](https://github.com/kris-nova/naml)
  replacing Kubernetes YAML with Go
- [cdk8s-team/cdk8s](https://github.com/cdk8s-team/cdk8s)
- [ovh/cds](https://github.com/ovh/cds)
  Continuous Delivery Service
- [Qihoo360/wayne](https://github.com/Qihoo360/wayne)
  multi-cluster management and publishing platform
- [nuclio/nuclio](https://github.com/nuclio/nuclio)
  Serverless event and data processing platform
- [kyverno/kyverno](https://github.com/kyverno/kyverno/)
  Kubernetes Native Policy Management
- [Grafeas/Grafeas](https://github.com/Grafeas/Grafeas)
  Artifact Metadata API

## API Gateway

- [luraproject/lura](https://github.com/luraproject/lura)
  - builder , proxy generator, aggregator
  - client -> lura -> `N*Service`
- [kubernetes-sigs/service-catalog](https://github.com/kubernetes-sigs/service-catalog)
- [openservicebrokerapi/servicebroker](https://github.com/openservicebrokerapi/servicebroker)

## Conf

- consul
  - [Caiyeon/goldfish](https://github.com/Caiyeon/goldfish)
    - UI, 已停止, 可参考
- [ctripcorp/apollo](https://github.com/ctripcorp/apollo)
  - Apache-2.0, Java
  - 携程
  - 配置管理系统

## Tool

- [txn2/kubefwd](https://github.com/txn2/kubefwd)
  Bulk port forwarding
- [stakater/Reloader](https://github.com/stakater/Reloader)
  watch changes in ConfigMap and Secrets and do rolling upgrades on Pod
- [telepresenceio/telepresence](https://github.com/telepresenceio/telepresence)
  Local development against a remote Kubernetes

## Install

- [easzlab/kubeasz](https://github.com/easzlab/kubeasz)
  Ansible 脚本安装 K8S 集群
- [talos-systems/talos](https://github.com/talos-systems/talos)
  modern OS for Kubernetes
  - MPL-2.0, Go
  - secure, immutable, minimal
  - 通过 API 管理系统 - 无 shell
  - mTLS
- [KubeOperator/KubeOperator](https://github.com/KubeOperator/KubeOperator)
  KubeOperator 是一个开源的轻量级 Kubernetes 发行版
- [kubernetes-sigs/kubespray](https://github.com/kubernetes-sigs/kubespray)
  Deploy a Production Ready Kubernetes Cluster

## Security

- [kuadrant/authorino](https://github.com/kuadrant/authorino)
  Cloud-native AuthN/AuthZ enforcer

## Controller

- KubeBuilder
- [rancher/wrangler](https://github.com/rancher/wrangler)
- [kubernetes-sigs/controller-tools](https://github.com/kubernetes-sigs/controller-tools)
- [spotahome/gontroller](https://github.com/spotahome/gontroller)
