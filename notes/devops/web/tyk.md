---
title: Tyk
---

# Tyk

- [TykTechnologies/tyk](https://github.com/TykTechnologies/tyk) 是什么？
  - MPL+MIT+BSD, GO
  - API 网关
  - 支持 REST, GraphQL, TCP, gRPC
  - 支持 OIDC, JWT, bearer Tokens, Basic Auth, Client Certificate
  - 支持 Swagger 定义接口
  - 支持请求响应转换 - SOAP, GraphQL
  - 限流配额
  - API 版本控制
  - 细粒度访问控制
  - Blocklist/Allowlist/Ignored 终端控制
  - 分析日志
  - CORS
  - WebSocket
  - IP AllowListing
  - Hitless reloads - 动态重载
  - Kubernetes Tyk Operator
- 商业部分
  - Dashboard
  - API Developer Portal
  - API Documentation
  - Developer Onboarding
- 核心网关是开源的 - 没有商业版
- 参考
  - [vs kong](https://tyk.io/alternatives-kong)
  - [vs apigee](https://tyk.io/alternatives-apigee)
  - [TykTechnologies/tyk-pump](https://github.com/TykTechnologies/tyk-pump)
    - 分析组件
    - 支持后端 ElasticSearch, Prometheus
  - [TykTechnologies/tyk-operator](https://github.com/TykTechnologies/tyk-operator)
    - k8s ingress

```bash
docker network create tyk
docker run -itd --rm --name redis --network tyk -p 127.0.0.1:6379:6379 redis:5.0-alpine
wget https://raw.githubusercontent.com/TykTechnologies/tyk-gateway-docker/master/tyk.standalone.conf
docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:latest

curl localhost:8080/hello
```
