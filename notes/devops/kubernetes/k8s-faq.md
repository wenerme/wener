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

## 接口 CURL

```bash
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt --header "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" -X GET https://kubernetes.default.svc/api
```

```bash
# Point to the internal API server hostname
APISERVER=https://kubernetes.default.svc

# Path to ServiceAccount token
SERVICEACCOUNT=/var/run/secrets/kubernetes.io/serviceaccount

# Read this Pod's namespace
NAMESPACE=$(cat ${SERVICEACCOUNT}/namespace)

# Read the ServiceAccount bearer token
TOKEN=$(cat ${SERVICEACCOUNT}/token)

# Reference the internal certificate authority (CA)
CACERT=${SERVICEACCOUNT}/ca.crt

# Explore the API with TOKEN
curl --cacert ${CACERT} --header "Authorization: Bearer ${TOKEN}" -X GET ${APISERVER}/api
```

- https://kubernetes.io/docs/tasks/run-application/access-api-from-pod/#without-using-a-proxy

## 注入环境变量

```yaml
env:
  - name: POD_IP
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
# command 和 args 会展开环境变量
command: ['/bin/echo']
args: ['$(POD_IP)']
```

## limits

- 110 pods/node
- 1 MB/object - etcd 限制 - [#19781](https://github.com/kubernetes/kubernetes/issues/19781)
  - 大型 CRD 定义可能达到这个限制 - embed 外部定义 - [#82292](https://github.com/kubernetes/kubernetes/issues/82292)
  - ConfigMap 如果过大，建议拆分
- 所有 annotation KV 加起来不超过 **256Kb** - [TotalAnnotationSizeLimitB](https://github.com/kubernetes/kubernetes/blob/fa16bf8e121e9a9ce0a8b92d96a39c986152c484/staging/src/k8s.io/apimachinery/pkg/api/validation/objectmeta.go#L36)
- RFC-1123 - DNS LabelName 最长 **63** 字符 - K8S 中很多地方使用该验证
  - 所有支持 DNS 的对象
    - pod,service,namespace
  - label - [#1830](https://github.com/kubernetes/kubernetes/pull/1830)
- gRPC 通常限制为 4MB

---

- https://stackoverflow.com/a/32294443/1870054
- https://etcd.io/docs/v3.3/dev-guide/limit/
  - handle small key value pairs typical for metadata.
  - --max-request-bytes=1.5MiB
  - --quota-backend-bytes=2GB - 建议不超过 8GB

## operator vs controller

- operator 包含一个或多个 controller
- controller 负责 CRD 处理

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
kubectl taint nodes < nodename > node.kubernetes.io/disk-pressure-
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

## invalid capacity 0 on image filesystem

- 确保存在内核参数 `cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory`
  - syslinux
    - /etc/update-extlinux.conf
    - update-extlinux && reboot
  - grub
    - /etc/default/grub

```bash
cat /proc/cmdline | grep cgroup_enable
```

---

- [kubernetes/kubernetes#51798](https://github.com/kubernetes/kubernetes/issues/51798#issuecomment-481366041)
- [k3s-io/k3s#1857](https://github.com/k3s-io/k3s/issues/1857#issuecomment-637852959)
- [canonical/microk8s#912](https://github.com/canonical/microk8s/issues/912)

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

## 删除卡在 Terminating 状态的资源

- 删除 Pod 可尝试强制
- 资源删不掉尝试移除 finalizers。

```bash
# 强制删除 Pod
kubectl delete pods --force < pod > --grace-period=0
# 尝试移除 Pod 的 finalizers
kubectl patch pod '{"metadata":{"finalizers":null}}' < pod > -p

# 查看所有的 Terminating Namespace
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
for ns in local p-66lfd; do
  for error in app.project.cattle.io/cluster-alerting app.project.cattle.io/cluster-monitoring app.project.cattle.io/monitoring-operator app.project.cattle.io/project-monitoring clusteralertgroup.management.cattle.io/cluster-scan-alert clusteralertgroup.management.cattle.io/etcd-alert clusteralertgroup.management.cattle.io/event-alert clusteralertgroup.management.cattle.io/kube-components-alert clusteralertgroup.management.cattle.io/node-alert clusterroletemplatebinding.management.cattle.io/creator-cluster-owner clusterroletemplatebinding.management.cattle.io/u-b4qkhsnliz-admin node.management.cattle.io/machine-9sssc node.management.cattle.io/machine-ks6z6 node.management.cattle.io/machine-v4v89 project.management.cattle.io/p-cnj28 project.management.cattle.io/p-mbvfd projectalertgroup.management.cattle.io/projectalert-workload-alert projectalertrule.management.cattle.io/less-than-half-workload-available projectalertrule.management.cattle.io/memory-close-to-resource-limited projectroletemplatebinding.management.cattle.io/app-jdnmz projectroletemplatebinding.management.cattle.io/creator-project-owner projectroletemplatebinding.management.cattle.io/prtb-s6fhc projectroletemplatebinding.management.cattle.io/u-2gacgc4nfu-member projectroletemplatebinding.management.cattle.io/u-efxo6n6ndd-member; do
    for resource in $(kubectl get -n $ns $error -o name); do
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
cleargroup() {
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

## pause 是什么进程

## 1 node(s) had volume node affinity conflict

- 检查 StorageClass 的亲和策略
- 检查 PersistentVolume 的亲和策略
  - Pod 需要匹配 PV 的亲和策略

## failed to run Kubelet: mountpoint for cpu not found

应该是没有挂载 cgroups

```bash
service cgroups start
```

## orphaned pod found, but error not a directory occurred when trying to remove the volumes dir

```bash
pods=$(tail -n 1000 /var/log/k0s.log | grep 'orphaned pod' | sed -r 's/.*pod[^"]+"([^\\"]+).*/\1/' | uniq)
for i in $pods; do
  echo "Deleting Orphaned pod id: $i"
  rm -rf /var/lib/kubelet/pods/$i
done
```

- [kubernetes#105536](https://github.com/kubernetes/kubernetes/issues/105536)
- [scripts](https://quemingfei.com/archives/kubernetes-wen-ti-pai-cha-orphanedpodfound-butvolumepathsarestillpresentondisk)

## 1 node(s) didn't have free ports for the requested pod ports.

- 检查 hostPort

## 资源

- cpu
  - 1.0 -> 1vcpu -> 1000m
- memory
  - base 1000 - E,T,P,G,M,k
  - 2^n - Ei,Pi,Ti,Gi,Mi,Ki
- `hugepages-<size>`
- ephemeral-storage
- storage

## failed to reserve container name "": name "" is reserved for

- 可能磁盘慢导致，只能等
- 可能是用了 zfs snapshotter
  - `zfs list` 非常慢
  - `ps aux | grep zfs`
- `iostat -d -x 1` 看 `%utils`
- `pidstat -d 1` 排查进程
- https://github.com/containerd/containerd/issues/4604#issuecomment-1027293621

```bash
# reserved containerd
ctr -n k8s.io c ls
```

## unable to find data in memory cache

## parent snapshot does not exist: not found

## invalid bearer token, Token has been invalidated

## Node Shell

可通过一个 Pod 进入

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: node-shell
  namespace: kube-system
spec:
  containers:
    - name: shell
      image: docker.io/alpine:3.13
      command:
        - nsenter
      args:
        - '-t'
        - '1'
        - '-m'
        - '-u'
        - '-i'
        - '-n'
        - sleep
        - '14000'
      resources: {}
      volumeMounts:
        - name: kube-api-access
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      imagePullPolicy: IfNotPresent
      securityContext:
        privileged: true
  volumes:
    - name: kube-api-access
      projected:
        sources:
          - serviceAccountToken:
              expirationSeconds: 3607
              path: token
          - configMap:
              name: kube-root-ca.crt
              items:
                - key: ca.crt
                  path: ca.crt
          - downwardAPI:
              items:
                - path: namespace
                  fieldRef:
                    apiVersion: v1
                    fieldPath: metadata.namespace
        defaultMode: 420
  restartPolicy: Never
  terminationGracePeriodSeconds: 0
  dnsPolicy: ClusterFirst
  serviceAccountName: default
  serviceAccount: default
  # 希望进入的 Node
  nodeName: master-1
  hostNetwork: true
  hostPID: true
  hostIPC: true
  securityContext: {}
  schedulerName: default-scheduler
  tolerations:
    - operator: Exists
  priorityClassName: system-node-critical
  priority: 2000001000
  enableServiceLinks: true
  preemptionPolicy: PreemptLowerPriority
```

## 证书轮换

- k3s
  - 12 个月有效，90 天内轮换
  - 证书轮换需要重启 - `service k3s restart`
  - 正在开始支持的不重启证书轮换 [k3s certificate](https://github.com/k3s-io/k3s/wiki/K3s-Cert-Rotation)
  - [Certificate Rotation](https://rancher.com/docs/k3s/latest/en/advanced/#certificate-rotation)
  - Improved and Manual Cert Rotation [k3s-io/k3s#2636](https://github.com/k3s-io/k3s/issues/2636)
- k0s
  - 同 k3s 在重启时轮换 [k0sproject/k0s#952](https://github.com/k0sproject/k0s/pull/952)
- RKE2
  - [rancher/rke2#570](https://github.com/rancher/rke2/issues/570)
- k8s
  - [Kubernetes Certificate Rotation](https://devopstales.github.io/kubernetes/k8s-cert/)
- 证书类型
  - server ca
    - kubeapi-server cert
  - client ca
    - kube-controller cert
    - kube-scheduler cert
    - kube-proxy cert
    - kube-api client cert
    - CCM cert
  - etcd ca cert
    - etcd server cert
    - etcd peer cert
    - etcd client cert
  - request header ca cert
    - client auth proxy cert

## eStargz

- k3s/k0s 使用 containerd 的能力支持 stargz

```bash
k3s server --snapshotter=stargz
```

```toml title="/etc/containerd/config.toml"
# Plug stargz snapshotter into containerd
# Containerd recognizes stargz snapshotter through specified socket address.
# The specified address below is the default which stargz snapshotter listen to.
[proxy_plugins]

[proxy_plugins.stargz]
type = "snapshot"
address = "/run/containerd-stargz-grpc/containerd-stargz-grpc.sock"

# Use stargz snapshotter through CRI
[plugins."io.containerd.grpc.v1.cri".containerd]
snapshotter = "stargz"

```

- [containerd/stargz-snapshotter](https://github.com/containerd/stargz-snapshotter)
- 初始 proposal [google/crfs](https://github.com/google/crfs)
- [Startup Containers in Lightning Speed with Lazy Image Distribution on Containerd](https://medium.com/nttlabs/243d94522361)

## could not load server certificate file : Permission denied

- [kubernetes#81089](https://github.com/kubernetes/kubernetes/issues/81089)
  - 不支持修改 owner
- https://github.com/docker-library/postgres/issues/777

## Usage of EmptyDir volume exceeds the limit 1m

- emptyDir 使用 tmpfs 挂载
  - medium: Memory

## 常用 fieldRef {#pod-fieldref}

- fieldRef
- resourceFieldRef

```yaml
env:
  - name: POD_NAME
    valueFrom:
      fieldRef:
        fieldPath: metadata.name
  - name: POD_NAMESPACE
    valueFrom:
      fieldRef:
        fieldPath: metadata.namespace
  - name: POD_IP
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
  - name: NODE_NAME
    valueFrom:
      fieldRef:
        fieldPath: spec.nodeName
  - name: POD_SERVICE_ACCOUNT
    valueFrom:
      fieldRef:
        fieldPath: spec.serviceAccountName
```

## 镜像地址

- k8s.gcr.io - 旧的
- registry.k8s.io - 新的

## failed to execute portforward in network namespace

## 高可用和复杂均衡

- HA
  - 集群外 Kubelet API 复杂均衡
  - 用外部的 HAProxy/Nginx/VIP/Tinc 实现
  - 最终的目的是用一个不变的地址访问 Kubelet API
- LLB
  - 集群内 LoadBalance 服务
  - 分配 ClutserIP
  - 不使用云服务可以用 MetalLB 这类的组件+Overlay/LAN 实现 ClusterIP 能力
    - 例如: flannel+host+tinc switch
  - 使用云服务可以用云服务的 LB 组件 - 可直接提供外网 IP
