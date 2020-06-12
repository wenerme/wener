---
id: kong-ingress
title: Kong Ingress
---

# Kong Ingress
* [Kong/kubernetes-ingress-controller](https://github.com/Kong/kubernetes-ingress-controller)

* [Kong for Kubernetes](https://github.com/Kong/kubernetes-ingress-controller/blob/master/docs/deployment/k4k8s.md) 部署
  * [部署概念](https://github.com/Kong/kubernetes-ingress-controller/blob/master/docs/concepts/deployment.md)

```bash
helm repo add kong https://charts.konghq.com
helm repo update

helm install kong/kong --generate-name --set ingressController.installCRDs=false
# 访问代理地址
export PROXY_IP=$(kubectl get -o jsonpath="{.status.loadBalancer.ingress[0].ip}" service -n kong demo-kong-proxy)
```
