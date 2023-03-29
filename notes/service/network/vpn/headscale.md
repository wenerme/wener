---
title: Headscale
---

# Headscale

- [juanfont/headscale](https://github.com/juanfont/headscale)
  - BSD-3, Go
  - tailscale control server
  - 基于 Wireguard 的 Mesh 方案
  - SQLite driver 使用 - [glebarez/go-sqlite](https://github.com/glebarez/go-sqlite)
    - 不需要 CGO
- endpoint
  - /api/v1
  - /swagger
  - /windows
  - /windows/tailscale.reg
  - /apple
  - /apple/ios
  - /apple/macos
  - /metrics
  - /machine/:id/map
  - /register
  - /key
  - /derp
  - /bootstrap-dns
  - 暂时无法关闭 - [#503](https://github.com/juanfont/headscale/issues/503)
    - 可考虑只暴露 /api,/machine,/key
- [gurucomputing/headscale-ui](https://github.com/gurucomputing/headscale-ui)
  - `headscale apikeys create`

:::caution

- Namespace -> User
- Tailscale iOS & Android 不支持修改 control server 地址
- WebUI [#234](https://github.com/juanfont/headscale/issues/234)

:::

```bash title="启动 control 服务"
curl -Lo config.yaml https://raw.githubusercontent.com/juanfont/headscale/main/config-example.yaml
curl -Lo headscale https://github.com/juanfont/headscale/releases/download/v0.14.0/headscale_0.14.0_linux_amd64
chmod +x headscale
mkdir -p /var/lib/headscale
./headscale serve
./headscale namespaces create myns
```

```bash title="客户端 加入"
# AlpineLinux tailscale
apk add tailscale
service tailscale start
# macOS tailscale
brew install tailscale

tailscale up --login-server http://192.168.1.2:8080
```

```bash title="control 同意加入"
# @Server 同意
./headscale -n myns nodes register --key $KEY
```

```bash title="客户端状态"
tailscale ip
tailscale status
```

---

```bash title="预生成 authkey 减少同意环节"
# 服务端预生成 - 减少同意这个环节
headscale --namespace myns preauthkeys create --reusable --expiration 24h

# 客户端加入
tailscale up --login-server http://192.168.1.2:8080 --authkey $KE
```

```bash
headscale nodes list              # 节点列表
# headscale nodes share -i 1 -n ns2 # 不再支持，使用 ACL 控制 - 将节点 1 共享给 ns2 租户

headscale nodes routes list -i 1  # 查看节点申请的 subnet routes
headscale routes enable -i 1 -r 192.168.1.0/24 # 允许 routes
```

```bash
# Docker
# 8080 http
# 9090 metrics
# https://github.com/juanfont/headscale/blob/main/docs/running-headscale-container.md
docker run --rm -it \
  -v $PWD/headscale/etc:/etc/headscale/ \
  -v $PWD/headscale/var:/var/lib/headscale/ \
  -p 127.0.0.1:8080:8080 \
  -p 127.0.0.1:9090:9090 \
  --name headscale headscale/headscale:0-alpine \
  headscale serve
```

## conf

- [config-example.yaml](https://github.com/juanfont/headscale/blob/main/config-example.yaml)
- config.yaml,config.json
  - /etc/headscale
  - ~/.headscale
  - ./

```yaml
# 客户端连接使用的地址
server_url: http://127.0.0.1:8080

# 服务端监听
listen_addr: 0.0.0.0:8080

# /metrics
metrics_listen_addr: 127.0.0.1:9090

# gRPC API - 通过 cert 认证
grpc_listen_addr: 0.0.0.0:50443
grpc_allow_insecure: false

# 不存在会生成
private_key_path: /var/lib/headscale/private.key

# IP 段
ip_prefixes:
  - fd7a:115c:a1e0::/48
  - 100.64.0.0/10

# DERP - 中继
# https://tailscale.com/blog/how-tailscale-works/#encrypted-tcp-relays-derp
derp:
  server:
    # 运行内置的 DERP - HTTPS
    enabled: false
    # 内置 DERP 的 Region ID
    region_id: 999

    # Region 信息
    region_code: 'headscale'
    region_name: 'Headscale Embedded DERP'

    # 监听辅助 NAT
    # https://tailscale.com/blog/how-tailscale-works/
    stun:
      enabled: false
      listen_addr: '0.0.0.0:3478'

  # 外部 DERP
  urls:
    - https://controlplane.tailscale.com/derpmap/default

  # 本地 DERP 配置文件 - YAML - 用于 selfhost DERP
  # https://tailscale.com/kb/1118/custom-derp-servers/
  paths: []

  # 刷新 derpmap
  auto_update_enabled: true
  update_frequency: 24h

disable_check_updates: true
ephemeral_node_inactivity_timeout: 30m

db_type: sqlite3
db_path: /var/lib/headscale/db.sqlite

# # Postgres config
# db_type: postgres
# db_host: localhost
# db_port: 5432
# db_name: headscale
# db_user: foo
# db_pass: bar

### TLS configuration
#
## Let's encrypt / ACME
#
# headscale supports automatically requesting and setting up
# TLS for a domain with Let's Encrypt.
#
# URL to ACME directory
acme_url: https://acme-v02.api.letsencrypt.org/directory

# Email to register with ACME provider
acme_email: ''

# Domain name to request a TLS certificate for:
tls_letsencrypt_hostname: ''

# Client (Tailscale/Browser) authentication mode (mTLS)
# Acceptable values:
# - disabled: client authentication disabled
# - relaxed: client certificate is required but not verified
# - enforced: client certificate is required and verified
tls_client_auth_mode: relaxed

# Path to store certificates and metadata needed by
# letsencrypt
tls_letsencrypt_cache_dir: /var/lib/headscale/cache

tls_letsencrypt_challenge_type: HTTP-01
tls_letsencrypt_listen: ':http'

tls_cert_path: ''
tls_key_path: ''

log_level: info

# ACL - YAML or HUJSON
# https://tailscale.com/kb/1018/acls/
# https://github.com/juanfont/headscale/blob/main/docs/acls.md
acl_policy_path: ''

## DNS
#
# headscale supports Tailscale's DNS configuration and MagicDNS.
# Please have a look to their KB to better understand the concepts:
#
# - https://tailscale.com/kb/1054/dns/
# - https://tailscale.com/kb/1081/magicdns/
# - https://tailscale.com/blog/2021-09-private-dns-with-magicdns/
#
dns_config:
  # List of DNS servers to expose to clients.
  nameservers:
    - 1.1.1.1

  # Split DNS (see https://tailscale.com/kb/1054/dns/),
  # list of search domains and the DNS to query for each one.
  #
  # restricted_nameservers:
  #   foo.bar.com:
  #     - 1.1.1.1
  #   darp.headscale.net:
  #     - 1.1.1.1
  #     - 8.8.8.8

  # Search domains to inject.
  domains: []

  # Whether to use [MagicDNS](https://tailscale.com/kb/1081/magicdns/).
  # Only works if there is at least a nameserver defined.
  magic_dns: true

  # Defines the base domain to create the hostnames for MagicDNS.
  # `base_domain` must be a FQDNs, without the trailing dot.
  # The FQDN of the hosts will be
  # `hostname.namespace.base_domain` (e.g., _myhost.mynamespace.example.com_).
  base_domain: example.com

# Unix socket used for the CLI to connect without authentication
# Note: for local development, you probably want to change this to:
# unix_socket: ./headscale.sock
unix_socket: /var/run/headscale.sock
unix_socket_permission: '0770'
#
# headscale supports experimental OpenID connect support,
# it is still being tested and might have some bugs, please
# help us test it.
# OpenID Connect
# oidc:
#   issuer: "https://your-oidc.issuer.com/path"
#   client_id: "your-oidc-client-id"
#   client_secret: "your-oidc-client-secret"
#
#   If `strip_email_domain` is set to `true`, the domain part of the username email address will be removed.
#   This will transform `first-name.last-name@example.com` to the namespace `first-name.last-name`
#   If `strip_email_domain` is set to `false` the domain part will NOT be removed resulting to the following
#   namespace: `first-name.last-name.example.com`
#
#   strip_email_domain: true
```

```yaml title="acls.yaml"
Groups:
  # group user
  group:wener: [ wener ]
TagOwners:
  # who can adertise tag
  tag:internal: [ group:wener ]
  tag:public: [ group:wener ]
  tag:derp: [ group:wener ]
ACLs:
- { Action: accept, Users: [ wener ], Ports: [ "*:*" ] }
- { Action: accept, Users: [ tag:derp ], Ports: [ "*:*" ] }
- { Action: accept, Users: [ "*" ], Ports: [ tag:public:* ] }
```

```yaml title="derp.yaml"
regions:
  999:
    regionid: 999
    regioncode: sha
    regionname: Shanghai
    nodes:
      - name: 999a
        regionid: 999
        hostname: derp.example.com
        ipv4: 1.1.1.1
        stunport: 3478
        stunonly: false
        derpport: 443
```

## Notes

- /var/lib/headscale/
  - private.key
  - db.sqlite
    - api_keys
    - kvs
    - machines
    - namespaces
    - pre_auth_keys
    - shared_machines

## Offcial Client/IPN

- 下载 https://tailscale.com/download/
- macOS GUI - 从 `http://<headscale>/apple/macos` 下载安装 mobileconfig
<!-- - iOS 从 `http://<headscale>/apple/ios` 下载安装 mobileconfig -->
- windows 从 `http://<headscale>/windows/tailscale.reg` 下载执行注册表
- 启动客户端即可

```bash
# macOS 也可以直接修改 ControlURL
defaults write io.tailscale.ipn.macos ControlURL https://127.0.0.1:8080

# GUI 版 cli 位置
/Applications/Tailscale.app/Contents/MacOS/Tailscale --help

# /Library/LaunchDaemons/com.tailscale.tailscaled.plist
# 命令行版本配置 开机启动
sudo tailscaled install-system-daemon
# 卸载
sudo tailscaled uninstall-system-daemon
```

```bat
: Windows 也可以直接修改
REG ADD "HKLM\Software\Tailscale IPN" /v UnattendedMode /t REG_SZ /d always
REG ADD "HKLM\Software\Tailscale IPN" /v LoginURL /t REG_SZ /d "https://127.0.0.1:8080"
```

- Windows 状态目录
  - `%LocalAppData%\Tailscale`
  - `C:\WINDOWS\system32\config\systemprofile\AppData\Local\Tailscale`
- macOS GUI
  - 状态使用 keychain
    - tailscale-daemon
    - tailscale-logdata
    - tailscale-machinekey
    - tailscale-preferences
  - 使用 Apple Network Extension API - tailscaled 使用 utun
    - 用户空间，VPN 的形式
- macOS tailscaled
  - 状态目录
    - root /Library/Tailscale/tailscaled.state
    - user $HOME/.local/share/tailscale/tailscaled.state

## headscale now requires a new `noise.private_key_path` field in the config file for the Tailscale v2 protocol

## register request: Post "https://host/machine/register": all connection attempts failed (HTTP: unexpected HTTP response: 301 Moved Permanently, HTTPS: unexpected HTTP response: 404 Not Found)

- 不能 cloudflare 反向代理
- https://github.com/juanfont/headscale/issues/775
