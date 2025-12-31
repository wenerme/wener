---
title: containerd
tags:
  - DevOps
  - Container
  - containerd
---

# containerd

- [containerd/containerd](https://github.com/containerd/containerd)
- 参考
  - [containerd/ttrpc](https://github.com/containerd/ttrpc)
    - 通讯协议
    - GRPC for low-memory environments
  - [containerd/zfs](https://github.com/containerd/zfs)
    - zfs snapshotter

:::caution

- 不支持 reload 配置 [#4478](https://github.com/containerd/containerd/issues/4478)
- 不要用 zfs snapshotter
  - 非常慢 - vol 多了后 zfs list,import,mount **全都慢**
  - 导致集群启动慢

:::

```bash
ctr plugin ls
```

## containerd.toml

- `/etc/containerd/config.toml`
- `/var/lib/containerd/`
- [containerd-config.toml.5](https://github.com/containerd/containerd/blob/main/docs/man/containerd-config.toml.5.md)

```bash
# 获取默认配置
containerd config default > containerd.toml
```

```ini title="参考"
version=2
root=/var/lib/containerd
state=/run/containerd
plugin_dir=

oom_score = 0
# 可导入配置
imports = ["/etc/containerd/runtime_*.toml", "./debug.toml"]

[grpc]
[ttrpc]
[debug]
address=/run/containerd/debug.sock
uid=0
gid=0
level=info
[metrics]
[plugins]

# registry
# ==========
[plugins."io.containerd.grpc.v1.cri".registry]
# https://docs.docker.com/engine/security/certificates/
# 同 /etc/docker/certs.d/
config_path = "/etc/containerd/certs.d"

[plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
endpoint = ["https://fogjl973.mirror.aliyuncs.com", "https://8x40wsit.mirror.aliyuncs.com", "https://docker.mirrors.ustc.edu.cn", "https://registry-1.docker.io"]

[plugins."io.containerd.grpc.v1.cri".registry.configs."gcr.io".auth]

# 1.4+ 废弃 registry.mirrors, 只有没配置 config_path 时生效
# docker.io 镜像
[plugins.cri.registry.mirrors."docker.io"]
endpoint = ["https://fogjl973.mirror.aliyuncs.com", "https://8x40wsit.mirror.aliyuncs.com", "https://docker.mirrors.ustc.edu.cn", "https://registry-1.docker.io"]

# 自定义授权信息
[plugins."io.containerd.grpc.v1.cri".registry.configs."my.custom.registry".auth]
# 同 .docker/config.json
username = ""
password = ""
auth = ""
identitytoken = ""
# 自定义证书配置
[plugins."io.containerd.grpc.v1.cri".registry.configs."my.custom.registry".tls]
ca_file   = "ca.pem"
cert_file = "cert.pem"
key_file  = "key.pem"
# 或不校验
insecure_skip_verify = true
```

- `/etc/containerd/certs.d/`
  - `docker.io/`
    - `hosts.toml`

```ini title="hosts.toml"
server = "https://docker.io"

[host."https://registry-1.docker.io"]
capabilities = ["pull", "resolve"]
```

### zfs

```bash
zfs create -o mountpoint=/var/lib/containerd/io.containerd.snapshotter.v1.zfs main/containerd
# 不必须，但推荐 - 镜像存储到 zfs
zfs create -o mountpoint=/var/lib/containerd/io.containerd.content.v1.content main/containerd-content
```

```toml title="/etc/containerd.toml"
version=2
[plugins."io.containerd.grpc.v1.cri".containerd]
snapshotter = "zfs"
```

## Notes

- `io.containerd.content.v1.content`
  - 存储镜像内容数据
  - [docs/content-flow.md](https://github.com/containerd/containerd/blob/main/docs/content-flow.md)
  - `blobs/sha254/SHA256` - gzip
- `io.containerd.metadata`
  - 存储镜像元信息
  - `io.containerd.metadata.v1.bolt/meta.db`
- `io.containerd.grpc.v1.cri`
  - 提供 CRI 接口
- `io.containerd.runtime.v1.linux`
- `io.containerd.runtime.v2.task`
  - `k8s.io`
- `io.containerd.snapshotter.v1` - 默认 overlayfs - container 运行时快照
  - `btrfs`
  - `native`
  - `overlayfs`
  - `zfs`
  - `aufs`
  - `devmapper`
- `io.containerd.service.v1`
- `io.containerd.monitor.v1`
  - `cgroups`
- `tmpmounts`

# FAQ

## 映射常用仓库为镜像仓库

- 镜像仓库可直接同步上游 - 例如 harbor 可指定 project 同步上游
- `docker.io` 可使用现有的服务
- 其他 仓库 没有现有的镜像服务
  - harbor 子域名映射需要特殊配置
- 假设: harbor 地址 `cr.example.com`, 添加项目 quay 镜像 `quay.io`
  - 需要配置域名映射 `quay.cr.example.com` 到 `cr.example.com/quay`
  - 配置方式参考 [#13579](https://github.com/goharbor/harbor/issues/13579)

```toml
# 现有容器仓库
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
endpoint = ["https://fogjl973.mirror.aliyuncs.com", "https://8x40wsit.mirror.aliyuncs.com", "https://docker.mirrors.ustc.edu.cn", "https://registry-1.docker.io"]

# harbor 子域名映射
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."quay.io"]
endpoint = ["https://quay.cr.example.com"]
```

## 映射常用仓库为单个私有仓库

- 假设仓库为 `https://registry:5000`
- 将常用仓库映射为单个内部仓库 - 用于 **airgap** 场景
  - 因为拉取不存在的镜像不能从上游同步，只能拉预先导入的镜像

:::tip

containerd 不支持 reload 配置，所以需要提前配置好。

:::

```ini
# 重定向所有到私有 registry
# 常见: docker.io, gcr.io, k8s.gcr.io, quay.io, ghcr.io
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."*"]
endpoint = ["https://registry:5000"]

[plugins."io.containerd.grpc.v1.cri".registry.configs."docker.io".tls]
insecure_skip_verify = true
[plugins."io.containerd.grpc.v1.cri".registry.configs."gcr.io".tls]
insecure_skip_verify = true
[plugins."io.containerd.grpc.v1.cri".registry.configs."k8s.gcr.io".tls]
insecure_skip_verify = true
[plugins."io.containerd.grpc.v1.cri".registry.configs."quay.io".tls]
insecure_skip_verify = true
[plugins."io.containerd.grpc.v1.cri".registry.configs."ghcr.io".tls]
insecure_skip_verify = true
```

## mount through procfd not a directory

检查 mount 逻辑，是不把 目录 挂载到了文件上。

```
mount through procfd: open o_path procfd: open /run/k0s/containerd/io.containerd.runtime.v2.task/k8s.io/promxy/rootfs/etc/promxy/secrets: not a directory
```

## failed to reserve sandbox name: name is reserved for

最终会自己修复，可能花费 20m-30m 时间。

- containerd 1.6 修复
- [containerd#4604](https://github.com/containerd/containerd/issues/4604)

## Additional Registry Notes

[docs/registry.md](https://github.com/containerd/cri/blob/master/docs/registry.md)

- `ctr` is an unsupported debug and administrative client for interacting with the containerd daemon
- `crictl`

## Errors

- `/sys/devices/system/cpu/cpu0/cache: no such file or directory`
  - [google/cadvisor#2229](https://github.com/google/cadvisor/issues/2229)
- `k3s failed start server`
  - [rancher/k3s#399](https://github.com/rancher/k3s/issues/399)
