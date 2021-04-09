---
title: Kubernetes 版本
---

# Kubernetes 版本

## 1.21 - 2021-04-08

- 13 stable, 16 beta, 20 alpha, 2 废弃
- Kustomize 从 v2.0.3 升级到 v4.0.5 - 之前因为依赖问题被 block
- Pod 默认容器标签 `kubectl.kubernetes.io/default-container`
  - 设置后 `kubectl exec` 可以不在指定容器 - 使用上会方便很多
- kubelet 支持结构化日志
- TokenRequest, TokenRequestProjection - 默认开启
- Stable/GA
  - CronJobs - 1.8 ScheduledJobs beta
  - 不可变的 Secrets, ConfigMaps
    - kubelet 不 watch 变化，减少 apiserver 负载
  - ServiceNodeExclusion, NodeDisruptionExclusion, LegacyNodeRoleBehavior
  - KEP-85 policy/v1/PodDisruptionBudget - 1.5 beta
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
    - batch/v1/Job completionMode 支持 Indexed, completions 为完成索引
  - KEP-2232 停止 Job
    - `.spec.suspend=true` 停止，设置为 false 恢复调度
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

## 1.20 - 2020-12-08

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
