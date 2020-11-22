---
title: FleetCD
---

# Rancher Fleet
* [rancher/fleet](https://github.com/rancher/fleet)
  * 多集群 GitOps
    * 使用 clusterSelector, clusterGroupSelector, clusterGroup 为 GitRepo 选择集群 - 直接应用到多个集群
  * 应用自动发现
    * 检测 fleet.yaml
  * 默认自动部署
  * 支持 helm+kustomize 同时
* [文档](https://fleet.rancher.io/)
* 安装 rancher 2.5+ 会默认安装 fleet
* 注意
  * 目前要求压缩后的 Repo < 1MB
    * 对于非 Helm 应用， 1 MB 限制就比较小，因为 CDR 包含了很多内容，例如 cert-manager 1.6 MB
    * https://fleet.rancher.io/gitrepo-structure/
  * ssh 密钥会直接存储到对应空间下的 secret
  * namespace 必须要先不存在
    * fleet 相当于是强制受管理状态
    * argocd 会合并
* 参考
  * [rancher/fleet-examples](https://github.com/rancher/fleet-examples)

```bash
# fleet 对 ssh 密钥有一定要求，格式必须为 EC PRIVATE KEY, RSA PRIVATE KEY, PRIVATE KEY 因此需要 -m pem
# 生成 SSH 密钥到 /tmp/fleet /tmp/fleet.pub
ssh-keygen -t rsa -b 4096 -m pem -C "fleet@example" -q -N "" -f /tmp/fleet

# fleet 用的 ssh secret
kubectl create secret generic --dry-run=client -o yaml \
  fleet-ssh \
  --type kubernetes.io/ssh-auth \
  --from-file=ssh-privatekey=/tmp/fleet \
  --from-file=ssh-publickey=/tmp/fleet.pub > fleet-ssh.secret.yaml
```

## 概念
* Fleet Manager
  * 中控 - 多集群只需要启一个
* Fleet controller
  * 只是概念层，实际使用 manager 与 controller 无区别
* 单集群
  * Manager 与受控集群在一起
* 多集群
  * Manager 位于其他集群，Controller 在受控集群
* Fleet agent
  * 受控集群的代理，与 manager 交互
  * 一组组件

## 结构
* /
  * Chart.yaml
  * kustomization.yaml
* 任意目录/fleet.yaml
* `*.yaml` - 没有 Chart 和 kustomization 则会部署所有 yaml
* `overlays/{name}`

## fleet.yaml
* [fleet.yaml](https://fleet.rancher.io/gitrepo-structure/#fleetyaml)

```yaml
# 可在配置时修改
defaultNamespace: default

# 强制指定 - 资源已存在会部署失败
namespace: ""

# kustomize 部署
kustomize:
  # 目录下包含 kustomization.yaml
  dir: ./kustomize

# helm 部署
helm:
  # chart 位置 - 支持 https://github.com/hashicorp/go-getter URL
  chart: ./chart
  # 指定 chart 仓库 - 指定后 chart 则变为仓库中的 chart 名而非 chart 位置
  repo: https://charts.rancher.io
  # release 名字 - 不指定会生成
  releaseName: my-release
  # chart 版本 - 支持 semver 版本 范围限定
  version: 0.1.0
  # inline 的 value 值
  values:
    any-custom: value
  # 覆盖不可变资源 - 开启有一定危险
  force: false

# 如果暂停，则需要手动同步
paused: false

rolloutStrategy:
    # A number or percentage of clusters that can be unavailable during an update
    # of a bundle. This follows the same basic approach as a deployment rollout
    # strategy.
    # default: 10%
    maxUnavailable: 15%
    # A number or percentage of cluster partitions that can be unavailable during
    # an update of a bundle.
    # default: 0
    maxUnavailablePartitions: 20%
    # A number of percentage of how to automatically partition clusters if not
    # specific partitioning strategy is configured.
    # default: 25%
    autoPartitionSize: 10%
    # A list of definitions of partitions.  If any target clusters do not match
    # the configuration they are added to partitions at the end following the
    # autoPartitionSize.
    partitions:
      # A user friend name given to the partition used for Display (optional).
      # default: ""
    - name: canary
      # A number or percentage of clusters that can be unavailable in this
      # partition before this partition is treated as done.
      # default: 10%
      maxUnavailable: 10%
      # Selector matching cluster labels to include in this partition
      clusterSelector:
        matchLabels:
          env: prod
      # A cluster group name to include in this partition
      clusterGroup: agroup
      # Selector matching cluster group labels to include in this partition
      clusterGroupSelector: agroup

# 选择目标自定义 - 目标按序选择
targetCustomizations:
- name: prod # 名字仅用于展示 - 不设置会生成
  # 覆盖命名空间
  namespace: newvalue
  # 覆盖 kustomize 选项
  kustomize: {}
  # 覆盖 helm 选项
  helm: {}
  # YAML 清单部署
  # 定义 overlays/{name} 覆盖的名字列表 - 用于修改和添加资源
  # 例如
  #   ./overlays/myoverlay/subdir/resource.yaml 会替代 ./subdir/resource.yaml
  #   ./overlays/myoverlay/subdir/resource_patch.yaml 会修改 ./subdir/resource.yaml
  yaml:
    overlays:
    - custom2
    - custom3
  # 集群选择器 - metav1.LabelSelector
  clusterSelector:
    matchLabels:
      env: prod
  # 集群分组选择器
  clusterGroupSelector:
    matchLabels:
      region: us-east
  # 选择指定分组
  clusterGroup: group1
```

## 资源

```yaml
---
# 定义 Repo
kind: GitRepo
apiVersion: fleet.cattle.io/v1alpha1
metadata:
  name: helm
  namespace: fleet-local
spec:
  repo: https://github.com/rancher/fleet-examples/
  paths:
  - single-cluster/helm
---
# 复杂 Repo
apiVersion: fleet.cattle.io/v1alpha1
kind: GitRepo
metadata:
  name: my-deploy
  # fleet 空间
  namespace: fleet-default
spec:
  branch: master
  # ssh 密钥
  clientSecretName: fleet-ssh-secret
  paths:
  - subpath
  repo: git@gitea-ssh.gitea:my/repo
  # 选择目标集群
  targets:
  - clusterSelector: {}
---
# 定义集群分组
apiVersion: fleet.cattle.io/v1alpha1
kind: ClusterGroup
metadata:
  name: default
  namespace: fleet-default
spec:
  selector:
    matchLabels:
      env: prod
    matchExpressions:
#      - key: string
#        operator: string
#        values:
#          - string
```
