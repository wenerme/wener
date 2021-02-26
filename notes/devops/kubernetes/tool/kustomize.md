---
id: kustomize
title: kustomize
---

# kustomize
## Tips
* [kubernetes-sigs/kustomize](https://github.com/kubernetes-sigs/kustomize)
* kustomize [reference](https://kubectl.docs.kubernetes.io/references/kustomize/)
* [kubectl apply -k](https://kubectl.docs.kubernetes.io/pages/app_management/introduction.html)
  * v1.14+
  * [#1500](https://github.com/kubernetes-sigs/kustomize/issues/1500) - 升级到新版受到阻碍
* 特点
  * 不基于字符串模板
  * 变量引用
    * vars
  * Patch 修改定义
    * JSON Patch
    * patchesStrategicMerge
    * patchesJson6902
  * DSL 修改定义
    * namespace
    * namePrefix
    * nameSuffix
    * commonLabels
    * commonAnnotations
    * images - 镜像替换
  * DSL 生成定义
    * configmapGenerator
    * secretGenerator
    * generatorOptions
  * 资源聚合
    * resources
    * bases - overlay 多层目录
    * configurations
    * crds
* kustomization.yaml - 核心定义文件
* 参考
  * [Declarative Management of Kubernetes Objects Using Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)


```bash
# macOS
brew install kustomize
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
* https://github.com/kubernetes-sigs/kustomize/tree/master/examples/transformerconfigs


## 批量合并修改

__kustomization.yaml__
```yml
patches:
- target:
    kind: Application
  path: patch.yaml
```

__patch.yaml__
```yml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  # 匹配所有
  name: "*"
spec:
  project: dev-cluster
```

