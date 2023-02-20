---
title: DID
---

# Docker In Docker

- 2376 - tls
- 2375

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
```

- https://github.com/docker-library/docker/blob/master/23.0/dind/dockerd-entrypoint.sh

## rootless

- 试验性的 rootless
  - [docker-library/docker#174](https://github.com/docker-library/docker/pull/174)
  - 还是需要 `--privileged`

```bash
docker run -d --name docker --privileged docker:dind-rootless
```
