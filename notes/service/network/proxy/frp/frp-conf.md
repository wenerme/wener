---
tags:
  - Configuration
---

# 配置

- 配置支持 Go template 模板渲染，可通过 `{{ .Envs.VAR_NAME }}` 访问系统环境变量。
- HTTPS 流量主要通过 SNI（Server Name Indication）进行域名路由。

:::caution

- **格式演进**：frp 自 `v0.52.0` 起正式弃用旧版 `.ini` 格式，全面采用结构化 **v1 配置系统**，原生支持 **YAML**（`.yaml` / `.yml`）、**TOML**（`.toml`）与 **JSON**（`.json`）。
- **域名约束**：`customDomains` 不能是 `subDomainHost` 的子域名（例如 `a.b.c.com` 也会被视为 `c.com` 的子域名）。
- **子域名命名**：`subdomain` 只能是单级标识，不能包含 `.` 和 `*`。
- **服务重启与重载**：`frps` 暂不支持热重载，修改配置需要重启；`frpc` 开启 `webServer` 管理端口后支持 `frpc reload -c frpc.yaml`。
- **访问端配置**：STCP / XTCP 的 `visitors` 必须配置对应的 `serverName`、`secretKey`，若服务方限制了 `allowUsers`，访客端还需匹配 `serverUser`。

:::

## frps 

### frps.yaml

```yaml
bindPort: 7000
kcpBindPort: 7000

# 建议设置 Token，避免他人未经授权连接服务暴露端口
auth:
  token: 'your-secure-token'

# HTTP / HTTPS 虚拟主机服务
subDomainHost: 'example.com'
vhostHTTPPort: 8080
vhostHTTPSPort: 8443
```

### 完整详解配置（frps.yaml）

```yaml
# 监听地址，IPv6 格式如 "[::1]" 或 "::"
bindAddr: '0.0.0.0'
bindPort: 7000

# KCP UDP 监听端口（可与 bindPort 相同；未配置则不启用 KCP）
kcpBindPort: 7000

# QUIC 监听端口（未配置则不启用 QUIC）
# quicBindPort: 7002

# 代理绑定地址，默认为 bindAddr
# proxyBindAddr: "127.0.0.1"

# HTTP / HTTPS 虚拟主机监听端口
vhostHTTPPort: 80
vhostHTTPSPort: 443
# HTTP 响应头超时（秒），默认 60s
vhostHTTPTimeout: 60

# TCP 多路复用 HTTP CONNECT 端口，为 0 时不开启
# tcpmuxHTTPConnectPort: 1337

# 控制面板与 API
webServer:
  addr: '0.0.0.0'
  port: 7500
  user: 'admin'
  password: 'admin'
  # webServer.tls.certFile: "server.crt"
  # webServer.tls.keyFile: "server.key"

# 开启 /metrics Prometheus 监控接口（位于 webServer 端口上）
enablePrometheus: true

# 日志输出配置
log:
  to: './frps.log' # 支持控制台 console 或文件路径
  level: 'info' # trace, debug, info, warn, error
  maxDays: 3
  disablePrintColor: false

# 是否向客户端返回详细错误调试信息
detailedErrorsToClient: true

# 认证配置
auth:
  method: 'token' # 支持 token 或 oidc
  token: '12345678'
  # additionalScopes: ["HeartBeats", "NewWorkConns"]
  # oidc 配置
  # oidc:
  #   issuer: ""
  #   audience: ""
  #   skipExpiryCheck: false
  #   skipIssuerCheck: false

# 限制客户端允许绑定的远程端口范围
allowPorts:
  - start: 2000
    end: 3000
  - single: 3001
  - single: 3003
  - start: 4000
    end: 50000

# 单个客户端最大可用端口数，0 表示无限制
maxPortsPerClient: 0

# 泛域名后缀配置，客户端配置 subdomain: test 时路由为 test.frps.com
subDomainHost: 'frps.com'

# 自定义 404 页面
# custom404Page: "/path/to/404.html"

# UDP 包大小（Byte），客户端和服务端需保持一致（默认 1500）
udpPacketSize: 1500

# 网络传输参数
transport:
  maxPoolCount: 5
  tcpMux: true
  tcpMuxKeepaliveInterval: 30
  # tcpKeepalive: 7200
  tls:
    force: false # 是否强制客户端使用 TLS
    # certFile: "server.crt"
    # keyFile: "server.key"
    # trustedCaFile: "ca.crt"

# 服务端 HTTP 插件扩展（用于外部校验登录、新代理创建等）
httpPlugins:
  - name: 'user-manager'
    addr: '127.0.0.1:9000'
    path: '/handler'
    ops: ['Login']
  - name: 'port-manager'
    addr: '127.0.0.1:9001'
    path: '/handler'
    ops: ['NewProxy']
```

---

## frpc 配置

### 极简配置（frpc.yaml）

```yaml
serverAddr: 'frp.example.com'
serverPort: 7000

auth:
  token: 'your-secure-token'

proxies:
  - name: 'ssh'
    type: 'tcp'
    localIP: '127.0.0.1'
    localPort: 22
    remotePort: 6000

  - name: 'web'
    type: 'http'
    localIP: '127.0.0.1'
    localPort: 80
    subdomain: 'wener'
```

### 全局与传输配置（frpc.yaml 基础段）

```yaml
serverAddr: '0.0.0.0'
serverPort: 7000

# 客户端前缀，配置后所有代理名自动变更为 {user}.{name}
user: 'my_user'
# clientID: "unique-client-id"

# 首次登录失败时是否直接退出程序（false 则持续后台重试）
loginFailExit: true

# 日志配置
log:
  to: './frpc.log'
  level: 'info'
  maxDays: 3

# 客户端本地管理面板（支持热重载 API 等）
webServer:
  addr: '127.0.0.1'
  port: 7400
  user: 'admin'
  password: 'admin'

# 鉴权
auth:
  method: 'token'
  token: '12345678'

# 传输层配置
transport:
  protocol: 'tcp' # 支持 tcp, kcp, quic, websocket, wss
  poolCount: 5
  tcpMux: true
  tls:
    enable: true
    # certFile: "client.crt"
    # keyFile: "client.key"
    # trustedCaFile: "ca.crt"
    # serverName: "example.com"
  # 通过 HTTP / SOCKS5 代理连接 frps
  # proxyURL: "socks5://user:pwd@192.168.1.1:1080"
# 自定义 DNS 服务器
# dnsServer: "8.8.8.8"

# 指定启动的代理名称列表，为空表示全部启动
# start: ["ssh", "web"]
```

---

## 常用 Proxies 代理类型

### 1. TCP 代理（含负载均衡、限速与健康检查）

```yaml
proxies:
  - name: 'ssh'
    type: 'tcp'
    localIP: '127.0.0.1'
    localPort: 22
    remotePort: 6001 # 远程 frps 监听端口；为 0 时分配随机端口

    # 网络传输优化
    transport:
      bandwidthLimit: '1MB' # 限速，单位支持 KB, MB
      bandwidthLimitMode: 'client' # client 或 server
      useEncryption: true # 数据加密传输
      useCompression: true # 数据压缩传输

    # 负载均衡组（多客户端相同 groupKey 自动负载均衡）
    loadBalancer:
      group: 'ssh_cluster'
      groupKey: 'cluster_secret_key'

    # 本地服务健康检查
    healthCheck:
      type: 'tcp'
      timeoutSeconds: 3
      maxFailed: 3
      intervalSeconds: 10
```

### 2. UDP 代理

```yaml
proxies:
  - name: 'dns'
    type: 'udp'
    localIP: '114.114.114.114'
    localPort: 53
    remotePort: 6002
```

### 3. HTTP / HTTPS 代理

```yaml
proxies:
  - name: 'web-http'
    type: 'http'
    localIP: '127.0.0.1'
    localPort: 80
    subdomain: 'web01' # 访问：http://web01.frps.com
    customDomains:
      - 'web01.yourdomain.com'
    locations:
      - '/'
      - '/pic'

    # HTTP Basic 认证保护
    httpUser: 'admin'
    httpPassword: 'admin'

    # 请求头重写
    hostHeaderRewrite: 'example.com'
    requestHeaders:
      set:
        x-from-where: 'frp'

    # HTTP 接口健康检查
    healthCheck:
      type: 'http'
      path: '/status'
      intervalSeconds: 10
      maxFailed: 3
      timeoutSeconds: 3

  - name: 'web-https'
    type: 'https'
    localIP: '127.0.0.1'
    localPort: 443
    customDomains:
      - 'secure.yourdomain.com'
    transport:
      proxyProtocolVersion: 'v2' # 支持传递真实客户端源 IP（需后端支持）
```

### 4. TCPMux HTTP Connect 多路复用

```yaml
proxies:
  - name: 'tcpmux-tunnel'
    type: 'tcpmux'
    multiplexer: 'httpconnect'
    localIP: '127.0.0.1'
    localPort: 10701
    customDomains:
      - 'tunnel1.example.com'
```

### 5. STCP（安全私有穿透）与 XTCP（P2P 直连穿透）

- **STCP（Secret TCP）**：通过密钥认证，公网不会开放任何随机端口，必须由对端启动 `visitors` 客户端才可访问。
- **XTCP（P2P TCP）**：尝试通过 NAT 打洞实现客户端间点对点直连，流量不经服务端中转。

```yaml
proxies:
  # STCP 服务端代理配置
  - name: 'secret_ssh'
    type: 'stcp'
    secretKey: 'secure-secret-token'
    localIP: '127.0.0.1'
    localPort: 22
    allowUsers: ['*'] # 允许连接的用户，"*" 为所有用户

  # XTCP P2P 服务端代理配置
  - name: 'p2p_ssh'
    type: 'xtcp'
    secretKey: 'p2p-secret-token'
    localIP: '127.0.0.1'
    localPort: 22
    allowUsers: ['user1', 'user2']
```

---

## 常用内置客户端 Plugins（插件）

通过 `plugin` 字段替代本地实际监听进程，直接由客户端插件接管流量：

```yaml
proxies:
  # 1. 暴露本地 UNIX Domain Socket（如 Docker Socket）
  - name: 'docker_socket'
    type: 'tcp'
    remotePort: 6003
    plugin:
      type: 'unix_domain_socket'
      unixPath: '/var/run/docker.sock'

  # 2. 正向 HTTP 代理
  - name: 'http_proxy_service'
    type: 'tcp'
    remotePort: 6004
    plugin:
      type: 'http_proxy'
      httpUser: 'abc'
      httpPassword: 'abc'

  # 3. 正向 SOCKS5 代理
  - name: 'socks5_service'
    type: 'tcp'
    remotePort: 6005
    plugin:
      type: 'socks5'
      username: 'user'
      password: 'password'

  # 4. 本地静态文件 Web 服务器
  - name: 'static_files'
    type: 'tcp'
    remotePort: 6006
    plugin:
      type: 'static_file'
      localPath: '/var/www/blog'
      stripPrefix: 'static'
      httpUser: 'admin'
      httpPassword: 'admin'

  # 5. HTTPS 卸载为本地 HTTP（frpc 托管证书）
  - name: 'https2http_plugin'
    type: 'https'
    customDomains:
      - 'api.yourdomain.com'
    plugin:
      type: 'https2http'
      localAddr: '127.0.0.1:80'
      crtPath: './server.crt'
      keyPath: './server.key'
      hostHeaderRewrite: '127.0.0.1'
      requestHeaders:
        set:
          x-from-where: 'frp'

  # 6. HTTP 转目标 HTTPS
  - name: 'http2https_plugin'
    type: 'http'
    customDomains:
      - 'gw.yourdomain.com'
    plugin:
      type: 'http2https'
      localAddr: '127.0.0.1:443'
      hostHeaderRewrite: '127.0.0.1'

  # 7. HTTPS 穿透到 HTTPS
  - name: 'https2https_plugin'
    type: 'https'
    customDomains:
      - 'ssl.yourdomain.com'
    plugin:
      type: 'https2https'
      localAddr: '127.0.0.1:443'
      crtPath: './server.crt'
      keyPath: './server.key'

  # 8. TLS 流量解密并转发为 Raw 流量
  - name: 'tls2raw_plugin'
    type: 'tcp'
    remotePort: 6008
    plugin:
      type: 'tls2raw'
      localAddr: '127.0.0.1:80'
      crtPath: './server.crt'
      keyPath: './server.key'
```

---

## 访问端配置（Visitors）

与 `proxies` 同级的独立顶层数组，专用于 STCP / XTCP 访问端映射本地端口：

```yaml
visitors:
  # STCP 访问端映射
  - name: 'secret_ssh_visitor'
    type: 'stcp'
    serverName: 'secret_ssh' # 对应服务端 proxy name
    secretKey: 'secure-secret-token'
    bindAddr: '127.0.0.1'
    bindPort: 9000 # 访问本地 127.0.0.1:9000 即可转发至远端服务

  # XTCP P2P 访问端映射（支持自动回退到 STCP）
  - name: 'p2p_ssh_visitor'
    type: 'xtcp'
    serverUser: 'my_user' # 若被访问端指定了 user 则需匹配
    serverName: 'p2p_ssh'
    secretKey: 'p2p-secret-token'
    bindAddr: '127.0.0.1'
    bindPort: 9001
    keepTunnelOpen: false # 是否自动维持打洞通道
    maxRetriesAnHour: 8
    minRetryInterval: 90
    fallbackTo: 'secret_ssh_visitor' # P2P 打洞失败时无缝回退到 STCP
    fallbackTimeoutMs: 500
```

---

## Cookbook 实战配方

### 1. YAML 锚点优雅管理多端口与多服务（替代旧版 `[range:*]`）

在 YAML 中定义基础属性锚点（以 `.` 开头的非保留字段会被 frp 解析器安全识别），大幅缩减重复配置：

```yaml
serverAddr: 'frp.example.com'
serverPort: 7000

auth:
  token: '{{ .Envs.FRP_TOKEN }}'

# 定义通用 STCP 模板锚点
.stcp_common: &stcp_common
  type: 'stcp'
  secretKey: '{{ .Envs.FRPC_SECRET_KEY }}'
  localIP: '127.0.0.1'
  allowUsers: ['*']
  transport:
    useEncryption: true
    useCompression: true

proxies:
  - name: 'office-ssh'
    localPort: 22
    <<: *stcp_common

  - name: 'office-postgres'
    localPort: 5432
    <<: *stcp_common

  - name: 'office-k8s'
    localPort: 6443
    <<: *stcp_common
```

### 2. Kubernetes 环境动态注入配置

```yaml
serverAddr: '{{ .Envs.FRP_SERVER_ADDR }}'
serverPort: 7000

auth:
  token: '{{ .Envs.FRP_TOKEN }}'

proxies:
  - name: 'k8s-apiserver'
    type: 'tcp'
    localIP: '{{ .Envs.KUBERNETES_SERVICE_HOST }}'
    localPort: { { .Envs.KUBERNETES_SERVICE_PORT } }
    remotePort: 6443
    transport:
      useEncryption: true
```

### 3. 配置热重载与文件监听（Auto Reload）

`frpc` 开启 `webServer` 端口后，可通过 API 进行热重载：

```bash
# 手动触发重载
curl -u admin:admin http://127.0.0.1:7400/api/reload
# 或直接使用 CLI
frpc reload -c /etc/frp/frpc.yaml
```

结合 `inotifywait` 监控配置变化自动重载：

```bash
# 监听单个文件更新
while inotifywait -e attrib,close_write /etc/frp/frpc.yaml; do
  frpc reload -c /etc/frp/frpc.yaml
done

# 监听配置目录递归变动
inotifywait -r -m --format "%e %f" /etc/frp
```

### 4. 访客端多服务集中接入模式（Visitor Client）

```yaml
serverAddr: 'frp.example.com'
serverPort: 7000

auth:
  token: '{{ .Envs.FRP_TOKEN }}'

transport:
  protocol: 'wss'

webServer:
  addr: '127.0.0.1'
  port: 7400
  user: 'admin'
  password: 'admin'

.visitor_template: &v_base
  type: 'stcp'
  secretKey: '{{ .Envs.FRPC_SECRET_KEY }}'
  bindAddr: '127.0.0.1'

visitors:
  - name: 'visit-ssh'
    serverName: 'office-ssh'
    bindPort: 2222
    <<: *v_base

  - name: 'visit-pg'
    serverName: 'office-postgres'
    bindPort: 5432
    <<: *v_base
```

---

## FAQ

### visitor connection of [user.name] user [] not allowed

- **原因**：被访问端配置了 `user`，但未配置 `allowUsers` 允许访问者连接。
- **解决**：在被访问端的 `proxies` 代理定义中补充 `allowUsers: ["*"]` 或显式列出访问者的用户名前缀。

### nathole prepare error: discover error: wait response from stun server timeout

- **原因**：XTCP P2P 打洞依赖公网 STUN 服务器发现双方外网 NAT 地址与端口映射类型；若默认 STUN 服务器超时，打洞流程会直接失败。
- **排查与备用 STUN 测试**：

```bash
# 测试指定 STUN 服务器探测连通性
frpc nathole discover --nat_hole_stun_server stun.easyvoip.com:3478
frpc nathole discover --nat_hole_stun_server stun.stunprotocol.org:3479
frpc nathole discover --nat_hole_stun_server stun.miwifi.com:3478
```

- 在 `frpc.yaml` 中指定自定义 STUN 服务器：

```yaml
natHoleStunServer: 'stun.easyvoip.com:3478'
```

- 若网络为对称型 NAT（Symmetric NAT），P2P 打洞在原理上无法建立直连，建议配置 `fallbackTo` 优雅降级回 STCP。

### 3. custom listener doesn't exist

- **原因**：Visitor 尝试建立连接时，服务端尚无对应名字的活跃 Proxy，或 Visitor 的 `serverName` 拼写与被访问端的 `name` 不一致。
- **解决**：检查服务端是否成功注册了对应代理，若被访问端配置了全局 `user: "foo"`，其实际名称为 `foo.proxy_name`，此时 Visitor 端应声明 `serverUser: "foo"` 配合 `serverName: "proxy_name"`。

## ini to yaml

| ini                                     | yaml                                          | notes                                     |
| --------------------------------------- | --------------------------------------------- | ----------------------------------------- |
| `[common]` 节点                         | 根级直接配置（顶级字段）                      | 移除 `[common]` 包装                      |
| `bind_port`, `server_port`              | `bindPort`, `serverPort`                      | 驼峰命名                                  |
| `dashboard_*` (frps) / `admin_*` (frpc) | `webServer.addr`, `webServer.port` 等         | 统一收拢至 `webServer` 对象               |
| `token`, `oidc_*`                       | `auth.method`, `auth.token`, `auth.oidc.*`    | 收拢至 `auth` 对象                        |
| `tcp_mux`, `tls_enable`, `protocol`     | `transport.tcpMux`, `transport.tls.enable` 等 | 收拢至 `transport` 对象                   |
| `log_file`, `log_level`                 | `log.to`, `log.level`, `log.maxDays`          | 收拢至 `log` 对象                         |
| `[proxy_name]` 独立 section             | `proxies:` 数组列表                           | 每个代理为数组元素，包含 `name` 字段      |
| `role = visitor` 混合 section           | `visitors:` 独立顶级数组列表                  | 服务端暴露与访客端接入职责清晰分离        |
| `plugin = ...`, `plugin_*`              | `plugin:` 嵌套对象                            | 插件配置直接内嵌在代理的 `plugin` 字段中  |
| `header_X-From-Where = frp`             | `requestHeaders.set.x-from-where: frp`        | 结构化请求头与响应头修改                  |
| `[range:tcp_port]`                      | YAML 锚点（`&common` / `<<: *common`）或模板  | 利用 YAML 原生特性或 Go template 批量生成 |
