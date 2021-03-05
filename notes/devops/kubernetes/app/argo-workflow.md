---
title: Argo Workflow
---

# Argo Workflow
* 是什么？
  * Cloud Native 工作流引擎
  * CRD 管理
  * 每个步骤都是容器
  * 适用计算密集型任务 - 机器学习, 数据处理
  * 适用于 CI/CD 场景
* [argoproj/argo-workflows](https://github.com/argoproj/argo-workflows)
* 用到的镜像
  * argoproj/argocli
  * argoproj/workflow-controller
  * argoproj/argoexec - executor
  * argoproj/argosay - 演示流程使用的镜像
* [workflow-executors](https://argoproj.github.io/argo-workflows/workflow-executors/)

:::caution

* 默认 exector 为 docker - 会挂载 /var/run/docker.sock
  * 非 docker 部署 kubernetes 需要切换

:::

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
* https://argoproj.github.io/argo-workflows/workflow-controller-configmap.yaml

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

# FAQ
## failed to save outputs: Failed to establish pod watch: timed out waiting for the condition

* argo 使用 ns 下的 default ServiceAccount
  * 一般该 sa 没有 watch pod 的权限

```bash
# namespaced 安装 - SA 无权限
kubectl auth can-i get pod --as=system:serviceaccount:argo:default
```

__最小权限__
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: workflow-role
rules:
# pod get/watch is used to identify the container IDs of the current pod
# pod patch is used to annotate the step's outputs back to controller (e.g. artifact location)
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
  - watch
  - patch
# logs get/watch are used to get the pods logs for script outputs, and for log archival
- apiGroups:
  - ""
  resources:
  - pods/log
  verbs:
  - get
  - watch
```

* 参考
  * https://github.com/argoproj/argo-workflows/issues/2522
  * https://github.com/argoproj/argo-workflows/blob/master/docs/workflow-rbac.md

## failed to save outputs: unexpected non 200 status code: 403, body: Forbidden (user=system:serviceaccount:argo:default, verb=get, resource=nodes, subresource=proxy)

`nodes/proxy` 权限不足，该资源是集群资源

```yaml
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: argo-executor
rules:
# pod get/watch is used to identify the container IDs of the current pod
# pod patch is used to annotate the step's outputs back to controller (e.g. artifact location)
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
  - watch
  - patch
# logs get/watch are used to get the pods logs for script outputs, and for log archival
- apiGroups:
  - ""
  resources:
  - pods/log
  - nodes/proxy
  verbs:
  - get
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: argo-executor
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: argo-executor
subjects:
- kind: ServiceAccount
  name: default
  namespace: argo
```
