# Consul

## Tips
* [Consul 手册](https://www.consul.io/docs/guides/)


## 快速开始

> 以下启动一个三个节点的集群

```bash
# 默认配置目录为 /etc/consul
cd /etc/consul
# 基础服务配置
cat <<CONF > server.json
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
* [Services](https://www.consul.io/docs/agent/services.html)

__定义单个服务__

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

__定义多个服务__

```json
{
  "services":[
    {"name":"svc-a"},
    {"name":"svc-b"},
  ]
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
* ACL 可控制的资源主要有
  * agent	Utility operations in the Agent API, other than service and check registration
  * event	Listing and firing events in the Event API
  * key	Key/value store operations in the KV Store API
  * keyring	Keyring operations in the Keyring API
  * node	Node-level catalog operations in the Catalog API, Health API, Prepared Query API, Network Coordinate API, and Agent API
  * operator	Cluster-level operations in the Operator API, other than the Keyring API
  * query	Prepared query operations in the Prepared Query API
  * service	Service-level catalog operations in the Catalog API, Health API, Prepared Query API, and Agent API
  * session	Session operations in the Session API

```hcl
# Agent Token
node "" {
  policy="write"
}
service "" {
  policy="read"
}

# Client Token
node "" {
  policy="read"
}

# Traefik
key "traefik" {
  policy = "write"
}
session "" {
  policy = "write"
}
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

## FAQ

### 地址模板验证

```bash
go get -u github.com/hashicorp/go-sockaddr/cmd/sockaddr
~/go/bin/sockaddr eval 'GetPrivateInterfaces |  include "network" "10.0.0.0/8" | attr "address"'
```

### 将 docker 暴露到 consul
* [gliderlabs/registrator](https://github.com/gliderlabs/registrator)
* 配置项
  * 标示 SERVICE_ID - 默认是 主机名:服务名:端口
  * 名字 SERVICE_NAME
  * 忽略 SERVICE_IGNORE
  * 标签 SERVICE_TAGS=master,backups
  * 属性 SERVICE_xxoo=abc 会记录到服务属性

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
