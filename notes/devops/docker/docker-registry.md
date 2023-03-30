---
title: Docker 仓库
---

# Docker Registry

- 常见实现
  - `registry:2` 官方
  - Nexus
  - Harbor
  - JForg
  - [Portus](https://github.com/SUSE/Portus)
- containerd [registry](https://github.com/containerd/cri/blob/master/docs/registry.md)
- [google/go-containerregistry](https://github.com/google/go-containerregistry)
- [distribution/distribution](https://github.com/distribution/distribution)
  - registry:2
- [docker-archive/docker-registry](https://github.com/docker-archive/docker-registry)
  - registry

## docker registry


- [配置](https://docs.docker.com/registry/configuration/)
- 存储: 文件系统、azure、gcs、s3、switf、oss
- 授权: silly、token、htpasswd、none

```bash
# -v $PWD/config.yml:/etc/docker/registry/config.yml \
docker run --rm -it \
  -p 5000:5000 \
  -e REGISTRY_PROXY_REMOTEURL=https://registry-1.docker.io \
  -v $PWD/data:/var/lib/registry \
  --name registry registry:2
```

```bash
# 清理
# -d dryrun, -m untagged
registry garbage-collect -d -m /etc/docker/registry/config.yml
```

- https://github.com/distribution/distribution/blob/main/docs/spec/api.md


```yaml
version: 0.1
log:
  fields:
    service: registry
storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
proxy:
  remoteurl: https://8x40wsit.mirror.aliyuncs.com
```

```yaml
# /etc/docker/registry/config.yml
# REGISTRY_variable
storage:
  filesystem:
    # REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY
    rootdirectory: /var/lib/registry

# 镜像
proxy:
  remoteurl: https://registry-1.docker.io
  username: [username]
  password: [password]
```

- https://docs.docker.com/registry/configuration/

## PUSH 405

- 配置了 remoteurl push 会有问题
- https://github.com/distribution/distribution/issues/2386

### auth

```bash
mkdir -p auth
docker run \
  --entrypoint htpasswd \
  httpd:2 -Bbn pusher pusher > auth/htpasswd

docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v "$(pwd)"/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  -v "$(pwd)"/certs:/certs \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  registry:2
```


## apis

- [Docker Registry HTTP API V2](https://docs.docker.com/registry/spec/api)

```bash
# docker hub 所有 tag
curl -L -s 'https://registry.hub.docker.com/v2/repositories/wener/base/tags?page_size=1024'|jq '."results"[].name'

# 判断 tag 是否存在
curl --silent -f -lSL https://index.docker.io/v1/repositories/wener/base/tags/latest > /dev/null

# 判断是否支持 v2
curl https://index.docker.io/v2/

# 检测 tag 存在
DOCKER_CLI_EXPERIMENTAL=enabled docker manifest inspect wener/base:latest

DOCKER_CLI_EXPERIMENTAL=enabled docker manifest inspect registry.cn-shanghai.aliyuncs.com/gcr-sync/cadvisor_cadvisor:v0.36.0
```

## docker registry v1 vs v2
