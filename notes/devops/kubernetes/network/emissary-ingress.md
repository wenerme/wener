---
title: emissary-ingress
---

# emissary-ingress

- [emissary-ingress/emissary](https://github.com/emissary-ingress/emissary)
  - Apache-2.0, Go+Python
  - API Gateway + Layer 7 LB + Kubernetes Ingress
  - Envoy Proxy
  - 之前为 Ambassador API Gateway
  - 支持 Kubernetest Ingress 和 Gateway API
  - 很多 CDR 供自定义服务
- 参考
  - [vs. Others](https://www.getambassador.io/docs/emissary/latest/about/alternatives/)
  - vs. Ambassador Edge Stack
    - Edge Stack 的核心 - 作为了 CNCF 孵化项目
- 功能
  - 路由 - Ingress, Gateway API
  - 安全 - AuthService, RateLimitService
  - 监控 - TracingService
    - tracing
  - 统计 - statd, /metrics
  - 集成 - Knative, Istio, Linkerd2, Consul

## CDR

- getambassador.io/v3alpha1
- Host - 可访问入口 Hostname
- Listener - 定义监听方式
- Mapping - HTTP 映射到 Host
- TCPMappings
- Module - 系统纬度配置
- 服务发现
  - KubernetesServiceResolver
  - KubernetesEndpointResolver
  - ConsulResolver
- 插件
  - AuthService - 只能定义一个
    - Ambassador 内使用 External, Filter
  - LogService
  - RateLimitService
  - TracingService
    - lightstep, zipkin, datadog

```yaml
apiVersion: getambassador.io/v3alpha1
kind: Host
metadata:
  name: minimal-host
spec:
  # 支持 *.example.com, host.example.*
  hostname: host.example.com
  # 选择 Mapping
  mappingSelector:
    matchLabels:
      examplehost: host
  acmeProvider:
    authority: none
    email: julian@example.com
  tlsSecret:
    name: tls-cert
  requestPolicy:
    insecure:
      # Redirect, Route, Reject
      # 默认 HTTP 会跳转 HTTPS
      action: Redirect
      additionalPort: 8080
---
apiVersion: getambassador.io/v3alpha1
kind: TLSContext
metadata:
  name: upstream-context
spec:
  hosts: []
  secret: upstream-certs
  # self-signed
  # secret: self-signed-cert
  min_tls_version: v1.3
  sni: some-sni-hostname
---
apiVersion: getambassador.io/v3alpha1
kind: Mapping
metadata:
  name: mapping-with-label-match
  labels:
    examplehost: host
spec:
  # 可以配置 hostname 选择 Host
  hostname: '*.example.com'
  prefix: /httpbin/
  service: http://httpbin.org
  host_rewrite: httpbin.org
  tls: upstream-context

---
apiVersion: getambassador.io/v3alpha1
kind: Listener
metadata:
  name: example-listener
spec:
  port: 8080
  protocol: HTTPS # HTTP, HTTPS, HTTPPROXY, HTTPSPROXY, TCP
  protocolStack: [HTTP, TCP]
  securityModel: XFP # XFP (for X-Forwarded-Proto), SECURE, INSECURE
  statsPrefix: example-listener # default depends on protocol
  l7Depth: 0
  hostBinding:
    namespace:
      from: SELF # SELF, ALL
    selector: ... # Kubernetes label selector

---
apiVersion: getambassador.io/v3alpha1
kind: AuthService
metadata:
  name: authentication
spec:
  ambassador_id: ['ambassador-1']
  auth_service: 'example-auth.authentication:3000'
  tls: true
  proto: http
  timeout_ms: 5000
  include_body:
    max_bytes: 4096
    allow_partial: true
  status_on_error:
    code: 403
  failure_mode_allow: false

  # proto: grpc only
  protocol_version: v2

  # proto: http only
  path_prefix: '/path'
  allowed_request_headers:
    - 'x-example-header'
  allowed_authorization_headers:
    - 'x-qotm-session'
  add_auth_headers:
    x-added-auth: auth-added
  add_linkerd_headers: false
```

## Module

```yaml
apiVersion: getambassador.io/v3alpha1
kind: Module
metadata:
  name: ambassador
spec:
  config:
    grpc_stats:
      upstream_stats: true
      services:
        - name: <package>.<service>
          method_names: [<method>]
```
