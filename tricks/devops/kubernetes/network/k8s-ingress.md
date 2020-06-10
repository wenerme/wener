# Kubernetes Ingress

## Tips
* [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
* 可提供能力
  * 路由规则
  * 访问规则
  * 虚拟主机
  * 鉴权
  * 单IP多应用
  * 负载均衡
  * URL 重写
  * TLS - LetsEncrypt 集成
  * HTTP、gRPC、TCP、UDP、HTTP2、WebSocket
  * 请求体重写
  * API 网关
  * 指标
  * 跟踪
* 选择纬度
  * 使用 Ingress 还是 CDR
  * 需要支持那些协议
  * 是否集成 ACME
  * 是否需要用来做 API 网关 - 考虑的功能不同
    * 跟踪、指标、插件修改请求、限流
  * 平台选择 - Nginx、Haproxy、Traefik、Envoy、硬件
    * Kong - API 网关
    * Traefik - ACME
    * HAProxy - 负载均衡
    * Nginx - 虚拟主机
  * 开源、商业支持、私有
* [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/#additional-controllers) 实现
  * [jcmoraisjr/haproxy-ingress](https://github.com/jcmoraisjr/haproxy-ingress)
  * [haproxytech/kubernetes-ingress](https://github.com/haproxytech/kubernetes-ingress)
  * [Kong/kubernetes-ingress-controller](https://github.com/Kong/kubernetes-ingress-controller)
  * Traefik CRD [containous/traefik-helm-chart](https://github.com/containous/traefik-helm-chart)
    * 支持更多功能
  * Traefik [Kubernetes Ingress Controller](https://docs.traefik.io/providers/kubernetes-ingress/)
  * istio [Ingress](https://istio.io/docs/tasks/traffic-management/ingress/)
* 参考
  * [The Right Ingress Controller for Your K8s](https://lab.wallarm.com/choose-the-right-ingress-controller-for-your-kubernetes-environment/)
  * [Comparison of Kubernetes Top Ingress Controllers](https://caylent.com/kubernetes-top-ingress-controllers)
  * [Managing Kubernetes Ingresses](https://caylent.com/managing-kubernetes-ingresses)
