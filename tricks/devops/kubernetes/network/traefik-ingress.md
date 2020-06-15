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

* 启动参数
  * `--global.checknewversion`
  * `--global.sendanonymoususage`
  * `--entryPoints.traefik.address=:9000`
  * `--entryPoints.web.address=:8000`
  * `--entryPoints.websecure.address=:8443`
  * `--api.dashboard=true`
  * `--ping=true`
  * `--providers.kubernetescrd`
  * `--providers.kubernetesingress`

```bash
helm repo add traefik https://containous.github.io/traefik-helm-chart
helm repo update
helm install traefik traefik/traefik

# 可安装在独立命名空间
kubectl create ns traefik
helm install --namespace=traefik \
    traefik traefik/traefik

# 转发 dashboard 到本地 9000
# 然后访问 http://localhost:9000/dashboard/
kubectl port-forward -n traefik $(kubectl get pods -n traefik --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000

# 可以配置一个 Ingress 然后即可通过域名访问
cat <<YAML
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: dashboard
  namespace: traefik
spec:
  entryPoints:
    - web
  routes:
    - match: Host(`traefik.localhost`) && (PathPrefix(`/dashboard`) || PathPrefix(`/api`))
      kind: Rule
      services:
        - name: api@internal
          kind: TraefikService
YAML
```

## IngressController
* [示例资源配置](https://github.com/containous/traefik/tree/v2.2/pkg/provider/kubernetes/ingress/fixtures)


## FAQ
### Cannot create service: subset not found


https://docs.traefik.io/routing/providers/kubernetes-ingress/

https://github.com/rancher/k3s/issues/1141




https://github.com/containous/traefik-helm-chart

https://docs.traefik.io/getting-started/install-traefik/#use-the-helm-chart

kubectl port-forward $(kubectl get pods --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000

ClusterRoleBinding

error syncing 'traefik/traefik'
handler svccontroller: Operation cannot be fulfilled on  "svccontroller": delaying object set, requeuing

INOTIFY_USR
