# Traefik

## Tips
* https://github.com/containous/traefik
* [traefik.sample.toml](https://raw.githubusercontent.com/containous/traefik/master/traefik.sample.toml)
* ISSUES
  * [#2674](https://github.com/containous/traefik/issues/2674) Let's Encrypt: use ACME API V2
    * 支持泛域名
* ACME
  *  20 certificates per domain per week
  * https://letsencrypt.org/docs/rate-limits/

## Notes

### Docker

```bash
# 简单启动
docker run --rm -it -p 443:443 -p 80:80 -p 8080:8080 traefik --accesslog -l INFO --web
# 使用 consul
docker run --rm -it -p 443:443 -p 80:80 -p 8080:8080 traefik --accesslog -l INFO --web --consul.endpoint=consul:8500
```

### 基本概念
* 入口
  * http
  * https
* 前端
  * 定义从入口进入的请求如何转发到后端
  * 注意, 正则里的名字并没有任何意义, 只是因为依赖的 [gorilla/mux](https://github.com/gorilla/mux) 要求必须要有
  * 可以使用 `passHostHeader` 将头完全传递到后端
  * 可以使用 `passTLSCert` 将客户端证书也转发到后端
  * 默认优先级为规则长度的反序, 避免路径重叠, 可以使用 `priority` 修改
  * 可以添加自定义头
  * 安全相关的头可以使用简化的方式启用
    * [unrolled/secure#available-options](https://github.com/unrolled/secure#available-options)
  * Modifiers
    * 不管顺序怎么样, 会在 `Matchers` 之后执行
    * 修改请求, 不影响路由
    * `AddPrefix: /products`
    * `ReplacePath: /serverless-path`
      * 替换路径并添加 `X-Replaced-Path` 头
  * Matchers
    * 定义请求如何转发到后端
    * `,` 分隔符用于定义多个 `或` 条件
    * `;` 定义多个 `与` 条件
    * `Headers: Content-Type, application/json`
      * 头匹配, 接受使用 `,` 分割的 kv 值
    * `HeadersRegexp: Content-Type, application/(text/json)`
      * 头匹配, 接受使用 `,` 分割的 kv 值
      * 值可以为正则
    * `Host: traefik.io, www.traefik.io`
    * `HostRegexp: traefik.io, {subdomain:[a-z]+}.traefik.io`
    * `Method: GET, POST, PUT`
    * `Path: /products/, /articles/{category}/{id:[0-9]+}`
    * `PathStrip: /products/`
      * 路径完全匹配, 转发到后端的时候会去掉路径
      * 会将原路径保存到 `X-Forwarded-Prefix`
    * `PathStripRegex: /articles/{category}/{id:[0-9]+}`
    * `PathPrefix: /products/, /articles/{category}/{id:[0-9]+}`
    * `PathPrefixStrip: /products/`
    * `PathPrefixStripRegex: /articles/{category}/{id:[0-9]+}`
    * `Query: foo=bar, bar=baz`
* 后端
  * 将前端的请求负载到一组服务器
  * 负载方式
    * wrr 基于权重的轮询
    * drr 动态轮询
  * 支持熔断机制
    * 方法: LatencyAtQuantileMS, NetworkErrorRatio, ResponseCodeRatio
    * 操作: AND, OR, EQ, NEQ, LT, LE, GT, GE
  * 最大连接数控制
    * 对链接分组可以使用 `request.host` , `client.ip`, `request.header.ANY_HEADER`
    * 达到阀值会返回 `429 Too Many Requests`
  * 粘性会话, 需要指定 `cookieName`
  * 健康检查
    * 可指定路径, 间隔, 端口, 要求是 http
  * 服务定义
    * 主要为 url, 路径可以在 Modifier 中指定
    * 可以指定 weight

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
* 配置路径
  * `/etc/traefik/`
  * `$HOME/.traefik/`
  * `.`

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

## traefik --help

```
traefik is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease.
Complete documentation is available at https://traefik.io

Usage: traefik [--flag=flag_argument] [-f[flag_argument]] ...     set flag_argument to flag(s)
   or: traefik [--flag[=true|false| ]] [-f[true|false| ]] ...     set true/false to boolean flag(s)

Available Commands:
	bug                                                Report an issue on Traefik bugtracker
	healthcheck                                        Calls traefik /ping to check health (web provider must be enabled)
	storeconfig                                        Store the static traefik configuration into a Key-value stores. Traefik will not start.
	version                                            Print version
Use "traefik [command] --help" for more information about a command.

Flags:
    --accesslog                                Access log settings                                                              (default "false")
    --accesslog.filepath                       Access log file path. Stdout is used when omitted or empty
    --accesslog.format                         Access log format: json | common                                                 (default "common")
    --accesslogsfile                           (Deprecated) Access logs file
    --acme                                     Enable ACME (Let's Encrypt): automatic SSL                                       (default "false")
    --acme.acmelogging                         Enable debug logging of ACME actions.                                            (default "false")
    --acme.caserver                            CA server to use.
    --acme.delaydontcheckdns                   Assume DNS propagates after a delay in seconds rather than finding and querying  (default "0")
                                               nameservers.
    --acme.dnsprovider                         Use a DNS based challenge provider rather than HTTPS.
    --acme.domains                             SANs (alternative domains) to each main domain using format:                     (default "[]")
                                               --acme.domains='main.com,san1.com,san2.com'
                                               --acme.domains='main.net,san1.net,san2.net'
    --acme.email                               Email address used for registration
    --acme.entrypoint                          Entrypoint to proxy acme challenge to.
    --acme.ondemand                            Enable on demand certificate. This will request a certificate from Let's         (default "false")
                                               Encrypt during the first TLS handshake for a hostname that does not yet have a
                                               certificate.
    --acme.onhostrule                          Enable certificate generation on frontends Host rules.                           (default "false")
    --acme.storage                             File or key used for certificates storage.
    --acme.tlsconfig                           TLS config in case wildcard certs are used                                       (default "false")
    --boltdb                                   Enable Boltdb backend with default settings                                      (default "false")
    --boltdb.constraints                       Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --boltdb.debugloggeneratedtemplate         Enable debug logging of generated configuration template.                        (default "false")
    --boltdb.endpoint                          Comma separated server endpoints                                                 (default "127.0.0.1:4001")
    --boltdb.filename                          Override default configuration template. For advanced users :)
    --boltdb.password                          KV Password
    --boltdb.prefix                            Prefix used for KV store                                                         (default "/traefik")
    --boltdb.tls                               Enable TLS support                                                               (default "false")
    --boltdb.tls.ca                            TLS CA
    --boltdb.tls.cert                          TLS cert
    --boltdb.tls.insecureskipverify            TLS insecure skip verify                                                         (default "false")
    --boltdb.tls.key                           TLS key
    --boltdb.trace                             Display additional provider logs (if available).                                 (default "false")
    --boltdb.username                          KV Username
    --boltdb.watch                             Watch provider                                                                   (default "true")
    --checknewversion                          Periodically check if a new version has been released                            (default "true")
    --cluster                                  Enable clustering                                                                (default "true")
    --cluster.node                             Node name
-c, --configfile                               Configuration file to use (TOML).
    --constraints                              Filter services by constraint, matching with service tags                        (default "[]")
    --consul                                   Enable Consul backend with default settings                                      (default "true")
    --consul.constraints                       Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --consul.debugloggeneratedtemplate         Enable debug logging of generated configuration template.                        (default "false")
    --consul.endpoint                          Comma separated server endpoints                                                 (default "127.0.0.1:8500")
    --consul.filename                          Override default configuration template. For advanced users :)
    --consul.password                          KV Password
    --consul.prefix                            Prefix used for KV store                                                         (default "traefik")
    --consul.tls                               Enable TLS support                                                               (default "false")
    --consul.tls.ca                            TLS CA
    --consul.tls.cert                          TLS cert
    --consul.tls.insecureskipverify            TLS insecure skip verify                                                         (default "false")
    --consul.tls.key                           TLS key
    --consul.trace                             Display additional provider logs (if available).                                 (default "false")
    --consul.username                          KV Username
    --consul.watch                             Watch provider                                                                   (default "true")
    --consulcatalog                            Enable Consul catalog backend with default settings                              (default "true")
    --consulcatalog.constraints                Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --consulcatalog.debugloggeneratedtemplate  Enable debug logging of generated configuration template.                        (default "false")
    --consulcatalog.domain                     Default domain used
    --consulcatalog.endpoint                   Consul server endpoint                                                           (default "127.0.0.1:8500")
    --consulcatalog.exposedbydefault           Expose Consul services by default                                                (default "true")
    --consulcatalog.filename                   Override default configuration template. For advanced users :)
    --consulcatalog.frontendrule               Frontend rule used for Consul services                                           (default "Host:{{.ServiceName}}.{{.Domain}}")
    --consulcatalog.prefix                     Prefix used for Consul catalog tags                                              (default "traefik")
    --consulcatalog.trace                      Display additional provider logs (if available).                                 (default "false")
    --consulcatalog.watch                      Watch provider                                                                   (default "false")
-d, --debug                                    Enable debug mode                                                                (default "false")
    --defaultentrypoints                       Entrypoints to be used by frontends that do not specify any entrypoint
    --docker                                   Enable Docker backend with default settings                                      (default "false")
    --docker.constraints                       Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --docker.debugloggeneratedtemplate         Enable debug logging of generated configuration template.                        (default "false")
    --docker.domain                            Default domain used
    --docker.endpoint                          Docker server endpoint. Can be a tcp or a unix socket endpoint                   (default "unix:///var/run/docker.sock")
    --docker.exposedbydefault                  Expose containers by default                                                     (default "true")
    --docker.filename                          Override default configuration template. For advanced users :)
    --docker.swarmmode                         Use Docker on Swarm Mode                                                         (default "false")
    --docker.tls                               Enable Docker TLS support                                                        (default "false")
    --docker.tls.ca                            TLS CA
    --docker.tls.cert                          TLS cert
    --docker.tls.insecureskipverify            TLS insecure skip verify                                                         (default "false")
    --docker.tls.key                           TLS key
    --docker.trace                             Display additional provider logs (if available).                                 (default "false")
    --docker.usebindportip                     Use the ip address from the bound port, rather than from the inner network       (default "false")
    --docker.watch                             Watch provider                                                                   (default "true")
    --dynamodb                                 Enable DynamoDB backend with default settings                                    (default "true")
    --dynamodb.accesskeyid                     The AWS credentials access key to use for making requests
    --dynamodb.constraints                     Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --dynamodb.debugloggeneratedtemplate       Enable debug logging of generated configuration template.                        (default "false")
    --dynamodb.endpoint                        The endpoint of a dynamodb. Used for testing with a local dynamodb
    --dynamodb.filename                        Override default configuration template. For advanced users :)
    --dynamodb.refreshseconds                  Polling interval (in seconds)                                                    (default "15")
    --dynamodb.region                          The AWS region to use for requests
    --dynamodb.secretaccesskey                 The AWS credentials secret key to use for making requests
    --dynamodb.tablename                       The AWS dynamodb table that stores configuration for traefik                     (default "traefik")
    --dynamodb.trace                           Display additional provider logs (if available).                                 (default "false")
    --dynamodb.watch                           Watch provider                                                                   (default "true")
    --ecs                                      Enable ECS backend with default settings                                         (default "true")
    --ecs.accesskeyid                          The AWS credentials access key to use for making requests
    --ecs.autodiscoverclusters                 Auto discover cluster                                                            (default "false")
    --ecs.cluster                              deprecated - ECS Cluster name
    --ecs.clusters                             ECS Clusters name                                                                (default "[default]")
    --ecs.constraints                          Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --ecs.debugloggeneratedtemplate            Enable debug logging of generated configuration template.                        (default "false")
    --ecs.domain                               Default domain used
    --ecs.exposedbydefault                     Expose containers by default                                                     (default "true")
    --ecs.filename                             Override default configuration template. For advanced users :)
    --ecs.refreshseconds                       Polling interval (in seconds)                                                    (default "15")
    --ecs.region                               The AWS region to use for requests
    --ecs.secretaccesskey                      The AWS credentials access key to use for making requests
    --ecs.trace                                Display additional provider logs (if available).                                 (default "false")
    --ecs.watch                                Watch provider                                                                   (default "true")
    --entrypoints                              Entrypoints definition using format: --entryPoints='Name:http Address::8000      (default "map[]")
                                               Redirect.EntryPoint:https' --entryPoints='Name:https Address::4442
                                               TLS:tests/traefik.crt,tests/traefik.key;prod/traefik.crt,prod/traefik.key'
    --etcd                                     Enable Etcd backend with default settings                                        (default "true")
    --etcd.constraints                         Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --etcd.debugloggeneratedtemplate           Enable debug logging of generated configuration template.                        (default "false")
    --etcd.endpoint                            Comma separated server endpoints                                                 (default "127.0.0.1:2379")
    --etcd.filename                            Override default configuration template. For advanced users :)
    --etcd.password                            KV Password
    --etcd.prefix                              Prefix used for KV store                                                         (default "/traefik")
    --etcd.tls                                 Enable TLS support                                                               (default "false")
    --etcd.tls.ca                              TLS CA
    --etcd.tls.cert                            TLS cert
    --etcd.tls.insecureskipverify              TLS insecure skip verify                                                         (default "false")
    --etcd.tls.key                             TLS key
    --etcd.trace                               Display additional provider logs (if available).                                 (default "false")
    --etcd.username                            KV Username
    --etcd.watch                               Watch provider                                                                   (default "true")
    --eureka                                   Enable Eureka backend with default settings                                      (default "true")
    --eureka.constraints                       Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --eureka.debugloggeneratedtemplate         Enable debug logging of generated configuration template.                        (default "false")
    --eureka.delay                             Override default configuration time between refresh                              (default "30s")
    --eureka.endpoint                          Eureka server endpoint
    --eureka.filename                          Override default configuration template. For advanced users :)
    --eureka.trace                             Display additional provider logs (if available).                                 (default "false")
    --eureka.watch                             Watch provider                                                                   (default "false")
    --file                                     Enable File backend with default settings                                        (default "false")
    --file.constraints                         Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --file.debugloggeneratedtemplate           Enable debug logging of generated configuration template.                        (default "false")
    --file.directory                           Load configuration from one or more .toml files in a directory
    --file.filename                            Override default configuration template. For advanced users :)
    --file.trace                               Display additional provider logs (if available).                                 (default "false")
    --file.watch                               Watch provider                                                                   (default "true")
    --forwardingtimeouts                       Timeouts for requests forwarded to the backend servers                           (default "true")
    --forwardingtimeouts.dialtimeout           The amount of time to wait until a connection to a backend server can be         (default "30s")
                                               established. Defaults to 30 seconds. If zero, no timeout exists
    --forwardingtimeouts.responseheadertimeout The amount of time to wait for a server's response headers after fully writing   (default "0s")
                                               the request (including its body, if any). If zero, no timeout exists
-g, --gracetimeout                             Duration to give active requests a chance to finish before Traefik stops         (default "10s")
    --healthcheck                              Health check parameters                                                          (default "true")
    --healthcheck.interval                     Default periodicity of enabled health checks                                     (default "30s")
    --idletimeout                              (Deprecated) maximum amount of time an idle (keep-alive) connection will remain  (default "0s")
                                               idle before closing itself.
    --insecureskipverify                       Disable SSL certificate verification                                             (default "false")
    --kubernetes                               Enable Kubernetes backend with default settings                                  (default "false")
    --kubernetes.certauthfilepath              Kubernetes certificate authority file path (not needed for in-cluster client)
    --kubernetes.constraints                   Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --kubernetes.debugloggeneratedtemplate     Enable debug logging of generated configuration template.                        (default "false")
    --kubernetes.disablepasshostheaders        Kubernetes disable PassHost Headers                                              (default "false")
    --kubernetes.endpoint                      Kubernetes server endpoint (required for external cluster client)
    --kubernetes.filename                      Override default configuration template. For advanced users :)
    --kubernetes.labelselector                 Kubernetes api label selector to use
    --kubernetes.namespaces                    Kubernetes namespaces                                                            (default "[]")
    --kubernetes.token                         Kubernetes bearer token (not needed for in-cluster client)
    --kubernetes.trace                         Display additional provider logs (if available).                                 (default "false")
    --kubernetes.watch                         Watch provider                                                                   (default "true")
-l, --loglevel                                 Log level                                                                        (default "ERROR")
    --marathon                                 Enable Marathon backend with default settings                                    (default "true")
    --marathon.basic                           Enable basic authentication                                                      (default "true")
    --marathon.basic.httpbasicauthuser         Basic authentication User
    --marathon.basic.httpbasicpassword         Basic authentication Password
    --marathon.constraints                     Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --marathon.dcostoken                       DCOSToken for DCOS environment, This will override the Authorization header
    --marathon.debugloggeneratedtemplate       Enable debug logging of generated configuration template.                        (default "false")
    --marathon.dialertimeout                   Set a non-default connection timeout for Marathon                                (default "1m0s")
    --marathon.domain                          Default domain used
    --marathon.endpoint                        Marathon server endpoint. You can also specify multiple endpoint for Marathon    (default "http://127.0.0.1:8080")
    --marathon.exposedbydefault                Expose Marathon apps by default                                                  (default "true")
    --marathon.filename                        Override default configuration template. For advanced users :)
    --marathon.forcetaskhostname               Force to use the task's hostname.                                                (default "false")
    --marathon.groupsassubdomains              Convert Marathon groups to subdomains                                            (default "false")
    --marathon.keepalive                       Set a non-default TCP Keep Alive time in seconds                                 (default "10s")
    --marathon.marathonlbcompatibility         Add compatibility with marathon-lb labels                                        (default "false")
    --marathon.respectreadinesschecks          Filter out tasks with non-successful readiness checks during deployments         (default "false")
    --marathon.tls                             Enable Docker TLS support                                                        (default "false")
    --marathon.tls.ca                          TLS CA
    --marathon.tls.cert                        TLS cert
    --marathon.tls.insecureskipverify          TLS insecure skip verify                                                         (default "false")
    --marathon.tls.key                         TLS key
    --marathon.trace                           Display additional provider logs (if available).                                 (default "false")
    --marathon.watch                           Watch provider                                                                   (default "true")
    --maxidleconnsperhost                      If non-zero, controls the maximum idle (keep-alive) to keep per-host.  If zero,  (default "200")
                                               DefaultMaxIdleConnsPerHost is used
    --mesos                                    Enable Mesos backend with default settings                                       (default "true")
    --mesos.constraints                        Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --mesos.debugloggeneratedtemplate          Enable debug logging of generated configuration template.                        (default "false")
    --mesos.domain                             Default domain used
    --mesos.endpoint                           Mesos server endpoint. You can also specify multiple endpoint for Mesos          (default "http://127.0.0.1:5050")
    --mesos.exposedbydefault                   Expose Mesos apps by default                                                     (default "true")
    --mesos.filename                           Override default configuration template. For advanced users :)
    --mesos.groupsassubdomains                 Convert Mesos groups to subdomains                                               (default "false")
    --mesos.ipsources                          IPSources (e.g. host, docker, mesos, rkt)
    --mesos.refreshseconds                     Polling interval (in seconds)                                                    (default "30")
    --mesos.statetimeoutsecond                 HTTP Timeout (in seconds)                                                        (default "30")
    --mesos.trace                              Display additional provider logs (if available).                                 (default "false")
    --mesos.watch                              Watch provider                                                                   (default "true")
    --mesos.zkdetectiontimeout                 Zookeeper timeout (in seconds)                                                   (default "30")
    --providersthrottleduration                Backends throttle duration: minimum duration between 2 events from providers     (default "2s")
                                               before applying a new configuration. It avoids unnecessary reloads if multiples
                                               events are sent in a short amount of time.
    --rancher                                  Enable Rancher backend with default settings                                     (default "true")
    --rancher.accesskey                        Rancher server API access key
    --rancher.api                              Enable the Rancher API provider                                                  (default "true")
    --rancher.api.accesskey                    Rancher server API access key
    --rancher.api.endpoint                     Rancher server API HTTP(S) endpoint
    --rancher.api.secretkey                    Rancher server API secret key
    --rancher.constraints                      Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --rancher.debugloggeneratedtemplate        Enable debug logging of generated configuration template.                        (default "false")
    --rancher.domain                           Default domain used
    --rancher.enableservicehealthfilter        Filter services with unhealthy states and inactive states                        (default "false")
    --rancher.endpoint                         Rancher server API HTTP(S) endpoint
    --rancher.exposedbydefault                 Expose services by default                                                       (default "true")
    --rancher.filename                         Override default configuration template. For advanced users :)
    --rancher.metadata                         Enable the Rancher metadata service provider                                     (default "true")
    --rancher.metadata.intervalpoll            Poll the Rancher metadata service every 'rancher.refreshseconds' (less accurate) (default "false")
    --rancher.metadata.prefix                  Prefix used for accessing the Rancher metadata service
    --rancher.refreshseconds                   Polling interval (in seconds)                                                    (default "15")
    --rancher.secretkey                        Rancher server API secret key
    --rancher.trace                            Display additional provider logs (if available).                                 (default "false")
    --rancher.watch                            Watch provider                                                                   (default "true")
    --respondingtimeouts                       Timeouts for incoming requests to the Traefik instance                           (default "true")
    --respondingtimeouts.idletimeout           IdleTimeout is the maximum amount duration an idle (keep-alive) connection will  (default "3m0s")
                                               remain idle before closing itself. Defaults to 180 seconds. If zero, no timeout
                                               is set
    --respondingtimeouts.readtimeout           ReadTimeout is the maximum duration for reading the entire request, including    (default "0s")
                                               the body. If zero, no timeout is set
    --respondingtimeouts.writetimeout          WriteTimeout is the maximum duration before timing out writes of the response.   (default "0s")
                                               If zero, no timeout is set
    --retry                                    Enable retry sending request if network error                                    (default "true")
    --retry.attempts                           Number of attempts                                                               (default "0")
    --rootcas                                  Add cert file for self-signed certificate
    --traefiklogsfile                          Traefik logs file. Stdout is used when omitted or empty
    --web                                      Enable Web backend with default settings                                         (default "true")
    --web.address                              Web administration port                                                          (default ":8080")
    --web.certfile                             SSL certificate
    --web.keyfile                              SSL certificate
    --web.metrics                              Enable a metrics exporter                                                        (default "true")
    --web.metrics.datadog                      DataDog metrics exporter type                                                    (default "true")
    --web.metrics.datadog.address              DataDog's address                                                                (default "localhost:8125")
    --web.metrics.datadog.pushinterval         DataDog push interval                                                            (default "10s")
    --web.metrics.prometheus                   Prometheus metrics exporter type                                                 (default "true")
    --web.metrics.prometheus.buckets           Buckets for latency metrics                                                      (default "[0.1 0.3 1.2 5]")
    --web.metrics.statsd                       StatsD metrics exporter type                                                     (default "true")
    --web.metrics.statsd.address               StatsD address                                                                   (default "localhost:8125")
    --web.metrics.statsd.pushinterval          DataDog push interval                                                            (default "10s")
    --web.path                                 Root path for dashboard and API
    --web.readonly                             Enable read only API                                                             (default "false")
    --web.statistics                           Enable more detailed statistics                                                  (default "false")
    --web.statistics.recenterrors              Number of recent errors logged                                                   (default "10")
    --zookeeper                                Enable Zookeeper backend with default settings                                   (default "false")
    --zookeeper.constraints                    Filter services by constraint, matching with Traefik tags.                       (default "[]")
    --zookeeper.debugloggeneratedtemplate      Enable debug logging of generated configuration template.                        (default "false")
    --zookeeper.endpoint                       Comma separated server endpoints                                                 (default "127.0.0.1:2181")
    --zookeeper.filename                       Override default configuration template. For advanced users :)
    --zookeeper.password                       KV Password
    --zookeeper.prefix                         Prefix used for KV store                                                         (default "/traefik")
    --zookeeper.tls                            Enable TLS support                                                               (default "false")
    --zookeeper.tls.ca                         TLS CA
    --zookeeper.tls.cert                       TLS cert
    --zookeeper.tls.insecureskipverify         TLS insecure skip verify                                                         (default "false")
    --zookeeper.tls.key                        TLS key
    --zookeeper.trace                          Display additional provider logs (if available).                                 (default "false")
    --zookeeper.username                       KV Username
    --zookeeper.watch                          Watch provider                                                                   (default "true")
-h, --help                                     Print Help (this message) and exit
```
