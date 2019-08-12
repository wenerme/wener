# Spec

* [Kubernetes API Reference](http://kubernetes.io/docs/api-reference/v1/definitions/)
* [Kubernetes Swagger UI](http://kubernetes.io/kubernetes/third_party/swagger-ui/)
* [API 约定](https://github.com/kubernetes/kubernetes/blob/release-1.3/docs/devel/api-conventions.md)


## 基本
```yaml
# 用于标示 REST 请求的资源类型.驼峰格式.服务器也可从客户端请求的接口来推断出来值.不能更新.
# http://releases.k8s.io/release-1.3/docs/devel/api-conventions.md#types-kinds
kind: string
# 定义一个对象 Schema 的版本.服务器在内部应将 Schema 转换为最新的版本,会拒绝无法识别的值.
# http://releases.k8s.io/release-1.3/docs/devel/api-conventions.md#resources
apiVersion: string
# 标准版的对象元数据
# http://releases.k8s.io/release-1.3/docs/devel/api-conventions.md#metadata
metadata: object
# 定义行为
# http://releases.k8s.io/release-1.3/docs/devel/api-conventions.md#spec-and-status
spec: object
```
