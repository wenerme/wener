---
title: Apache APISIX
---

# Apache APISIX

- [apache/apisix](https://github.com/apache/apisix)
  - Apache-2.0, Lua+Nginx/openresty+etcd
  - 支持 Golang 插件
  - 支持协议: HTTP, GRPC, Dubbo, MQTT
  - 也可以存储在 yaml - 但不可以编辑
    - config_center 配置
- [Admin API](https://apisix.apache.org/docs/apisix/admin-api)
  - Auth `X-API-KEY: admin-ley`
  - PUT 为新增
  - `/apisix/admin/<资源>`
    - routes, stream_routes, services, consumers, upstreams, ssl, global_rules,
    - plugin_configs, plugin_metadata
  - 信息
    - `/apisix/admin/plugins/list`
    - `/apisix/admin/plugins/{plugin_name}`
- 参考
  - [apache/apisix-docker](https://github.com/apache/apisix-docker)
  - [apache/apisix-helm-chart](https://github.com/apache/apisix-helm-chart)

```bash
# 官方建议自行构建
# APISIX_VERSION=2.9 make build-on-alpine-cn
# apache/apisix:2.9-alpine
# 带 build 逻辑的 compose
# https://github.com/apache/apisix-docker/raw/master/example/docker-compose-alpine.yml

# make build-all-in-one
docker run -d \
  -p 9080:9080 -p 9091:9091 -p 2379:2379 \
  -v $PWD/all-in-one/apisix/config.yaml:/usr/local/apisix/conf/config.yaml \
  apache/apisix:whole

# make build-dashboard
docker run -d \
  -p 19080:9080 -p 19091:9091 -p 12379:2379 -p 19000:9000 \
  -v $(pwd)/all-in-one/apisix/config.yaml:/usr/local/apisix/conf/config.yaml \
  -v $(pwd)/all-in-one/apisix-dashboard/conf.yaml:/usr/local/apisix-dashboard/conf/conf.yaml \
  apache/apisix-dashboard:whole
```

```yaml title="prometheus port 9091"
plugin_attr:
  prometheus:
    export_addr:
      ip: '0.0.0.0'
      port: 9091
```

## 基本概念

- Route/路由
  - =uri+plugins+upstream/service_id
  - 路由条件：Host、Path、Method、表达式、请求参数、Cookie、Auth 信息
  - Weight-based traffic split
  - 插件
  - 支持 TCP、UDP 路由
  - 注意
    - path 默认完整匹配， `/` 只会匹配 `/`
- Service/服务 - 路由集合
  - plugins+upstream
- Upstream/上游
  - nodes
  - LB、健康检查、重试、超时
- PubSub - 只支持 Kafka
- xRPC - stream_routes - 实现 L4 代理转发
  - 内置 redis 协议 - 可植入错误
  - 可用于实现自定义协议
- 外部插件
  - 编译为 WASM 作为 Sidecar 运行
  - 目前官方提供 Java, Go, Python, JavaScript
  - 使用 FlatBuffers 序列化 请求 - [ext-plugin.fbs](https://github.com/api7/ext-plugin-proto/blob/main/ext-plugin.fbs)
  - [api7/wasm-nginx-module](https://github.com/api7/wasm-nginx-module)
    - 目前还不完善，开发中
  - [proxy-wasm/spec](https://github.com/proxy-wasm/spec)
- [预定义变量](https://apisix.apache.org/docs/apisix/apisix-variable)

### 服务发现

- 通过 upstream.service_name 匹配使用, 发现的内容作为 nodes
- 管理接口 `/v1/discovery/{discovery_type}/dump`
- consule_kv
- dns
- eureka
- nacos
- tars
- [apisix/discovery/](https://github.com/apache/apisix/tree/master/apisix/discovery)
- kubernetes
  - 发现服务的 endpoints

```yaml
discovery:
  kubernetes:
    service:
      schema: https # https,http
      host: ${KUBERNETES_SERVICE_HOST}
      port: ${KUBERNETES_SERVICE_PORT}

    # 如果在集群外运行 需要配置客户端信息
    client:
      token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      #token: |- # 静态 Token

    # 选择生效的 namespace
    namespace_selector:
      # 匹配方式 equal, not_equal, match, not_match
      # 值可以是数组
      equal: default

    # 通过 label 选择生效服务
    label_selector: |-
      first="a",second="b"
```

### 路由

```json
{
  "plugins": {
    "key-auth": {},
    // 限定针对 consumer 生效
    "consumer-restriction": {
      "blacklist": ["jack"]
    }
  },
  "upstream": {
    // grpc,grpcs
    "schema": "http",
    "nodes": {
      "127.0.0.1:1980": 1
    },
    "type": "roundrobin"
  },
  "uri": "/hello"
}
```

## 插件

- 无服务器架构
- 可观测性
- 其它协议
  - mqtt-proxy - 基于 client_id 负载

### 通用

- batch-requests
- redirect - 重定向
  ```yaml
  http_to_https: false # 与 url,regex_uri 三选一
  url: '' # 目标地址
  regex_uri: [] # 正则替换
  ret_code: 302 # HTTP 状态码
  encode_uri: false
  append_query_string: false
  ```
- echo - 回显结果 - 用于测试
  ```yaml
  before_body: ''
  body: ''
  after_body: ''
  headers: {}
  ```
- gzip
- real-ip
- server-info - 向 ETCD 上报服务信息
  - 在配置中启用 `conf/config.yaml`
  - report_ttl=36 - 单位秒
  - 可请求 `http://127.0.0.1:9090/v1/server_info`
- ext-plugin-pre-req - 前置外部插件
  ```yaml
  # 插件和它的配置
  conf: [{ 'name': 'ext-plugin-A', 'value': '{"enable":"feature"}' }]
  allow_degradation: false
  ```
- ext-plugin-post-req - 后置外部插件

### 传输

- response-rewrite
- proxy-rewrite
- grpc-transcode
  ```yaml
  # 上传 PB POST {"content":""} /admin/proto/{id}
  # 合并 proto protoc --include_imports --descriptor_set_out=proto.pb proto/helloworld.proto
  prodo_id: ''
  service: ''
  method: ''
  deadline: 0
  # enum_as_name, enum_as_value
  # int64_as_number, int64_as_string, int64_as_hexstring
  # auto_default_values, no_default_values, use_default_values, use_default_metatable
  # enable_hooks, disable_hooks
  pb_option: []
  ```
- grpc-web
- fault-injection
- mocking

### 身份验证

- key-auth
  - Consumer - 定义 消费者的 Token
    - key
  - Route - 定义获取 key 的方式
    - header = apikey
    - query = apikey
    - hide_credentials = false - 是否透传给 upstream
- jwt-auth
  - Consumer
    - key
- basic-auth
  - Consumer
    - username
    - password
  - Router
    - hide_credentials
- authz-keycloak - OIDC 认证逻辑+Keycloak 授权判断逻辑
  - UMA
  - https://github.com/apache/apisix/blob/master/apisix/plugins/authz-keycloak.lua

```yaml
# 🌟 推荐设置自动发现，减少配置量
discovery: # <endpoint>/.well-known/uma2-configuration
token_endpoint:
resource_registration_endpoint:
client_id:
client_secret:
grant_type: urn:ietf:params:oauth:grant-type:uma-ticket
policy_enforcement_mode: ENFORCING # PERMISSIVE
# 一般格式为 资源名#scope名
permissions: []
# 加载针对资源的权限 - 需要让插件能请求 token - 因此需要 client_id 和 client_secret
lazy_load_paths: false
http_method_as_scope: false # 一般配合 lazy_load_paths 使用
timeout: 3000
access_token_expires_in: 300
access_token_expires_leeway: 0
refresh_token_expires_in: 3600
refresh_token_expires_leeway: 0
ssl_verify: true
cache_ttl_seconds: 86400 # 24h - 缓存 发现配置
keepalive: true
keepalive_timeout: 60000
keepalive_pool: 5
# 默认返回 {"error_description":"not_authorized"}
access_denied_redirect_uri:
# 配置后可使用 POST username+password 获取 token
password_grant_token_generation_incoming_uri:
```

- forward-auth
- openid-connect - OIDC 认证
  - use_jwts
    - bearer_jwt_verify
    - https://github.com/zmartzone/lua-resty-openidc
  - https://github.com/apache/apisix/blob/master/apisix/plugins/openid-connect.lua
- authz-casdoor
- wolf-rbac
- hmac-auth
- authz-casbin - 从文件加载 casbin 配置进行验证
- ldap-auth
- opa
  - 功能最强大最灵活

#### opa

**请求**

```json
{
  "type": "http",
  "request": {
    "scheme": "http",
    "path": "/get",
    "headers": {
      "user-agent": "curl/7.68.0",
      "accept": "*/*",
      "host": "127.0.0.1:9080"
    },
    "query": {},
    "port": 9080,
    "method": "GET",
    "host": "127.0.0.1"
  },
  "var": {
    "timestamp": 1701234567,
    "server_addr": "127.0.0.1",
    "server_port": "9080",
    "remote_port": "port",
    "remote_addr": "ip address"
  },
  "route": {},
  "service": {},
  "consumer": {}
}
```

**响应**

```json
{
  "result": {
    "allow": true,
    "reason": "test",
    "headers": {
      "an": "header"
    },
    "status_code": 401
  }
}
```

### 安全防护

- cors
- uri-blocker
- ip-restriction
- ua-restriction
- referer-restriction
- consumer-restriction
- csrf
- public-api - 暴露插件里的接口
  - uri
- consumer-restriction - 限定 consumer
  ```yaml
  # consumer_name - 限定 consumer 访问 service, route
  # service_id,route_id - 在 consumer 上定义， 限定访问 service,route
  type: consumer_name
  whitelist: []
  blacklist: []
  rejected_code: 403
  rejected_code: ""
  allowed_by_methods: [] # 允许的 HTTP 方法
  ```

### 流量控制

- limit-req - leaky bucket
- limit-conn - 限定连接数
- limit-count - 限定时间范围内请求
- proxy-cache
  ```yaml
  cache_strategy: disk # memory
  cache_zone: disk_cache_one
  cache_key: ['$host', '$request_uri'] # ["$host", "$uri", "-cache-id"]
  cache_bypass: []
  cache_method: ['GET', 'HEAD']
  cache_http_status: [200, 301, 404]
  hide_cache_headers: false
  cache_control: false
  no_cache: []
  cache_ttl: 300
  ```
- request-validation - JSON Schema 校验
- proxy-mirror
- api-breaker - 熔断
- traffic-split
- request-id
  ```yaml
  header_name: X-Request-Id
  include_in_response: true
  algorithm: uuid # snowflake, nanoid
  ```
- proxy-control
- client-control
  ```yaml
  max_body_size: 0 # 控制最大 body
  ```

## GraphQL

- 暴露变量用于路由
  - graphql_operation - query, mutation
  - graphql_name, graphql_root_fields

```json
{
  "methods": ["POST"],
  "uri": "/_graphql",
  "vars": [
    ["graphql_operation", "==", "query"],
    ["graphql_name", "==", "getRepo"],
    ["graphql_root_fields", "has", "owner"]
  ],
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "192.168.1.200:4000": 1
    }
  }
}
```

## global

```yaml
- name: real-ip
  enable: true
  config:
    source: http_x_forwarded_for
    recursive: true
    trusted_addresses:
      - 192.168.0.0/16
      - 10.0.0.0/8
- name: request-id
  enable: true
  # https://apisix.apache.org/docs/apisix/plugins/request-id/
  config:
    header_name: X-Request-Id
    algorithm: uuid
- name: response-rewrite
  enable: true
  # https://apisix.apache.org/docs/apisix/plugins/response-rewrite/
  config:
    headers:
      remove: [Server]
- name: elasticsearch-logger
  enable: true
  # https://apisix.apache.org/docs/apisix/plugins/elasticsearch-logger/
  config:
    endpoint_addr: http://openobserve.data-system/api/wener
    field:
      index: apisix-log
      type: collector
    auth:
      username: X
      password: X
    ssl_verify: false
    #
    timeout: 60
    batch_max_size: 500
    buffer_duration: 60
    retry_delay: 1
    max_retry_count: 3
    inactive_timeout: 5
```

**batch-processor**

```yaml
# 每批发送日志的最大条数
# 聚合的日志数量 - 注意配合 timeout
batch_max_size: 1000
# 刷新缓冲区的最大时间
# 小于 buffer_duration
inactive_timeout: 5
# 必须先处理批次中最旧条目的最长期限
buffer_duration: 60
# 从处理管道中移除之前的最大重试次数
max_retry_count: 0
# 延迟执行流程的秒数
retry_delay: 1
```

- https://apisix.apache.org/docs/apisix/batch-processor/
- https://github.com/apache/apisix/blob/master/docs/zh/latest/batch-processor.md
- https://github.com/apache/apisix/blob/master/t/plugin/http-logger.t

```bash
# 默认
KEY=edd1c9f034335f136f87ad84b625c8f1
curl -H "X-API-KEY: $KEY" 127.0.0.1:9180/apisix/admin/global_rules
```

**log_format**

```json
{ "host": "$host", "@timestamp": "$time_iso8601", "client_ip": "$remote_addr" }
```

```json
{
  "request-id": {
    "algorithm": "uuid",
    "header_name": "X-Request-Id"
  },
  "response-rewrite": {
    "headers": {
      "remove": ["Server"]
    }
  },
  "real-ip": {
    "recursive": true,
    "source": "http_x_forwarded_for",
    "trusted_addresses": ["192.168.0.0/16", "10.0.0.0/8"]
  }
}
```

## serverless

- serverless-pre-function
- serverless-post-function
- phase - rewrite, access, header_filter, body_filter, log, before_proxy
- functions

```lua
local count = 1
return function(conf,ctx)
    count = count + 1
    ngx.say(count)
end
```

# FAQ

## failed to process entries: 20: unable to get local issuer certificate, context: ngx.timer

```yaml
ssl_verify: false
```

**配置 CA**

```yaml
apisix:
  ssl:
    ssl_trusted_certificate: /path/to/certs/ca-certificates.crt
```

- elasticsearch-logger
- https://apisix.apache.org/docs/apisix/FAQ/#how-do-i-fix-the-error-unable-to-get-local-issuer-certificate-in-apache-apisix
- https://github.com/apache/apisix/issues/4370

## removing batch processor stale object

- 不会丢失数据，只是清理过期的 processor
- remove stale objects from the memory after timer expires
- 30min
- ngx.timer.at
  - https://moonbingbing.gitbooks.io/openresty-best-practices/content/ngx_lua/timer.html
  - https://github.com/openresty/lua-nginx-module
- https://github.com/apache/apisix/blob/b024f683ef6f5310a180cdb6f792365e4c78f33a/apisix/utils/batch-processor-manager.lua#L52-L67

## an upstream response is buffered to a temporary file

超出 proxy_buffer_size 后写入临时文件

没问题

```
proxy_buffer_size 4k; # 默认 4k or 8k
# proxy_buffers number size;
proxy_buffers 8 4k;  # 默认 4k or 8k

proxy_max_temp_file_size 1024m
```

- http://nginx.org/en/docs/http/ngx_http_proxy_module.html
