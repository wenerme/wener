---
title: K8S Awesome
---

# Kubernetes Awesome

- [cncf landscape](https://landscape.cncf.io/)

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

## Dashboard

- healmap
- lens
- kubernetes dashboard
- k9s
  命令行
- portainer

## Distribution

- k3s
- k0s
- openshift
- microk8s
- rancher
- rke
- kubesphere
- [scality/metalk8s](https://github.com/scality/metalk8s)
- kube-edge - provisioning
- [gravitational/gravity](https://github.com/gravitational/gravity)
  Kubernetes application deployments for restricted, regulated or remote environments
  - 不活跃，停止开发

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

## Operator

- [kudobuilder/kudo](https://github.com/kudobuilder/kudo)

## Database

- PostgreSQL
  - [CrunchyData/postgres-operator](https://github.com/CrunchyData/postgres-operator)
    - [Active-Active PostgreSQL Federation on Kubernetes](https://info.crunchydata.com/blog/active-active-postgres-federation-on-kubernetes?hs_amp=true)

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
