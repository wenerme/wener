---
id: longhorn
title: Longhorn
---

# Longhorn

- 是什么？
  - Kubernetes 分布式块存储服务
  - 增量快照
  - 二级备份 - NFS、S3
  - 快照、备份恢复
  - 平滑升级
  - 内建 UI
- [longhorn/longhorn](https://github.com/longhorn/longhorn)
  - 企业级分布式块存储
- 要求
  - [安装要求](https://longhorn.io/docs/1.0.0/deploy/install/#installation-requirements)
    - docker 1.13+
    - k8s 1.14+
    - 默认 3 副本 - 因此需要 3 节点，node level soft anti-affinity is disabled.
    - open-iscsi 已安装，所有节点启动 iscsid daemon
    - 支持 file extents 特性的文件系统 ext4 XFS
    - curl, findmnt, grep, awk, blkid, lsblk
    - 启动 [Mount propagation](https://kubernetes-csi.github.io/docs/deploying.html#enabling-mount-propagation)
    - k3s 需要[额外配置](https://longhorn.io/docs/1.0.0/advanced-resources/os-distro-specific/csi-on-k3s/)
  - [最低硬件要求](https://longhorn.io/docs/1.0.0/best-practices/#minimum-recommended-hardware)
    - 3 节点
    - 4 vCPUs 每节点
    - 4 GiB 每节点
    - SSD/NVME 不推荐机械硬盘 - IOPS 低
- 注意 ⚠️
  - ~不支持 ReadWriteMany [#73](https://github.com/longhorn/longhorn/issues/73#issuecomment-392869189)~
    - 最新通过内置 NFS 支持 RWX
  - 反向代理 UI 不行 [#1082](https://github.com/longhorn/longhorn/issues/1082)
  - 扩容只支持离线
  - 必须安装在 `longhorn-system` 空间
- 数据对应关系
  - PVC -> PV -> Volume -> Replica -> Node

:::caution

- v1.1.0 单机部署每次重启后需要 打捞/salvage 之前的 replica
  - 开启了 Automatic salvage 发现还是需要手动
  - v1.1.1 修复 [#2309](https://github.com/longhorn/longhorn/issues/2309)

:::

```bash
curl -sSfLO https://raw.githubusercontent.com/longhorn/longhorn/master/scripts/environment_check.sh

apk add jq curl findmnt grep awk coreutils util-linux
# 会使用现在的环境进行检测 - kubectl apply
bash environment_check.sh
```

## 配置

- https://longhorn.io/docs/1.1.0/references/settings/
- 配置在 UI 上修改后在初次部署之前修改

```yaml
# 配置说明 https://longhorn.io/docs/1.1.0/references/settings

# 备份
# ============
# 备份位置 - 支持 nfs 和 s3
# 例如 s3://backupbucket@us-east-1/backupstore
backup-target:
# 密钥信息
backup-target-credential-secret:
# 拉上次备份信息的间隔 - 用于恢复
backupstore-poll-interval: 300

# 调度
# ============
# 设置为 true 则允许单个节点部署多个副本
replica-node-level-soft-anti-affinity: false
replica-soft-anti-affinity:
# 存储分配允许超过的比例
storage-over-provisioning-percentage: 200
# 磁盘最小可用比例
storage-minimal-available-percentage: 25
# 不会调度到 Kubernetes cordoned nodes
disable-scheduling-on-cordoned-node: true
# 允许副本在相同区
replica-zone-soft-anti-affinity: true

# 危险区域
# ============
# 为引擎预留 CPU
# 0.25 * 8 = 2 vCPUs - 每个节点至少 2 vCPU
guaranteed-engine-cpu: 0.25

create-default-disk-labeled-nodes:
default-data-path:

upgrade-checker:
default-replica-count:

default-longhorn-static-storage-class:

taint-toleration:
registry-secret:
auto-salvage:

volume-attachment-recovery-policy:
mkfs-ext4-parameters:
```

## volume 配置

```yaml
# Longhorn 清理 ERROR Replica 时间
# 单位分钟 - 默认 2880 / 48 小时
staleReplicaTimeout: 2880
```

## 资源

- lhe Engine - Volume 对应的 Engine
- lhr Replica - 卷副本
- lhs Setting - 启动后每个配置项会映射为一个 Setting 资源
- lhv Volume - 定义卷
- lhei EngineImage - 引擎镜像
  - `image: 'longhornio/longhorn-engine:v1.1.0'`
- lhn Node - 节点信息
- lhim - Instance Manager - 引擎实例和资源实例
  - 引擎实例 - 每个节点运行
  - 资源实例 - 每个 Volume 在节点上的每个 Replica
- ShareManager - 通过 NFS 支持 RWM

## 安装

- [kubectl 安装](https://longhorn.io/docs/1.0.0/deploy/install/install-with-kubectl/)
- 创建 `longhorn-system` 命名空间
- 创建 `longhorn-service-account` 服务账号
- 创建集群角色 `longhorn-role`
  - 授权给 `longhorn-service-account`
- 自定义资源定义 - longhorn.io/v1beta1
- 创建配置 `longhorn-default-setting`
- 创建 DaemonSet - `longhorn-manager`
  - 镜像 longhornio/longhorn-manager
  - 启动参数
    - longhorn-manager
    - -d
    - daemon
    - --engine-image
    - longhornio/longhorn-engine:v1.0.0
    - --instance-manager-image
    - longhornio/longhorn-instance-manager:v1_20200514
    - --manager-image
    - longhornio/longhorn-manager:v1.0.0
    - --service-account
    - longhorn-service-account
  - 端口 9500 - manager
  - 挂载卷
    - `/host/dev` - dev - `/dev`
    - `/host/proc` - proc - `/proc`
    - `/var/run`- varrun - `/var/run`
    - `/var/lib/longhorn/` - longhorn - `/var/lib/longhorn/`
    - `/var/lib/longhorn-setting/` - longhorn-default-setting
  - 环境变量
    - DEFAULT_SETTING_PATH=/var/lib/longhorn-setting/default-setting.yaml
- 创建服务 `longhorn-backend` 指向 `longhorn-manager`
  - 端口 9500
- 部署 `longhorn-ui`
  - 镜像 longhornio/longhorn-ui
  - 端口 8000
  - 环境变量 LONGHORN_MANAGER_IP=http://longhorn-backend:9500
- 创建服务 `longhorn-frontend` 指向 `longhorn-ui`
  - 端口 80
- 部署 `longhorn-driver-deployer`
  - 初始镜像 longhornio/longhorn-manager
    - 等待 http://longhorn-backend:9500/v1 启动
  - 镜像 longhornio/longhorn-manager
    - longhorn-manager
    - -d
    - deploy-driver
    - --manager-image
    - longhornio/longhorn-manager:v1.0.0
    - --manager-url
    - http://longhorn-backend:9500/v1
- 创建 StorageClass `longhorn`
  - 这一步参数可选择那些节点存储

```bash
# 准备
sudo apk add open-iscsi
sudo service iscsid start
sudo apk add curl findmnt grep gawk blkid lsblk util-linux

# HELM 安装
# ==========
git clone https://github.com/longhorn/longhorn && cd longhorn
helm install longhorn ./longhorn/chart/ --namespace longhorn-system --create-namespace

# 手动安装
# ==========
# 安装
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/master/deploy/longhorn.yaml

# 或者下载下来安装
curl -LOC- https://raw.githubusercontent.com/longhorn/longhorn/master/deploy/longhorn.yaml
# 可以修改部分参数 - 例如存储节点选择、是否运行单节点执行
kubectl applu -f longhorn.yaml

# 查看安装状态
kubectl get pods \
--namespace longhorn-system \
--watch

# 安装内容
kubectl -n longhorn-system get pod
```

# FAQ

- [Troubleshooting the data corruption](https://github.com/yasker/longhorn/wiki/Troubleshooting-the-data-corruption-%5BDRAFT%5D)

## Error response from daemon: path /var/lib/longhorn is mounted on / but it is not a shared mount

- Fail to start longhorn with k3d [#206](https://github.com/rancher/k3d/issues/206)

```yaml
# 这个位置是双向挂载
name: longhorn
mountPath: /var/lib/longhorn/
mountPropagation: Bidirectional
```

```bash
# 将 root 修改为 share
sudo mount --make-rshared /
# sudo mount --make-rshared /var/lib/longhorn/
```

## failed to start expansion: controller data doesn't support on-line expansion, frontend: tgt-blockdev

可能是由于挂载的时候进行扩容导致，如果一直不恢复，尝试 detache

## The volume `volume` share should be available before the mount

## Volume `volume` hasn't been attached yet

## snapshot vs backup

- snapshot
  - 本地 Revision
  - Delta 修改
  - 跟随 Volume - 删除 Volume 则删除了 Snapshot
- backup
  - 数据存储在外部 - S3/NFS
  - 不受集群状态影响
  - 备份基于快照 - backup 之前会创建 snapshot

## controller doesn't support on-line expansion, frontend: tgt-blockdev

- https://github.com/longhorn/longhorn/issues/1674

## 监控

- https://grafana.com/grafana/dashboards/13032

## 示例

- https://longhorn.io/docs/1.0.0/references/examples/

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: longhorn-block-vol
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Block
  storageClassName: longhorn
  resources:
    requests:
      storage: 2Gi
---
apiVersion: v1
kind: Pod
metadata:
  name: block-volume-test
  namespace: default
spec:
  containers:
    - name: block-volume-test
      image: nginx:stable-alpine
      imagePullPolicy: IfNotPresent
      volumeDevices:
        - devicePath: /dev/longhorn/testblk
          name: block-vol
      ports:
        - containerPort: 80
  volumes:
    - name: block-vol
      persistentVolumeClaim:
        claimName: longhorn-block-vol
```

## CRD

```yaml
# PATCH 修改 Tag
apiVersion: longhorn.io/v1beta1
kind: Node
metadata:
  name: my-node-1
  namespace: longhorn-system
spec:
  tags:
    - node.can.longhorn
---
# 定义卷
apiVersion: longhorn.io/v1beta1
kind: Volume
metadata:
  name: test
  namespace: longhorn-system
  labels:
    longhornvolume: test
spec:
  Standby: false
  baseImage: ''
  fromBackup: ''
  disableFrontend: false
  diskSelector: []
  # 最好指定 - 否则会出现找不到 engine
  engineImage: 'longhornio/longhorn-engine:v1.0.0'
  frontend: blockdev
  nodeSelector:
    - node.can.longhorn
  numberOfReplicas: 3
  recurringJobs: null
  size: '20000000'
  staleReplicaTimeout: 20
```

```yaml
kind: Volume
apiVersion: longhorn.io/v1beta1
metadata:
  name: test
  namespace: longhorn-system
  labels:
    longhornvolume: test
spec:
  Standby: false
  accessMode: rwx
  baseImage: ''
  dataLocality: best-effort
  disableFrontend: false
  diskSelector: []
  engineImage: 'longhornio/longhorn-engine:v1.1.0'
  fromBackup: ''
  frontend: blockdev
  lastAttachedBy: ''
  nodeID: ''
  nodeSelector: []
  numberOfReplicas: 1
  recurringJobs:
    - cron: 0 0/6 * * ?
      labels: null
      name: c-75f2xa
      retain: 5
      task: backup
    - cron: 0 1 * * *
      labels: null
      name: c-yywuyn
      retain: 3
      task: snapshot
  revisionCounterDisabled: false
  # 20G
  size: '21474836480'
  staleReplicaTimeout: 20
# PV
---
kind: PersistentVolume
apiVersion: v1
metadata:
  name: test
spec:
  capacity:
    storage: 20Gi
  csi:
    driver: driver.longhorn.io
    volumeHandle: test
    fsType: ext4
    volumeAttributes:
      diskSelector: ''
      nodeSelector: ''
      numberOfReplicas: '1'
      staleReplicaTimeout: '20'
  accessModes:
    - ReadWriteMany
  claimRef:
    kind: PersistentVolumeClaim
    namespace: default
    name: test
    apiVersion: v1
    resourceVersion: '147682602'
  persistentVolumeReclaimPolicy: Retain
  storageClassName: longhorn-static
  volumeMode: Filesystem

# PVC
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: test
  namespace: default
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 20Gi
  volumeName: test
  storageClassName: longhorn-static
  volumeMode: Filesystem
```
