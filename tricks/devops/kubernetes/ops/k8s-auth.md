# 认证授权

## Tips
* [AuthN](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
* [AuthZ](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)

## Authentication
* 支持模块
  * Client Certificates
  * Password
  * Plain Tokens
  * Bootstrap Tokens
  * JWT Tokens (用于 Service Accounts)
* 支持多种方式，按顺序尝试，直到成功
* 错误返回 401
* 用户分为 Kubernetes管理的服务账号 和 一般用户

## Authorization
* 请求包含请求者的用户名、动作、影响对象
* 错误返回 403
* 支持模块
  * ABAC
  * RBAC
  * Webhook

__策略__

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

__请求审核__

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
* 用于修改或驳回请求
* 用于 create, modify, delete, connect (proxy) 对象时
* 不影响读取
* 多个访问控制按顺序判断
* 有一个驳回则马上驳回
* 可设置复杂的字段
