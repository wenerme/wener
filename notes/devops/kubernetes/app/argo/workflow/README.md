---
title: Argo Workflow
---

# Argo Workflow

- [argoproj/argo-workflows](https://github.com/argoproj/argo-workflows) 是什么？
  - Cloud Native 工作流引擎
  - CRD 管理
  - 每个步骤都是容器
  - 适用计算密集型任务 - 机器学习, 数据处理
  - 适用于 CI/CD 场景
- adopted by
  - kubeflow
- 用到的镜像
  - argoproj/argocli
  - argoproj/workflow-controller
  - argoproj/argoexec - executor
  - argoproj/argosay - 演示流程使用的镜像
- [workflow-executors](https://argoproj.github.io/argo-workflows/workflow-executors/)
- 参考
  - Use Cases https://argoproj.github.io/argo-workflows/use-cases/ci-cd/
    - CI/CD
    - Data Processing
    - Infrastructure Automation
    - Machine Learning
  - https://argoproj-labs.github.io/argo-workflows-catalog/

## 安装

```bash
# 安装方式
# install.yaml - 集群纬度，所有命名空间
# namespace-install.yaml - argo 命名空间
# 会部署 argo-server 和 workflow-controller
# 配置 - workflow-controller-configmap
# https://github.com/argoproj/argo-workflows/tree/stable/manifests
kubectl create ns argo
kubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo-workflows/stable/manifests/namespace-install.yaml
# 默认不需要 login - 可以自己添加 sso 或者调整 authmode

# 命令行工具
brew install argo
# 获取登陆 token
# argo auth token
```

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: argo-ingress
  namespace: argo
spec:
  rules:
    - host: argo.example.com
      http:
        paths:
          - backend:
              service:
                name: argo-server
                port:
                  name: web
            pathType: ImplementationSpecific
```

## Workflow

```yaml
metadata:
  name: delightful-rhino
  labels:
    example: 'true'
spec:
  arguments:
    parameters:
      - name: message
        value: hello argo
  entrypoint: argosay
  templates:
    - name: argosay
      inputs:
        parameters:
          - name: message
            value: '{{workflow.parameters.message}}'
      container:
        name: main
        image: 'argoproj/argosay:v2'
        command:
          - /argosay
        args:
          - echo
          - '{{inputs.parameters.message}}'
  ttlStrategy:
    secondsAfterCompletion: 300
  podGC:
    strategy: OnPodCompletion
```

### 配置

- https://argoproj.github.io/argo-workflows/workflow-controller-configmap.yaml

```yaml
# containerRuntimeExecutor: docker
containerRuntimeExecutor: kubelet

# SSO Configuration for the Argo server.
# You must also start argo server with `--auth-mode sso`.
# https://argoproj.github.io/argo/argo-server-auth-mode/
sso: |
  # This is the root URL of the OIDC provider (required).
  issuer: https://issuer.root.url/
  # This is name of the secret and the key in it that contain OIDC client
  # ID issued to the application by the provider (required).
  clientId:
    name: client-id-secret
    key: client-id-key
  # This is name of the secret and the key in it that contain OIDC client
  # secret issued to the application by the provider (required).
  clientSecret:
    name: client-secret-secret
    key: client-secret-key
  # This is the redirect URL supplied to the provider (required). It must
  # be in the form <argo-server-root-url>/oauth2/callback. It must be
  # browser-accessible.
  redirectUrl: https://argo-server/oauth2/callback
  # Additional scopes to request. Typically needed for SSO RBAC. >= v2.12
  scopes:
    - groups
    - email
  # RBAC Config. >= v2.12
  rbac:
    enabled: false
```
