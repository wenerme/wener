---
title: Kubernetes 标签
---

# Kubernetes 标签

- https://kubernetes.io/docs/reference/kubernetes-api/labels-annotations-taints

## 节点标签

- kubernetes.io/ingress.class

| label                            | demo      | desc        |
| -------------------------------- | --------- | ----------- |
| k3s.io/hostname                  | node-3    |
| k3s.io/internal-ip               | 10.10.1.1 |
| kubernetes.io/arch               | amd64     | +v1.14      |
| kubernetes.io/hostname           | node-3    |
| kubernetes.io/os                 | linux     | +v1.14      |
| node-role.kubernetes.io/`<role>` | true      |
| node-role.kubernetes.io/master   | true      | Master node |
| node.kubernetes.io/instance-type | k3s       |
| topology.kubernetes.io/region    |           | +v1.17      |
| topology.kubernetes.io/zone      |           | +v1.17      |

```bash
# 设置 node role 为 worker
# role 名字任意
# value 不重要，主要是存在该 label
kubectl label node-2 node-role.kubernetes.io/worker=true
```

### Deprecated

| label                                    | demo  | desc           |
| ---------------------------------------- | ----- | -------------- |
| beta.kubernetes.io/arch                  | amd64 | !v1.14, -v1.18 |
| beta.kubernetes.io/instance-type         | k3s   | !v1.17         |
| beta.kubernetes.io/os                    | linux | !v1.14, -v1.18 |
| failure-domain.beta.kubernetes.io/region |       | !v1.17         |
| failure-domain.beta.kubernetes.io/zone   |       | !v1.17         |

## 资源标签

| kind         | annotation                                  | demo | desc              |
| ------------ | ------------------------------------------- | ---- | ----------------- |
| StorageClass | storageclass.kubernetes.io/is-default-class | true | 默认 StorageClass |

## 应用标签

- [Recommanded Lables](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/)
- [Helm Labels](https://helm.sh/docs/chart_best_practices/labels/)

| label                        | example      |
| ---------------------------- | ------------ |
| app.kubernetes.io/name       | `mysql`      |
| app.kubernetes.io/instance   | `mysql-abcd` |
| app.kubernetes.io/version    | `5.7`        |
| app.kubernetes.io/component  | `database`   |
| app.kubernetes.io/part-of    | `ghost`      |
| app.kubernetes.io/managed-by | `helm`       |

```yaml
podAntiAffinity:
  preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      podAffinityTerm:
        labelSelector:
          matchLabels:
            app.kubernetes.io/component: prometheus
            app.kubernetes.io/instance: kube-prometheus
            app.kubernetes.io/name: kube-prometheus
        topologyKey: kubernetes.io/hostname
```

## Helm 标签

| label                        | example |
| ---------------------------- | ------- |
| app.kubernetes.io/managed-by | Helm    |

```yaml
# 资源 label
labels:
  app.kubernetes.io/component: controller
  app.kubernetes.io/instance: ingress-nginx
  app.kubernetes.io/managed-by: Helm
  app.kubernetes.io/name: ingress-nginx
  app.kubernetes.io/version: 0.35.0
  helm.sh/chart: ingress-nginx-2.16.0

# selector label
matchLabels:
  app.kubernetes.io/component: controller
  app.kubernetes.io/instance: ingress-nginx
  app.kubernetes.io/name: ingress-nginx
```

## Helm 注解

| annotation                     | value    | desc |
| ------------------------------ | -------- | ---- |
| meta.helm.sh/release-name      | linkerd2 |
| meta.helm.sh/release-namespace | linkerd  |
