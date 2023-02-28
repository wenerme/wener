---
title: RBAC
---

# RBAC

- UserAccount
  - 多种认证方式
    - x509
    - bearer token -  JWT
    - basic-auth
- ServiceAccount
  - 直接创建，生成包含 Token 的 Secret

```bash
kubectl get clusterroles
kubectl get ClusterRoleBinding
```

- 面向用户内置角色
  - view - 排除 secret 的 get
  - edit -  view + 排除 role, rolebinding 的 create, delete, update
  - admin - edit + namespace 级别 role, rolebinding
  - cluster-admin
- 核心
  - system:kube-scheduler
  - system:volume-scheduler
  - system:kube-controller-manager
  - system:node
  - system:node-proxier
- verbs
  - create, get, delete, list, update
  - exec
- 主要
  - Role, RoleBinding, Subjects
  - ClusterRole, ClusterRoleBinding

| ClusterRole   |
| ------------- |
| cluster-admin |

```bash
# username
(umask 077;openssl genrsa -out username.key 2048)

# O=group
# 可以多 group - CN=username/O=group1/O=group2
openssl req -new -key username.key -out username.csr -subj "/O=dev/CN=username"


# 直接服务端使用 CA Approve CSR
# -CA /etc/kubernetes/pki/ca.crt -CAkey /etc/kubernetes/pki/ca.key
openssl x509 -req -in username.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out username.crt -days 365

kubectl config set-credentials username --client-certificate=username.crt --client-key=username.key

# 判断权限
kubectl auth can-i list pods --as username

# rakkess
# ==========
# https://github.com/corneliusweig/rakkess
kubectl krew install access_matrix
# 查看所有权限
kubectl access-matrix -n my-project-dev --as username
```

- https://github.com/FairwindsOps/rbac-manager
- https://github.com/aquasecurity/kubectl-who-can
- https://github.com/FairwindsOps/rbac-lookup
- Kubectl Approve CSR
  - https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/

## ServiceAccount

## API discovery roles

```bash
kubectl get clusterroles system:discovery -o yaml

kubectl get clusterroles system:discovery -o json | jq '.rules[0].nonResourceURLs | join(", ")' -r
```

| ClusterRole               | verbs  |
| ------------------------- | ------ | ------------------------------------------------ |
| system:basic-user         | create | selfsubjectaccessreviews,selfsubjectrulesreviews |
| system:public-info-viewer | get    | /healthz, /livez, /readyz, /version, /version/   |
| system:discovery          | get    | public-info-viewer + /openapi,/api,/apis         |

- ClusterRoleBinding
  - system:authenticated
  - system:unauthenticated
- subjects
  - system:
    - system:serviceaccount: - service account usernames
    - system:serviceaccounts: - service account groups
    - system:controller:
- cluster-admin

```bash
kubectl get clusterroles system:discovery -o yaml
```
