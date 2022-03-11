---
title: Consul 配置
tags:
  - Configuration
---

# Consul 配置

- [Configuration](https://www.consul.io/docs/agent/options)

**单机配置**

```json
{
  "data_dir": "/var/consul",
  "server": true,
  "bootstrap_expect": 1,
  "disable_update_check": true,
  "disable_remote_exec": true,
  "enable_syslog": true
}
```

## acl

- https://learn.hashicorp.com/tutorials/consul/access-control-setup-production
- Token 类型
  - master - 主令牌
    - 等同于 acl bootstrap 的令牌 - 建议设置 - 设置后不再需要 acl bootstrap
    - 用于主 dc 的 server 之间
    - 使用 UUID
  - default - 默认 - 如果没有具体的 token
    - 用于向服务端发起请求
    - 没有则等同于 anonymous
  - agent
    - 用于客户端或服务执行内部操作
    - 如果没有则使用 default
    - 至少需要权限能设置节点信息
  - agent_master
    - 访问 agent 终端，读写 agent 权限
    - 服务中断时可用于 operator
  - replication
    - 用于授权二级 dc 访问主 dc 进行复制操作

## 配置记录

- 如果存在对于的服务则会进行合并配置
- 类型
  - ingress-gateway
  - proxy-defaults - 默认代理配置
  - service-defaults
    - Protocol
    - MeshGateway
      - Mode: none, local, remote
    - ExternalSNI
    - Expose
      - Checks = true
  - service-resolver - matches service instances with a specific Connect upstream discovery requests
  - service-router - defines where to send layer 7 traffic based on the HTTP route
  - service-splitter - defines how to divide requests for a single HTTP route based on percentages
  - terminating-gateway - 与 terminating gateway 关联的服务

```bash
cat <<HCL | consul config write -
Kind      = "service-defaults"
Name      = "web-test"
Protocol  = "http"
HCL

consul config list -kind service-defaults
consul config read -kind service-defaults -name web-test

cat <<HCL | consul config write -
Kind      = "service-defaults"
Name      = "static-server"
Protocol  = "http"
HCL
cat <<HCL | consul config write -
Kind = "service-router"
Name = "web-test"
Routes = [
  {
    Match {
      HTTP {
        PathPrefix = "/to/static-server"
      }
    }

    Destination {
      Service = "static-server"
    }
  },
]
HCL
```

<!--

/metrics path for Prometheus or /healthz for kubelet liveness checks.

Checks (bool: false) - If enabled, all HTTP and gRPC checks registered with the agent are exposed through Envoy. Envoy will expose listeners for these checks and will only accept connections originating from localhost or Consul's advertise address. The port for these listeners are dynamically allocated from expose_min_port to expose_max_port. This flag is useful when a Consul client cannot reach registered services over localhost. One example is when running Consul on Kubernetes, and Consul agents run in their own pods.
Paths array<Path>: [] - A list of paths to expose through Envoy.
Path (string: "") - The HTTP path to expose. The path must be prefixed by a slash. ie: /metrics.
LocalPathPort (int: 0) - The port where the local service is listening for connections to the path.
ListenerPort (int: 0) - The port where the proxy will listen for connections. This port must be available for the listener to be set up. If the port is not free then Envoy will not expose a listener for the path, but the proxy registration will not fail.
Protocol (string: "http") - Sets the protocol of the listener. One of http or http2. For gRPC use http2

-->
