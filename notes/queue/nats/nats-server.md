---
title: nats-server
---

# nats-server

```bash
brew install nats-server

# http://127.0.0.1:8222/
nats-server -js -sd $PWD/jetstream-store -m 8222

nats-server --signal reload
```

| port | for                          |
| ---- | ---------------------------- |
| 4222 | client                       |
| 8222 | HTTP management              |
| 6222 | routing port for clustering. |

```
port: 4222
monitor_port: 8222
```

- /etc/nats/nats-server.conf
- $var
  - 可以在配置里定义
  - 可使用 环境变量

```hcl
# 连接配置
host: 0.0.0.0
port: 4222
listen: "$host:$port"
# client_advertise: "$host:$port"

# HTTP monitoring port
monitor_port: 8222

tls: {}
gateway: {}
leafnode: {}
mqtt: {}
websocket: {}

# 超时配置
ping_interval: "2m"
ping_max: 2
write_deadline: "10s"

# 限制
max_connections: 64K
max_control_line: 4KB
max_payload: 1MB
max_pending: 64MB
max_subscriptions: 0

# JetStream
jetstream: {
  store_dir: "/tmp/nats/jetstream"
  # 内存的 75%
  # max_memory_store:
  max_file_store: 1TB
  # chachapoly, aes
  # cipher:
  # 32+
  # key:
  max_outstanding_catchup: 32MB
}

authorization {
  # timeout: 3

  # 同 --auth
  # nats sub -s nats://s3cr3t@localhost:4222 ">"
  # 支持 bcrypt: nats server passwd
  token: "s3cr3t"

  # 密码支持 Bcrypted
  user: ""
  password: ""
  users: [
        {user: "", password: ""b""}
  ]
}

accounts {

}
no_auth_user:

# 集群配置
cluster {
  # It is recommended to set a cluster name
  name: "my_cluster"

  # Route connections to be received on any interface on port 6222
  port: 6222

  # Routes are protected, so need to use them with --routes flag
  # e.g. --routes=nats-route://ruser:T0pS3cr3t@otherdockerhost:6222
  authorization {
    user: ruser
    password: T0pS3cr3t
    timeout: 2
  }

  # Routes are actively solicited and connected to from this server.
  # This Docker image has none by default, but you can pass a
  # flag to the nats-server docker image to create one to an existing server.
  routes = []
}
```

## jwt seutp

- alg ed25519-nkey

```bash
docker run -w /nsc --rm -it -v $PWD/nsc:/nsc natsio/nats-box:latest

# -n operator 名字
# /nsc/nats/nsc/stores
nsc init -n nats

nsc generate config --nats-resolver > jwt.conf
```

```hcl
host: 0.0.0.0
port: 4222
monitor_port: 8222

jetstream: {
  store_dir: "./jetstream-store"
}

websocket {
  port: 9222
  no_tls: true
}

include ./nsc/jwt.conf
```

```bash
# 添加实际使用的 account 和 user
nsc add account wener --js-disk-storage 1g
nsc add user apis

# 检查信息
nsc list keys
nsc describe operator
# nsc edit operator --service-url nats://127.0.0.1:4222

# 推送到 nats
nsc push -a incs -u nats://127.0.0.1

# 客户端连接
nats context add nats --server 127.0.0.1:4222 --select --creds ./nkeys/creds/nats/wener/apis.creds
nats account info
```

## Cluster

```yaml
version: '3.5'
services:
  nats:
    image: nats
    ports:
      - '8222:8222'
    command: '--cluster_name NATS --cluster nats://0.0.0.0:6222 --http_port 8222 '
    networks: ['nats']
  nats-1:
    image: nats
    command: '--cluster_name NATS --cluster nats://0.0.0.0:6222 --routes=nats://ruser:T0pS3cr3t@nats:6222'
    networks: ['nats']
    depends_on: ['nats']
  nats-2:
    image: nats
    command: '--cluster_name NATS --cluster nats://0.0.0.0:6222 --routes=nats://ruser:T0pS3cr3t@nats:6222'
    networks: ['nats']
    depends_on: ['nats']

networks:
  nats:
    name: nats
```

## cluster

```
--routes [rurl-1, rurl-2]     Routes to solicit and connect
--cluster nats://host:port    Cluster URL for solicited routes
```

```
listen: 127.0.0.1:4222
http: 8222

cluster {
  name: example

  # host/port for inbound route connections from other server
  listen: localhost:4244

  # Authorization for route connections
  # Other server can connect if they supply the credentials listed here
  # This server will connect to discovered routes using this user
  authorization {
    user: route_user
    password: pwd
    timeout: 0.5
  }

  # This server establishes routes with these server.
  # This server solicits new routes and Routes are actively solicited and connected to from this server.
  # Other servers can connect to us if they supply the correct credentials
  # in their routes definitions from above.
  routes = [
    nats://route_user:pwd@127.0.0.1:4245
    nats://route_user:pwd@127.0.0.1:4246
  ]
}
```

- 只会 forward client 消息给相邻节点
- gossiping

## jetstream cluster

- RAFT

## gateway

- cluster <-> cluster
- https://docs.nats.io/running-a-nats-service/configuration/gateways

## leafnode

- 连接 super cluster
- 延伸 nats-server
- 使用本地 authz+authn
- 本地 low RTT
- 不需要能访问自己
- 可以同时连多个集群

```
Nats-Request-Info: {"acc":"LEAF_ACCOUNT","rtt":11491934}
```

## HELM

- https://github.com/nats-io/k8s/tree/main/helm/charts/nats

# FAQ

## Account fetch failed: fetching jwt timed out

配置 resolver.timeout

## system_account in config and operator JWT must be identical

生成配置不要指定 --sys-account,默认为 SYS

## no nkey seed found

## using nats based account resolver - the system account needs to be specified in configuration or the operator jwt

```bash
nsc add account -n SYS
nsc edit operator --system-account SYS
```

## JetStream not enabled for account (10039)

- 必须要配置 js-disk-storage

```bash
nsc edit account server --js-disk-storage 1g
nsc describe account server
```
