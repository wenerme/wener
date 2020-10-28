---
id: ignite
---
# ignite
* 是什么？
  * 像 Docker 管理容器一样管理 Firecracker MicroVM
  * 支持 OCI 镜像/Docker镜像
* [weaveworks/ignite](https://github.com/weaveworks/ignite)
* 使用 CNI 管理网络
* 目前使用需要 root，firecracker 是不需要的

```bash
latest=$(basename $(curl -fsSLI -o /dev/null -w  %{url_effective} https://github.com/weaveworks/ignite/releases/latest))
# amd64
curl --remote-name-all -LC- https://github.com/weaveworks/ignite/releases/download/${latest}/{ignite,ignited}-amd64
mv ignite-amd64 ignite
mv ignited-amd64 ignited
chmod +x ignite ignited
```
