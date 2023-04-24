---
title: DID
---

# Docker In Docker

- 2376 - tls
- 2375
- cert 825d
- 手动关闭 tls --tls=fals --tlsverify=false

:::caution

- 映射 sock 在重启后会失效
- mtu 最好设置 <= 1450 - `--mtu`
- dind network create 不会继承 `--mtu` 参数

:::

```bash
# -e DOCKER_TLS_CERTDIR=/certs
# /certs/ca
# /certs/client - 可挂载给客户端
# 也可通过 sock 挂载给客户端 /var/run/docker.sock
# 设置 DOCKER_TLS_CERTDIR 为空则禁用 tls，端口为 2375
docker run --rm -it \
  --privileged \
  -e DOCKER_TLS_CERTDIR='' \
  -v $PWD/data:/var/lib/docker \
  --name dind docker:dind --storage-driver overlay2

# 通过 HOST 调用
export DOCKER_HOST=tcp://dind:2375/
export DOCKER_DRIVER=overlay2
# https://github.com/docker-library/docker/pull/166
export DOCKER_TLS_CERTDIR=''

curl --unix-socket /var/run/docker.sock http://localhost/images/json | jq
```

- https://github.com/docker-library/docker/blob/master/23.0/dind/dockerd-entrypoint.sh

## rootless

- 试验性的 rootless
  - [docker-library/docker#174](https://github.com/docker-library/docker/pull/174)
  - 还是需要 `--privileged`

```bash
docker run -d --name docker --privileged docker:dind-rootless
```

## buildx

```bash
BUILDX_VERSION=v0.10.4

mkdir -p ~/.docker/cli-plugins
curl -sSLo ~/.docker/cli-plugins/docker-buildx https://github.com/docker/buildx/releases/download/$BUILDX_VERSION/buildx-$BUILDX_VERSION.linux-amd64
chmod +x ~/.docker/cli-plugins/docker-buildx
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker info
```

## 存在 mtu 问题

- curl https 的时候 hang
- `--mtu=1400`

## invalid TLS configuration: Could not load X509 key pair (cert: "", key: ""): open : no such file or directory

- 不要配置 `--tls=false --tlsverify=false`,可以配置  `--tls=false`
- https://github.com/moby/moby/issues/27105
