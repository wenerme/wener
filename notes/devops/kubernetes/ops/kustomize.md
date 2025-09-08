---
title: kustomize
---

# kustomize

- [kubernetes-sigs/kustomize](https://github.com/kubernetes-sigs/kustomize)
- kustomize [reference](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [kubectl apply -k](https://kubectl.docs.kubernetes.io/pages/app_management/introduction.html)
  - v1.14+
  - [#1500](https://github.com/kubernetes-sigs/kustomize/issues/1500) - 升级到新版受到阻碍
- 特点
  - 不基于字符串模板
  - 变量引用
    - vars
  - Patch 修改定义
    - JSON Patch
    - patchesStrategicMerge
    - patchesJson6902
  - DSL 修改定义
    - namespace
    - namePrefix
    - nameSuffix
    - commonLabels
    - commonAnnotations
    - images - 镜像替换
  - DSL 生成定义
    - configmapGenerator
    - secretGenerator
    - generatorOptions
  - 资源聚合
    - resources
    - bases - overlay 多层目录
    - configurations
    - crds
- kustomization.yaml - 核心定义文件
- 参考
  - [Declarative Management of Kubernetes Objects Using Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)

:::caution

- 不支持移除资源 - [#1593](https://github.com/kubernetes-sigs/kustomize/issues/1593)

:::

```bash
# macOS
brew install kustomize

kubectl kustomize
```

## 目录结构

```bash
# 应用基础目录
mkdir -p app/base app/overlays/{staging,production}

# kustomize build 生成 yaml
# 部署不同环境
kustomize build ~/ldap/overlays/staging | kubectl apply -f - --context staging
kustomize build ~/ldap/overlays/production | kubectl apply -f - --context production

# -k 可直接 apply
kubectl apply -k ~/ldap/overlays/staging --context staging
kubectl apply -k ~/ldap/overlays/production --context production
```

```
~/someApp - 基础应用目录
├── base - 基础层
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
└── overlays - 叠加层
    ├── development - base+开发环境自定义内容
    │   ├── cpu_count.yaml
    │   ├── kustomization.yaml
    │   └── replica_count.yaml
    └── production - base+生产环境自定义内容
        ├── cpu_count.yaml
        ├── kustomization.yaml
        └── replica_count.yaml
```

## 示例

- https://github.com/kubernetes-sigs/kustomize/tree/master/examples/transformerconfigs

## 批量合并修改

**kustomization.yaml**

```yml
patches:
  - target:
      kind: Application
    path: patch.yaml
```

**patch.yaml**

```yml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  # 匹配所有
  name: '*'
spec:
  project: dev-cluster
```

## vars/replacements

```yaml
resources:
- admin.cm.yaml

replacements:
- source:
   kind: ConfigMap
   name: admin-conf
   fieldPath: data.version
 targets:
 - select:
     kind: Deployment
   fieldPaths:
   # 替换镜像版本号
   - spec.template.spec.containers.[name=admin].image
   options:
     delimiter: ":"
     index: 1
```

- [api/types/replacement.go](https://github.com/kubernetes-sigs/kustomize/blob/7c36ed21b3587e7124326743a888db5374e86d93/api/types/replacement.go)
- https://github.com/kubernetes-sigs/kustomize/issues/3492
  - vars -> replacements
- https://github.com/kubernetes-sigs/kustomize/issues/2052#issuecomment-1411757485

# FAQ

## accumulating resources: accumulation err='merging resources from 'res.yaml': may not add resource with an already registered id

检查是否已经定义过资源

## index out of range [4] with length 4

YAML 语法可能没有问题，但是有 CJK 可能会导致这个异常

- [kubernetes-sigs/kustomize#3778](https://github.com/kubernetes-sigs/kustomize/issues/3778) - Can not add any comment in .yaml
  - go-yaml 包版本问题
