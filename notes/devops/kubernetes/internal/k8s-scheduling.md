---
title: Kubernetes 调度
---

# Kubernetes 调度

- /etc/kubernetes/config/kube-scheduler.yaml
  - [kube-scheduler-config.v1beta1](https://kubernetes.io/docs/reference/config-api/kube-scheduler-config.v1beta1/)
- [Node-pressure Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/)
- 常用
  - topology.kubernetes.io/zone
  - topology.kubernetes.io/region

```bash
kubectl get pods -n kube-system | grep kube-scheduler
```

## 节点选择

- nodeName - 选择节点名字
- nodeSelector - 强制选择节点 - 简单的通过 Label 匹配节点
- namespaceSelector - v1.21 alpha - Namespace Label
- NodeRestriction - 节点限制 Label 可用于辅助选择节点
  - `node-restriction.kubernetes.io/`
- 节点亲和 - 基于 Node Label 选择
  - requiredDuringSchedulingIgnoredDuringExecution - hard
  - preferredDuringSchedulingIgnoredDuringExecution - soft
  - IgnoredDuringExecution - 指在 Pod 运行后不在关系节点 Label 变化是否满足要求
  - RequiredDuringExecution - 未来支持，运行后如果不再匹配则驱逐 Pod
- Pod 之间亲和 - 基于 Pod Label 选择
  - 如果运行了 Pod A 则 应该/不应该 运行 Pod B
  - 要求使用 topologyKey 选择相同节点
  - 不建议修改节点 topologyKey，可能导致未知行为
  - 上百节点大集群不建议使用 - 计算复杂影响性能

```bash
# 查看 Label
kubectl get nodes --show-labels
# 添加 Label
kubectl label nodes <your-node-name> disktype=ssd
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
    - name: nginx
      image: nginx
      imagePullPolicy: IfNotPresent
  # 节点名字选择
  nodeName: kube-01
  # 节点 Label 选择
  nodeSelector:
    disktype: ssd

  # 任意 NS
  namespaceSelector: {}
  # 当前 Pod NS
  namespaceSelector: null
  # 匹配 Label
  namespaceSelector:
    key: val

  affinity:
    # 节点亲和 - 同时满足 nodeSelector
    nodeAffinity:
      # 强制要求
      requiredDuringSchedulingIgnoredDuringExecution:
        # 指定个满足一个即可
        nodeSelectorTerms:
          - matchExpressions: # 要求所有条件满足
              - key: kubernetes.io/e2e-az-name
                operator: In # In, NotIn, Exists, DoesNotExist, Gt, Lt
                values:
                  - e2e-az1
                  - e2e-az2
      # 软要求 - 倾向满足
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 1 # 1-100, 多个条件累加, 选择累加权重最高的节点
          preference:
            matchExpressions:
              - key: another-node-label-key
                operator: In
                values:
                  - another-node-label-value
    # Pod 亲和
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: security
            operator: In
            values:
            - S1
        topologyKey: topology.kubernetes.io/zone
    # Pod 反亲和
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: security
              operator: In
              values:
              - S2
          topologyKey: topology.kubernetes.io/zone
```

## Node affinity per scheduling profile

- 1.20 beta

```yaml
apiVersion: kubescheduler.config.k8s.io/v1beta1
kind: KubeSchedulerConfiguration

profiles:
  - schedulerName: default-scheduler
  - schedulerName: foo-scheduler
    pluginConfig:
      - name: NodeAffinity
        args:
          addedAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
              nodeSelectorTerms:
                - matchExpressions:
                    - key: scheduler-profile
                      operator: In
                      values:
                        - foo
```

## RuntimeClass

- 定义 Pod 固有资源 - 相当于默认资源配置

```yaml
kind: RuntimeClass
apiVersion: node.k8s.io/v1
metadata:
  name: kata-fc
handler: kata-fc
overhead:
  podFixed:
    memory: '120Mi'
    cpu: '250m'
```

## Taints and Tolerations

- 污点 - 节点维度
  - 与亲和相反 - 排除不能忍受污点的 Pod
  - 污点有指定效果
- 容忍 - Pod 维度
  - 容忍 节点 污点
- operator - 容忍匹配操作
  - Equal - 默认 kv 匹配
  - Exists - 匹配 k 存在
    - 如果 k 为空，则容忍所有
- effect - 污点效果
  - NoSchedule - 不调度 - 调度阶段，已经运行不影响
  - PreferNoSchedule - 尽量不调度
  - NoExecute - 不执行 - 会从节点驱逐，运行阶段
    - tolerationSeconds 可以配置容忍时间，而不是立即驱逐
- 使用场景
  - 专用节点
    - 例如 边缘节点 PreferNoSchedule - 默认尽量不调度计算 Pod
  - 特殊硬件节点
  - 基于污点进行驱逐 - v1.18+ - 节点状态
    - node.kubernetes.io/not-ready - 节点未准备好
    - node.kubernetes.io/unreachable - 节点无法访问
    - node.kubernetes.io/memory-pressure
    - node.kubernetes.io/disk-pressure
    - node.kubernetes.io/pid-pressure
    - node.kubernetes.io/network-unavailable
    - node.kubernetes.io/unschedulable
    - node.cloudprovider.kubernetes.io/uninitialized
    - DaemonSet
      - 容忍 unreachable 和 not-ready NoExecute
      - 容忍 其他条件的 NoSchedule
- QoS
  - BestEffort
  - Guaranteed
  - Burstable

```bash
# 添加污点 - 如果不能容忍 key1=value1 则不调度
kubectl taint nodes node1 key1=value1:NoSchedule
# 移除污点
kubectl taint nodes node1 key1=value1:NoSchedule-

# 可在 master 上打上要求指定了 master 才运行
kubectl taint node MASTER node-role.kubernetes.io/master=:NoSchedule-
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
    - name: nginx
      image: nginx
      imagePullPolicy: IfNotPresent
  tolerations: # 容忍配置
    - key: 'key1'
      operator: 'Equal' # Exists
      value: 'value1'
      effect: 'NoSchedule'
```

## 优先级和抢占

- PriorityClass - v1.14+
  - value 1 - 10^10
  - globalDefault - 该 class 作为默认 - pod 缺省 priorityClassName 时
- 内置 PriorityClass
  - system-cluster-critical
  - system-node-critical
  - 用于确保 Pod 永远会执行 - 例如网络组件 metallb
  - 如果希望节点在某个 Pod 总会执行可添加
- Pod priorityClassName

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: 'This priority class should be used for XYZ service pods only.'
# 抢占策略 - 默认 PreemptLowerPriority
# Never 不被抢占 - 例如 Job 不想被中断场景
# 1.19+ beta
preemptionPolicy: Never
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
    - name: nginx
      image: nginx
      imagePullPolicy: IfNotPresent
  # 针对 Pod
  priorityClassName: system-node-critical
```

## Probe

- startupProbe - 1.16+
  - 判断是否启动，只会判断 **一次**
  - 用于保护启动慢的应用
  - startup 后才会开始 livenessProbe 和 readinessProbe
- livenessProbe
  - 判断是否存活，未存活会被 kill 重启
- readinessProbe
  - 判断是否准备好，未准备好不会接收流量
  - 未准备: dns 记录会无法方法

## 资源

- 空间限制
  - CPU `sum by (namespace)(count by (namespace,pod,container)(kube_pod_container_info{container!=""}) unless sum by (namespace,pod,container)(kube_pod_container_resource_limits{resource="cpu"}))`
  - Memory `sum by (namespace)(count by (namespace,pod,container)(kube_pod_container_info{container!=""}) unless sum by (namespace,pod,container)(kube_pod_container_resource_limits{resource="memory"}))`
- limits
- requests

---

- https://sysdig.com/blog/kubernetes-resource-limits

# FAQ

## cordon vs drain

- cordon - 标记节点不可调度
- drain - 驱逐 pod - 包含 cordon 行为
  - 用于节点升级、维护
  - 节点恢复后 uncordon
- https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/

## region vs zone

- region - 区域 - 由多个地区组成
  - 独立地理位置
- zone - 地区
  - 故障网域
- Regions are independent geographic areas that consist of zones. Zones and regions are logical abstractions of underlying physical resources provided in one or more physical data centers.
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html
- https://cloud.google.com/docs/geography-and-regions
- https://cloud.google.com/compute/docs/regions-zones
