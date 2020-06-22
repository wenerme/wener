
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
