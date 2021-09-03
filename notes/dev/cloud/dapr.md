---
title: Dapr
---

# Dapr

- [dapr/dapr](https://github.com/dapr/dapr) 是什么？
  - 云原生开发工具集
  - 支持多语言 - sidecar 暴露 http 和 grpc 接口
  - 支持多环境 - 不限制在 kube 集群
  - Sidecar 模式 - 轻 sdk 重 sidecar

:::caution

- http-max-request-size 默认限制 4m
  - 因此单个 gRPC/HTTP 请求最大 4mb

:::

:::tip

- Go SDK 不支持 actor - [dapr/go-sdk#21](https://github.com/dapr/go-sdk/issues/21)
- WIP
  - 配置组件 - [dapr/dapr#2988](https://github.com/dapr/dapr/issues/2988)
  - Lock
  - Circuit Breaking
  - Search

:::

```bash
# macOS 安装 dapr 命令行
brew install dapr/tap/dapr-cli

# 本地启动 Go 应用
dapr run --app-id example-service \
  --app-protocol grpc \
  --app-port 50001 \
  go run main.go

# 启动 JS 应用
dapr run --app-id nodeapp --app-port 3000 --dapr-http-port 3500 app.js
```

## SDK

| Language | Status | Client |    Server    |       Actor        |
| -------- | :----- | :----: | :----------: | :----------------: |
| .NET     | Stable |   ✔    | ASP.NET Core |         ✔          |
| Python   | Stable |   ✔    |     gRPC     | FastAPI<br />Flask |
| Java     | Stable |   ✔    | Spring Boot  |         ✔          |
| Go       | Stable |   ✔    |      ✔       |         ❌         |
| PHP      | Stable |   ✔    |      ✔       |         ✔          |

- Client
  - 服务方法请求
  - 状态存储
  - PubSub
  - 绑定操作
  - Secret 获取
  - Virtual Actor 交互
- Server 扩展 - Dapr 服务扩展
  - 能被其他服务调用
  - 订阅主题
- Actor
  - 方法被请求
  - 状态保存获取
  - Timer 回调
  - 持久化 reminder
- [SDKs](https://docs.dapr.io/developing-applications/sdks/)

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
# 不需要 docker
# 可手动启动 $HOME/.dapr/bin/placement
dapr init -s # slim self-hosted - 不启动 placement service, Redis, Zipkin

# k8s 初始化
# --enable-ha
# --enable-mtls - 默认开启
# -n dapr-system
dapr init -k
dapr init -k --wait --timeout 600 --runtime-version 1.3.0 # 指定版本、超时、等待完成

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

## 配置

- CDR Configuration
- 通过 `dapr.io/config: "zipkin"` 使用

```yaml
apiVersion: dapr.io/v1alpha1
kind: Configuration
metadata:
  name: zipkin
  namespace: default
spec:
  tracing:
    samplingRate: "1"
    zipkin:
      # 可以 selfhost
      endpointAddress: "http://localhost:9411/api/v2/spans"
      # k8s
      endpointAddress: "http://zipkin.default.svc.cluster.local:9411/api/v2/spans"

  # API ACL
  api:
    allowed:
    - name: state # state, invoke, secrets, bindings, publish, actors, metadata
      version: v1.0
      protocol: http # http, grpc

  # 服务访问控制
  accessControl:
    defaultAction: deny
    trustDomain: "public"
    policies:
    - appId: app1
      defaultAction: allow
      trustDomain: 'public'
      namespace: "default"
    - appId: app1
      defaultAction: deny
      trustDomain: 'public'
      namespace: "default"
      operations:
      - name: /op1 # /op1/*
        httpVerb: ['POST', 'PUT'] # ['*']
        action: allow

  # 预览特性
  features:
  - name: Feature1
    enabled: true
```
