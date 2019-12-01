---
id: rancher-intro
title: Rancher UI
---

# Rancher

## Tips
* [Rancher](http://rancher.com/) - 定位于 K8S 的 UI
* 问题
  * 支持 Helm 3 [#20596](https://github.com/rancher/rancher/issues/20596)
* 注意
  * 如果 rancher 是作为工作负载运行在 k8s 集群，那么集群名字默认就为 local
  * HA 部署是通过 Helm 部署在 k8s 集群
  * rancher 的监控默认是滚动的 12h - 不会落盘 - 因此 rancher 安装不需要持久化存储
  * 启用了 istio 会有[两个Ingress](https://rancher.com/docs/rancher/v2.x/en/cluster-admin/tools/istio/)
* 安装的 Helm 应用
  * cluster-istio
    * Kali `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/istio-system/services/kiali-http:80/proxy/`
    * Jeager `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/istio-system/services/tracing:80/proxy/`
  * monitoring-operator
    * 镜像 `rancher/coreos-prometheus-operator`
  * cluster-monitoring
    * Grafana `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/cattle-prometheus/services/http:access-grafana:80/proxy/`
    * Prometheus `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/cattle-prometheus/services/http:access-prometheus:80/proxy/graph`
    * Prometheus 端口映射的是 9796

## Get started

```bash
# Rancher 单节点启动
# 存储使用 etcd
# 如果不需要证书可以使用 --no-cacerts 然后在外面反向代理到 80 即可
# 如果带证书 X-Forwarded-Proto 需要设置为 https 否则 websocket 可能会有问题
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v $PWD/rancher/data:/var/lib/rancher \
  -v $PWD/rancher/auditlog:/var/log/auditlog \
  -e AUDIT_LEVEL=1 \
  --name rancher rancher/rancher:latest
```

## FAQ
### Waiting for server-url setting to be set
* 等一会儿就好了
* [rancher/rancher#16213](https://github.com/rancher/rancher/issues/16213)
