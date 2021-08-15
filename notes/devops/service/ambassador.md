---
title: Ambassador
---

# Ambassador

- API Gateway + Layer 7 load balancer + Kubernetes Ingress
- aes = Ambassador Edge Stack
- 特性
  - 可配合 Service Mesh - Consul, Linkerd, Istio
  - Ingress Controller for Kubernetes
    - K8S 集成 - Ingress, RBAC, CRD
    - 协议 - HTTP/1.0 and HTTP/1.1, HTTP/2, WebSockets, gRPC, gRPC-Web, TCP
    - TLS - V 1.1, v 1.2 (lookup), Server Name Indication (SNI), Set minimum TLS version
    - CORS
  - Edge Management
    - Self-Service Edge Policies - Global policies, Edge policy console UI, CRD-based configuration
    - Observability - Prometheus, StatsD
    - Tracing - Zipkin, Lightstep, Jaeger, Datadog APM
  - Traffic Management
    - LB - Round robin, Sticky sessions, Least request
    - Availability - Load shedding, Circuit breaking, Timeouts, Automatic retries
    - Progressive Delivery - Canary releases, Traffic shadowing
  - Service Mesh
    - Integrations - Istio, Linkerd, Consul
    - Multi-cluster - Linkerd
- 开源版缺失功能
  - 安全和认证
    - OAuth/OpenID、JWT
    - Rate Limiting
    - Custom Request Filters
    - External Filters
    - Automatic HTTPS (ACME support)
  - Delivery Acceleration- CI/CD
    - MicroCD Pipeline
    - Jenkins X
  - Delivery Acceleration- Service Preview
  - Developer Portal

```bash
# macOS
curl -fL https://metriton.datawire.io/downloads/darwin/edgectl \
  -o edgectl && \
chmod a+x ./edgectl
./edgectl install

# HELM3
helm repo add datawire https://www.getambassador.io
kubectl create namespace ambassador && helm install ambassador --namespace ambassador datawire/ambassador

# Docker demo
docker run -it -p 8080:8080 --name=ambassador --rm datawire/aes:1.6.2 --demo
```
