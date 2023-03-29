---
tags:
- Configuration
---

# 配置


- 配置会通过 tpl 渲染
- 可通过 Envs 访问环境变量 - 例如 `server_addr = {{.Envs.SERVER_ADDR}}`
- https 通过 SNI 路由

:::caution

- custom_domains 不能是 subdomain_host 子域名
  - 但 a.b.c.com 也会认为是 c.com 子域名
- subdomain 不能包含 `.` 和 `*`
- frps 没有 reload 因此修改配置需要重启
- visitor 端需要配置 server_name

:::

- https2https
- https2http
- [http2https](https://github.com/fatedier/frp/blob/master/pkg/plugin/client/http2https.go)
  - 不需要证书 - 将 https 暴露为 http - type=http
  - plugin_local_addr
  - plugin_host_header_rewrite
  - plugin*header*

**frps.ini**

```ini
[common]
bind_port = 7000
kcp_bind_port = 7000
# 设置了 udp 端口 udp 相关协议才能工作
bind_udp_port = 7001

# 建议修改 Token - 否则任何人都可以在该节点暴露端口
# token=$(uuidgen)

# 支持 http 和 https vhost 的必须配置
subdomain_host = example.local
vhost_http_port = 8080
vhost_https_port = 8443
```

**frpc.ini**

- sctp
  - role=visitor
    - bind_addr
    - bind_port

```ini
[common]
# frps 地址
# server_addr = x.x.x.x
server_port = 7000

# 需要暴露的端口
[ssh]
# tcp, udp, http, https, stcp, sudp, xtcp, tcpmux
type = tcp
local_ip = 127.0.0.1
local_port = 22
# frps 暴露端口
remote_port = 6000
```

### frps.ini

```ini
[common]
# IPv6 格式 "[::1]:80", "[ipv6-host]:http", "[ipv6-host%zone]:80"
bind_addr = 0.0.0.0
bind_port = 7000

# 用于辅助打通 NAT
bind_udp_port = 7001

# kcp udp 端口 - 未设置则不开启 kcp
kcp_bind_port = 7000

# 代理监听端口 - 默认为 bind_addr
# proxy_bind_addr = 127.0.0.1

# http 虚拟主机端口 - 可以与 bind_port 相同
vhost_http_port = 80
vhost_https_port = 443

# 虚拟主机超时时间 - 默认 60 秒
# vhost_http_timeout = 60

# HTTP CONNECT 端口 - 默认 0
# 设置为 0 则不会做多路
# tcpmux_httpconnect_port = 1337

# 管理面板
dashboard_addr = 0.0.0.0
dashboard_port = 7500

# 默认 admin admin
dashboard_user = admin
dashboard_pwd = admin

# 是否开启 {dashboard_addr}:{dashboard_port}/metrics
enable_prometheus = true

# debug 用 - 前端 assets 目录
# assets_dir = ./static

# console 或日志文件
log_file = ./frps.log

# trace, debug, info, warn, error
log_level = info

log_max_days = 3
disable_log_color = false

# 错误日志记录到 frpc
detailed_errors_to_client = true

# frpc 和 frps 授权方式 - token, oidc
authentication_method = token

# 是否对心跳鉴权
authenticate_heartbeats = false

# frps 新链接是否鉴权
authenticate_new_work_conns = false

# auth token
token = 12345678

# jwt iss
oidc_issuer =
# jwt aud
oidc_audience =
# 不校验过期
oidc_skip_expiry_check = false
# 不校验 iss
oidc_skip_issuer_check = false

# 心跳超时 - 默认 90 不建议修改
# heartbeat_timeout = 90
# 用户链接超时 - 默认 90 不建议修改
# user_conn_timeout = 10

# frpc 允许的端口范围
# allow_ports = 2000-3000,3001,3003,4000-50000

# 最大链接池
max_pool_count = 5
# 每个客户端允许的端口数 - 0 不限制
max_ports_per_client = 0

# 强制 TLS 链接
tls_only = false
# tls_cert_file = server.crt
# tls_key_file = server.key
# tls_trusted_ca_file = ca.crt

# 如果设置了子域名，类型为 http 或 https 的配置可以通过 name.frps.com
# subdomain_host = frps.com

# tcp 流多路
tcp_mux = true

# 404 页
# custom_404_page = /path/to/404.html

# udp 包大小，客户端和服务端应该保持一致 - 影响 sudp 代理
udp_packet_size = 1500

[plugin.user-manager]
addr = 127.0.0.1:9000
path = /handler
ops = Login

[plugin.port-manager]
addr = 127.0.0.1:9001
path = /handler
ops = NewProxy
```

## frpc.ini

### common

```ini
[common]
server_addr = 0.0.0.0
server_port = 7000

# 通过 http,socks,ntlm 代理连接 frps
# 支持环境变量, 只支持 tcp 类型协议
# http_proxy = http://user:passwd@192.168.1.128:8080
# http_proxy = socks5://user:passwd@192.168.1.128:1080
# http_proxy = ntlm://user:passwd@192.168.1.128:2080

log_file = ./frpc.log
log_level = info
log_max_days = 3
disable_log_color = false

authenticate_heartbeats = false
authenticate_new_work_conns = false

token = 12345678

# OIDC 客户端配置
oidc_client_id =
oidc_client_secret =
# OIDC Token Endpoint
oidc_token_endpoint_url =

# jwt aud
oidc_audience =

# frpc 控制端访问鉴权 - 支持 reload 等操作
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_pwd = admin
# assets_dir = ./static

# 链接池 - 预先建立的链接数
pool_count = 0

tcp_mux = true

# 代理名字 - {user}.{proxy}
# user = your_name

# 登陆失败退出
login_fail_exit = true

# frps 通讯协议 - tcp, kcp, websocket
protocol = tcp

# 客户端 tls 配置
tls_enable = true
# tls_cert_file = client.crt
# tls_key_file = client.key
# tls_trusted_ca_file = ca.crt

# 修改 dns
# dns_server = 8.8.8.8

# 生效配置 - 默认全部
# start = ssh,dns

# heartbeat_interval = 30
# heartbeat_timeout = 90

# 客户端额外元信息
meta_var1 = 123
meta_var2 = 234

udp_packet_size = 1500
```

### proxy

- 每个 section 为一个代理配置
- 如果配置了 user 则名字为 `{user}.{proxy}`

| var  | default | values                       | desc         |
| ---- | ------- | ---------------------------- | ------------ |
| type | tcp     | tcp,udp,http,https,stcp,xtcp | 代理协议类型 |

```ini
[ssh]
type = tcp
# 被代理目标
local_ip = 127.0.0.1
local_port = 22
# 带宽限制 - 单位支持 KB, MB
bandwidth_limit = 1MB
# frps 通讯加密
use_encryption = false
# 协议压缩
use_compression = false
# frps 暴露端口
# 0 为随机端口
remote_port = 6001
# 相同组会进行负载均衡
group = test_group
# 相同组 key 相同
group_key = 123456
# 监控检查 - 支持 tcp, http
health_check_type = tcp
health_check_timeout_s = 3
# 检查失败 3 次 frps 移除代理
health_check_max_failed = 3
health_check_interval_s = 10
# 额外元信息配置
meta_var1 = 123
meta_var2 = 234

# range: 生成批量端口
# 生成 tcp_port_6010,tcp_port_6011
[range:tcp_port]
type = tcp
local_ip = 127.0.0.1
local_port = 6010-6020,6022,6024-6028
remote_port = 6010-6020,6022,6024-6028
use_encryption = false
use_compression = false

# http 支持通过子域名访问
# http://web01.subdomain.com
[web01]
type = http
local_ip = 127.0.0.1
local_port = 80
use_encryption = false
use_compression = true
# Basic auth
http_user = admin
http_pwd = admin
# 修改域名名字
subdomain = web01
# 自定义域名
custom_domains = web02.yourdomain.com
# http 可以指定允许的 location
locations = /,/pic
# 修改 Host
host_header_rewrite = example.com
# 自定义 Header - 以下配置发送 X-From-Where: frp
header_X-From-Where = frp
health_check_type = http
# 自定义 http 健康检查参数
health_check_url = /status
health_check_interval_s = 10
health_check_max_failed = 3
health_check_timeout_s = 3

# https 代理协议版本 - v1, v2 或不指定
# Proxy 协议能传输客户端信息但是需要目标端支持
# proxy_protocol_version = v2

# unix socket
[plugin_unix_domain_socket]
type = tcp
remote_port = 6003
# 定义插件后 local_ip 和 local_port 无意义
# 由插件处理创建的链接
plugin = unix_domain_socket
# 插件参数
plugin_unix_path = /var/run/docker.sock

[plugin_http_proxy]
type = tcp
remote_port = 6004
plugin = http_proxy
plugin_http_user = abc
plugin_http_passwd = abc

[plugin_socks5]
type = tcp
remote_port = 6005
plugin = socks5
plugin_user = abc
plugin_passwd = abc

[plugin_static_file]
type = tcp
remote_port = 6006
plugin = static_file
plugin_local_path = /var/www/blog
plugin_strip_prefix = static
plugin_http_user = abc
plugin_http_passwd = abc

[plugin_https2http]
type = https
custom_domains = test.yourdomain.com
plugin = https2http
plugin_local_addr = 127.0.0.1:80
plugin_crt_path = ./server.crt
plugin_key_path = ./server.key
plugin_host_header_rewrite = 127.0.0.1
plugin_header_X-From-Where = frp

[plugin_https2https]
type = https
custom_domains = test.yourdomain.com
plugin = https2https
plugin_local_addr = 127.0.0.1:443
plugin_crt_path = ./server.crt
plugin_key_path = ./server.key
plugin_host_header_rewrite = 127.0.0.1
plugin_header_X-From-Where = frp

[plugin_http2https]
type = http
custom_domains = test.yourdomain.com
plugin = http2https
plugin_local_addr = 127.0.0.1:443
plugin_host_header_rewrite = 127.0.0.1
plugin_header_X-From-Where = frp

[secret_tcp]
# If the type is secret tcp, remote_port is useless
# Who want to connect local port should deploy another frpc with stcp proxy and role is visitor
type = stcp
# sk used for authentication for visitors
sk = abcdefg
local_ip = 127.0.0.1
local_port = 22
use_encryption = false
use_compression = false

# user of frpc should be same in both stcp server and stcp visitor
[secret_tcp_visitor]
# frpc role visitor -> frps -> frpc role server
role = visitor
type = stcp
# the server name you want to visitor
server_name = secret_tcp
sk = abcdefg
# connect this address to visitor stcp server
bind_addr = 127.0.0.1
bind_port = 9000
use_encryption = false
use_compression = false

[p2p_tcp]
type = xtcp
sk = abcdefg
local_ip = 127.0.0.1
local_port = 22
use_encryption = false
use_compression = false

[p2p_tcp_visitor]
role = visitor
type = xtcp
server_name = p2p_tcp
sk = abcdefg
bind_addr = 127.0.0.1
bind_port = 9001
use_encryption = false
use_compression = false

[tcpmuxhttpconnect]
type = tcpmux
multiplexer = httpconnect
local_ip = 127.0.0.1
local_port = 10701
custom_domains = tunnel1
```

## cookbook

### Kubernetes

```ini
[kubernetes]
local_ip = {{.Envs.KUBERNETES_SERVICE_HOST}}
local_port = {{.Envs.KUBERNETES_SERVICE_PORT}}
```

### https

```ini
[https]
type = https
local_ip = example.com
local_port = 443
custom_domains = example.com
```

```bash
curl -vik --resolve example.com:8443:127.0.0.1 https://example.com:8443/
```

### auto reload

```bash
# 自动重载 - 需要开启 admin 端口
# -e close_write 只监听单个事件 - k8s mount 不触发 close_write - 因为不是写文件
# 会触发 delete

while inotifywait -e attrib /etc/frp/frpc.ini; do frpc -c /etc/frp/frpc.ini reload; done
while inotifywait -e attrib /etc/frp/frpc.ini; do echo frpc.ini changed; done
# 监听目录
inotifywait -r -m --format "%e %f" /etc/frp

inotifywait -e attrib -m --format "%e %f" /etc/frp/frpc.ini
```

## frpc visitor env

- 环境变量
  - frps_token
  - frpc_sk
  - inc_name

```ini
[common]
server_addr = frps
token = {{.Envs.frps_token}}
server_port = 80
protocol = websocket

admin_addr = 0.0.0.0
admin_port = 7400
admin_user = admin
admin_pwd = admin

use_encryption = true
use_compression = true

[{{.Envs.inc_name}}-ssh]
type = stcp
sk = {{.Envs.frpc_sk}}
role = visitor
bind_addr = 0.0.0.0
bind_port = 22
server_name = {{.Envs.inc_name}}-ssh

[{{.Envs.inc_name}}-http]
type = stcp
sk = {{.Envs.frpc_sk}}
role = visitor
bind_addr = 0.0.0.0
bind_port = 80
server_name = {{.Envs.inc_name}}-http

[{{.Envs.inc_name}}-https]
type = stcp
sk = {{.Envs.frpc_sk}}
role = visitor
bind_addr = 0.0.0.0
bind_port = 443
server_name = {{.Envs.inc_name}}-https
```

## frpc simple

```ini
[common]
server_addr = frp.example.com
token = {{.Envs.frps_token}}
server_port = 80
protocol = websocket

use_encryption = true
use_compression = true

[http]
type = http
subdomain = wener
bind_addr = 0.0.0.0
bind_port = 3000
```

