---
id: helm-intro
title: HELM 包管理器
---

# Helm

## Tips

- [helm.sh](https://helm.sh/)
- nexus 可通过插件支持 helm [sonatype-nexus-community/nexus-repository-helm](https://github.com/sonatype-nexus-community/nexus-repository-helm)
- 注意
  - 3.0 过后没有 tiller 了
  - HELM 可以单纯的作为模板引擎来使用 - 但是失去了 helm 管理注册应用的能力
    - 如果用作模板引擎，那还可以选择 Kustomize, k8comp, kdeploy, ktmpl, kuku, jinja, sed, awk, gotpl
    - 失去的能力： 清单分组、应用或包依赖、查看集群安装应用、注册应用、应用版本回滚
  - 仓库不是必要的，一个 helm charts 就是一个 tgz
  - 相同版本可重复安装，revision 会有变化，本地开发时经常这样
- 参考
  - [Helm Charts Best Practices](https://jfrog.com/blog/helm-charts-best-practices/)
  - [HELM Best practices](https://codefresh.io/docs/docs/new-helm/helm-best-practices/)

```bash
brew install helm

# 客户端版本
helm version

helm repo add stable http://mirror.azure.cn/kubernetes/charts/
helm search repo stable

helm show values stable/nextcloud
helm pull stable/nextcloud
helm pull stable/nextcloud --untar
```

## 路径

| 系统    | 缓存                        | 配置                             | 数据                      |
| ------- | --------------------------- | -------------------------------- | ------------------------- |
| Linux   | `$HOME/.cache/helm`         | `$HOME/.config/helm`             | `$HOME/.local/share/helm` |
| macOS   | `$HOME/Library/Caches/helm` | `$HOME/Library/Preferences/helm` | `$HOME/Library/helm`      |
| Windows | `%TEMP%\helm`               | `%APPDATA%\helm`                 | `%APPDATA%\helm`          |

## 常用仓库

- [helm/charts](https://github.com/helm/charts)

| NAME                       | URL                                                 |
| -------------------------- | --------------------------------------------------- |
| stable                     | https://kubernetes-charts.storage.googleapis.com/   |
| traefik                    | https://containous.github.io/traefik-helm-chart     |
| jetstack                   | https://charts.jetstack.io                          |
| hashicorp                  | https://helm.releases.hashicorp.com                 |
| harbor                     | https://helm.goharbor.io                            |
| stable<br/>azure mirror    | http://mirror.azure.cn/kubernetes/charts/           |
| incubator<br/>azure mirror | http://mirror.azure.cn/kubernetes/charts-incubator/ |

## 仓库

- [The Chart Repository Guide](https://helm.sh/docs/topics/chart_repository)
  - HTTP
  - 提供 index.yaml 访问
- [helm/chartmuseum](https://github.com/helm/chartmuseum)
  - Golang chart 仓库
  - 支持较多后端 - 主要的有
    - S3
    - 阿里云 OSS
    - Minio
  - 支持上传
  - [支持认证](https://github.com/helm/chartmuseum#basic-auth)
- Helm 支持 [Registry](https://helm.sh/docs/topics/registries/) 来存储 charts
  - 推送遇到问题 - insufficient_scope: authorization failed [#6214](https://github.com/helm/helm/issues/6214)
  - 不能推送到 docker hub [#5861](https://github.com/helm/helm/issues/5861)

### local

```bash
helm repo reindex local-repo
```

### chartmuseum
```bash
# 本地存储
docker run --rm -it \
  -p 8080:8080 \
  -e DEBUG=1 \
  -e STORAGE=local \
  -e STORAGE_LOCAL_ROOTDIR=/charts \
  -v $(pwd)/charts:/charts \
  --name chartmuseum chartmuseum/chartmuseum:latest

# UI
# https://github.com/chartmuseum/ui
docker run --rm -it \
  -p 80:8080 \
  -e CHART_MUSESUM_URL: http://chartmuseum:8080 \
  --link chartmuseum:chartmuseum \
  --name chartmuseumui idobry/chartmuseumui:latest
```

```bash
# Aliyun OSS
# ALIBABA_CLOUD_ACCESS_KEY_ID
# ALIBABA_CLOUD_ACCESS_KEY_SECRET
chartmuseum --debug --port=8080 \
  --storage="alibaba" \
  --storage-alibaba-bucket="my-oss-bucket" \
  --storage-alibaba-prefix="" \
  --storage-alibaba-endpoint="oss-cn-beijing.aliyuncs.com"
```

### registru

```bash
export HELM_EXPERIMENTAL_OCI=1

helm registry login -u myuser index.docker.io
helm chart save alpinelinux/ index.docker.io/v1/wcharts/alpinelinux:0.1.0
helm chart list
# 会导出到 alpinelinux/
helm chart export index.docker.io/v1/wcharts/alpinelinux:0.1.0

# 推送到服务器
helm chart push index.docker.io/v1/wcharts/alpinelinux:0.1.0
helm chart pull index.docker.io/v1/wcharts/alpinelinux:0.1.0
```

## Helm 模板

- https://pkg.go.dev/text/template
- https://masterminds.github.io/sprig/

```bash
# https://helm.sh/docs/chart_template_guide/
helm install --debug --dry-run goodly-guppy ./mychart

# 渲染模板
helm template . --show-only templates/values.yaml > values.yaml
```
