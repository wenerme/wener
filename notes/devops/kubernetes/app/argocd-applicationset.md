---
title: ArgoCD ApplicationSet
---

# ArgoCD ApplicationSet

- [argoproj-labs/applicationset](https://github.com/argoproj-labs/applicationset)
  - 解决现在 ArgoCD app of app 问题
  - ApplicationSet CRD
  - 适用于多集群多租户，适用于 monorepo 场景
  - 基于模版生成操作 Application
- generator
  - list
  - cluster
  - git

```bash
# 安装 applicationset - 要确保先安装了 argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/applicationset/master/manifests/install.yaml

# 默认删除 ApplicationSet 会删除生成的 Application
# 不级联删除
kubectl delete ApplicationSet <NAME> --cascade=false
```

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
 name: guestbook
spec:
  generators:
  # List 生成，变量替代
  - list:
     elements:
     - cluster: engineering-dev
       url: https://kubernetes.default.svc
    # generator 也可以定义 模板 - 优先 - 会进行合并
    template:
  # 基于集群生成
  # secret argocd.argoproj.io/secret-type=cluster
  # 能使用 secret 里的变量，主要是 server 和 name
  - clusters:
      # 筛选集群 - 默认所有
      selector:
        # 匹配 集群 secret 的 label
        matchLabels:
          staging: true
  # 基于 git 生成
  - git:
      repoURL: https://github.com/argoproj-labs/applicationset.git
      revision: HEAD
      directories:
      # 基于目录生成
      # 可用变量 path, path.basename
      - path: examples/git-generator-directory/cluster-addons/*
      # 基于文件生成
      # 支持解析 JSON,YAML(0.2+)
      # 可以使用 json 里定义的数据作为变量
      - path: "examples/git-generator-files-discovery/cluster-config/**/config.json"
  # Application 模板
  template:
    metadata:
      name: '{{cluster}}-guestbook'
    spec:
      project: default
      source:
        repoURL: https://github.com/argoproj-labs/applicationset.git
        targetRevision: HEAD
        path: examples/list-generator/guestbook/{{cluster}}
      destination:
        # name 和 server 二选一
        # name: # cluster name
        server: '{{url}}' # 默认 https://kubernetes.default.svc
        namespace: guestbook
```
