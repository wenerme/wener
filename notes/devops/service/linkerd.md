---
title: Linkerd
---

# Linkerd

- [linkerd/linkerd2](https://github.com/linkerd/linkerd2)
- 优势
  - linkerd2-proxy
    - 非常轻量快速
  - top/tap/routes
    - 已经包含了用于快速调试和检查流量的功能
  - prometheus/grafana - 内建集成
  - mTLS
- 劣势
  - linkerd2-proxy
    - 针对性开发 - 功能相对简单
    - 不能支持类似 envoy、nginx 之类的协议层基础功能
  - 不支持 Circuit Breaker
  - 不支持 Auth
  - CP 不能管理多集群
  - 不支持 Service-to-Service 授权
  - 不支持 Header 路由
    - [#3165](https://github.com/linkerd/linkerd2/issues/3165)
- 问题
  - [linkerd/linkerd2#3403](https://github.com/linkerd/linkerd2/issues/3403) - Injected nginx ingress controller doesn't have access to the remote client IP
  - [linkerd/linkerd2#2846](https://github.com/linkerd/linkerd2/issues/2846) - Circuit Breaker
  - [linkerd/linkerd2#3165](https://github.com/linkerd/linkerd2/issues/3165) - Header based routing
- 注意
  - linkerd2 相对较新，功能上可能还有缺失
  - Prometheus 可能会占用较多资源，可以使用外部实例 - [#2980](https://github.com/linkerd/linkerd2/issues/2980)
  - ECDSA 证书需要 P256
  - egress 支持不太好 - 只支持 HTTP
    - TCP 外部流量无法监控
    - [#3190](https://github.com/linkerd/linkerd2/issues/3190) - Egress HTTPS Metrics
    - [#2192](https://github.com/linkerd/linkerd2/issues/2192) - Monitoring outbound HTTPS external call
  - TCP 支持不好
    - ~~不支持 mTLS [#3207](https://github.com/linkerd/linkerd2/issues/3207)~~
    - ~~不支持 LB 和转发 [#3445](https://github.com/linkerd/linkerd2/issues/3445)~~
  - 注意 Ingress 远程 IP 问题
    - [#3403](https://github.com/linkerd/linkerd2/issues/3403)
    - 添加 annotations - `config.linkerd.io/skip-inbound-ports: '80,443'`
- [架构](https://linkerd.io/2/reference/architecture/)
  - 组件
    - cp
      - sp-validator - Service Profile Validator
        - admission controller
        - 当 service profile 保存的时候校验
      - destination
      - identity - CA, 接受代理的 CSR 请求
      - heartbeat
      - web
      - tap
        - 接受 cli 和 dashboard 请求监听代理的流量
      - proxy-injector
        - admission controller
        - 添加注入逻辑，使用 initContainer 初始化 iptables
      - grafana
      - prometheus
    - dp
      - proxy - linkerd2-proxy
      - linkerd-init
- Control Plane
  - [linkerd/linkerd2](https://github.com/linkerd/linkerd2)
- Dataplane
  - [linkerd/linkerd2-proxy](https://github.com/linkerd/linkerd2-proxy)
  - 无配置代理 - iptable 转发
  - /metrics
  - WebSocket 代理
  - 延时感知的 L7 负载均衡
  - L4 TCP 负载均衡
  - mtls
  - `tap` 诊断接口 - 类似 tcpdump 概念
- 特性
  - HTTP, HTTP/2, gRPC
  - TCP 代理和协议检测
  - 超时、重试
  - mtls
  - 不提供 Ingress，与现有 Ingress 共存
  - 指标监控
    - 为所有流量记录核心指标 - request volume, success rate, latency distributions
    - 记录 TCP 指标
    - 根据 Service Profile 记录请求、被请求指标
    - 生成拓扑图
    - 请求采样
    - 查看
      - `linkerd stat`, `linkerd routes`
      - dashboard -> Grafana
      - 内建 Prometheus 实例
        - 默认保留 6 小时
  - 负载均衡 - EWMA 算法 - exponentially weighted moving average
  - 自动注入 - `linkerd.io/inject: enabled`
    - admission webhook 实现
    - linkerd-init 配置 iptables
    - linkerd-proxy - dp
    - 添加 annotation 后需要 `kubectl rollout restart`
    - 主动禁用 `linkerd.io/inject: disabled`
  - CNI 插件
    - 使用了则不需要 linkerd-init 配置 iptables，会自动重写
  - 集成 grafana
  - 分布式跟踪
  - Fault Injection
  - ha cp
    - `linkerd install --ha --controller-replicas=2`
  - 跨集群通信
  - Service Profile
    - 提供额外接口信息
  - 流量切分
- `linkerd install`
  - 默认安装到 linkerd 空间
  - ClusterRole - `$NAMESPACE-linkerd-$COMPONENT`
    - linkerd-linkerd-identity
    - linkerd-linkerd-controller
    - linkerd-linkerd-destination
    - linkerd-linkerd-prometheus
    - linkerd-linkerd-proxy-injector
    - linkerd-linkerd-sp-validator
    - linkerd-linkerd-tap
  - linkerd-heartbeat
  - linkerd-web
  - crds
    - serviceprofiles.linkerd.io/v1alpha2
    - trafficsplits.split.smi-spec.io/v1alpha1
  - secret/linkerd-proxy-injector-tls
  - secret/linkerd-sp-validator-tls
  - secret/linkerd-tap-tls
  - cm/linkerd-config
  - cm/linkerd-config-addons
  - deploy/linkerd-identity
  - deploy/linkerd-controller
    - svc/linkerd-controller-api
  - deploy/linkerd-destination
    - svc/linkerd-dst
  - cronjob/linkerd-heartbeat
    - linkerd telemetry
  - deploy/linkerd-web
    - svc/linkerd-web
  - deploy/linkerd-prometheus
    - svc/linkerd-prometheus
    - cm/linkerd-prometheus-config
  - deploy/linkerd-proxy-injector
    - svc/linkerd-proxy-injector
  - deploy/linkerd-sp-validator
    - svc/linkerd-sp-validator
  - deploy/linkerd-tap
    - svc/linkerd-tap
  - deploy/linkerd-grafana
    - svc/linkerd-grafana
    - cm/linkerd-grafana-config
- 参考
  - [Linkerd v2: How Lessons from Production Adoption Resulted in a Rewrite of the Service Mesh](https://www.infoq.com/articles/linkerd-v2-production-adoption/)
- tls
  - secret/linkerd-identity-issuer
    - 包含了 issuer 证书
    - 如果 schema 为 kubernetes.io/tls 则需要 tls.crt, tls.key, ca.crt
    - 如果 schema 为 linkerd.io/tls 则需要 crt.pem, key.pem
  - secret/linkerd-trust-anchor

```bash
brew install linkerd

linkerd version
linkerd check --pre

linkerd install | kubectl apply -f -

linkerd check

kubectl -n linkerd get deploy

linkerd dashboard
linkerd -n linkerd top deploy/linkerd-web

# 注入
kubectl get -n emojivoto deploy -o yaml \
  | linkerd inject - \
  | kubectl apply -f -

# 卸载
linkerd install --ignore-cluster | kubectl delete -f -


# 注入空间
kubectl get ns monitoring -o yaml | linkerd inject - | kubectl apply -f -
# 重启后全部生效
kubectl rollout restart -n monitoring deployment
kubectl rollout restart -n monitoring daemonset
kubectl rollout restart -n monitoring statefulset

kubectl get ns kubernetes-dashboard -o yaml | linkerd inject - | kubectl apply -f -
kubectl rollout restart -n kubernetes-dashboard deployment
```

## 安装

```bash
# https://linkerd.io/2/reference/cli/install/
# --addon-config - 自定义配置
# --controller-replicas=1
# --disable-heartbeat
# --registry=gcr.io/linkerd-io 默认镜像仓库
# cmi - https://github.com/wenerme/container-mirror
linkerd install --disable-heartbeat --registry registry.cn-hongkong.aliyuncs.com/cmi

# 所有的镜像
linkerd install | grep 'image: ' | sed -r 's/\s*image:\s*(.*)/\1/' | sort -u

linkerd install | grep 'image: ' | sed -r 's/\s*image:\s*(.*)/\1/' | sort -u | xargs -n 1 -I {} echo A {} B
```

### Helm 安装

```bash
# 生成证书
brew install step

step certificate create identity.linkerd.cluster.local ca.crt ca.key --profile root-ca --no-password --insecure

step certificate create identity.linkerd.cluster.local issuer.crt issuer.key --ca ca.crt --ca-key ca.key --profile intermediate-ca --not-after 8760h --no-password --insecure

# Helm 安装
# https://linkerd.io/2/tasks/install-helm/
# helm repo add linkerd-edge https://helm.linkerd.io/edge
helm repo add linkerd https://helm.linkerd.io/stable

# set expiry date one year from now
# in Mac:
# exp=$(date -v+8760H +"%Y-%m-%dT%H:%M:%SZ")
# in Linux:
# exp=$(date -d '+8760 hour' +"%Y-%m-%dT%H:%M:%SZ")

# 如果有 CNI --set global.cniEnabled=true
# 默认安装到 linkerd 空间
# 自己提供 prometheus
# https://linkerd.io/2/tasks/external-prometheus/
# --set global.prometheusUrl: existing-prometheus.xyz:9090
helm install linkerd2 \
  --set-file global.identityTrustAnchorsPEM=ca.crt \
  --set-file identity.issuer.tls.crtPEM=issuer.crt \
  --set-file identity.issuer.tls.keyPEM=issuer.key \
  --set identity.issuer.crtExpiry=$(date -d '+8760 hour' +"%Y-%m-%dT%H:%M:%SZ") \
  --set installNamespace=false \
  --create-namespace \
  linkerd/linkerd2
```

## TLS 证书更新

- https://linkerd.io/2/tasks/automatically-rotating-control-plane-tls-credentials/

## 实验

```bash
cat <<YAML | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: alpine
  namespace: default
  annotations:
    linkerd.io/inject: enabled
spec:
  containers:
  - name: alpine
    image: wener/base
    command:
    - tail
    args:
    - -f
    - /dev/null
YAML
```

## Service Profile

- https://linkerd.io/2/reference/service-profiles/

```bash
# linkerd 内部的 sp 定义
linkerd install-sp

# 有 sp 信息的会附加 rt_route 到指标
linkerd tap -o wide <target> | grep req | grep -v rt_route


# 检测流量生成 profile
linkerd profile -n emojivoto web-svc --tap deploy/web --tap-duration 10s
# 通过 pb 生成
linkerd profile --proto web.proto web-svc
# 通过 swagger 生成
linkerd profile --open-api webapp.swagger webapp
```

```yaml
apiVersion: linkerd.io/v1alpha2
kind: ServiceProfile
metadata:
  name: nginx-demo.default.svc.cluster.local
  namespace: default
spec:
  routes:
    - name: me.wener.apis.test.PingService#ping
      condition:
        method: POST
        pathRegex: /api/service/me.wener.apis.test.PingService/ping
      isRetryable: true
      timeout: 3s
      responseClasses:
        - condition:
            not:
              status:
                min: 200
                max: 399
          isFailure: true
    - name: me.wener.apis.test.PingService
      condition:
        method: POST
        pathRegex: /api/service/me.wener.apis.test.PingService/.*
      isRetryable: false
  retryBudget:
    # 最多有 20% 被重试
    retryRatio: 0.2
    # 允许的每秒重试次数
    minRetriesPerSecond: 10
    # 计算 retryRatio 的时间窗口
    ttl: 10s
```

## ingress

- 注意
  - 会导致 nginx 的粘性会话无效

```yaml
# nginx annotation
nginx.ingress.kubernetes.io/configuration-snippet: |
  proxy_set_header l5d-dst-override $service_name.$namespace.svc.cluster.local:$service_port;
  grpc_set_header l5d-dst-override $service_name.$namespace.svc.cluster.local:$service_port;

# with auth url
nginx.ingress.kubernetes.io/auth-url: 'https://$host/oauth2/auth'
nginx.ingress.kubernetes.io/auth-signin: 'https://$host/oauth2/start?rd=$escaped_request_uri'
nginx.ingress.kubernetes.io/auth-snippet: |
  proxy_set_header l5d-dst-override $service_name.$namespace.svc.cluster.local:$service_port;
  grpc_set_header l5d-dst-override $service_name.$namespace.svc.cluster.local:$service_port;
```

## tracing

- [Distributed tracing with Linkerd](https://linkerd.io/2/tasks/distributed-tracing/)
- [Distributed tracing in the service mesh: four myths](https://linkerd.io/2019/08/09/service-mesh-distributed-tracing-myths/)
  - 并不需要跟踪 检测 监控、延时、吞吐
  - 并不需要跟踪 才知道服务之间的调用依赖关系
  - 想要知道时间片段里的调用关系必须要修改代码
- linkerd 有类似 tracing 的功能
  - tap
  - top
  - service profile
  - 服务拓扑
- 注意
  - Linkerd 使用 [openzipkin/b3-propagation](https://github.com/openzipkin/b3-propagation) 格式
  - `OpenCensus` 支持环境变量 `OC_AGENT_HOST=linkerd-collector.linkerd:55678`
  - 如果要使用 Tracing 则一定要对 Ingress 也开启，因为 Ingress 会创建最开始的 Span

```bash
cat << EOF >> config.yaml
tracing:
  enabled: true
EOF
# 部署
# linker-collector
# linkerd-jaeger
linkerd upgrade --addon-config config.yaml | kubectl apply -f -

kubectl -n linkerd rollout status deploy/linkerd-collector
kubectl -n linkerd rollout status deploy/linkerd-jaeger

# POD Annotation
# config.linkerd.io/trace-collector: linkerd-collector.linkerd:55678
# config.alpha.linkerd.io/trace-collector-service-account: linkerd-collector

# 设置环境变量支持
kubectl -n emojivoto set env --all deploy OC_AGENT_HOST=linkerd-collector.linkerd:55678

kubectl -n linkerd port-forward svc/linkerd-jaeger 16686
```

## 代理配置

- [Proxy Configuration](https://linkerd.io/2/reference/proxy-configuration/)

```yaml
spec:
  template:
    metadata:
      annotations:
        config.linkerd.io/proxy-cpu-limit: '1.5'
        config.linkerd.io/proxy-cpu-request: '0.2'
        config.linkerd.io/proxy-memory-limit: 2Gi
        config.linkerd.io/proxy-memory-request: 128Mi
```

## addons

- [Enabling Add-Ons](https://linkerd.io/2/tasks/enabling-addons/)

```yaml
tracing:
  enabled: true
  collector:
    resources:
      cpu:
        limit: 100m
        request: 10m
      memory:
        limit: 100Mi
        request: 50Mi
```

## linker1 配置

- dtabs - delegate tables — a backtracking, hierarchical, suffix-preserving routing language used by Finagle
- https://api.linkerd.io/head/linkerd/index.html

```yaml
# 名字 -> 地址
namers:
  # Consul 服务发现
  # /svc => /#/io.l5d.consul/dc1/prod;
  - kind: io.l5d.consul
    # 直接访问服务 - 如果访问 agent 则是 $HOST_IP:8500
    host: consul-server.consul
    port: 8500
    # token:
    includeTag: true
    useHealthCheck: false
    healthStatuses:
      - 'passing'
      - 'warning'
    setHost: true
    consistencyMode: stale
    # 通过 tag 关联权重
    weights:
      - tag: experimental
        weight: 0.1
      - tag: primary
        weight: 5.0

  # 重写
  # /svc => /#/rewrite
  - kind: io.l5d.rewrite
    prefix: /rewrite
    pattern: '/{service}/api'
    name: '/srv/{service}'
```

## 多集群

- Ingress 基于 Ambassador
