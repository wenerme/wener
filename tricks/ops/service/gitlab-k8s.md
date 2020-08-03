---
id: gitlab-k8s
title: GitLab K8S 集成
---

# GitLab K8S

* 问题
  * 集成 Helm 3 [#29037](https://gitlab.com/gitlab-org/gitlab/issues/29037)
    * [Support Helm 3](https://gitlab.com/groups/gitlab-org/charts/-/epics/1)
    * [#2121](https://gitlab.com/gitlab-org/charts/gitlab/-/issues/2121) KOTS 集成
  * 部署到 istio [gitlab-org/charts#743](https://gitlab.com/gitlab-org/charts/gitlab/issues/743)
  * 使用现有的 Knative [#27173](https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/27173)
  * [#41614](https://gitlab.com/gitlab-org/gitlab/issues/20556) - Kubernetes cluster integration shall only install Helm Tiller or Ingress if not available already
    * 如果集群里已经有 Tiller 再次安装会有问题
* 注意
  * k8s 空间为 gitlab-managed-apps
  * 安装 tiller 需要修改镜像 - 默认是 gcr.io
  * 安装器是使用的 registry.gitlab.com/gitlab-org/cluster-integration 下面的镜像

```bash
# 修改 namespace 为 gitlab-managed-apps
kubectl config set-context --current --namespace=gitlab-managed-apps

# tiller 可能会部署失败 - 如果没有修改过镜像 - 默认是 gcr 镜像 - 可以考虑修改镜像
kubectl edit $(kubectl get pods -o name | grep tiller-deploy)
```

## 安装参数

```bash
# 拷贝 API - sed 用于移除颜色
kubectl cluster-info | grep 'Kubernetes master' | awk '/http/ {print $NF}' | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" | pbcopy
# 拷贝 CA Cert
kubectl get secret default-token-gt956  -o jsonpath="{['data']['ca\.crt']}" | base64 --decode | pbcopy
# 创建账号
kubectl apply -f- <<YAML
apiVersion: v1
kind: ServiceAccount
metadata:
  name: gitlab-admin
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: gitlab-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: gitlab-admin
  namespace: kube-system
YAML

# 拷贝 Token
kubectl -n kube-system get secret $(kubectl -n kube-system get secret | grep gitlab-admin-token | awk '{print $1}') -o jsonpath='{.data.token}' | base64 --decode | pbcopy
```

## FAQ
### 常见安装问题
* Helm 安装失败
  * __给 default 空间去掉 istio 注入标签__ - `istio-injection`
  * 安装失败 [cluster-integration/helm-install-image#3](https://gitlab.com/gitlab-org/cluster-integration/helm-install-image/issues/3) - is not a valid chart repository or cannot be reached
  * epics [#1202](https://gitlab.com/groups/gitlab-org/-/epics/1202#note_163944373) - Make all GitLab K8s/Auto DevOps/Serverless features compatible with Cloud Run

```bash
# hostname 为 install/uninstall-服务名
# 证书和配置目录
cd /data/helm/$(hostname|cut -d- -f2)/config
# 验证 helm 是通的
helm version --tls --tls-ca-cert ca.pem --tls-cert cert.pem --tls-key
 key.pem
```

#### Error: Could not get apiVersions from Kubernetes: unable to retrieve the complete list of server APIs: custom.metrics.k8s.io/v1beta1: the server is currently unable to handle the request

```bash
# API 异常
kubectl get apiservice
# v1beta1.custom.metrics.k8s.io               knative-serving/autoscaler          False (MissingEndpoints)   13h

kubectl get apiservice v1beta1.custom.metrics.k8s.io -o yaml
# endpoints for service/autoscaler in "knative-serving" have no addresses with port name "custom-metrics"

# 将该 api 删除后再从新操作即可
kubectl delete apiservice v1beta1.custom.metrics.k8s.io
```
#### Containers with unready status: [autoscaler] / Containers with unready status: [activator]
* [knative/serving#4407](https://github.com/knative/serving/issues/4407)

```bash
# 会发现 autoscaler 和 activator 状态不正常
kubectl -n knative-serving get pods

pod=$(kubectl -n knative-serving get pods -o name | grep autoscaler- | head -1)

```

__activator__ 错误信息

* 应该是与 autoscaler 建立 websoket 失败
* 如果 autoscaler 失败那么 activator 也会失败

```json
{"level":"error","ts":"2019-11-30T06:15:36.850Z","logger":"activator","caller":"websocket/connection.go:158","msg":"Failed to send ping message","knative.dev/controller":"activator","error":"connection has not yet been established","stacktrace":"github.com/knative/serving/vendor/github.com/knative/pkg/websocket.NewDurableConnection.func3\n\t/home/prow/go/src/github.com/knative/serving/vendor/github.com/knative/pkg/websocket/connection.go:158"}
```

#### Neither --kubeconfig nor --master was specified.  Using the inClusterConfig.  This might not work. 
* knative 容器启动的时候可能有这个异常信息

#### pod is not yet backed by activator, cannot scale to zero


### Ingress 和 Knative Endpoint 一直等待
* 是因为 LoadBalancer 没有获取到 IP
* 如果是私有集群，需要考虑使用 metallb 来实现 LoadBalancer 控制器


```bash
# gitlab knative
kubectl get service --namespace=gitlab-managed-apps ingress-nginx-ingress-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

# istio/knative
kubectl get svc --namespace=istio-system knative-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

# all
kubectl get svc --all-namespaces -o jsonpath='{range.items[?(@.status.loadBalancer.ingress)]}{.status.loadBalancer.ingress[*].ip}'
```

### 删除集成

```bash
# 移除空间
kubectl delete all --all -n gitlab-managed-apps
# 删除账号
kubectl delete sa gitlab gitlab-admin -n kube-system
kubectl delete ClusterRoleBinding gitlab-admin
# 删除 Token
# kubectl delete Secret gitlab-token

# tiller 
kubectl delete sa tiller -n kube-system
kubectl delete ClusterRoleBinding tiller-admin
```

### 手动安装 Helm
```bash
export TILLER_NAMESPACE=gitlab-managed-apps
export HELM_VERSION=2.16.1
# 导出证书
mkdir gitlab-tiller
for i in ca cert key; do kubectl -n gitlab-managed-apps get cm values-content-configuration-helm -o jsonpath="{.data.$i\.pem}" > gitlab-tiller/$i.pem ;done

# 创建账号
kubectl -n gitlab-managed-apps create serviceaccount tiller
# 绑定权限
kubectl create clusterrolebinding tiller-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=gitlab-managed-apps:tiller

# 手动安装
helm init --tiller-tls --tiller-tls-verify --tls-ca-cert gitlab-tiller/ca.pem --tiller-tls-cert gitlab-tiller/cert.pem --tiller-tls-key gitlab-tiller/key.pem --service-account tiller
# 空间下 helm 相关资源
kubectl get all -l app=helm
# 验证
helm version --tls --tls-verify --tls-ca-cert gitlab-tiller/ca.pem --tls-cert gitlab-tiller/cert.pem --tls-key gitlab-tiller/key.pem 

# 安装后 tiller-deploy 的证书位于 /etc/certs
# /helm version --tls --tls-verify --tls-ca-cert /etc/certs/ca.crt --tls-cert /etc/certs/tls.crt --tls-key /etc/certs/tls.key --host 

# 删除 Helm 相关资源
kubectl delete all -l app=helm
```

### install-helm
* [cluster-integration/helm-install-image](https://gitlab.com/gitlab-org/cluster-integration/helm-install-image)

```bash
set -xeo pipefail
helm init --tiller-tls --tiller-tls-verify --tls-ca-cert /data/helm/helm/config/ca.pem --tiller-tls-cert /data/helm/helm/config/cert.pem --tiller-tls-key /data/helm/helm/config/key.pem --service-account tiller
```

### uninstall-helm

```bash
set -xeo pipefail
helm reset --tls --tls-ca-cert /data/helm/helm/config/ca.pem --tls-cert /data/helm/helm/config/cert.pem --tls-key /data/helm/helm/config/key.pem
kubectl delete replicaset -n gitlab-managed-apps -l name\=tiller
kubectl delete clusterrolebinding tiller-admin
```

### install-knative

```bash
set -xeo pipefail
helm init --upgrade
for i in $(seq 1 30); do helm version --tls --tls-ca-cert /data/helm/knative/config/ca.pem --tls-cert /data/helm/knative/config/cert.pem --tls-key /data/helm/knative/config/key.pem && s=0 && break || s=$?; sleep 1s; echo "Retrying ($i)..."; done; (exit $s)
helm repo add knative https://storage.googleapis.com/triggermesh-charts
helm repo update
helm upgrade knative knative/knative --install --reset-values --tls --tls-ca-cert /data/helm/knative/config/ca.pem --tls-cert /data/helm/knative/config/cert.pem --tls-key /data/helm/knative/config/key.pem --version 0.7.0 --set rbac.create\=true,rbac.enabled\=true --namespace gitlab-managed-apps -f /data/helm/knative/config/values.yaml
```

__value.yaml__

```yaml
domain: knative.wener.me
```

### install-prometheus

```bash
set -xeo pipefail
helm init --upgrade
for i in $(seq 1 30); do helm version --tls --tls-ca-cert /data/helm/prometheus/config/ca.pem --tls-cert /data/helm/prometheus/config/cert.pem --tls-key /data/helm/prometheus/config/key.pem && s=0 && break || s=$?; sleep 1s; echo "Retrying ($i)..."; done; (exit $s)
helm repo update
helm upgrade prometheus stable/prometheus --install --reset-values --tls --tls-ca-cert /data/helm/prometheus/config/ca.pem --tls-cert /data/helm/prometheus/config/cert.pem --tls-key /data/helm/prometheus/config/key.pem --version 6.7.3 --set rbac.create\=true,rbac.enabled\=true --namespace gitlab-managed-apps -f /data/helm/prometheus/config/values.yaml
```

__values.yaml__

```yaml
alertmanager:
  enabled: false
  image:
    tag: v0.15.2

kubeStateMetrics:
  enabled: true

nodeExporter:
  enabled: false

pushgateway:
  enabled: false

server:
  fullnameOverride: "prometheus-prometheus-server"
  image:
    tag: v2.4.3

serverFiles:
  alerts: {}
  rules: {}

  prometheus.yml:
    rule_files:
      - /etc/config/rules
      - /etc/config/alerts
    scrape_configs:
      - job_name: prometheus
        static_configs:
          - targets:
            - localhost:9090
      - job_name: kubernetes-cadvisor
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        kubernetes_sd_configs:
          - role: node
        relabel_configs:
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
          - target_label: __address__
            replacement: kubernetes.default.svc:443
          - source_labels:
            - __meta_kubernetes_node_name
            regex: "(.+)"
            target_label: __metrics_path__
            replacement: "/api/v1/nodes/${1}/proxy/metrics/cadvisor"
        metric_relabel_configs:
          - source_labels:
            - pod_name
            target_label: environment
            regex: "(.+)-.+-.+"
      - job_name: 'kubernetes-service-endpoints'
        kubernetes_sd_configs:
          - role: endpoints
        relabel_configs:
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
            action: replace
            target_label: __scheme__
            regex: (https?)
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
            action: replace
            target_label: __address__
            regex: (.+)(?::\d+);(\d+)
            replacement: $1:$2
          - action: labelmap
            regex: __meta_kubernetes_service_label_(.+)
          - source_labels: [__meta_kubernetes_namespace]
            action: replace
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_service_name]
            action: replace
            target_label: kubernetes_name
      - job_name: kubernetes-nodes
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        kubernetes_sd_configs:
          - role: node
        relabel_configs:
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
          - target_label: __address__
            replacement: kubernetes.default.svc:443
          - source_labels:
            - __meta_kubernetes_node_name
            regex: "(.+)"
            target_label: __metrics_path__
            replacement: "/api/v1/nodes/${1}/proxy/metrics"
        metric_relabel_configs:
          - source_labels:
            - pod_name
            target_label: environment
            regex: "(.+)-.+-.+"
      - job_name: kubernetes-pods
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels:
            - __meta_kubernetes_pod_annotation_prometheus_io_scrape
            action: keep
            regex: 'true'
          - source_labels:
            - __meta_kubernetes_pod_annotation_prometheus_io_path
            action: replace
            target_label: __metrics_path__
            regex: "(.+)"
          - source_labels:
            - __address__
            - __meta_kubernetes_pod_annotation_prometheus_io_port
            action: replace
            regex: "([^:]+)(?::[0-9]+)?;([0-9]+)"
            replacement: "$1:$2"
            target_label: __address__
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - source_labels:
            - __meta_kubernetes_namespace
            action: replace
            target_label: kubernetes_namespace
          - source_labels:
            - __meta_kubernetes_pod_name
            action: replace
            target_label: kubernetes_pod_name
      # Sourced from Knative monitoring config: https://github.com/knative/serving/blob/master/config/monitoring/metrics/prometheus/100-prometheus-scrape-config.yaml
      - job_name: autoscaler
        scrape_interval: 3s
        scrape_timeout: 3s
        kubernetes_sd_configs:
        - role: pod
        relabel_configs:
        # Scrape only the the targets matching the following metadata
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_pod_label_app, __meta_kubernetes_pod_container_port_name]
          action: keep
          regex: knative-serving;autoscaler;metrics
        # Rename metadata labels to be reader friendly
        - source_labels: [__meta_kubernetes_namespace]
          target_label: namespace
        - source_labels: [__meta_kubernetes_pod_name]
          target_label: pod
        - source_labels: [__meta_kubernetes_service_name]
          target_label: service
      - job_name: activator
        scrape_interval: 3s
        scrape_timeout: 3s
        kubernetes_sd_configs:
        - role: pod
        relabel_configs:
        # Scrape only the the targets matching the following metadata
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_pod_label_app, __meta_kubernetes_pod_container_port_name]
          action: keep
          regex: knative-serving;activator;metrics-port
        # Rename metadata labels to be reader friendly
        - source_labels: [__meta_kubernetes_namespace]
          target_label: namespace
        - source_labels: [__meta_kubernetes_pod_name]
          target_label: pod
        - source_labels: [__meta_kubernetes_service_name]
          target_label: service
      # Istio mesh
      - job_name: istio-mesh
        scrape_interval: 5s
        kubernetes_sd_configs:
        - role: endpoints
        relabel_configs:
        # Scrape only the the targets matching the following metadata
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: istio-system;istio-telemetry;prometheus
        # Rename metadata labels to be reader friendly
        - source_labels: [__meta_kubernetes_namespace]
          target_label: namespace
        - source_labels: [__meta_kubernetes_pod_name]
          target_label: pod
        - source_labels: [__meta_kubernetes_service_name]
          target_label: service
      - job_name: istio-policy
        scrape_interval: 5s
        kubernetes_sd_configs:
        - role: endpoints
        relabel_configs:
        # Scrape only the the targets matching the following metadata
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: istio-system;istio-policy;http-monitoring
        # Rename metadata labels to be reader friendly
        - source_labels: [__meta_kubernetes_namespace]
          target_label: namespace
        - source_labels: [__meta_kubernetes_pod_name]
          target_label: pod
        - source_labels: [__meta_kubernetes_service_name]
          target_label: service
      # Istio telemetry
      - job_name: istio-telemetry
        scrape_interval: 5s
        kubernetes_sd_configs:
        - role: endpoints
        relabel_configs:
        # Scrape only the the targets matching the following metadata
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: istio-system;istio-telemetry;http-monitoring
        # Rename metadata labels to be reader friendly
        - source_labels: [__meta_kubernetes_namespace]
          target_label: namespace
        - source_labels: [__meta_kubernetes_pod_name]
          target_label: pod
        - source_labels: [__meta_kubernetes_service_name]
          target_label: service
      # Istio pilot
      - job_name: istio-pilot
        scrape_interval: 5s
        kubernetes_sd_configs:
        - role: endpoints
        relabel_configs:
        # Scrape only the the targets matching the following metadata
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: istio-system;istio-pilot;http-monitoring
        # Rename metadata labels to be reader friendly
        - source_labels: [__meta_kubernetes_namespace]
          target_label: namespace
        - source_labels: [__meta_kubernetes_pod_name]
          target_label: pod
        - source_labels: [__meta_kubernetes_service_name]
          target_label: service

```

## node pages

```yaml
image: node

before_script:
  - npm install

cache:
  paths:
    - node_modules/

pages:
  script:
    - npm run generate
  artifacts:
    paths:
      - public
  only:
    - master
```
