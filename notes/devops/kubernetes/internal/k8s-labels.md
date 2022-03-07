---
title: Kubernetes 标签
---

# Kubernetes 标签

- https://kubernetes.io/docs/reference/kubernetes-api/labels-annotations-taints

## 节点标签

- kubernetes.io/ingress.class

| label                                 | demo      | desc        |
| ------------------------------------- | --------- | ----------- |
| k3s.io/hostname                       | node-3    |
| k3s.io/internal-ip                    | 10.10.1.1 |
| kubernetes.io/arch                    | amd64     | +v1.14      |
| kubernetes.io/hostname                | node-3    |
| kubernetes.io/os                      | linux     | +v1.14      |
| node-role.kubernetes.io/`<role>`      | true      |
| node-role.kubernetes.io/master        | true      | Master node |
| node-role.kubernetes.io/control-plane | true      | cp          |
| node.kubernetes.io/instance-type      | k3s       |
| topology.kubernetes.io/region         |           | +v1.17      |
| topology.kubernetes.io/zone           |           | +v1.17      |

```bash
# 设置 node role 为 worker
# role 名字任意
# value 不重要，主要是存在该 label
kubectl label node node-2 node-role.kubernetes.io/worker=true
# 规划 region 和 zone
kubectl label node master-1 topology.kubernetes.io/region=sh
kubectl label node master-1 topology.kubernetes.io/zone=sh-dc1
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

| kind                | annotation                                      | demo  | desc                           |
| ------------------- | ----------------------------------------------- | ----- | ------------------------------ |
| Namespace           | kubernetes.io/metadata.name                     |       | namespace 的名字               |
| StorageClass        | storageclass.kubernetes.io/is-default-class     | true  | 默认 StorageClass              |
| VolumeSnapshotClass | snapshot.storage.kubernetes.io/is-default-class | true  |
| Ingress             | kubernetes.io/ingress.class                     | nginx | **废弃**,spec.ingressClassName |

```bash
kubectl get storageclass

# 取消 sc 的默认值
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
# 设置默认
kubectl patch storageclass longhorn -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

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

# FAQ

## region vs zone

- region - 区域
  - 地区/zone 集合
  - 同区域 高带宽、低延迟
- zone - 可用区 `<region>-<zone>`
  - us-central1
  - us-central1-a - zone 内区域
- https://cloud.google.com/compute/docs/regions-zones
- https://kubernetes.io/docs/setup/best-practices/multiple-zones/
