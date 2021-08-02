---
title: Traefik V1
---

# Traefik V1

## Notes

### Docker

```bash
# 简单启动
docker run --rm -it -p 443:443 -p 80:80 -p 8080:8080 traefik --accesslog -l INFO --web
# 使用 consul
docker run --rm -it -p 443:443 -p 80:80 -p 8080:8080 traefik --accesslog -l INFO --web --consul.endpoint=consul:8500
```

### 基本概念

- 入口
  - http
  - https
- 前端
  - 定义从入口进入的请求如何转发到后端
  - 注意, 正则里的名字并没有任何意义, 只是因为依赖的 [gorilla/mux](https://github.com/gorilla/mux) 要求必须要有
  - 可以使用 `passHostHeader` 将头完全传递到后端
  - 可以使用 `passTLSCert` 将客户端证书也转发到后端
  - 默认优先级为规则长度的反序, 避免路径重叠, 可以使用 `priority` 修改
  - 可以添加自定义头
  - 安全相关的头可以使用简化的方式启用
    - [unrolled/secure#available-options](https://github.com/unrolled/secure#available-options)
  - Modifiers
    - 不管顺序怎么样, 会在 `Matchers` 之后执行
    - 修改请求, 不影响路由
    - `AddPrefix: /products`
    - `ReplacePath: /serverless-path`
      - 替换路径并添加 `X-Replaced-Path` 头
  - Matchers
    - 定义请求如何转发到后端
    - `,` 分隔符用于定义多个 `或` 条件
    - `;` 定义多个 `与` 条件
    - `Headers: Content-Type, application/json`
      - 头匹配, 接受使用 `,` 分割的 kv 值
    - `HeadersRegexp: Content-Type, application/(text/json)`
      - 头匹配, 接受使用 `,` 分割的 kv 值
      - 值可以为正则
    - `Host: traefik.io, www.traefik.io`
    - `HostRegexp: traefik.io, {subdomain:[a-z]+}.traefik.io`
    - `Method: GET, POST, PUT`
    - `Path: /products/, /articles/{category}/{id:[0-9]+}`
    - `PathStrip: /products/`
      - 路径完全匹配, 转发到后端的时候会去掉路径
      - 会将原路径保存到 `X-Forwarded-Prefix`
    - `PathStripRegex: /articles/{category}/{id:[0-9]+}`
    - `PathPrefix: /products/, /articles/{category}/{id:[0-9]+}`
    - `PathPrefixStrip: /products/`
    - `PathPrefixStripRegex: /articles/{category}/{id:[0-9]+}`
    - `Query: foo=bar, bar=baz`
- 后端
  - 将前端的请求负载到一组服务器
  - 负载方式
    - wrr 基于权重的轮询
    - drr 动态轮询
  - 支持熔断机制
    - 方法: LatencyAtQuantileMS, NetworkErrorRatio, ResponseCodeRatio
    - 操作: AND, OR, EQ, NEQ, LT, LE, GT, GE
  - 最大连接数控制
    - 对链接分组可以使用 `request.host` , `client.ip`, `request.header.ANY_HEADER`
    - 达到阀值会返回 `429 Too Many Requests`
  - 粘性会话, 需要指定 `cookieName`
  - 健康检查
    - 可指定路径, 间隔, 端口, 要求是 http
  - 服务定义
    - 主要为 url, 路径可以在 Modifier 中指定
    - 可以指定 weight

```toml
# 入口定义
[entryPoints]
  [entryPoints.http]
  address = ":80"
    # 强制跳转到 https
    [entryPoints.http.redirect]
    entryPoint = "https"
    # url 重写
    [entryPoints.http.redirect]
    regex = "^http://localhost/(.*)"
    replacement = "http://mydomain/$1"

  [entryPoints.https]
  address = ":443"
  [entryPoints.https.tls]
  clientCAFiles = ["tests/clientca1.crt", "tests/clientca2.crt"]
    [entryPoints.https.tls]
      [[entryPoints.https.tls.certificates]]
      certFile = "tests/traefik.crt"
      keyFile = "tests/traefik.key"

# 前端
[frontends]
  # 定义一个前端
  [frontends.frontend1]
  # 指定后端
  backend = "backend2"
    # 定义路由规则
    [frontends.frontend1.routes.test_1]
    rule = "Host:test.localhost,test2.localhost"
    # 可以使用自定义头
    [frontends.frontend1.headers.customresponseheaders]
    X-Custom-Response-Header = "True"
    [frontends.frontend1.headers.customrequestheaders]
    X-Script-Name = "test"
  # 定义了一个前端
  [frontends.frontend2]
  # 均直接转发
  backend = "backend1"
  passHostHeader = true
  passTLSCert = true
  # 指定优先级
  priority = 10
  entrypoints = ["https"] # overrides defaultEntryPoints
    [frontends.frontend2.routes.test_1]
    rule = "HostRegexp:localhost,{subdomain:[a-z]+}.localhost"
  [frontends.frontend3]
  backend = "backend2"
    # 规则可以写在一起也可以分开写
    [frontends.frontend3.routes.test_1]
    rule = "Host:test3.localhost;Path:/test"
    [frontends.frontend3.routes.test_2]
    rule = "Query: test=1"

# 后端
[backends]
  [backends.backend1]
    # 定义熔断机制
    [backends.backend1.circuitbreaker]
    expression = "NetworkErrorRatio() > 0.5"
    # 设置最大连接数
    [backends.backend1.maxconn]
    amount = 10
    extractorfunc = "request.host"
    # 定义后端服务
    [backends.backend1.servers.server1]
    url = "http://172.17.0.2:80"
    weight = 10
    [backends.backend1.servers.server2]
    url = "http://172.17.0.3:80"
    weight = 1
    # 定义健康检查
    [backends.backend1.healthcheck]
    path = "/health"
    interval = "10s"
    port = 8080
  [backends.backend2]
    # 设置负载方式
    [backends.backend2.LoadBalancer]
    method = "drr"
    [backends.backend2.loadbalancer.stickiness]
    # 定义粘性会话
    # 可选, 默认为 sha1 六位字符
    cookieName = "my_cookie"
    [backends.backend2.servers.server1]
    url = "http://172.17.0.4:80"
    weight = 1
    [backends.backend2.servers.server2]
    url = "http://172.17.0.5:80"
    weight = 2
```

### 配置

- 配置路径
  - `/etc/traefik/`
  - `$HOME/.traefik/`
  - `.`

```toml
# 全局配置
debug=false
# "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "PANIC"
logLevel = "ERROR"
# 前端未指定 entrypoint 的默认值
defaultEntryPoints = ["http"]

# 安全停止的超时时间
graceTimeOut = "10s"

# 间隔检测新版本
checkNewVersion = false

# Backends throttle duration.
ProvidersThrottleDuration = "2s"

# Controls the maximum idle (keep-alive) connections to keep per-host.
MaxIdleConnsPerHost = 200

# If set to true invalid SSL certificates are accepted for backends.
# This disables detection of man-in-the-middle attacks so should only be used on secure backend networks.
InsecureSkipVerify = true

# Register Certificates in the RootCA.
RootCAs = [ "/mycert.cert" ]

# 日志配置
[traefikLog]
# 默认为 os.Stdout
# 如果路径不存在会创建
filePath = "log/traefik.log"
# 格式可以为 json 和 common
format = "common"


# 访问日志
[accessLog]
# 默认为 os.Stdout
filePath = "/path/to/log/log.txt"
# 默认为 common log format - clf
format = "common"

# 文件配置
[file]
# 文件引入
filename = "rules.toml"
# 配置目录
directory = "/path/to/config/"
# 检测改变
watch=true


# 最小化配置
[entryPoints]
  [entryPoints.http]
  address = ":8080"
[web]
address=":8081"
```

### admin

```bash
# 健康检查
# 可以使用 -c 指定配置文件
traefik healthcheck
# 将异常提交到 github
traefik bug
```
