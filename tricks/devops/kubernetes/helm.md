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

| NAME      | URL                                               |
| --------- | ------------------------------------------------- |
| stable    | https://kubernetes-charts.storage.googleapis.com/ |
| traefik   | https://containous.github.io/traefik-helm-chart   |
| jetstack  | https://charts.jetstack.io                        |
| hashicorp | https://helm.releases.hashicorp.com               |
| harbor    | https://helm.goharbor.io                          |

### Helm 模板

- https://pkg.go.dev/text/template
- https://masterminds.github.io/sprig/

```bash
# https://helm.sh/docs/chart_template_guide/
helm install --debug --dry-run goodly-guppy ./mychart

# 渲染模板
helm template . --show-only templates/values.yaml > values.yaml
```
