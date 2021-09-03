---
title: Kubernetes Ingress
---

# Kubernetes Ingress

- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- 可提供能力
  - 路由规则
  - 访问规则
  - 虚拟主机
  - 鉴权
  - 单 IP 多应用
  - 负载均衡
  - URL 重写
  - TLS - LetsEncrypt 集成
  - HTTP、gRPC、TCP、UDP、HTTP2、WebSocket
  - 请求体重写
  - API 网关
  - 指标
  - 跟踪
- 选择纬度
  - 使用 Ingress 还是 CDR
  - 需要支持那些协议
  - 是否集成 ACME
  - 是否需要用来做 API 网关 - 考虑的功能不同
    - 跟踪、指标、插件修改请求、限流
  - 平台选择 - Nginx、Haproxy、Traefik、Envoy、硬件
    - Kong - API 网关
    - Traefik - ACME
    - HAProxy - 负载均衡
    - Nginx - 虚拟主机
  - 开源、商业支持、私有
- 参考
  - [Comparison of Kubernetes Ingress controllers](https://docs.google.com/spreadsheets/d/191WWNpjJ2za6-nbG4ZoUMXMpUK8KlCIosvQB0f-oq3k/htmlview)
    - Ingress 网关多纬度比较
  - [The Right Ingress Controller for Your K8s](https://lab.wallarm.com/choose-the-right-ingress-controller-for-your-kubernetes-environment/)
  - [Comparison of Kubernetes Top Ingress Controllers](https://caylent.com/kubernetes-top-ingress-controllers)
  - [Managing Kubernetes Ingresses](https://caylent.com/managing-kubernetes-ingresses)
  - [Comparing Ingress controllers for Kubernetes](https://medium.com/flant-com/comparing-ingress-controllers-for-kubernetes-9b397483b46b)
    - [Google Sheet](https://docs.google.com/spreadsheets/d/1DnsHtdHbxjvHmxvlu7VhzWcWgLAn_Mc5L1WlhLDA__k)

:::tip

- 如果设置了多个 默认 ingressclass 则必须为 ingress 指定 class

:::


## Ingress

```yaml title="default-ingress-backend.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: default-ingress-backend
spec:
  defaultBackend:
    service:
      name: test
      port:
        number: 80
```

- pathType
  - ImplementationSpecific - 大多实现默认为 Prefix
  - Exact - 完整匹配
  - Prefix - 前缀匹配
    - 路径 Prefix 而不是 字符串 Prefix
    - 例如 /a 匹配 /a/ 和 /a/b 但是不匹配 /aa
  - Mixed - Prefix+Exact

## IngressClass

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: external-lb
  annotations:
    # 标记为默认 ingress
    ingressclass.kubernetes.io/is-default-class: true
spec:
  controller: example.com/ingress-controller
  parameters:
    apiGroup: k8s.example.com
    kind: IngressParameters
    name: external-lb
    namespace: external-configuration
    # v1.22 beta
    scope: Namespace
```
