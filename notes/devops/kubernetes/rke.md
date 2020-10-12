---
id: rancher-rke
title: RKE - 安装器
---

# RKE
## Tips
* RKE 主要用于安装 K8S 集群
* [配置项](https://rancher.com/docs/rke/latest/en/config-options/)
  * [cluster-example.yaml](https://rancher.com/docs/rke/latest/en/example-yamls/)
* 系统镜像 [k8s_rke_system_images.go](https://github.com/rancher/kontainer-driver-metadata/blob/master/rke/k8s_rke_system_images.go)
* [K8S Release Note](https://kubernetes.io/docs/setup/release/notes/)
* 注意
  * 非常建议使用私有仓库
    * air-gap 需要 g 级别的压缩包 - 非常慢
  * 注意开启 SSH 的 AllowTcpForwarding
  * 注意节点需要一些提前配置 - 参考 [k8s-prepare](https://github.com/wenerme/alpine-admin/blob/master/roles/alpine/tasks/k8s-prepare.yaml)
* 安装后需要做的事情
  * 添加 PV - 例如 nfs-client-provisioner
    * 不添加会导致需要持久存储的无法拿到 PVC
  * 添加 LoadBalancer 控制器 - 例如 metallb
    * 不添加会导致 LoadBalancer 拿不到 ip - 例如 istio-ingresgateway (rancher 可配置使用 NodePort)

## 安装

```bash
# 下载最新版
rke_version=$(curl -s https://api.github.com/repos/rancher/rke/releases/latest | jq -r .tag_name)
for f in rke_{darwin-amd64,linux-amd64}; do curl -LO https://github.com/rancher/rke/releases/download/${rke_version}/$f; chmod +x $f; done;
# 映射为 rke 命令
ln -fs rke_$(uname -o | grep -qi darwin && echo darwin-amd64 || echo linux-amd64) rke
# 查看当前版本
./rke -v
# 别名后就不需要 ./
alias rke=$PWD/rke
rke -v

# 查看所有 rancher 版本
rke config --list-version --all
# 系统镜像
# 系统镜像不包含 quay 和 gcr - 已经映射为 rancher 下的镜像
rke config --system-images

# 如果使用私有仓库可以提前缓存系统镜像 - 例如 registry.wener.me
rke config --system-images | tail -n +2 | xargs -I {} -n 1 docker pull registry.wener.me/{}

# 配置好 clutser.yml

# 执行安装 - 可重复执行 - 可添加节点后执行
# 默认使用 clutser.yml 文件
rke up --config cluster.yml
```

## 运维
```bash
# 一次性备份 etcd
rke etcd snapshot-save --name <SNAPSHOT.db> --config rancher-cluster.yml
# 一次性备份到 s3
rke etcd snapshot-save --config rancher-cluster.yml --name snapshot-name  \
--s3 --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY \
--bucket-name s3-bucket-name  --s3-endpoint  s3.amazonaws.com \
--folder folder-name
```

## 配置
```yaml
# 集群名字 - 建议更改 - 默认 local
cluster_name: center
# 安装目录 - 会记录 etcd 快照 /opt/rke/etcd-snapshots
prefix_path: /opt/rke

# 建议使用 ssh-agent
ssh_agent_auth: true
# 可选 - 如果有 agent 可以不用配置
# ssh_key_path: ~/.ssh/rke_rsa

# 节点信息
nodes:
  - address: 10.0.0.1 # 外部地址
    # 内部地址 - 可选 - 集群内部通信使用
    internal_address: 192.168.1.1
    # 复写 hostname 后在 rancher 管理页面看到的是名字而不是 ip
    hostname_override: k8snode1
    # 使用的 ssh 用户 - 没有全局配置需要每个配置
    user: admin
    # 节点的角色 - 基础计算节点只需要 worker 即可
    role: [ controlplane, etcd, worker ]

# 服务信息
services:
  etcd:
    # etcd 自动备份 - 可选
    backup_config:
      # 启用快照
      enabled: true
      # 增量备份间隔
      interval_hours: 6
      # 保留天数
      retention: 60
      # 可选配置
      s3backupconfig:
        access_key: "myaccesskey"
        secret_key:  "myaccesssecret"
        bucket_name: "my-backup-bucket"
        folder: "folder-name"
        endpoint: "s3.eu-west-1.amazonaws.com"
        region: "eu-west-1"

# 私有仓库 - 非常建议
private_registries:
  - url: registry.wener.me
    # 多个 - 可设置默认
    is_default: true
```

## FAQ
### Error response from daemon: linux mounts: path /var/lib/rancher is mounted on / but it is not a shared mount

```bash
mount --make-rshared /

# 开机启动设置
rc-update add local
cat <<CONF > /etc/local.d/00-mount-shared-root.start
#!/bin/sh
mount --make-rshared /
CONF
```

### Failed to get job complete status for job rke-network-plugin-deploy-job in namespace kube-system
* 尝试再次执行，一般会好
* [#19713](https://github.com/rancher/rancher/issues/19713)
