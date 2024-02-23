---
title: Docker FAQ
tags:
  - FAQ
---

# Docker FAQ

- [Docker Best Practices](https://gist.github.com/StevenACoffman/41fee08e8782b411a4a26b9700ad7af5)

## Host IP
- host.docker.internal
- docker.for.mac.localhost


```bash
/sbin/ip route|awk '/default/ { print $3 }'

# Docker in AWS
# http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-retrieval
curl http://169.254.169.254/latest/meta-data/local-ipv4
```

## env

- DOCKER_REGISTRY_URL
  - jenkins `docker.withRegistry`
- DOCKER_REGISTRY_CREDENTIALS_ID
- DOCKER_CONFIG=~/.docker
- https://docs.docker.com/engine/reference/commandline/cli/#environment-variables

# volume bind 文件不会更新

- 尝试 bind 目录，不要 bind 文件

## 在 docker 中使用 docker

直接映射 /var/run/docker.sock

```bash
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name box wener/demo:test
```

## 非 root 绑定私有端口

- 一般来说添加 CAP_NET_BIND_SERVICE 即可，但是对非 root 无效
- 设置 sysctl `net.ipv4.ip_unprivileged_port_start=0` 即可
  - 需要 kernel 4.11+
  - ubuntu 18+

## 停止所有容器

```bash
docker stop $(docker ps -aq)
```

## 迁移数据目录

- /var/lib/docker 对 docker 性能影响较大

```bash
# 停止服务迁移数据
service docker stop
mkdir -p /data/docker
sudo rsync -aP /var/lib/docker/ /data/docker/

# 添加 data-root 配置
# { "data-root": "/data/docker" }
nano /etc/docker/daemon.json

# 启动
service docker start
# 查看新的配置
docker info | grep 'Root Dir'

# 确认旧的目录没有被使用
apk add lsof
lsof +D /var/lib/docker
```

## No swap limit support

- 添加内核参数 `cgroup_enable=memory swapaccount=1`
- 牺牲 1% 的内容，10% 性能来支持内存和交换区审计
- 一般 `cgroup_enable=memory` 会开启，但 `swapaccount` 不开
- 参考
  - [Runtime options with Memory, CPUs, and GPUs](https://docs.docker.com/config/containers/resource_constraints/)
  - [Your kernel does not support cgroup swap limit capabilities](https://docs.docker.com/engine/install/linux-postinstall/#your-kernel-does-not-support-cgroup-swap-limit-capabilities)

## 为已经运行的 Docker 容器添加端口映射

```bash
HOSTPORT=80
CONTAINERIP=172.16.0.2

iptables -t nat -A DOCKER -p tcp --dport ${HOSTPORT} -j DNAT --to-destination ${CONTAINERIP}:${HOSTPORT}
iptables -t nat -A POSTROUTING -j MASQUERADE -p tcp --source ${CONTAINERIP} --destination ${CONTAINERIP} --dport ${HOSTPORT}
iptables -A DOCKER -j ACCEPT -p tcp --destination ${CONTAINERIP} --dport ${HOSTPORT}
```

## upper fs does not support RENAME_WHITEOUT

- zfs 无法运行 docker overlay
- [openzfs/zfs#8648](https://github.com/openzfs/zfs/issues/8648)

## docker zfs vol

- docker 支持 zfs driver
- 但是有些问题
  - [moby/moby#41055](https://github.com/moby/moby/issues/41055)
- 实在需要可以考虑 zvol

```bash
mkdir -p /data/docker
# -s sparse volume 不保留空间
zfs create -s -V 100GB main/docker-vol
mkfs.ext4 /dev/zvol/main/docker-vol
mount /dev/zvol/main/docker-vol /data/docker
# 持久化 mount
tail -1 /proc/mounts | sudo tee -a /etc/fstab

# 停服务迁移
service docker stop
sudo rsync -aP /var/lib/docker/ /data/docker/
# { "data-root": "/data/docker" }
nano /etc/docker/daemon.json
service docker start

# 查看新的配置
docker info | grep 'Root Dir'

# 确认旧的目录没有被使用
apk add lsof
lsof +D /var/lib/docker
```

## driver "zfs" failed to remove root filesystem

一边退出，另外一边还在操作时可能出现，之后再执行 `docker rm` 即可。

---

如果 `docker rm` 还出现异常

```
Error response from daemon: container 2736566eac14027e7bf708c2babe894f1978249fc4a674886e158d6aa886479a: driver "zfs" failed to remove root filesystem: exit status 1: "/usr/sbin/zfs fs destroy -r main/docker/9d56a9bde13e6a1d37c6af5a55057cc4a9fb8b684ff454ac25f415b70bc55d0d" => cannot open 'main/docker/9d56a9bde13e6a1d37c6af5a55057cc4a9fb8b684ff454ac25f415b70bc55d0d': dataset does not exist
```

则可以先创建再执行

```bash
zfs create main/docker/9d56a9bde13e6a1d37c6af5a55057cc4a9fb8b684ff454ac25f415b70bc55d0d
docker rm container
```

## 没权限

```bash
sudo adduser $USER docker
```

## bridge-nf-call-iptables

```conf title="/etc/sysctl.d/99-br_netfilter.conf"
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
```

```bash
sudo sysctl -p /etc/sysctl.d/99-br_netfilter.conf
```

## Cannot link to a non running container

## docker exporter does not currently support exporting manifest lists

- 只能 --push [docker/buildx#59](https://github.com/docker/buildx/issues/59)

## could not create a builder instance with TLS data loaded from environment

```bash
# 只要不是默认的就行
docker context create tls
docker buildx create --name multiarch-builder --driver docker-container --use tls
```

- https://github.com/docker/buildx/issues/413

## DOCKER_HOST environment variable overrides the active context. To use a context, either set the global --context flag, or unset DOCKER_HOST environment variable.

## failed to solve with frontend dockerfile.v0: failed to create LLB definition: unexpected status code [manifests latest]: 403 Forbidden

```bash
export DOCKER_BUILDKIT=0
```

## OpenTelemetry

- io.containerd.tracing.processor.v1.otlp

# DOCKER_HOST 格式

- DOCKER_HOST
  - tcp://1.2.3.4:2375
  - unix:///var/run/docker.sock
  - npipe:///./pipe/docker_engine
    - Named Pipe
  - fd://1.2.3.4:5678
  - ssh://1.2.3.4:22
  - `//host:port` -> `tpc://`

## error from daemon in stream: Error grabbing logs: invalid character '\x00' looking for beginning of valu

```bash
for cont in $(docker container ps | cut -f1 -d\  | grep -v CONTAINER); do
  sudo truncate -s0 $(docker container inspect --format='{{.LogPath}}' $cont)
done

sudo sh -c "grep -Pa '\x00' /var/lib/docker/containers/**/*json.log"
```

- https://github.com/docker/for-linux/issues/140

## Error running exec in container: failed to open stdout fifo: error creating fifo

```
Error running exec XXX in container: failed to open stdin fifo: error creating fifo /var/run/docker/containerd/XXX/XXX-stdin: no such file or directory
```

- https://github.com/docker/for-linux/issues/1091

## overlayfs: upper fs does not support RENAME_WHITEOUT

- 修改 /var/lib/docker 挂在位置

## listing workers: failed to list workers: Unavailable: connection closed before server preface received

```bash
docker buildx ls
```

- 重启 dind 后恢复

## multiple platforms feature is currently not supported for docker driver. Please switch to a different driver

```
multiple platforms feature is currently not supported for docker driver. Please switch to a different driver (eg. "docker buildx create --use")
```

```bash
docker buildx create --name multiarch-builder --driver docker-container
```
