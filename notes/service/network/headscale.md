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

:::caution

- Tailscale iOS & Android 不支持修改 control server 地址

:::

```bash
curl -Lo config.yaml https://raw.githubusercontent.com/juanfont/headscale/main/config-example.yaml
curl -Lo headscale https://github.com/juanfont/headscale/releases/download/v0.14.0/headscale_0.14.0_linux_amd64
chmod +x headscale
mkdir -p /var/lib/headscale
./headscale serve
./headscale namespaces create myns

# AlpineLinux
apk add tailscale
service tailscale start
tailscale up --login-server http://192.168.1.2:8080
tailscale ip

# @Server 同意
./headscale -n myns nodes register --key $KEY

# 预生成 - 减少同意这个环节
headscale --namespace myns preauthkeys create --reusable --expiration 24h

#
tailscale up --login-server http://192.168.1.2:8080 --authkey $KEY
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

  # 本地 DERP 配置文件 - 用于 selfhost
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

# ACL
# https://tailscale.com/kb/1018/acls/
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
