
# Docker Registry
## Tips
* 常见实现
  * `registry:2` 官方
  * Nexus
  * Harbor
  * JForg
  * [Portus](https://github.com/SUSE/Portus)
* containerd [registry](https://github.com/containerd/cri/blob/master/docs/registry.md)

## docker registry
* [配置](https://docs.docker.com/registry/configuration/)
* 存储: 文件系统、azure、gcs、s3、switf、oss
* 授权: silly、token、htpasswd、none

```bash
docker run -d -p 5000:5000 --name registry registry:2
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

## apis
* [Docker Registry HTTP API V2](https://docs.docker.com/registry/spec/api)

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
