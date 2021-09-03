---
title: Dapr Kubernetes
---

# Dapr Kubernetes

- 参考
  - helm [charts/dapr](https://github.com/dapr/dapr/blob/master/charts/dapr)

## 组件

- dapr-operator - 组件部署
- dapr-sidecar-injector - 注入 sidecar
- dapr-placement - actor instance -> Pod
- dapr-sentry - mTLS, CA

**生产资源建议**

| Component        | CPU      | Memory      |
| ---------------- | -------- | ----------- |
| Operator         | 1/100m   | 200Mi/100Mi |
| Sidecar Injector | 1/100m   | 200Mi/30Mi  |
| Sentry           | 1/100m   | 200Mi/30Mi  |
| Placement        | 1/250m   | 150Mi/75Mi  |
| Dashboard        | 200m/50m | 200Mi/20Mi  |

## annotations

- [Kubernetes pod annotations](https://docs.dapr.io/operations/hosting/kubernetes/kubernetes-annotations/)

```yaml
annotations:
  dapr.io/enabled: 'true'
  dapr.io/app-id: 'nodeapp'
  dapr.io/app-port: '3000'
  # 配置 CDR 名字
  dapr.io/config: 'tracing'

  # debug, info, warn, error
  dapr.io/log-level: 'info'
  dapr.io/log-as-json: 'false'
  # port 7777
  dapr.io/enable-profiling: 'false'
  # token based API authentication
  dapr.io/api-token-secret: ''
  # grpc, http
  dapr.io/app-protocol: 'http'
  # 最大并发数限制
  dapr.io/app-max-concurrency: ''
  # insecure SSL
  dapr.io/app-ssl: 'false'
  dapr.io/metrics-port: '9090'

  dapr.io/sidecar-cpu: ''
  dapr.io/sidecar-memory: ''
  dapr.io/sidecar-cpu-request: ''
  dapr.io/sidecar-memory-request: ''

  dapr.io/sidecar-liveness-probe-delay-seconds: '3'
  dapr.io/sidecar-liveness-probe-timeout-seconds: '3'
  dapr.io/sidecar-liveness-probe-period-seconds: '6'
  dapr.io/sidecar-liveness-probe-threshold: '3'
  dapr.io/sidecar-readiness-probe-delay-seconds: '3'
  dapr.io/sidecar-readiness-probe-timeout-seconds: '3'
  dapr.io/sidecar-readiness-probe-period-seconds: '6'
  dapr.io/sidecar-readiness-probe-threshold: '3'

  # 请求体大小 - 单位 MB
  dapr.io/http-max-request-size: '4'
  # 额外的环境变量，逗号分割 key=value
  dapr.io/env: ''
```
