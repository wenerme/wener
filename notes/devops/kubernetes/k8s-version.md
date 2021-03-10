---
title: Kubernetes 版本
---

# Kubernetes 版本

## 1.20 - 2020-12-08
* 11 stable, 15 beta, 16 alpha
* 废弃 dockershim
  * 只是废弃 dockershim - 暂无移除计划
  * 使用 CRI 标准接口 - 目前 docker 不支持, containerd 默认实现
  * docker 底层使用 containerd, docker 依然能正常使用, 只是移除了特殊中间层支持: docker -> shim -> containerd
  * 非 Linux 平台 containerd 无支持，需要 docker
  * Mirantis 会通过 [Mirantis/cri-dockerd](https://github.com/Mirantis/cri-dockerd) 添加 docker 的 cri 支持
  * __结论__
    * 维持现状
* go 1.15.5
* 不再默认包含云平台控制器 - 由云平台自行提供
* Stable/GA
  * CSI 卷快照
  * PID 限制 - SupportNodePidsLimit
  * TokenRequest/TokenRequestProjection - 目前还需要打开特性，1.21 会默认打开
  * node.k8s.io API 进入 `v1` 废弃 `v1beta1`
* Beta
  * API 优先级处理 - 对 API 进行优先级分层，优先处理重要 API 请求
  * 非递归 卷所归属关系/fsgroup - 可理解为 `chown $GROUP:$USER $VOLUME`
  * FSGroup CSIDriver 策略
  * RootCAConfigMap - 所有 NS 可访问，用于校验 kube-apiserver 链接
  * `kubectl debug`
  * SetHostnameAsFQDN
* Alpha
  * CronJob v2
  * 从新实现 IPv4/IPv6 双栈
  * CSI 安全增强 - CSIServiceAccountToken - 使用其他 SA 而非当前
  * 优雅的节点停止 - GracefulNodeShutdown
  * 移除日志敏感信息 - `--experimental-logging-sanitization`
    * 移除字段 passwords, keys, tokens
    * 支持组件 - 不支持用户 Pod 维度相关日志
      * kube-controller-manager
      * kube-apiserver
      * kube-scheduler
      * kubelet
  * 所有 Pod 资源指标 `/metrics/resources` - `--show-hidden-metrics-for-version=1.20`
    * [kube-scheduler metrics](https://kubernetes.io/docs/concepts/cluster-administration/system-metrics/#kube-scheduler-metrics)
* 可能遇到的问题
  * exec probe 不会超时，现在 ExecProbeTimeout 会生效，没有配置的默认 1s
* [CHANGELOG-1.20](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.20.md)


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
* EndpointSlices 默认启用
* Ingress GA
* seccomp GA
* KubeSchedulerConfiguration Beta
* 存储容量跟踪 - Alpha
  * 之前调度时都不会考虑节点存储容量
* 通用临时存储卷
* 不可变的 Secrets 和 ConfigMaps - Beta
* kubernetes/dashboard v2
* 通用 [ephemeral volumes](https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/)
  * 生命周期与 pod 绑定
  * 支持使用动态 provisioning 存储作为临时卷 - ALPHA
* [CHANGELOG-1.19](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md)
