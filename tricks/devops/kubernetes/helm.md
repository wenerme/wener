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


```bash
brew install helm

# 客户端版本
helm version

helm repo add stable https://kubernetes-charts.storage.googleapis.com/
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

| Name     | URL                                               |
| -------- | ------------------------------------------------- |
| stable   | https://kubernetes-charts.storage.googleapis.com/ |
| traefik  | https://containous.github.io/traefik-helm-chart   |
| jetstack | https://charts.jetstack.io                        |

### Helm 模板
* https://pkg.go.dev/text/template
* https://masterminds.github.io/sprig/

```bash
# https://helm.sh/docs/chart_template_guide/
helm install --debug --dry-run goodly-guppy ./mychart

# 渲染模板
helm template . --show-only templates/values.yaml > values.yaml
```

## V2 - V3

- 移除 Tiller - 需要安装到集群里的部分
- 三路合并更新的升级策略
- 发布名在命名空间下而不是全局
- 使用 secret 作为默认存储
- Go 导入路径变化 `k8s.io/helm` -> `helm.sh/helm/v3`
- 新增 [.Capabilities](https://helm.sh/docs/chart_template_guide/builtin_objects/) 内建对象 - 用于检测集群环境
- 使用 JSONSchema 验证 Chart
- 将 requirements.yaml 合并到 Chart.yaml - 依赖定义
- 安装时必须指定名字或 `--generate-name`
- 支持 OCI [注册中心](https://helm.sh/docs/topics/registries/) - docker 注册中心
  - 实验阶段 `HELM_EXPERIMENTAL_OCI=1`
- 移除 `helm serve`
- 命令修改
  - `inspect` -> `show`
  - `fetch` -> `pull`
- 安装支持 `--create-namespace` 创建命名空间
- 参考
  - [Changes since Helm 2](https://helm.sh/docs/faq/#changes-since-helm-2)

### Tiller 安装

- 部分系统还依赖 Tiller
- 目前版本 v2.16.1 - 20191129
- 使用 tiller 需要使用旧版本 helm - 例如 https://get.helm.sh/helm-v2.16.1-darwin-amd64.tar.gz

```bash
kubectl -n kube-system create serviceaccount tiller

kubectl create clusterrolebinding tiller \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:tiller

helm init --service-account tiller

# 可以修改镜像仓库 - 避免无法安装
# helm init --service-account tiller --tiller-image registry.wener.me/kubernetes-helm/tiller:v2.16.1

# 获取部署状态
kubectl -n kube-system rollout status deploy/tiller-deploy
# 如果失败可以考虑重试
kubectl -n kube-system rollout restart deploy/tiller-deploy

# 当前版本 - 客户端和服务端 - 如果都有输出则说明部署成功
helm version
```

## Helm 2 Tiller

- v2 [文档](https://v2.helm.sh/)
- 有些环境还是使用的 Tiller
- 全局参数
  - `--debug` 输出更多信息
  - `--home` HELM_HOME 默认 `$HOME/.helm/`
  - `--host` HELM_HOST 例如 使用本地 export HELM_HOST=:44134
  - `--kube-context` Kube 的上下文
  - `--kubeconfig` 配置路径 KUBECONFIG 默认 `$HOME/.kube/config`
  - `--tiller-namespace` 使用的空间 - 默认 kube-system - 可使用环境变量 TILLER_NAMESPACE

```bash
# helm init - 初始化客户端和服务端
# -c --client-only 只初始化客户端

# 安装可指定账号 - 需要 cluster-admin 权限
helm init --service-account $tiller_account

# TLS 安装
# gitlab 的安装命令
helm init --tiller-tls --tiller-tls-verify --tls-ca-cert /data/helm/helm/config/ca.pem --tiller-tls-cert /data/helm/helm/config/cert.pem --tiller-tls-key /data/helm/helm/config/key.pem --service-account tiller

# 查看 helm 相关资源
kubetcl get all -l app=helm

# 删除/卸载
helm reset
# 暴力
kubetcl delete all -l app=helm
```

## FAQ

### Error: could not find a ready tiller pod

```bash
# 确保有工作的 tiller-deploy
# 也可能不是使用的 kube-system 下的 tiller 需要注意
kubectl -n kube-system get po ｜ grep tiller-deploy
```

### Helm 命令 Hang 住

- 一般是网络或者 CA 的问题或者账号问题
- 如果集群部署了多个 tiller 可能会有问题
- 44134/44135
