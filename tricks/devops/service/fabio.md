---
id: fabio
title: fabio
---

# fabio

## Tips
- 注意 ⚠️
  - 目前该项目开发不太活跃，不建议用来做主要的路由或 Ingress 角色
  - 用来将 consul 上的服务对外暴露还是可以的，但不建议作为唯一依赖
- [fabiolb/fabio](https://github.com/fabiolb/fabio) - Consul 内的服务 Load-Balancing
- 特性
  - 访问日志
  - 访问控制
  - 证书存储
  - 压缩
  - HTTP 头注入
  - HTTPS 上游
  - PROXY 协议
  - 路径剔除 - Path stripping
  - SSE
  - 原始 TCP
  - TCP SNI
  - HTTPS TCP SNI
  - 流量控制 - 路由 N% 到不同上游
  - 支持 Vault 存储 证书
- 默认只会处理通过监控检查的服务
- 默认端口 9999
- 管理端口 9998
- [路由](https://github.com/fabiolb/fabio/wiki/Routing)
  - Tags
    - `urlprefix-{host}/{path}`
    - `urlprefix-i.com/static`
    - `urlprefix-/foo/bar proto=https tlsskipverify=true strip=/foo`
    - `urlprefix-:3306 proto=tcp` - TCP 路由
- [fabio.properties](https://github.com/fabiolb/fabio/blob/master/fabio.properties)

```bash
# go
go get -u github.com/fabiolb/fabio
# macOS
brew install fabio

consul agent -dev

consul kv put fabio/config 'route add wener-me /wener https://wener.me opts "strip=/wener host=wener.me"'

# http://localhost:9999/wener
fabio
```

## 路由配置

- 默认配置路径 `/fabio/config`
- [Config Language](https://fabiolb.net/cfg/)

| Options       | Value                       | Desc                                          |
| ------------- | --------------------------- | --------------------------------------------- |
| allow         | ip:10.0.0.0/8,ip:fe80::/10  | 允许访问的 IP                                 |
| deny          | ip:10.0.0.0/8,ip:fe80::1234 | 不允许访问的 IP                               |
| strip         | /path                       | 路径剔除 - `/path/to/file` -> `/to/file`      |
| proto         | tcp<br/>https<br/>tcp+sni   | TCP 的 dst 必须是 `:<port>`                   |
| pxyproto      | true                        | PROXY                                         |
| tlsskipverify | true                        |
| host          | wener                       | Host 头，如果为 dst，则会使用注册的上游主机名 |
| register      |                             |
| auth          |                             |

```ini
# route add <svc> <src> <dst>[ weight <w>][ tags "<t1>,<t2>,..."][ opts "k1=v1 k2=v2 ..."]
# 转发到 wener.me
route add wener-me /wener https://wener.me opts "strip=/wener host=wener.me"

# route del <svc>[ <src>[ <dst>]]
# route del <svc> tags "<t1>,<t2>,..."
# route del tags "<t1>,<t2>,..."

# route weight <svc> <src> weight <w> tags "<t1>,<t2>,..."
# route weight <src> weight <w> tags "<t1>,<t2>,..."
# route weight <svc> <src> weight <w>
# route weight service host/path weight w tags "tag1,tag2"
```

## 配置

- [Reference](https://fabiolb.net/ref/)

| conf type        | demo                        |
| ---------------- | --------------------------- |
| fabio.properties | metrics.target=stdout       |
| env              | metrics_target=stdout       |
| env prefix       | FABIO_metrics_target=stdout |
| ENV              | FABIO_METRICS_TARGET=stdout |
| arg              | -metrics.target stdout      |

```
# 多协议监听
proxy.addr = 172.16.20.11:80;proto=http;rt=60s;wt=30s,\
             172.16.20.11:443;proto=https;rt=60s;wt=30s;cs=all;tlsmin=10, \
             172.16.20.11:8443;proto=tcp+sni
```

## Consul Policy

```hcl
node_prefix {
  "" {
    policy = "read"
  }
}
service {
  fabio {
    policy = "write"
  }
  gateway {
    policy = "write"
  }
}
service_prefix {
  "" {
    policy = "write"
  }
}
key_prefix {
  "fabio" {
    policy = "write"
  }
}
agent {
  // 可限制为 fabio
  "" {
    policy = "read"
  }
}
```
