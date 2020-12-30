---
id: app-cookbook
title: K8S Apps
---

## debug

```bash
kubectl get pod -w --all-namespaces
kubectl get events -w --all-namespaces

source <(kubectl completion bash)
source <(helm completion bash)
```

## helm

```bash
# alpine 3.12 安装 helm
apk add helm -X https://mirrors.aliyun.com/alpine/edge/testing/

# K3S
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

helm repo add wener https://charts.wener.tech
helm search repo wener/

# 补全
source <(helm completion bash)
```

## metallb

```bash
# registry 默认写了 docker.io
cat <<YAML > metallb.values.yaml
controller:
  image:
    registry: docker.mirrors.ustc.edu.cn
speaker:
  image:
    registry: docker.mirrors.ustc.edu.cn
configInline:
  address-pools:
  - name: default
    protocol: layer2
    # default address space
    addresses:
    - 10.10.128.0/18
YAML

helm upgrade -i metallb wener/metallb -n metallb-system --create-namespace -f metallb.values.yaml
```

## cert-manager

```bash
# direct install crd
cat <<YAML > cert-manager.values.yaml
installCRDs: true
YAML

helm upgrade -i cert-manager wener/cert-manager -n cert-manager --create-namespace -f cert-manager.values.yaml
```

## ingress-nginx

```bash
# DaemonSet hostPort 80
cat <<YAML > ingress-nginx.values.yaml
config:
  hide-headers: "Server"
controller:
  image:
    # use mirror
    # k8s.gcr.io/ingress-nginx/controller
    repository: registry.cn-hongkong.aliyuncs.com/cmi/ingress-nginx_controller
    # disable digest
    digest: ""
  kind: DaemonSet
  hostPort:
    enabled: true
  metrics:
    enabled: false
    # kube-prometheus
    serviceMonitor:
      enabled: true
  prometheusRule:
    enabled: false
  admissionWebhooks:
    patch:
      image:
        repository: registry.cn-hongkong.aliyuncs.com/cmi/jettech_kube-webhook-certgen
YAML

helm upgrade -i ingress-nginx wener/ingress-nginx -n ingress-nginx --create-namespace -f ingress-nginx.values.yaml
```

## rancher

```bash

# latest
# helm repo add rancher https://releases.rancher.com/server-charts/latest
# stable
helm repo add rancher https://releases.rancher.com/server-charts/stable

# https://rancher.com/docs/rancher/v2.x/en/installation/resources/chart-options
cat <<YAML > rancher.values.yaml
hostname: rancher.my.corp

# use cert-manager
# privateCA: true
# rancher mirror
systemDefaultRegistry: registry.cn-hangzhou.aliyuncs.com
# 1 for test only - default 3
replicas: 1
YAML

helm upgrade -i rancher rancher/rancher -n cattle-system --create-namespace -f rancher.values.yaml

# 查看安装状态
kubectl -n cattle-system rollout status deploy/rancher
# 验证安装
kubectl -n cattle-system get deploy rancher

# 转发访问 rancher
kubectl port-forward -n cattle-system svc/rancher --address 0.0.0.0 8080:80
```

