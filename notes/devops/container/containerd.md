---
title: containerd
---

# containerd

- [containerd/containerd](https://github.com/containerd/containerd)
- 参考
  - [containerd/ttrpc](https://github.com/containerd/ttrpc)
    - 通讯协议
    - GRPC for low-memory environments

:::caution

- 不支持 reload 配置 [#4478](https://github.com/containerd/containerd/issues/4478)

:::

## containerd.toml

- /etc/containerd/config.toml
- /var/lib/containerd/
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

- /etc/containerd/certs.d/
  - docker.io/
    - hosts.toml

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

- io.containerd.content.v1.content
  - 存储镜像内容数据
  - [docs/content-flow.md](https://github.com/containerd/containerd/blob/main/docs/content-flow.md)
  - blobs/sha254/SHA256 - gzip
- io.containerd.metadata
  - 存储镜像元信息
  - io.containerd.metadata.v1.bolt/meta.db
- io.containerd.grpc.v1.cri
  - 提供 CRI 接口
- io.containerd.runtime.v1.linux
- io.containerd.runtime.v2.task
- io.containerd.snapshotter.v1 - 默认 overlayfs - container 运行时快照
  - btrfs
  - native
  - overlayfs
  - zfs
  - aufs
  - devmapper
- io.containerd.service.v1
- io.containerd.monitor.v1
  - cgroups
- tmpmounts

## 映射常用仓库为私有

- 假设仓库为 https://registry:5000

:::tip

containerd 不支持 reload 配置，所以需要提前配置好。

:::

```ini
# 重定向所有到私有 registry
# 常见: docker.io, gcr.io, k8s.gcr.io, quay.io, ghr.io
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
```
