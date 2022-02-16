---
title: K8S 常见问题
tags:
  - FAQ
---

# K8S 常见问题

## headless service

- 不需要 clusterIP 的 service
- 不用于路由，而是用于 dns 查询 - 返回 endpoint 地址

```yaml
spec:
  clusterIP: None
```

## cni-plugins 不再包含 flannel

- flannel 独立出单独的 repo [flannel-io/cni-plugin](https://github.com/flannel-io/cni-plugin)
- https://github.com/containernetworking/plugins/issues/655

## 资源限制

## K3S 常见问题

- [#396](https://github.com/rancher/k3s/issues/396) - Initializing eviction metric for zone

## Pod 时区

1. TZ 环境变量

- 要求 语言/runtime 支持
- 需要 tzdata

2. 映射 tz 信息

- 可以与 host 保持一致
- 可以不需要安装 tzdata
- 要求 host 安装了 tzdata
- 要求调整 Pod

3. 代码内控制

- bundle tzdata，运行时加载
- golang `import _ "time/tzdata"`
  - 增加约 450 KB

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-sleep
spec:
  containers:
    - name: busybox
      image: busybox
      args:
        - sleep
        - '1000000'
      env:
        - name: TZ
          value: Asia/Shanghai
      volumeMounts:
        - name: tz-config
          mountPath: /etc/localtime
  volumes:
    - name: tz-config
      hostPath:
        path: /usr/share/zoneinfo/Asia/Shanghai
        type: File
```

## taint

- node.kubernetes.io/disk-pressure:NoSchedule
- 为 pod 设置 priorityClassName 确保调度，避免驱逐
  - system-node-critical,system-cluster-critical

```bash
df -h
df -Hi

# remove DiskPressure
kubectl taint nodes <nodename> node.kubernetes.io/disk-pressure-
```

- 监控来自于 cadvisor
- https://kubernetes.io/docs/concepts/architecture/garbage-collection/#container-image-lifecycle
  - HighThresholdPercent
  - LowThresholdPercent

## 集群限制

- 5000 节点
- 150000 总 Pod
- 300000 总容器
- 100 节点 Pod
- [Building large clusters](https://kubernetes.io/docs/setup/best-practices/cluster-large/)
- [GCE Type](https://cloud.google.com/compute/docs/machine-types)

集群 Master 性能推荐

| Nodes   | GCE Type       | Spec       |
| ------- | -------------- | ---------- |
| 1-5     | n1-standard-1  | 1 核 4G    |
| 6-10    | n1-standard-2  | 2 核 8G    |
| 11-100  | n1-standard-4  | 4 核 16G   |
| 101-250 | n1-standard-8  | 8 核 32G   |
| 251-500 | n1-standard-16 | 16 核 64G  |
| 500+    | n1-standard-32 | 32 核 128G |

## 操作系统要求 / Linux Kernel Requirement

- Linux Kernel 3.10+
- moby [contrib/check-config.sh](https://github.com/moby/moby/blob/master/contrib/check-config.sh)
- Calico [System requirements](https://docs.projectcalico.org/getting-started/kubernetes/requirements)
  - Linux Kernel 3.10+

```bash
./check-config.sh kernel.config
```

## Docker 与 CRI 对 K8S 的影响

- invalid capacity 0 on image filesystem
  - [kubernetes/kubernetes#51798](https://github.com/kubernetes/kubernetes/issues/51798#issuecomment-481366041)
  - [k3s-io/k3s#1857](https://github.com/k3s-io/k3s/issues/1857#issuecomment-637852959)

## 导出资源忽略状态字段

- 常见字段
  - status
  - metadata.managedFields
  - metadata
    - annotations
      - kubectl.kubernetes.io/last-applied-configuration
      - deployment.kubernetes.io/revision
    - resourceVersion
    - selfLink
    - uid
    - creationTimestamp
    - generation

```bash
kubectl get -o=yaml deploy whoami | yq d - status | yq d - 'metadata.managedFields'
```

## 删除卡在 Terminating 状态

```bash
# 例如 NS
kubectl get ns --field-selector status.phase=Terminating

# 所有 NS
kubectl get ns --field-selector status.phase=Terminating -o jsonpath='{..metadata.name}'

# 批量
# kubectl patch ns -p '{"metadata":{"finalizers": null}}' $NS
# kubectl patch ns -p '{"metadata":{"finalizers":[]}}' --type=merge $NS
kubectl patch ns -p '{"metadata":{"finalizers":[]}}' --type=merge $(kubectl get ns --field-selector status.phase=Terminating -o jsonpath='{..metadata.name}')
```

## 删除 rancher 项目空间

- 主要难点在于 get all 不会返回所有资源
  - 可尝试 [ketall](https://github.com/corneliusweig/ketall#via-krew)
- 部分资源需要先 patch 才能删除

```bash
for ns in local p-66lfd ; do
  for error in app.project.cattle.io/cluster-alerting app.project.cattle.io/cluster-monitoring app.project.cattle.io/monitoring-operator app.project.cattle.io/project-monitoring clusteralertgroup.management.cattle.io/cluster-scan-alert clusteralertgroup.management.cattle.io/etcd-alert clusteralertgroup.management.cattle.io/event-alert clusteralertgroup.management.cattle.io/kube-components-alert clusteralertgroup.management.cattle.io/node-alert clusterroletemplatebinding.management.cattle.io/creator-cluster-owner clusterroletemplatebinding.management.cattle.io/u-b4qkhsnliz-admin node.management.cattle.io/machine-9sssc node.management.cattle.io/machine-ks6z6 node.management.cattle.io/machine-v4v89 project.management.cattle.io/p-cnj28 project.management.cattle.io/p-mbvfd projectalertgroup.management.cattle.io/projectalert-workload-alert projectalertrule.management.cattle.io/less-than-half-workload-available projectalertrule.management.cattle.io/memory-close-to-resource-limited projectroletemplatebinding.management.cattle.io/app-jdnmz projectroletemplatebinding.management.cattle.io/creator-project-owner projectroletemplatebinding.management.cattle.io/prtb-s6fhc projectroletemplatebinding.management.cattle.io/u-2gacgc4nfu-member projectroletemplatebinding.management.cattle.io/u-efxo6n6ndd-member  ; do
    for resource in `kubectl get -n $ns $error -o name` ; do
      kubectl patch -n $ns $resource -p '{"metadata": {"finalizers": []}}' --type='merge'
    done
  done
done

# 全局资源
for res in $(kubectl api-resources --namespaced=false --api-group management.cattle.io | cut -d ' ' -f 1); do
  echo "=== $res.management.cattle.io ==="
  kubectl get $res.management.cattle.io
done


# namespaced
groups="management.cattle.io catalog.cattle.io project.cattle.io"
for grp in $groups; do
for res in $(kubectl api-resources --namespaced=true --api-group $grp -o name); do
  echo "=== $res ==="
  kubectl get --all-namespaces $res
done
done


# 清除资源
cleargroup(){
  kubectl patch $1 -p '{"metadata":{"finalizers":[]}}' --type=merge $(kubectl get $1 -o jsonpath='{..metadata.name}')
  kubectl delete --all $1
}

cleargroup globalroles.management.cattle.io
```

## Unable to connect to the server: x509: certificate is valid for 10.10.1.2, 10.43.0.1, 127.0.0.1, 192.168.1.10, not 123.123.123.123

签发的证书不包含 IP，初始化的时候可以添加，建议新建子账号管理。

```bash
# 原先的位于
# /etc/kubernetes/pki/apiserver.*
kubeadm init --apiserver-cert-extra-sans=123.123.123.123
```

## Failed to create pod sandbox: rpc error: code = Unknown desc = failed to create a sandbox for pod "cron-1594372200-lmkcb": operation timeout: context deadline exceeded

测试是否正常

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: alpine-pwd
spec:
  template:
    spec:
      containers:
        - name: alpine
          image: wener/base
          command: ['pwd']
      restartPolicy: Never
  backoffLimit: 4
```

一个主节点异常，重启解决。

## error: specifying a root certificates file with the insecure flag is not allowed

`insecure-skip-tls-verify` 不能用于根证书，新建子账号。

## node_lifecycle_controller.go:1433 Initializing eviction metric for zone

- 当有新的 zone 时会初始化 metric
- 参考
  - [node_lifecycle_controller.go:1433](https://github.com/kubernetes/kubernetes/blob/d01cc01ab4455d1c0db84d2cc79d963a1b15d292/pkg/controller/nodelifecycle/node_lifecycle_controller.go#L1429)
  - [多可用区实践](https://kubernetes.io/docs/setup/best-practices/multiple-zones/)

## running "VolumeBinding" filter plugin for pod "web-0": pod has unbound immediate PersistentVolumeClaims

## error: unable to retrieve the complete list of server APIs: write: broken pipe

- 网络不稳定也可能导致
  - 例如 在使用 sshuttle 的时候偶尔就会出现
  - 可以考虑使用 ssh 转发 - `ssh -vNL 6443:10.10.1.1:6443 admin@192.168.1.2 -o ExitOnForwardFailure=yes`
- an error on the server ("") has prevented the request from succeeding

```bash
# 概率失败
kubectl api-resources

# 确保 metric 正常
kubectl get apiservices
# 确保 系统服务 正常
kubectl get pods -n kube-system
```

- https://github.com/prometheus-operator/kube-prometheus/issues/275

## dns 不通

- 现象 - 所有 服务 504，网关超时
- 排查
  - 验证 kube-dns 53 能否解析
  - 所有节点都有问题还是单个节点
    - 所有节点都有问题则可能是服务的问题
    - 单个节点则可能是环境问题
  - ping 后端 endpoint
  - ping 不通则说明可能是 flannel 插件之类异常或者使用的底层 interface 异常
- 解决
  - 尝试重启 k3s
  - 尝试重启 网络
  - 尝试重启 系统

```bash
# 验证 DNS 能否解析
# k3s 默认使用 10.43.0.10
# kube-dns.kube-system.svc
nslookup wener.me 10.43.0.10
# 或
dig @10.43.0.10 wener.me
```

## MountVolume.SetUp failed for volume "config-volume" : failed to sync secret cache: timed out waiting for the condition

- 条件未满足，无法继续执行，且等待超时
- 解决办法
  - 等待 或 删除 Pod

查看条件

```yaml
status:
  phase: Pending
  conditions:
    - type: Initialized
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2020-09-04T10:09:51Z'
    - type: Ready
      status: 'False'
      lastProbeTime: null
      lastTransitionTime: '2020-09-04T10:09:51Z'
      reason: ContainersNotReady
      message: 'containers with unready status: [alertmanager config-reloader]'
    # 这一步未能成功
    - type: ContainersReady
      status: 'False'
      lastProbeTime: null
      lastTransitionTime: '2020-09-04T10:09:51Z'
      reason: ContainersNotReady
      message: 'containers with unready status: [alertmanager config-reloader]'
    - type: PodScheduled
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2020-09-04T10:09:51Z'
```

## kubernetes swap

不建议使用 swap

- [kubernetes/kubernetes#3533](https://github.com/kubernetes/kubernetes/issues/53533) - Kubelet/Kubernetes should work with Swap Enabled

## didn't have free ports for the requested pod ports

deploy 如果只有一个节点，使用 Recreate， RollingUpdate 会失败。

## scale to zero

使用 keda 或者 knative

- keda 简单 - 负责 autoscaler
- knative 复杂 - 整套开发逻辑

## The StorageClass is invalid: provisioner: Forbidden: updates to provisioner are forbidden.

provisioner 名字不匹配，还 sc 名字或删了重建。

## 预留资源

- [Reserve Compute Resources for System Daemons](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/)

```
--kube-reserved=[cpu=100m][,][memory=100Mi][,][ephemeral-storage=1Gi][,][pid=1000]
--system-reserved=[cpu=100m][,][memory=100Mi][,][ephemeral-storage=1Gi][,][pid=1000]
--reserved-cpus=0-3
# 开始驱逐的阀值
--eviction-hard=[memory.available<500Mi]
--enforce-node-allocatable=pods[,][system-reserved][,][kube-reserved]

# 指向现有的 cgroup
--kube-reserved-cgroup=
--system-reserved-cgroup=
```

## node(s) had volume node affinity conflict

- 如果是 pv 无法迁移，切影响不大，可以考虑删除了从建

可能 pvc 和 pod zone 冲突，可以针对 zone 创建 sc

```yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: region1storageclass
provisioner: kubernetes.io/aws-ebs
volumeBindingMode: WaitForFirstConsumer
allowedTopologies:
  - matchLabelExpressions:
      - key: failure-domain.beta.kubernetes.io/zone
        values:
          - eu-west-2b
```

## 如何保持负载均衡

1. 配置反亲和
2. kill pod 触发重新调度
3. 尝试 rollout 从新调度
4. 使用类似 [kubernetes-sigs/descheduler](https://github.com/kubernetes-sigs/descheduler) 这样的工具自动维护均衡
