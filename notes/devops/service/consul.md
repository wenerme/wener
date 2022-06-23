---
title: Consul
---

# Consul

- [hashicorp/consul](https://github.com/hashicorp/consul)
  - MPL-2.0, Golang
  - Identity-based networking
  - 服务发现、配置管理、Mesh 网络
- [Consul 手册](https://www.consul.io/docs/guides/)
- 端口
  - HTTP 8500
  - HTTPS 8501 - 默认没开启
  - gRPC 8502
  - DNS 8600
  - RPC 8400
- 运行模式
  - server
    - 服务节点
    - 一个 dc 不超过 5 个服务节点
    - 参与 raft 一致性事务修改
    - 与其他 dc 的网关进行 WAN gossip 通信
    - 可转发 dc 流量
  - agent
    - 一般每个节点都会启动
    - 与 server 通信
    - 提供缓存、代理、节点监控
  - bootstrap
    - 启动模式
    - 一个 dc 应该只有一个 server 节点以该模式运行
    - 允许选举自己为主节点
    - 集群启动后则不需要使用该模式
    - 相当于 `bootstrap_expect` 为 1
- Watch
  - consul 使用 http blocking query 实现 watch
  - 通过 index 或 content hash 来判断变化
  - [#1065](https://github.com/hashicorp/consul-template/issues/1065) - When watching all services, consul-template is DOSing the Consul agent
  - 当监控量大的时候考虑客户端去重，间隔查询，避免长链接
  - 可 Watch 的类型 - key、keyprefix、services、nodes、service、checks、event
- 参考
  - [FAQ](https://www.consul.io/docs/troubleshoot/faq)
  - 下载 https://releases.hashicorp.com/consul/1.12.0/
- 企业版功能: snapshot, namespace

:::tip

- Value 最大 512KB - 不要将 KV 用于通用存储，用于存储基本状态和配置足以
- meta 最多 64 个 KV，key 只能是 `[-_a-zA-Z0-9]{,128}`,值最长 512
- 区别使用 tag 和 meta
  - tags 例如： primary、secondary
  - metas 例如： version、name
- 存储使用 [etcd-io/bbolt](https://github.com/etcd-io/bbolt)

:::

| env                    | default               | desc            |
| ---------------------- | --------------------- | --------------- |
| CONSUL_HTTP_ADDR       | http://127.0.0.1:5800 |
| CONSUL_HTTP_TOKEN      |
| CONSUL_HTTP_TOKEN_FILE |                       | HTTP Basic auth |
| CONSUL_HTTP_AUTH       |                       | user:pass       |
| CONSUL_HTTP_SSL        | false                 |
| CONSUL_CACERT          |
| CONSUL_CAPATH          |
| CONSUL_CLIENT_CERT     |
| CONSUL_CLIENT_KEY      |
| CONSUL_TLS_SERVER_NAME |
| CONSUL_HTTP_SSL_VERIFY | true                  |
| CONSUL_GRPC_ADDR       | 127.0.0.1:8502        | envoy 集成需要  |

```bash
# alpine install
# < 3.13 需要从 edge 安装
apk add consul

# macOS install
brew install consul

# 本地测试
consul agent -data-dir $PWD/data -dev

# 正常启动
consul agent -bootstrap -server -data-dir $PWD/data -bind 0.0.0.0 -advertise 127.0.0.1 -ui

# 绑定动态地址
# {{ GetPrivateInterfaces | include "network" "10.0.0.0/8" | attr "address" }}
# {{ GetAllInterfaces | include "name" "^eth" | include "flags" "forwardable|up" | attr "address" }}
consul agent -bind '{{ GetInterfaceIP "eth0" }}' -server -dev

# Debug
consul monitor --log-level=debug

# 注销服务
curl -v -X PUT http://localhost:8500/v1/agent/service/deregister/web-test
consul services deregister -id web-test
```

## Catalog

- Service
- Node
- Datacenter

## 快速开始

> 以下启动一个三个节点的集群

```bash
# 默认配置目录为 /etc/consul
cd /etc/consul
# 基础服务配置
cat << CONF > server.json
{
    "client_addr": "0.0.0.0",
    "data_dir": "/var/consul",
    "domain": "consul",
    "enable_script_checks": true,
    "dns_config": {
        "enable_truncate": true,
        "only_passing": true
    },
    "enable_syslog": true,
    "leave_on_terminate": true,
    "log_level": "INFO",
    "rejoin_after_leave": true,
    "server": true
}
CONF
# 启动连接 - 数据中心
echo '{"start_join":["10.10.1.1","10.10.1.2","10.10.1.3"],"bootstrap_expect": 3,"datacenter":"center"}' > join.json
# 生成密钥
echo '{"encrypt":"'$(consul keygen)'"}' > encrypt.json

# 如果觉得配置文件过多可合并为一个
# jq -s add consul.d/*.json > config.json

# 启动
consul agent -config-dir /etc/consul
```

## 选项

- https://www.consul.io/docs/agent/options

## 操作

```bash
# 从新加载配置
consul reload
killall -HUP consul
```

## 配置

### 最小服务配置

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

### 服务定义

- [Services](https://www.consul.io/docs/agent/services.html)

**定义单个服务**

```json
{
  "service": {
    "name": "portal",
    "tags": ["primary"],
    "address": "10.66.1.1",
    "meta": {
      "meta": "for my service"
    },
    "port": 80,
    "enable_tag_override": false
  }
}
```

**定义多个服务**

```json
{
  "services": [{ "name": "svc-a" }, { "name": "svc-b" }]
}
```

```bash
# 启动单节点
# 开发模式
consul agent -dev -client 0.0.0.0

consul agent -bootstrap -server -data-dir $PWD/data -advertise 127.0.0.1 -ui
# ==> WARNING: Bootstrap mode enabled! Do not enable unless necessary
# ==> Starting Consul agent...
# ==> Starting Consul agent RPC...
# ==> Consul agent running!
#            Version: 'v0.7.3'
#            Node ID: 'f5bdf8b9-3e67-8b88-ddce-4052a5ae6bec'
#          Node name: 'wener'
#         Datacenter: 'dc1'
#             Server: true (bootstrap: true)
#        Client Addr: 127.0.0.1 (HTTP: 8500, HTTPS: -1, DNS: 8600, RPC: 8400)
#       Cluster Addr: 127.0.0.1 (LAN: 8301, WAN: 8302)
#     Gossip encrypt: false, RPC-TLS: false, TLS-Incoming: false
#              Atlas: <disabled>


# 在容器中启动集群, 指定网卡是关键
docker run --rm -it \
  --networ service \
  -e CONSUL_CLIENT_INTERFACE=eth0 \
  -e CONSUL_BIND_INTERFACE=eth0 \
  consule agent -server -bootstrap-expect 3 \
  -retry-join consul_consul_1 -retry-join consul_consul_2 -retry-join consul_consul_3

# 查看成员信息
docker exec -it consul_consul_3 consul members -http-addr=http://consul_consul_3:8500

# 再启动一个用于做对外暴露, 启动 ui, 允许所有来源客户端访问
docker run -it --rm --network multi-host-network \
  -e CONSUL_BIND_INTERFACE=eth0 -p 8500:8500 \
  --name consul consul agent -server -retry-join consul_consul_1 -ui



# 启用 ACL
docker run -it --rm -p 8500:8500  -v $PWD/consul/data:/consul/data \
  -e 'CONSUL_LOCAL_CONFIG={"datacenter":"dc1","acl_datacenter": "dc1","acl_master_token": "b1gs33cr3t","acl_default_policy": "deny","acl_down_policy": "extend-cache"}' \
  -e CONSUL_CLIENT_INTERFACE=eth0 \
  -e CONSUL_BIND_INTERFACE=eth0 \
  --name consul consul agent -server -bootstrap-expect 1 -ui

# 客户端指定 Token
consul members -token b1gs33cr3t
CONSUL_HTTP_TOKEN=b1gs33cr3t consul members

curl -v --request PUT http://127.0.0.1:8500/v1/acl/bootstrap

docker run -d --name=dev-consul consul
docker run -d consul agent -dev -join=172.17.0.2
docker exec -t dev-consul consul members

docker run -d --net=host consul agent -server -bind=<external ip> -retry-join=<root agent ip> -bootstrap-expect=<number of server agents>

# Start cluster server
docker run -d --name=node0 consul agent -server -client=0.0.0.0 -node=node0 -bootstrap-expect=1 -bind=172.17.0.2 -data-dir=/tmp/consul

# Start client
docker run -d --name=node1 consul agent -client=0.0.0.0 -node=node1 -bind=172.17.0.3 -data-dir=/tmp/consul -join=172.17.0.2
```

## ACL

- https://learn.hashicorp.com/consul/security-networking/production-acls
- ACL 可控制的资源主要有
  - agent Utility operations in the Agent API, other than service and check registration
  - event Listing and firing events in the Event API
  - key Key/value store operations in the KV Store API
  - keyring Keyring operations in the Keyring API
  - node Node-level catalog operations in the Catalog API, Health API, Prepared Query API, Network Coordinate API, and Agent API
  - operator Cluster-level operations in the Operator API, other than the Keyring API
  - query Prepared query operations in the Prepared Query API
  - service Service-level catalog operations in the Catalog API, Health API, Prepared Query API, and Agent API
  - session Session operations in the Session API
- 内建策略
  - global-management
    - 用于全局管理
- [操作需要的权限](https://learn.hashicorp.com/consul/security-networking/managing-acl-policies#required-privileges-for-datacenter-operations)

```bash
consul acl bootstrap
```

```json
{
  "acl": {
    // 启用 ACL
    "enabled": true,
    // 默认策略 - 默认为 allow
    "default_policy": "deny",
    "tokens": {
      // 在 primary_datacenter 集群的服务会使用
      // 管理级别的权限
      // 用于申请集群 leadership 时使用
      "master": "",
      // 默认 TOKEN - 在 agent 请求 服务时使用
      // 如果为空则为 anonymous 的 ACL
      "default": "",
      // 用于客户端和服务端处理内部操作 - 如果没指定，使用 default
      // 该 TOKEN 至少需要有当前节点的写权限
      "agent": "",
      // 用于访问 agent 接口 - 需要 agent 读写权限或节点的读权限
      "agent_master": "",
      "replication": ""
    }
  }
}
```

#### agent

```hcl
node_prefix "" {
   policy = "write"
}
service_prefix "" {
   policy = "read"
}
```

#### 只读策略

```hcl
node_prefix "" {
  policy = "read"
}
service_prefix "" {
  policy = "read"
}
query_prefix "" {
  policy = "read"
}
key_prefix "" {
  policy = "read"
}
```

#### registrator

```hcl
service_prefix "" {
  policy = "write"
}
```

#### anonymous

```hcl
namespace "default" {
  policy = "read"
}
agent {
  policy = "read"
}
node {
  policy = "read"
}
```

### DNS

- 节点 `<node>.node[.datacenter].<domain>`
- 服务 `[tag.]<service>.service[.datacenter].<domain>`
- RFC 2782 `_<service>._<protocol>[.service][.datacenter][.domain]`
- 预定义查询 `<query or name>.query[.datacenter].<domain>`

```bash
dig @127.0.0.1 -p 8600 consul.service.consul SRV
```

### Config

```js
{
  "datacenter": "east-aws",
  "data_dir": "/opt/consul",
  "log_level": "INFO",
  "node_name": "foobar",
  "server": true,
  "watches": [
    {
        "type": "checks",
        "handler": "/usr/bin/health-check-handler.sh"
    }
  ],
  "telemetry": {
     "statsite_address": "127.0.0.1:2180"
  }
}
```

## consul cluster

- 三个 server，

**consul.auto.tfvars.json**

```json
{
  "consul": {
    "datacenter": "wener",
    "master_token": "<UUID>"
  }
}
```

**consul.tf**

```hcl
provider "docker" {}

resource "docker_network" "service" {
  name = "service"
  check_duplicate = true
}

resource "docker_image" "consul" {
  name = "consul:latest"
  keep_locally = true
}

variable "consul" {}

locals {
  server_conf = {
    datacenter: var.consul.datacenter
    disable_update_check: true
    disable_remote_exec: true
    discard_check_output: true
    acl: {
      enabled: true
      default_policy: "deny"
      enable_token_persistence: true
      tokens: {
        master: var.consul.master_token
      }
    },
    connect: {
      enabled: true
      enable_mesh_gateway_wan_federation: true
    }
  }
}

# config-dir /consul/config/
# data-dir /consul/data/
resource "docker_container" "consul_1" {
  name  = "consul_1"
  hostname  = "consul_1"
  image = docker_image.consul.latest

  upload {
    file = "/consul/config/server.json"
    content = jsonencode(local.server_conf)
    source_hash = sha256(jsonencode(local.server_conf))
  }

  command = [
    "agent", "-server",
    "-advertise", "{{ GetInterfaceIP `eth0` }}",
    "-bind", "0.0.0.0",
    "-client", "0.0.0.0",
    "-bootstrap-expect", "3",
    "-ui",
  ]
  ports {
    internal = 8500
    external = 8500
  }

  networks_advanced {
    name = "service"
  }
}

resource "docker_container" "consul_2" {
  name  = "consul_2"
  hostname  = "consul_2"
  image = docker_image.consul.latest
  upload {
    file = "/consul/config/server.json"
    content = jsonencode(local.server_conf)
    source_hash = sha256(jsonencode(local.server_conf))
  }
  command = [
    "agent", "-server",
    "-advertise", "{{ GetInterfaceIP `eth0` }}",
    "-bind", "0.0.0.0",
    "-client", "0.0.0.0",
    "-retry-join","consul_1"
  ]

  networks_advanced {
    name = "service"
  }
}

resource "docker_container" "consul_3" {
  name  = "consul_3"
  hostname  = "consul_3"
  image = docker_image.consul.latest
  upload {
    file = "/consul/config/server.json"
    content = jsonencode(local.server_conf)
    source_hash = sha256(jsonencode(local.server_conf))
  }
  command = [
    "agent", "-server",
    "-advertise", "{{ GetInterfaceIP `eth0` }}",
    "-bind", "0.0.0.0",
    "-client", "0.0.0.0",
    "-retry-join","consul_1",
    "-retry-join","consul_2",
  ]

  networks_advanced {
    name = "service"
  }
}

# agent
resource "docker_container" "consul_4" {
  name  = "consul_4"
  hostname  = "consul_4"
  image = docker_image.consul.latest
  command = [
    "agent",
    "-advertise", "{{ GetInterfaceIP `eth0` }}",
    "-bind", "0.0.0.0",
    "-client", "0.0.0.0",
    "-retry-join","consul_1",
    "-retry-join","consul_2",
    "-retry-join","consul_3",
  ]

  networks_advanced {
    name = "service"
  }
}
```

## FAQ

### 地址模板验证

```bash
go get -u github.com/hashicorp/go-sockaddr/cmd/sockaddr
~/go/bin/sockaddr eval 'GetPrivateInterfaces |  include "network" "10.0.0.0/8" | attr "address"'
```

### dropping node "consul" from result due to ACLs

- DNS 查询时出现
- 允许匿名访问 service

### autopilot: Failed to remove dead servers: too many dead servers: 1/1

### 将 docker 暴露到 consul

- [gliderlabs/registrator](https://github.com/gliderlabs/registrator)
- 配置项
  - 标示 SERVICE_ID - 默认是 主机名:服务名:端口
  - 名字 SERVICE_NAME
  - 忽略 SERVICE_IGNORE
  - 标签 SERVICE_TAGS=master,backups
  - 属性 SERVICE_xxoo=abc 会记录到服务属性

```bash
# master 为最新 - latest 为 4 年前最后版本
docker run gliderlabs/registrator:master --help

# -explicit 只有定义了 SERVICE_NAME 的才暴露
# -ip 暴露的 IP - 使用了该参数则不需要 net=host
# -internal 使用内部地址和端口 - 在使用自定义网络的时候很方便
docker run -d --name=registrator \
  --volume=/var/run/docker.sock:/tmp/docker.sock \
  gliderlabs/registrator:master -explicit -ip 192.168.1.2 consul://192.168.1.2:8500

docker run -d --name web -l SERVICE_NAME=web -P nginx
# 当暴露了多个端口时隐藏某个端口
docker run -d --name web -l SERVICE_NAME=web -l SERVICE_443_IGNORE=true -P nginx
# 如果暴露了多个端口，也可以选择只暴露某个端口作为服务
docker run -d --name web -l SERVICE_8080_NAME=web -P nginx
```
