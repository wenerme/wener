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
- 默认 NodePort 30880 - admin/P@88w0rd
- 全套安装下来至少 16G+ - 因此服务器至少需要 48G/64G
- kubesphere-system
  - 安装 installer
- kubesphere-monitoring-system
- kubesphere-controls-system
- [kubesphere/ks-installer](https://github.com/kubesphere/ks-installer)
  - 安装 Kubesphere 的 Operator
  - 安装使用 Ansible

| Integration    | CPU       | Memory        | Impl                     | Desc                            |
| -------------- | --------- | ------------- | ------------------------ | ------------------------------- |
| alerting       | 0.3 Core  | 300 MiB       |
| auditing       |           |               | 审计日志 - 依赖 ES       | kubesphere-logging-system       |
| devops         | 0.47 Core | 8.6 G         | CI/CD Jinkins            | kubesphere-devops-system        |
| events         |           |               |                          | kubesphere-logging-system       |
| logging        | 57 m      | 2.76 G        | Elasticsearch, fluentbit |
| metrics_server | 56 m      | 44.35 MiB     |                          | HPA - Horizontal Pod Autoscaler |
| multicluster   |           |               |                          | 多集群管理                      |
| networkpolicy  |           |               |                          | 集群内网络隔离                  |
| notification   |           |               |                          | Email, WeChat Work, Slack       |
| monitoring     |           | Request 400Mi | Prometheus               |
| openpitrix     | 2 Core    | 3.6 G         | openpitrix               | HELM/应用商店                   |
| servicemesh    | 0.3 Core  | 300 MiB       | Istio                    |

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
# 上次的 jwtSecret kubectl -n kubesphere-system get cm kubesphere-config -o yaml | grep -v "apiVersion" | grep jwtSecret
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/v3.0.0/deploy/cluster-configuration.yaml

# 安装过程
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f
```

## 配置

- https://github.com/kubesphere/kubekey/blob/master/docs/config-example.md

```bash
apiVersion: installer.kubesphere.io/v1alpha1
kind: ClusterConfiguration
metadata:
  name: ks-installer
  namespace: kubesphere-system
  labels:
    version: v3.0.0
spec:
  persistence:
    storageClass: ""        # If there is not a default StorageClass in your cluster, you need to specify an existing StorageClass here.
  authentication:
    jwtSecret: ""           # Keep the jwtSecret consistent with the host cluster. Retrive the jwtSecret by executing "kubectl -n kubesphere-system get cm kubesphere-config -o yaml | grep -v "apiVersion" | grep jwtSecret" on the host cluster.
  etcd:
    monitoring: false       # Whether to enable etcd monitoring dashboard installation. You have to create a secret for etcd before you enable it.
    endpointIps: localhost  # etcd cluster EndpointIps, it can be a bunch of IPs here.
    port: 2379              # etcd port
    tlsEnable: true
  common:
    mysqlVolumeSize: 20Gi # MySQL PVC size.
    minioVolumeSize: 20Gi # Minio PVC size.
    etcdVolumeSize: 20Gi  # etcd PVC size.
    openldapVolumeSize: 2Gi   # openldap PVC size.
    redisVolumSize: 2Gi # Redis PVC size.
    es:   # Storage backend for logging, events and auditing.
      # elasticsearchMasterReplicas: 1   # total number of master nodes, it's not allowed to use even number
      # elasticsearchDataReplicas: 1     # total number of data nodes.
      elasticsearchMasterVolumeSize: 4Gi   # Volume size of Elasticsearch master nodes.
      elasticsearchDataVolumeSize: 20Gi    # Volume size of Elasticsearch data nodes.
      logMaxAge: 7                     # Log retention time in built-in Elasticsearch, it is 7 days by default.
      elkPrefix: logstash              # The string making up index names. The index name will be formatted as ks-<elk_prefix>-log.
      # 外部 Elasticsearch - 生产建议使用外部
      externalElasticsearchUrl: # The URL of external Elasticsearch
      externalElasticsearchPort: # The port of external Elasticsearch
  console:
    enableMultiLogin: true  # enable/disable multiple sing on, it allows an account can be used by different users at the same time.
    port: 30880
  alerting:                # (CPU: 0.3 Core, Memory: 300 MiB) Whether to install KubeSphere alerting system. It enables Users to customize alerting policies to send messages to receivers in time with different time intervals and alerting levels to choose from.
    enabled: false
  auditing:                # Whether to install KubeSphere audit log system. It provides a security-relevant chronological set of records，recording the sequence of activities happened in platform, initiated by different tenants.
    enabled: false
  devops:                  # (CPU: 0.47 Core, Memory: 8.6 G) Whether to install KubeSphere DevOps System. It provides out-of-box CI/CD system based on Jenkins, and automated workflow tools including Source-to-Image & Binary-to-Image.
    enabled: false
    jenkinsMemoryLim: 2Gi      # Jenkins memory limit.
    jenkinsMemoryReq: 1500Mi   # Jenkins memory request.
    jenkinsVolumeSize: 8Gi     # Jenkins volume size.
    jenkinsJavaOpts_Xms: 512m  # The following three fields are JVM parameters.
    jenkinsJavaOpts_Xmx: 512m
    jenkinsJavaOpts_MaxRAM: 2g
  events:                  # Whether to install KubeSphere events system. It provides a graphical web console for Kubernetes Events exporting, filtering and alerting in multi-tenant Kubernetes clusters.
    enabled: false
    ruler:
      enabled: true
      replicas: 2
  logging:                 # (CPU: 57 m, Memory: 2.76 G) Whether to install KubeSphere logging system. Flexible logging functions are provided for log query, collection and management in a unified console. Additional log collectors can be added, such as Elasticsearch, Kafka and Fluentd.
    enabled: false
    logsidecarReplicas: 2
  metrics_server:                    # (CPU: 56 m, Memory: 44.35 MiB) Whether to install metrics-server. IT enables HPA (Horizontal Pod Autoscaler).
    enabled: false
  monitoring:
    # prometheusReplicas: 1            # Prometheus replicas are responsible for monitoring different segments of data source and provide high availability as well.
    prometheusMemoryRequest: 400Mi   # Prometheus request memory.
    prometheusVolumeSize: 20Gi       # Prometheus PVC size.
    # alertmanagerReplicas: 1          # AlertManager Replicas.
  multicluster:
    clusterRole: none  # host | member | none  # You can install a solo cluster, or specify it as the role of host or member cluster.
  networkpolicy:       # Network policies allow network isolation within the same cluster, which means firewalls can be set up between certain instances (Pods).
    # Make sure that the CNI network plugin used by the cluster supports NetworkPolicy. There are a number of CNI network plugins that support NetworkPolicy, including Calico, Cilium, Kube-router, Romana and Weave Net.
    enabled: false
  notification:        # Email Notification support for the legacy alerting system, should be enabled/disabled together with the above alerting option.
    enabled: false
  openpitrix:          # (2 Core, 3.6 G) Whether to install KubeSphere Application Store. It provides an application store for Helm-based applications, and offer application lifecycle management.
    enabled: false
  servicemesh:         # (0.3 Core, 300 MiB) Whether to install KubeSphere Service Mesh (Istio-based). It provides fine-grained traffic management, observability and tracing, and offer visualization for traffic topology.
    enabled: false
```

## 卸载

- [scripts/kubesphere-delete.sh](https://github.com/kubesphere/ks-installer/blob/master/scripts/kubesphere-delete.sh)
- 会用到 helm

```bash
curl -LO https://raw.githubusercontent.com/kubesphere/ks-installer/master/scripts/kubesphere-delete.sh
chmod +x kubesphere-delete.sh

# alpine 3.12 安装 helm
apk add helm -X https://mirrors.aliyun.com/alpine/edge/testing/
# K3S
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

./kubesphere-delete.sh
```
