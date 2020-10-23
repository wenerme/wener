---
id: kubesphere
---

# kubesphere

- 是什么
  - 国产青云 开源的 kubesphere 管理平台
  - vs Rancher
    - UI 好看
    - 更偏向应用开发
    - 权限更细
- [kubesphere.io](https://kubesphere.io)
  - [kubesphere.com.cn](https://kubesphere.com.cn) - 中文
- 实现 mysql+redis+minio+openldap+redis+es

| Integration    | CPU       | Memory        | Impl          | Desc                            |
| -------------- | --------- | ------------- | ------------- | ------------------------------- |
| alerting       | 0.3 Core  | 300 MiB       |
| devops         | 0.47 Core | 8.6 G         | CI/CD Jinkins |
| logging        | 57 m      | 2.76 G        | Elasticsearch |
| metrics_server | 56 m      | 44.35 MiB     |               | HPA - Horizontal Pod Autoscaler |
| monitoring     |           | Request 400Mi | Prometheus    |
| openpitrix     | 2 Core    | 3.6 G         | openpitrix    | HELM/应用商店                   |
| servicemesh    | 0.3 Core  | 300 MiB       | Istio         |

```bash
# crd installer.kubesphere.io/v1alpha1
# kubesphere-system
# ServiceAccount ks-installer
# ClusterRole ks-installer
# Deployment ks-installer
#   https://hub.docker.com/layers/kubesphere/ks-installer
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/v3.0.0/deploy/kubesphere-installer.yaml
# 安装配置 - 可下载自行修改
# ClusterConfiguration installer.kubesphere.io/v1alpha1
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/v3.0.0/deploy/cluster-configuration.yaml
```
