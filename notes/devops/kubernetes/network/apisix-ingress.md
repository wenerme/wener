---
title: Apisix Ingress
---

# Apisix Ingress

- Helm
  - https://charts.apiseven.com apisix
    - apisix 依赖 apisix-dashboard, apisix-ingress-controller, etcd
    - https://apache.github.io/apisix-helm-chart/
    - [apache/apisix-helm-chart](https://github.com/apache/apisix-helm-chart)
  - https://charts.bitnami.com/bitnami etcd
- https://apisix.apache.org/docs/ingress-controller/getting-started/
- v2
  - https://apisix.apache.org/docs/ingress-controller/next/references/v2/
  - ApisixGlobalRule
    - https://github.com/apache/apisix-ingress-controller/issues/1104

## IngressController

- ApisixRoute
- ApisixUpstream
  - 名字与 service 名字相同会自动匹配
- ApisixTls
- ApisixClusterConfig
  - 配置 prometheus、skywalking
- ApisixConsumer
- ApisixPluginConfig
  - ingress 通过 annotation 引用 `k8s.apisix.apache.org/plugin-config-name: "echo-and-cors-apc"`

```yaml
apiVersion: apisix.apache.org/v2beta3
kind: ApisixRoute
metadata:
  name: httpbin-route
spec:
  http:
    - name: rule1
      match:
        hosts:
          - httpbin.com
        paths:
          - /ip
      backends:
        - serviceName: httpbin-service-e2e-test
          servicePort: 80
```

```yaml
annotations:
  k8s.apisix.apache.org/enable-cors: "true"
  k8s.apisix.apache.org/cors-allow-origin: "https://foo.com,http://bar.com:8080"
  k8s.apisix.apache.org/cors-allow-headers: "Host: https://bar.com:8080"
  k8s.apisix.apache.org/cors-allow-methods: "GET,POST"
  k8s.apisix.apache.org/allowlist-source-range: "10.0.5.0/16,127.0.0.1,192.168.3.98"
  k8s.apisix.apache.org/blocklist-source-range: "127.0.0.1,172.17.0.0/16"
  k8s.apisix.apache.org/http-allow-methods: "GET,POST"
  k8s.apisix.apache.org/http-block-method: "PUT,DELETE"
  k8s.apisix.apache.org/rewrite-target-regex: "/app/(.*)"
  k8s.apisix.apache.org/rewrite-target-regex-template: "/$1"
  k8s.apisix.apache.org/http-to-https: "true"
  k8s.apisix.apache.org/use-regex: "true"
  k8s.apisix.apache.org/enable-websocket: "true"
  k8s.apisix.apache.org/enable-response-rewrite: "true"
  k8s.apisix.apache.org/response-rewrite-status-code: "404"
  k8s.apisix.apache.org/response-rewrite-body: "bar-body"
  k8s.apisix.apache.org/response-rewrite-body-base64: "true"
  # 可以通过 Prefix 路由
  # path: /helloworld.Greeter/SayHello
  k8s.apisix.apache.org/upstream-scheme: grpcs
  # 跨 namespace 引用
  k8s.apisix.apache.org/svc-namespace: test
```
