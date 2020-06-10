
# Longhorn
## Tips
* [longhorn/longhorn](https://github.com/longhorn/longhorn) - Kubernetes 分布式块存储
  * 企业级分布式块存储
  * 增量快照
  * 二级备份 - NFS、S3
  * 快照、备份恢复
  * 平滑升级
  * 内建 UI
* 要求
  * [安装要求](https://longhorn.io/docs/1.0.0/deploy/install/#installation-requirements)
    * docker 1.13+
    * k8s 1.14+
    * 默认 3 副本 - 因此需要 3 节点，node level soft anti-affinity is disabled.
    * open-iscsi 已安装，所有节点启动 iscsid daemon
    * 支持 file extents 特性的文件系统 ext4 XFS
    * curl, findmnt, grep, awk, blkid, lsblk
    * 启动 [Mount propagation](https://kubernetes-csi.github.io/docs/deploying.html#enabling-mount-propagation)
    * k3s 需要[额外配置](https://longhorn.io/docs/1.0.0/advanced-resources/os-distro-specific/csi-on-k3s/)
  * [最低硬件要求](https://longhorn.io/docs/1.0.0/best-practices/#minimum-recommended-hardware)
    * 3 节点
    * 4 vCPUs 每节点
    * 4 GiB 每节点
  * 系统
    * Ubuntu 18.04
    * CentOS 7/8

```bash
curl -sSfLO https://raw.githubusercontent.com/longhorn/longhorn/master/scripts/environment_check.sh

apk add jq curl findmnt grep awk coreutils util-linux
# 会使用现在的环境进行检测 - kubectl apply
bash environment_check.sh
```
