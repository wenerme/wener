---
tags:
  - FAQ
---

# FAQ

## failed to save outputs: Failed to establish pod watch: timed out waiting for the condition

- argo 使用 ns 下的 default ServiceAccount
  - 一般该 sa 没有 watch pod 的权限

```bash
# namespaced 安装 - SA 无权限
kubectl auth can-i get pod --as=system:serviceaccount:argo:default
```

**最小权限**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: workflow-role
rules:
  # pod get/watch is used to identify the container IDs of the current pod
  # pod patch is used to annotate the step's outputs back to controller (e.g. artifact location)
  - apiGroups:
      - ''
    resources:
      - pods
    verbs:
      - get
      - watch
      - patch
  # logs get/watch are used to get the pods logs for script outputs, and for log archival
  - apiGroups:
      - ''
    resources:
      - pods/log
    verbs:
      - get
      - watch
```

- 参考
  - https://github.com/argoproj/argo-workflows/issues/2522
  - https://github.com/argoproj/argo-workflows/blob/master/docs/workflow-rbac.md

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
      - ''
    resources:
      - pods
    verbs:
      - get
      - watch
      - patch
  # logs get/watch are used to get the pods logs for script outputs, and for log archival
  - apiGroups:
      - ''
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
