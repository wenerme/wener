---
id: traefik-ingress
title: Traefik Ingress
---

# Traefik Ingress

## Tips
* Traefik 的 K8S 分为 CRD 方式和标准的 IngressController
  * CRD 支持更多功能 - Helm 安装

```bash

```

## CRD
* [示例资源配置](https://github.com/containous/traefik/tree/v2.2/pkg/provider/kubernetes/crd/fixtures)

```bash
helm repo add traefik https://containous.github.io/traefik-helm-chart
helm repo update
helm install traefik traefik/traefik

# 可安装在独立命名空间
kubectl create ns traefik
helm install --namespace=traefik \
    traefik traefik/traefik
```

## IngressController
* [示例资源配置](https://github.com/containous/traefik/tree/v2.2/pkg/provider/kubernetes/ingress/fixtures)




https://docs.traefik.io/routing/providers/kubernetes-ingress/

https://github.com/rancher/k3s/issues/1141




https://github.com/containous/traefik-helm-chart

https://docs.traefik.io/getting-started/install-traefik/#use-the-helm-chart

kubectl port-forward $(kubectl get pods --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000

ClusterRoleBinding

error syncing 'traefik/traefik'
handler svccontroller: Operation cannot be fulfilled on  "svccontroller": delaying object set, requeuing

INOTIFY_USR
