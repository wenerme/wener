---
id: traefik
title: Traefik
---

# Traefik

## Tips
* [containous/traefik](https://github.com/containous/traefik)
  * [traefik.sample.toml](https://raw.githubusercontent.com/containous/traefik/master/traefik.sample.toml)
* ISSUES
    * 支持泛域名
  * [#5048](https://github.com/containous/traefik/issues/5048) 支持 UDP 
* ACME
  * 20 certificates per domain per week
  * https://letsencrypt.org/docs/rate-limits/
* 注意
  * 如果 EndPoint 是 HTTPS 但是 router 未指定 tls 会无法匹配出现 404 - router 相当于是匹配 HTTP

```bash
# 启动
# 配置文件支持 yaml、toml、json
# 人为配置推荐 yaml
traefik --configfile traefik.yaml
```

__基础配置__

```yaml
providers:
  file:
    # 自动监听该目录配置
    directory: traefik.d
    watch: true

entryPoints:
  http:
    address: ":8080"
  https:
    address: ":8443"
```

## 配置

* [Static Configuration](https://docs.traefik.io/master/reference/static-configuration/file/)

### 静态配置项

```yaml
# 全局配置
global:
  checkNewVersion: false
  sendAnonymousUsage: false
# 服务端传输配置
serversTransport:
  insecureSkipVerify: false
  rootCAs: ["foobar", "foobar"]
  maxIdleConnsPerHost: 42
  forwardingTimeouts:
    dialTimeout: 42
    responseHeaderTimeout: 42
    idleConnTimeout: 42

# 默认
entryPoints:
  web:
    address: ':80'
  websecure:
    address: ':443'
# 配置发现
providers:
  providersThrottleDuration: 42
  file:
    directory: traefik.d
    watch: true
    filename: traefik.yaml
    debugLogGeneratedTemplate: true
# 启用 API
api:
  # 不安全模式可以直接访问
  # 安全模式会定义 api@internal 内部服务，需要自行配置路由
  insecure: true
  dashboard: true
  # 添加 /debug 端口
  debug: true
# 指标监控
metrics:
  prometheus:
    buckets: []
    addEntryPointsLabels: true
    addServicesLabels: true
    entryPoint: traefik
# 启用 PING - 用于健康检查 - 端口为 /ping
ping:
  entryPoint: traefik
# 日志配置
log:
  level: INFO
  filePath: traefik.log
  # common/json
  format: common
# 访问日志配置
accessLog:
  filePath: access.log
  format: json
  # 在内存缓冲的行数
  bufferingSize: 100
  # 落日志的条件 - 或 关系
  filters:
    statusCodes: [ 400, 401 ]
    # 重试
    retryAttempts: true
    # 至少 10ms
    minDuration: 10
  # 字段控制
  fields:
    # 保留字段
    defaultMode: keep
    names:
      # 丢弃字段
      ClientUsername: drop
      name1: foobar
    headers:
      # 将字段值替换为 redacted
      "User-Agent": "redact"

# 调用跟踪
tracing:
  serviceName: foobar
  spanNameLimit: 42
  zipkin:
    httpEndpoint: foobar
    sameSpan: true
    id128Bit: true
    sampleRate: 42
# 主机域名解析
hostResolver:
  cnameFlattening: true
  resolvConfig: foobar
  resolvDepth: 5
# 证书解析
certificatesResolvers:
  CertificateResolver0:
    # let‘s encrypt
    acme:
      email: foobar
      caServer: foobar
      storage: foobar
      keyType: foobar
      dnsChallenge:
        provider: foobar
        delayBeforeCheck: 42
        resolvers:
        - foobar
        - foobar
        disablePropagationCheck: true
      httpChallenge:
        entryPoint: foobar
      tlsChallenge: {}
```

#### PowerDNS 证书
```yaml
certificatesResolvers:
  pdns:
    acme:
      dnsChallenge:
        # 通过环境变量配置链接信息 PDNS_API_KEY, PDNS_API_URL
        # 环境变量也可以使用 *_FILE 指向文件来配置
        provider: pdns
```

__使用__

```yaml
http:
  routers:
    traefik:
      entryPoints: [ https ]
      rule: Host(`traefik.example.com`)
      service: api@internal
      tls:
        # 引用定义
        certResolver: pdns
        # 使用通配符证书
        domains:
        - main: example.com
          sans:
          - "*.example.com"
```

#### Docker 配置发现

```yaml
# 运行 docker 添加 -v /var/run/docker.sock:/var/run/docker.sock
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    # 是否默认暴露服务 - 正常需要 traefik.enable=true
    exposedByDefault: false
    # 默认的映射规则
    # 支持 https://masterminds.github.io/sprig 函数
    # defaultRule: "Host(`{{ .Name }}.{{ index .Labels \"customLabel\"}}`)"
```

```bash
docker run --rm -it \
  -l traefik.enable=true \
  -l traefik.http.routers.my-container.rule=Host(`mydomain.com`) \
  -l traefik.http.services.my-container-service.loadbalancer.server.port=80
  --name web nginx
```

## FAQ
### traefik v1 vs v2
* 新特性
  * 支持带 SNI 的 TCP 路由和多协议端口
  * 支持 TCP 和 HTTP 在同一个端口 - 使用 SNI 区分
  * 新的结构 Routers, Middlewares, Services
  * 新的监控页面
  * 带权重的 AB 发布
  * 服务负载均衡支持镜像请求 - 将请求发送到多个端忽略返回结果
* 迁移点
  * 没有了 Frontends 和 Backends 概念，新的核心组件为 Routers, Middlewares, Services
  * TLS 每个路由动态配置 - v1 为全局静态
  * HTTP 调整 HTTPS 现在是路由 - v1 需要在入口配置
  * LetsEncrypt 配置调整
  * 日志不在作为全局配置，配置在 log 区块下
  * 移除了所有全局设置
  * __v2 的 provider 支持较少__
* 参考
  * [v2](https://blog.containo.us/traefik-2-0-6531ec5196c2)
  * [v1 迁移 v2](https://docs.traefik.io/migration/v1-to-v2/)
