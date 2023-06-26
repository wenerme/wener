---
title: HELM 包管理器
---

# Helm

- [helm/helm](https://github.com/helm/helm) 是什么
  - Kubernetes 上的包管理器
- [helm.sh](https://helm.sh/)
  - [环境变量列表](https://helm.sh/docs/helm/helm)
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
  - [Chart.yaml](https://helm.sh/docs/topics/charts/#the-chartyaml-file)
  - [arttor/helmify](https://github.com/arttor/helmify)

```bash
brew install helm

# 客户端版本
helm version

helm repo add stable http://mirror.azure.cn/kubernetes/charts/
helm search repo stable

helm show values stable/nextcloud
helm pull stable/nextcloud
helm pull stable/nextcloud --untar

# 安装本地 chart
helm install --namespace apisix -f values.yaml apisix ./

helm create my-chart
```

## 路径

| 系统    | 缓存                        | 配置                             | 数据                      |
| ------- | --------------------------- | -------------------------------- | ------------------------- |
| Linux   | `$HOME/.cache/helm`         | `$HOME/.config/helm`             | `$HOME/.local/share/helm` |
| macOS   | `$HOME/Library/Caches/helm` | `$HOME/Library/Preferences/helm` | `$HOME/Library/helm`      |
| Windows | `%TEMP%\helm`               | `%APPDATA%\helm`                 | `%APPDATA%\helm`          |

- /
  - cache/
    - archive/
  - plugins/
  - repository/
    - repositories.lock
    - repositories.yaml
    - cache/
      - ${NAME}-index.yaml
    - local/
      - index.yaml
  - starters/

## 常用仓库

| NAME                         | URL                                                             |
| ---------------------------- | --------------------------------------------------------------- |
| wener<br/>offcial collection | https://wenerme.github.io/charts<br/>https://charts.wener.tech/ |
| traefik                      | https://containous.github.io/traefik-helm-chart                 |
| jetstack                     | https://charts.jetstack.io                                      |
| hashicorp                    | https://helm.releases.hashicorp.com                             |
| harbor                       | https://helm.goharbor.io                                        |
| bitnami                      | https://charts.bitnami.com/bitnami                              |
| Deprecaed                    | ⚠️                                                              |
| stable                       | https://kubernetes-charts.storage.googleapis.com/               |
| incubator                    | https://kubernetes-charts-incubator.storage.googleapis.com      |
| stable<br/>azure mirror      | http://mirror.azure.cn/kubernetes/charts/                       |
| incubator<br/>azure mirror   | http://mirror.azure.cn/kubernetes/charts-incubator/             |

- [bitnami/charts](https://github.com/bitnami/charts)
- [banzaicloud/banzai-charts](https://github.com/banzaicloud/banzai-charts)
- [helm/charts](https://github.com/helm/charts)

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

## index.yaml

- https://helm.sh/docs/topics/chart_repository/

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

### registry

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

### repo

```bash
helm repo add --username=admin myrepo https://xx.xx.xx.xx
# helm plugin install https://github.com/chartmuseum/helm-push
helm push hello-helm-0.1.0.tgz myrepo
```

## Helm 模板

- https://pkg.go.dev/text/template
- https://masterminds.github.io/sprig/

```bash
# https://helm.sh/docs/chart_template_guide/
helm install --debug --dry-run goodly-guppy ./mychart

# 渲染单个模板 - 用于测试排查问题
helm template ./mychart --show-only templates/values.yaml > values.yaml
# 渲染整个 chart
helm template ./mychart
```

## Helm Operator

- [fluxcd/helm-operator](https://github.com/fluxcd/helm-operator)

# FAQ

## oci registry vs chart repository

- OCI
  - 实验阶段
  - 可直接使用现有 Docker 仓库基础设施
  - 仓库方可能对 chart 支持还不是很好 - Chart 元信息可能展现不完善
  - 部分仓库还不支持
  - Helm 3+
- Repo
  - Helm 2+
  - 简单易理解 - HTTP 静态文件服务 - 提供 index.yaml 作为索引
  - 现有仓库功能相对完善

## helm repo index merge

- helm repo index --merge 需要不同的目录才能生效
  - [#4482](https://github.com/helm/helm/issues/4482)

```bash
# 方案A: copy 目录
cp -r charts last
# update charts
helm repo index --merge last/index.yaml charts

# 方案B: 存储在别的位置
helm repo index --merge charts/index.yaml newer
rsync newer/ charts/
```

## unpacked charts cannot be verified
