---
title: Kubernetes 版本
---

# Kubernetes 版本

- [Feature Gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
  - CSIMigrationXxx - 内置 CSI 迁移为外部 CSI 驱动
  - [pkg/features/kube_features.go](https://github.com/kubernetes/kubernetes/blob/master/pkg/features/kube_features.go)
- [kubernetes/enhancements](https://github.com/kubernetes/enhancements)

| version         | release    |
| --------------- | ---------- |
| Kubernetes 1.23 | 2021-12-07 |
| Kubernetes 1.22 | 2021-08-04 |
| Kubernetes 1.21 | 2021-04-08 |
| Kubernetes 1.20 | 2020-12-08 |

- 参考
  - [废弃 API 迁移文档](https://kubernetes.io/docs/reference/using-api/deprecation-guide)

| API                       | from | to    |
| ------------------------- | ---- | ----- |
| networking.k8s.io/v1beta1 |      | v1.22 |
| networking.k8s.io/v1      |      |       |

**特性分组说明**

| feature groups    | desc             |
| ----------------- | ---------------- |
| api-machinery     | 接口             |
| apps              | 执行             |
| auth              | 授权             |
| cli               | 命令行 - kubectl |
| cluster-lifecycle | 集群生命周期     |
| cluster-provider  | 集群供应商       |
| instrumentation   | kubelet 自身相关 |
| network           | 网络             |
| node              | 节点             |
| scheduling        | 调度 - Pod       |
| storage           | 存储             |
| windows           | Windows 相关     |

:::info 特性阶段默认

- Stable 一般默认开启,
- Beta 可能开启
- Alpha 一般为关闭

:::

:::tip 版本关注点

- breaking-change
  - 移除 depracated - 例如 Ingress 升级过程
- 默认启用的特性 - Stable, Beta
- distro 开启的特性 - K3S, K0S
- 对使用影响大的特性

:::

[cronjobcontrollerv2]: ./k8s-features#CronJobControllerV2
[ipv6dualstack]: ./k8s-features#IPv6DualStack
[statefulsetautodeletepvc]: ./k8s-features#StatefulSetAutoDeletePVC

## 1.23

- 新的 `kubectl events` 命令
- pvc resize 从失败恢复
- gRPC probe
- 废弃 FlexVolume
- 参考
  - [Kubernetes 1.23 – What’s new?](https://sysdig.com/blog/kubernetes-1-23-whats-new/)

:::tip

- Kubernetes 会逐步把 CSI 移出核心

:::

| stage  | group             | feature                                | default | alpha | beta | stable |
| ------ | ----------------- | -------------------------------------- | ------- | ----- | ---- | ------ |
| Alpha  | api-machinery     | CustomResourceValidationExpressions    |
| Alpha  | api-machinery     | OpenAPIEnum                            |
| Alpha  | api-machinery     | OpenApiv3                              |
| Alpha  | api-machinery     | ServerSideFieldValidation              |
| Alpha  | apps              | [StatefulSetAutoDeletePVC]             |         |
| Alpha  | cluster-lifecycle | UnversionedKubeletConfigMap            |
| Alpha  | node              | CPUManagerPolicyExperimentalOptions    |         |
| Alpha  | node              | GracefulNodeShutdownBasedOnPodPriority |         |
| Alpha  | node              | GRPCContainerProbe                     |         |
| Alpha  | node              | PodAndContainerStatsFromCRI            |         |
| Alpha  | storage           | CSIMigrationPortworx                   |
| Alpha  | storage           | CSIMigrationRBD                        |
| Alpha  | storage           | DelegateFSGroupToCSIDriver             |
| Alpha  | storage           | HonorPVReclaimPolicy                   |
| Alpha  | storage           | RecoverVolumeExpansionFailure          |         |
| Alpha  | windows           | IdentifyPodOS                          |
| Alpha  | windows           | WindowsHostProcessContainers           | true    |
| Beta   | auth              | PodSecurity                            | true    |
| Beta   | node              | CPUManagerPolicyOptions                | false   |
| Beta   | node              | EphemeralContainers                    | true    |
| Beta   | node              | KubeletPodResourcesGetAllocatable      | true    |
| Beta   | scheduling        | JobMutableNodeSchedulingDirectives     | true    |
| Stable | apps              | JobReadyPods                           |         |
| Stable | apps              | JobTrackingWithFinalizers              |         |
| Stable | apps              | StatefulSetMinReadySeconds             |         |
| Stable | apps              | TTLAfterFinished                       |         |
| Stable | network           | IngressClassNamespacedParams           |         |
| Stable | network           | [IPv6DualStack]                        |         |
| Stable | network           | TopologyAwareHints                     |         |
| Stable | storage           | ConfigurableFSGroupPolicy              |
| Stable | storage           | CSIMigrationAWS                        | false   |
| Stable | storage           | CSIVolumeFSGroupPolicy                 |
| Stable | storage           | GenericEphemeralVolume                 |

## 1.22

:::caution

- ingress 移除了 networking.k8s.io/v1beta1 , 建议等下一个大版本再升级
  - 因为很多周边配套服务还没有升级使用 networking.k8s.io/v1

:::

- 新的 PodSecurity admission 控制器 作为 PSP 替代
- Rootless 模式容器
  - KubeletInUserNamespace
- Seccomp
  - SeccompDefault - 支持默认开启
- 支持 swap
  - NodeMemorySwap
  - --fail-on-swap
  - kubelet MemorySwap.SwapBehavior=UnlimitedSwap
- cgroupsv2
  - Memory QoS - min,max,low,high
- 稳定 API
  - Server-side Apply - kubectl apply 功能迁移到服务端 - 1.14+
  - 废弃接口告警机制 - 1.19+
  - namespace 不可变 label - kubernetes.io/metadata.name - 1.21+
  - CronJobs - 1.4+
  - PodDisruptionBudget - 1.4+
  - EndpointSlice - 解决 pod 多 IP 问题
    - 1.22 会为超过 1000 的 Endpoints 添加 endpoints.kubernetes.io/over-capacity: truncated
      - 之前是 endpoints.kubernetes.io/over-capacity: warning
  - AppProtocol - Services 和 Endpoints 自定义协议
  - HugePageStorageMediumSize - 1.18+
  - Pod `hostnameFQDN: true` - hotsname 设置为 FQDN - 1.19+
  - CSIServiceAccountToken
  - Windows CSI 插件 - 1.16+
- Beta API
  - APIPriorityAndFairness
  - Job .spec.suspend
  - CRS 有效期 - CertificateSigningRequestSpec.ExpirationSeconds
  - Service LoadBalancer Class - 支持多 LB
  - .spec.egress.ports.endPort - 配置端口段
  - 临时容器 - kubectl debug
  - emptyDir.sizeLimit - 限制 tmpfs 内存使用
  - 存储 volume DataSource - 支持预先包含数据
- Alpha
  - MaxDNSSearchPathsExpanded - 扩展 DNS 长度
    - MaxDNSSearchPaths 6 -> 32
    - MaxDNSSearchListChars 256 -> 2048
  - 存储 ReadWriteOncePod - 单几点 RWM，只允许一个节点
- 移除废弃 Beta API
  - Ingress
  - CustomResourceDefinition
  - ValidatingWebhookConfiguration
  - MutatingWebhookConfiguration
  - CertificateSigningRequest
- 功能废弃
  - StreamingProxyRedirects
  - ServiceTopology - 使用 Topology Aware Hints / 1.17+
  - DynamicKubeletConfig
- 参考
  - [1.22: Here’s What You Need To Know](https://kubernetes.io/blog/2021/07/14/upcoming-changes-in-kubernetes-1-22/)
  - [Kubernetes 1.22 – What’s new?](https://sysdig.com/blog/kubernetes-1-22-whats-new/)

| stage      | feature                           | default | alpha | beta | stable |
| ---------- | --------------------------------- | ------- | ----- | ---- | ------ |
| Alpha      | APIServerTracing                  |         | 1.22  |      |
| Alpha      | CPUManagerPolicyOptions           |         | 1.22  |      |
| Alpha      | DelegateFSGroupToCSIDriver        |         | 1.22  |      |
| Alpha      | DisableCloudProviders             |         | 1.22  |      |
| Alpha      | ExpandedDNSConfig                 |         | 1.22  |      |
| Alpha      | JobTrackingWithFinalizers         |         | 1.22  |      |
| Alpha      | KubeletInUserNamespace            |         | 1.22  |      |
| Alpha      | MemoryQoS                         |         | 1.22  |      |
| Alpha      | NodeSwap                          |         | 1.22  |      |
| Alpha      | PodSecurity                       |         | 1.22  |      |
| Alpha      | ProxyTerminatingEndpoints         |         | 1.22  |      |
| Alpha      | ReadWriteOncePod                  |         | 1.22  |      |
| Alpha      | SeccompDefault                    |         | 1.22  |      |
| Alpha      | StatefulSetMinReadySeconds        |         | 1.22  |      |
| Alpha      | WindowsHostProcessContainers      |         | 1.22  |      |
| Alpha      | WindowsHostProcessContainers      |         | 1.22  |      |
| Beta       | ControllerManagerLeaderMigration  | true    | 1.21  | 1.22 |
| Beta       | CSRDuration                       | true    |       | 1.22 |
| Beta       | DaemonSetUpdateSurge              | true    | 1.21  | 1.22 |
| Beta       | EndpointSliceTerminatingCondition | true    | 1.20  | 1.22 |
| Beta       | IndexedJob                        | true    | 1.21  | 1.22 |
| Beta       | IngressClassNamespacedParams      | true    | 1.21  | 1.22 |
| Beta       | LogarithmicScaleDown              | true    | 1.21  | 1.22 |
| Beta       | MemoryManager                     | true    | 1.21  | 1.22 |
| Beta       | NetworkPolicyEndPort              | true    | 1.21  | 1.22 |
| Beta       | PodAffinityNamespaceSelector      | true    | 1.21  | 1.22 |
| Beta       | PodDeletionCost                   | true    | 1.21  | 1.22 |
| Beta       | PreferNominatedNode               | true    | 1.21  | 1.22 |
| Beta       | ProbeTerminationGracePeriod       | false   | 1.21  | 1.22 |
| Beta       | ServiceInternalTrafficPolicy      | true    | 1.21  | 1.22 |
| Beta       | ServiceLBNodePortControl          | true    | 1.20  | 1.22 |
| Beta       | ServiceLoadBalancerClass          | true    | 1.21  | 1.22 |
| Beta       | SizeMemoryBackedVolumes           | true    | 1.20  | 1.22 |
| Beta       | SuspendJob                        | true    | 1.21  | 1.22 |
| Deprecated | BalanceAttachedNodeVolumes        | false   | 1.11  |      |
| Deprecated | CSIMigrationvSphereComplete       |         |       | 1.19 |
| Deprecated | DynamicKubeletConfig              | false   | 1.4   | 1.11 |
| Deprecated | StreamingProxyRedirects           | false   |       | 1.5  |
| Deprecated | ValidateProxyRedirects            | true    | 1.12  | 1.14 |
| Stable     | BoundServiceAccountTokenVolume    |         | 1.13  | 1.21 | 1.22   |
| Stable     | [CronJobControllerV2]             |         | 1.20  | 1.21 | 1.22   |
| Stable     | CSIServiceAccountToken            |         | 1.20  | 1.21 | 1.22   |
| Stable     | EndpointSliceProxying             |         | 1.18  | 1.19 | 1.22   |
| Stable     | HugePageStorageMediumSize         |         | 1.18  | 1.19 | 1.22   |
| Stable     | HugePageStorageMediumSize         |         | 1.18  | 1.19 | 1.22   |
| Stable     | NamespaceDefaultLabelName         |         |       | 1.21 | 1.22   |
| Stable     | ServerSideApply                   |         | 1.14  | 1.16 | 1.22   |
| Stable     | SetHostnameAsFQDN                 |         | 1.19  | 1.20 | 1.22   |
| Stable     | WarningHeaders                    |         |       | 1.19 | 1.22   |
| Stable     | WindowsEndpointSliceProxying      |         | 1.19  | 1.21 | 1.22   |

```bash
# 当前使用的 ingress 版本
kubectl get ing --all-namespaces -o $'go-template={{range $k,$v := .items}}{{.apiVersion}}\n{{end}}' | sort -n -u
```

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
  - name: PodSecurity
    configuration:
      defaults: # Defaults applied when a mode label is not set.
        enforce: <default enforce policy level>
        enforce-version: <default enforce policy version>
        audit: <default audit policy level>
        audit-version: <default audit policy version>
        warn: <default warn policy level>
        warn-version: <default warn policy version>
      exemptions:
        usernames: [<array of authenticated usernames to exempt>]
        runtimeClassNames: [<array of runtime class names to exempt>]
        namespaces: [<array of namespaces to exempt>]
```

## 1.21

- 13 stable, 16 beta, 20 alpha, 2 废弃
- Kustomize 从 v2.0.3 升级到 v4.0.5 - 之前因为依赖问题被 block
- kubelet 支持结构化日志
- TokenRequest, TokenRequestProjection - 默认开启
- Stable/GA
  - CronJobs - 1.8 ScheduledJobs beta
  - 不可变的 Secrets, ConfigMaps
    - kubelet 不 watch 变化，减少 apiserver 负载
  - ServiceNodeExclusion, NodeDisruptionExclusion, LegacyNodeRoleBehavior
  - KEP-85 policy/v1/PodDisruptionBudget - 1.5 beta
  - KEP-23 支持 sysctl - 自 1.4
- Beta
  - IPv4/IPv6 dual-stack
  - CSI Service Account Token
  - Generic ephemeral volumes - 1.19 alpha
  - Storage Capacity - 1.19 alpha
    - 之前调度不会关心存储空间问题
    - 用于后续支持基于节点存储空间调度功能
  - Graceful node shutdown
    - 1.21 默认开启
      - ShutdownGracePeriod, ShutdownGracePeriodCriticalPods 默认为 0
      - 设置为非 0 激活节点优雅关机
    - 依赖 systemd
  - KEP-592 Job ttlSecondsAfterFinished
    - Job 完成后，在 TTL 时间过后被删除
- Alpha
  - CSI Health Monitoring
  - [Topology Aware Hints](https://kubernetes.io/docs/concepts/services-networking/topology-aware-hints/)
    - 在 EndpointSlice 和 Endpoints 添加元信息 - hints
    - [KEP-2433](https://github.com/kubernetes/enhancements/blob/master/keps/sig-network/2433-topology-aware-hints/README.md)
  - kEP-2255 Pod label `controller.kubernetes.io/pod-deletion-cost` 标识 删除成本
    - 默认 0
    - 影响 ReplicaSet 缩容调度 逻辑
  - KEP-2214 Job 索引
    - batch/v1/Job completionMode 支持 Indexed
    - [Completion mode](https://kubernetes.io/docs/concepts/workloads/controllers/job/#completion-mode)
  - KEP-2232 停止 Job
    - `.spec.suspend=true` 停止，设置为 false 恢复调度
  - KEP_2227 Pod 默认容器标签 `kubectl.kubernetes.io/default-container`
    - 设置后 `kubectl exec` 可以不在指定容器 - 使用上会方便很多
- 废弃
  - PodSecurityPolicy - 1.25 移除, 1.8 beta, opt-in
    - 用于解耦底层 Linux 安全和部署安全
    - 替代
      - [open-policy-agent/gatekeeper/](https://github.com/open-policy-agent/gatekeeper/)
      - [kyverno/kyverno/](https://github.com/kyverno/kyverno)
      - [cruise-automation/k-rail](https://github.com/cruise-automation/k-rail)
    - [PodSecurityPolicy Deprecation: Past, Present, and Future](https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future/)
      - PSP 使用相对困惑
      - 目前有更好三方替代
      - [KEP-2579](https://github.com/kubernetes/enhancements/issues/2579) 讨论下一个替代方案
  - Service 的 [topologyKeys](https://kubernetes.io/docs/concepts/services-networking/service-topology/) 字段
    - 替代功能为 Topology Aware Hints - 1.21 Alpha
  - `kubectl alpha debug` -> `kubectl debug`
- 参考
  - [Kubernetes 1.21: Power to the Community](https://kubernetes.io/blog/2021/04/08/kubernetes-1-21-release-announcement/)
  - sysdig [What’s new in Kubernetes 1.21](https://sysdig.com/blog/whats-new-kubernetes-1-21/)

| stage      | feature                           | default | alpha | beta | stable |
| ---------- | --------------------------------- | ------- | ----- | ---- | ------ |
| Alpha      | BalanceAttachedNodeVolumes        |         | 1.11  |      |
| Alpha      | ControllerManagerLeaderMigration  |         | 1.21  | 1.22 |
| Alpha      | ControllerManagerLeaderMigration  |         | 1.21  | 1.22 |
| Alpha      | CSIVolumeHealth                   |         | 1.21  |      |
| Alpha      | DaemonSetUpdateSurge              |         | 1.21  | 1.22 |
| Alpha      | EndpointSliceTerminatingCondition |         | 1.20  | 1.22 |
| Alpha      | IndexedJob                        |         | 1.21  | 1.22 |
| Alpha      | IngressClassNamespacedParams      |         | 1.21  | 1.22 |
| Alpha      | InTreePluginAWSUnregister         |         | 1.21  |      |
| Alpha      | InTreePluginAzureDiskUnregister   |         | 1.21  |      |
| Alpha      | InTreePluginAzureFileUnregister   |         | 1.21  |      |
| Alpha      | InTreePluginGCEUnregister         |         | 1.21  |      |
| Alpha      | InTreePluginOpenStackUnregister   |         | 1.21  |      |
| Alpha      | InTreePluginvSphereUnregister     |         | 1.21  |      |
| Alpha      | KubeletPodResourcesGetAllocatable |         | 1.21  |      |
| Alpha      | LogarithmicScaleDown              |         | 1.21  | 1.22 |
| Alpha      | MemoryManager                     |         | 1.21  | 1.22 |
| Alpha      | NetworkPolicyEndPort              |         | 1.21  | 1.22 |
| Alpha      | PodAffinityNamespaceSelector      |         | 1.21  | 1.22 |
| Alpha      | PodDeletionCost                   |         | 1.21  | 1.22 |
| Alpha      | PreferNominatedNode               |         | 1.21  | 1.22 |
| Alpha      | ProbeTerminationGracePeriod       |         | 1.21  | 1.22 |
| Alpha      | ServiceInternalTrafficPolicy      |         | 1.21  | 1.22 |
| Alpha      | ServiceLBNodePortControl          |         | 1.20  | 1.22 |
| Alpha      | ServiceLoadBalancerClass          |         | 1.21  | 1.22 |
| Alpha      | SizeMemoryBackedVolumes           |         | 1.20  | 1.22 |
| Alpha      | SuspendJob                        |         | 1.21  | 1.22 |
| Alpha      | TopologyAwareHints                |         | 1.21  |      |
| Alpha      | VolumeCapacityPriority            |         | 1.21  |      |
| Beta       | BoundServiceAccountTokenVolume    | true    | 1.13  | 1.21 | 1.22   |
| Beta       | [CronJobControllerV2]             | true    | 1.20  | 1.21 | 1.22   |
| Beta       | CSIMigrationAzureFile             | false   | 1.15  | 1.21 |
| Beta       | CSIMigrationvSphereComplete       | false   |       | 1.19 |
| Beta       | CSIServiceAccountToken            | true    | 1.20  | 1.21 | 1.22   |
| Beta       | CSIStorageCapacity                | true    | 1.19  | 1.21 |
| Beta       | DownwardAPIHugePages              | false   | 1.20  | 1.21 |
| Beta       | DynamicKubeletConfig              | true    | 1.4   | 1.11 |
| Beta       | EfficientWatchResumption          | true    | 1.20  | 1.21 |
| Beta       | EndpointSliceProxying             | true    | 1.18  | 1.19 | 1.22   |
| Beta       | GenericEphemeralVolume            | true    | 1.19  | 1.21 |
| Beta       | GracefulNodeShutdown              | true    | 1.20  | 1.21 |
| Beta       | HugePageStorageMediumSize         | true    | 1.18  | 1.19 | 1.22   |
| Beta       | HugePageStorageMediumSize         | true    | 1.18  | 1.19 | 1.22   |
| Beta       | [IPv6DualStack]                   | true    | 1.15  | 1.21 |
| Beta       | NamespaceDefaultLabelName         | true    |       | 1.21 | 1.22   |
| Beta       | ServerSideApply                   | true    | 1.14  | 1.16 | 1.22   |
| Beta       | SetHostnameAsFQDN                 | true    | 1.19  | 1.20 | 1.22   |
| Beta       | TTLAfterFinished                  | true    | 1.12  | 1.21 |
| Beta       | ValidateProxyRedirects            | true    | 1.12  | 1.14 |
| Beta       | WarningHeaders                    | true    |       | 1.19 | 1.22   |
| Beta       | WindowsEndpointSliceProxying      | true    | 1.19  | 1.21 | 1.22   |
| Deprecated | CSIMigrationAWSComplete           |         | 1.17  |      |
| Deprecated | CSIMigrationAzureDiskComplete     |         | 1.17  |      |
| Deprecated | CSIMigrationAzureFileComplete     |         | 1.17  |      |
| Deprecated | CSIMigrationGCEComplete           |         | 1.17  |      |
| Deprecated | CSIMigrationOpenStackComplete     |         | 1.17  |      |
| Deprecated | StreamingProxyRedirects           | true    |       | 1.5  |
| Stable     | CRIContainerLogRotation           |         | 1.10  | 1.11 | 1.21   |
| Stable     | EndpointSlice                     |         | 1.16  | 1.17 | 1.21   |
| Stable     | EndpointSliceNodeName             |         | 1.20  |      | 1.21   |
| Stable     | ImmutableEphemeralVolumes         |         | 1.18  | 1.19 | 1.21   |
| Stable     | LegacyNodeRoleBehavior            | false   | 1.16  | 1.19 | 1.21   |
| Stable     | NodeDisruptionExclusion           |         | 1.16  | 1.19 | 1.21   |
| Stable     | PodDisruptionBudget               |         | 1.3   | 1.5  | 1.21   |
| Stable     | RootCAConfigMap                   |         | 1.13  | 1.20 | 1.21   |
| Stable     | RunAsGroup                        |         |       | 1.14 | 1.21   |
| Stable     | ServiceAccountIssuerDiscovery     |         | 1.18  | 1.20 | 1.21   |
| Stable     | ServiceNodeExclusion              |         | 1.8   | 1.19 | 1.21   |
| Stable     | Sysctls                           |         |       | 1.11 | 1.21   |

**POD**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sysctl-example
  annotations:
    # 旧的 sysctl 控制
    security.alpha.kubernetes.io/sysctls: kernel.shm_rmid_forced=1
    # 定义 kubectl 的默认 容器
    kubectl.kubernetes.io/default-container: 'test'
    # 删除成本 Alpha
    # 影响调度
    controller.kubernetes.io/pod-deletion-cost: '10'
spec:
  securityContext:
    # 新的 sysctl 控制
    sysctls:
      - name: kernel.shm_rmid_forced
        value: 1
  # 优雅停止 - Alpha
  # Pod 级别
  terminationGracePeriodSeconds: 3600
  containers:
    containers:
      - name: test
        image: alpine
        annotations:
        livenessProbe:
          # 容器覆盖 Pod 级别配置
          terminationGracePeriodSeconds: 60
```

**JOB**

```yaml
apiVersion: batch/v1
 kind: Job
 metadata:
   name: 'indexed-job'
 spec:
  # 停止的 Job
  suspend: true

  completions: 5
  parallelism: 3
  # 索引 Job
  # 每个 Pod 的索引为 0 到 completions-1
  # 默认 NonIndexed
  completionMode: Indexed

  # TTLAfterFinished
  ttlSecondsAfterFinished: 100
```

## 1.20

- 11 stable, 15 beta, 16 alpha
- 废弃 dockershim
  - 只是废弃 dockershim - 暂无移除计划
  - 使用 CRI 标准接口 - 目前 docker 不支持, containerd 默认实现
  - docker 底层使用 containerd, docker 依然能正常使用, 只是移除了特殊中间层支持: docker -> shim -> containerd
  - 非 Linux 平台 containerd 无支持，需要 docker
  - Mirantis 会通过 [Mirantis/cri-dockerd](https://github.com/Mirantis/cri-dockerd) 添加 docker 的 cri 支持
  - **结论**
    - 维持现状
- go 1.15.5
- 不再默认包含云平台控制器 - 由云平台自行提供
- Stable/GA
  - CSI 卷快照
  - PID 限制 - SupportNodePidsLimit
  - TokenRequest/TokenRequestProjection - 目前还需要打开特性，1.21 会默认打开
  - node.k8s.io API 进入 `v1` 废弃 `v1beta1`
- Beta
  - API 优先级处理 - 对 API 进行优先级分层，优先处理重要 API 请求
  - 非递归 卷所归属关系/fsgroup - 可理解为 `chown $GROUP:$USER $VOLUME`
  - FSGroup CSIDriver 策略
  - RootCAConfigMap - 所有 NS 可访问，用于校验 kube-apiserver 链接
  - `kubectl debug`
  - SetHostnameAsFQDN
- Alpha
  - CronJob v2
  - 从新实现 IPv4/IPv6 双栈
  - CSI 安全增强 - CSIServiceAccountToken - 使用其他 SA 而非当前
  - 优雅的节点停止 - GracefulNodeShutdown
  - 移除日志敏感信息 - `--experimental-logging-sanitization`
    - 移除字段 passwords, keys, tokens
    - 支持组件 - 不支持用户 Pod 维度相关日志
      - kube-controller-manager
      - kube-apiserver
      - kube-scheduler
      - kubelet
  - 所有 Pod 资源指标 `/metrics/resources` - `--show-hidden-metrics-for-version=1.20`
    - [kube-scheduler metrics](https://kubernetes.io/docs/concepts/cluster-administration/system-metrics/#kube-scheduler-metrics)
- 可能遇到的问题
  - exec probe 不会超时，现在 ExecProbeTimeout 会生效，没有配置的默认 1s
- [CHANGELOG-1.20](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.20.md)

```yaml
# IPv4/IPv6 双栈
apiVersion: v1
kind: Service
metadata:
  name: my-service
  labels:
    app: MyApp
spec:
  # 可集群维度配置
  # ipFamilyPolicy: SingleStack # 单栈
  ipFamilyPolicy: PreferDualStack
  # 可选
  ipFamilies:
    - IPv6
    - IPv4
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
```

## 1.19

- EndpointSlices 默认启用
- Ingress GA
- seccomp GA
- KubeSchedulerConfiguration Beta
- 存储容量跟踪 - Alpha
  - 之前调度时都不会考虑节点存储容量
- 通用临时存储卷
- 不可变的 Secrets 和 ConfigMaps - Beta
- kubernetes/dashboard v2
- 通用 [ephemeral volumes](https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/)
  - 生命周期与 pod 绑定
  - 支持使用动态 provisioning 存储作为临时卷 - ALPHA
- [CHANGELOG-1.19](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md)

## Script

```js title="extract-features.js"
const version = '1.21';
function build(ver = version) {
  const all = Array.prototype.map.call($$('table tbody tr'), ($tr) =>
    Array.prototype.map.call($tr.querySelectorAll('td'), ($td) => $td.innerText),
  );
  const byName = all.reduce((o, [name, _, stage, s]) => {
    const v = (o[name] ||= {});
    v[stage] ??= s;
    return o;
  }, {});

  let rows = all
    .filter((v) => v[3] === ver || v[4] === ver)
    .map(([name, def, stage, s, u]) => {
      const o = byName[name];
      stage = stage.replace('GA', 'Stable');
      def = def.replace('-', '');
      switch (stage) {
        case 'Alpha':
          def = def.replace('false', '');
          break;
        case 'Stable':
          def = def.replace('true', '');
          break;
      }
      return [stage, name, def, o.Alpha, o.Beta, o.GA];
    });

  copy(rows.map((v) => v.join('|')).join('\n'));
}
```
