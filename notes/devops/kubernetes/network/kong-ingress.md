---
title: Kong Ingress
---

# Kong Ingress
* [Kong/kubernetes-ingress-controller](https://github.com/Kong/kubernetes-ingress-controller)
* [Kong for Kubernetes](https://github.com/Kong/kubernetes-ingress-controller/blob/master/docs/deployment/k4k8s.md) 部署
  * [部署概念](https://github.com/Kong/kubernetes-ingress-controller/blob/master/docs/concepts/deployment.md)
* 特性
  * Ingres
  * API 管理
    * kong 有大量插件
  * gRPC 支持
  * Health checking, Load-balancing
    * 支持主动被动检查
  * 请求响应转换
    * 使用插件拦截修改
  * 认证
  * [CRD 配置](https://github.com/Kong/kubernetes-ingress-controller/blob/main/docs/concepts/custom-resources.md)
    * KongIngress
      * 扩展默认的 Ingress
      * Ingress 的 `configuration.konghq.com` Annotation 指向该配置
    * KongPlugin
      * Ingress 的 `plugins.konghq.com` Annotation 指向该配置
    * KongClusterPlugin
      * 集群纬度插件配置
    * KongConsumer
      * Kong 的 Consumers 对象
    * TCPIngress
* [架构](https://github.com/Kong/kubernetes-ingress-controller/blob/main/docs/concepts/design.md)
* [文档](https://github.com/Kong/kubernetes-ingress-controller/tree/main/docs/guides)
* [annotations](https://github.com/Kong/kubernetes-ingress-controller/blob/main/docs/references/annotations.md)

```bash
helm repo add kong https://charts.konghq.com
helm repo update

helm install kong/kong --generate-name --set ingressController.installCRDs=false
# 访问代理地址
export PROXY_IP=$(kubectl get -o jsonpath="{.status.loadBalancer.ingress[0].ip}" service -n kong demo-kong-proxy)
```
