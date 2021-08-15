---
title: 认证授权
---

# 认证授权

## Tips

- [AuthN](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [AuthZ](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)

## Authentication

- 支持模块
  - Client Certificates - v1.19
    - 需要 API Server 有 CA - 都会有 `--client-ca-file=SOMEFILE`
    - `openssl req -new -key jbeda.pem -out jbeda-csr.pem -subj "/CN=jbeda/O=app1/O=app2"`
  - Password
  - Plain Tokens
    - 需要 API Server 配置 `--token-auth-file=SOMEFILE.csv`
      - CSV `token,user,uid,"group1,group2,group3"`
    - `Authorization: Bearer 31ada4fd-adec-460c-809a-9e56ceb75269`
  - Bootstrap Tokens - v1.18+
    - `Authorization: Bearer 781292.db7bc3a58fc5f07e`
  - Service Account
    - `kubectl create serviceaccount jenkins`
  - OIDC - 需要配置 API Server
    1. `kubectl config set-credentials --auth-provider=oidc`
    2. `kubectl --token=`
- 支持多种方式，按顺序尝试，直到成功
- 错误返回 401
- 用户分为 Kubernetes 管理的服务账号 和 一般用户
- dex 可以作为 auth broker
  - client -> dex -> provider
    - dex -> k8s
  - API Server 统一对接 dex，dex 对接其他 provider
  - [mintel/dex-k8s-authenticator](https://github.com/mintel/dex-k8s-authenticator)

### X509 Client Certs

```bash
# List CSR
kubectl get csr
# Approve/Deny CSR
kubectl certificate approve myuser
kubectl certificate deny myuser

# CSR
kubectl get csr/myuser -o yaml

kubectl get csr myuser -o jsonpath='{.status.certificate}'| base64 -d > myuser.crt

# RB
kubectl create role developer --verb=create --verb=get --verb=list --verb=update --verb=delete --resource=pods
kubectl create rolebinding developer-binding-myuser --role=developer --user=myuser

# kubeconfig
kubectl config set-credentials myuser --client-key=myuser.key --client-certificate=myuser.crt --embed-certs=true
kubectl config set-context myuser --cluster=kubernetes --user=myuser
kubectl config use-context myuser
```

```bash
# username: wener groups: infra, dev
openssl req -new -key wener.pem -out wener-csr.pem -subj "/CN=wener/O=infra/O=dev"
```

**创建 CSR**

```yaml
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser
spec:
  request: <csr-base64> # cat myuser.csr | base64 | tr -d "\n" 或 {{file john.csr | b64enc}}
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400 # one day
  usages:
    - client auth
```

**操作 CSR 需要的权限**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: csr-creator # 创建
rules:
  - apiGroups:
      - certificates.k8s.io
    resources:
      - certificatesigningrequests
    verbs:
      - create
      - get
      - list
      - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: csr-approver # 同意
rules:
  - apiGroups:
      - certificates.k8s.io
    resources:
      - certificatesigningrequests
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - certificates.k8s.io
    resources:
      - certificatesigningrequests/approval
    verbs:
      - update
  - apiGroups:
      - certificates.k8s.io
    resources:
      - signers
    resourceNames:
      - example.com/my-signer-name # example.com/* can be used to authorize for all signers in the 'example.com' domain
    verbs:
      - approve

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: csr-signer # 允许对 CSR 签名
rules:
  - apiGroups:
      - certificates.k8s.io
    resources:
      - certificatesigningrequests
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - certificates.k8s.io
    resources:
      - certificatesigningrequests/status
    verbs:
      - update
  - apiGroups:
      - certificates.k8s.io
    resources:
      - signers
    resourceNames:
      - example.com/my-signer-name # example.com/* can be used to authorize for all signers in the 'example.com' domain
    verbs:
      - sign
```

### signer

- kubernetes.io/kube-apiserver-client
- kubernetes.io/kube-apiserver-client-kubelet
- kubernetes.io/kubelet-serving
- kubernetes.io/legacy-unknown

## Authorization

- 请求包含请求者的用户名、动作、影响对象
- 错误返回 403
- 支持模块
  - ABAC
  - RBAC
  - Webhook

**策略**

```json
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "bob",
    "namespace": "projectCaribou",
    "resource": "pods",
    "readonly": true
  }
}
```

**请求审核**

```json
{
  "apiVersion": "authorization.k8s.io/v1beta1",
  "kind": "SubjectAccessReview",
  "spec": {
    "resourceAttributes": {
      "namespace": "projectCaribou",
      "verb": "get",
      "group": "unicorn.example.org",
      "resource": "pods"
    }
  }
}
```

## Admission Control

- 用于修改或驳回请求
- 用于 create, modify, delete, connect (proxy) 对象时
- 不影响读取
- 多个访问控制按顺序判断
- 有一个驳回则马上驳回
- 可设置复杂的字段
