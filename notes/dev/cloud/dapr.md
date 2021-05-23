---
title: Dapr
---

# Dapr

- [dapr/dapr](https://github.com/dapr/dapr) 是什么？
  - 云原生开发工具集

```bash
brew install dapr/tap/dapr-cli

# 本地启动 Go 应用
dapr run --app-id example-service \
  --app-protocol grpc \
  --app-port 50001 \
  go run main.go

# 启动 JS 应用
dapr run --app-id nodeapp --app-port 3000 --dapr-http-port 3500 app.js
```

## Sidecar

- 默认端口 3500
- 元数据 - /v1.0/metadata
- 健康 - /v1.0/healthz
- 服务调用 - /v1.0/invoke
  - gRPC, HTTP
  - `/v1.0/invoke/<appId>/method/<method-name>`
    - 例如 `/v1.0/invoke/nodeapp.production/method/neworder`
      - production 为 namespace
  - NameResolution - consul, dns, kubernetes, mdns
- 状态管理 - /v1.0/state
  - 支持 Redis, PostgreSQL, MySQL, Hazelcast, Consul, MongoDB, Zookeeper
- PubSub - /v1.0/publish, /v1.0/subscribe
  - 支持 Kafka, Hazelcast, MQTT, NATS Streaming, Pulsar, RabbitMQ, Redis
- Binding - /v1.0/bindings
  - 支持 APN, Cron, HTTP, Kafka, MQTT, MySQL, PostgreSQL, RabbitMQ, Redis, SMTP, Local Storage, AliOSS
- Actor - /v1.0/actors
  - 依赖 state - etag, tx 支持
  - `/v1.0/actors/<actorType>/<actorId>/<method/state/timers/reminders>`
- Observability
- 密钥管理 - /v1.0/secrets
  - Env, File, Vault, Kubernetes Vault

## Actor

- [Actor](https://en.wikipedia.org/wiki/Actor_model) - lowest-level “unit of computation”
- [Virtual Actors](https://www.microsoft.com/en-us/research/project/orleans-virtual-actors/)
- Go 不支持 actor
- actor
  - 支持 state
  - 不支持 sub - 可以 pub

## Notes

- 组件
  - dapr - 命令行
  - daprd - sidecar
  - dashboard - 面板
  - placement
    - distributed hashing - distribute the actor instances across various pods of the user service
    - 只用于 actor
- SDK - Go, Java, PHP, Python, .NET - WIP JS, Rust, C++
  - [Serialization](https://docs.dapr.io/developing-applications/sdks/sdk-serialization/)
- Middleware
  - 限流、OAuth2、OAuth2 client credentials、Bearer、OPA
  - Uppercase - 测试使用
- ~/.dapr/
  - config.yaml
  - components/
    - pubsub.yaml
    - statestore.yaml
  - bin/
    - daprd
    - dashboard
    - web/
- 参考
  - [Dapr Reference](https://docs.dapr.io/reference/)

```bash
# self-host 初始化 - docker - placement :50005, redis :6379, zipkin :9411
# --network 指定 docker network
dapr init
dapr init -s # slim self-hosted - 不启动 placement service, Redis, Zipkin

# k8s 初始化
# --enable-ha
# --enable-mtls - 默认开启
# -n dapr-system
dapr init -k
dapr init -k --wait --timeout 600 --runtime-version 1.1.0 # 指定版本、超时、等待完成

# 面板 - 目前功能比较简单
dapr dashboard -p 9999

# 实验 sidecar
dapr run --app-id myapp --dapr-http-port 3500
# 存储状态
curl -X POST -H "Content-Type: application/json" -d '[{ "key": "name", "value": "Bruce Wayne"}]' http://localhost:3500/v1.0/state/statestore
docker exec -it dapr_redis redis-cli keys '*'
# hash "myapp||name"

# 实验定义 secret 组件
echo '{"my-secret" : "Secret here"}' > mysecrets.json
mkdir my-components
cat <<CONF > my-components/localSecretStore.yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: my-secret-store
  namespace: default
spec:
  type: secretstores.local.file
  version: v1
  metadata:
  - name: secretsFile
    value: $PWD/mysecrets.json
  - name: nestedSeparator
    value: ":"
CONF
dapr run --app-id myapp --dapr-http-port 3500 --components-path ./my-components
# 请求 json 中的内容
curl http://localhost:3500/v1.0/secrets/my-secret-store/my-secret
```
