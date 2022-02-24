---
title: Teleport
---

# Teleport

- 是什么？
  - 支持 CA,加密,认证授权的反向代理
  - 支持协议 SSH, Kubernetes, Web
  - kubectl exec
- 端口
  - 3023, 3024, 3025, 3080
  - 3022 - Node - SSH
  - 3023 - Proxy -> 3022
  - 3024 - Proxy - 反向 SSH 通道
  - 3025 - Auth - SSH Auth Service
  - 3080 - Proxy - HTTPS auth tsh, Web UI
  - 3026 - Kubernetes - HTTPS Proxy
  - 3027 - Kubernetes - Kubernetes Service
- [企业版](https://goteleport.com/teleport/docs/enterprise/introduction/) 特性 / [Commercial Teleport Editions](https://goteleport.com/teleport/docs/faq/#commercial-teleport-editions)
  - RBAC
  - SSO
    - SAML
    - OIDC - Okta, Active Directory, Auth0
    - 社区版本支持 github 和 local 认证
  - Approval
  - FedRAMP/FIPS
- 组件
  - tsh - ssh
  - tctl - auth server
  - teleport - sshd
- 增强会话记录 基于 BPF 需要 [iovisor/bcc](https://github.com/iovisor/bcc)

## demo

**teleport.yaml**

```yaml
teleport:
  data_dir: ./teleport
  advertise_ip: 192.168.1.2
auth_service:
  enabled: true
  cluster_name: 'teleport'
  listen_addr: 0.0.0.0:3025
  tokens:
    - proxy,node,app:f7adb7ccdf04037bcd2b52ec6010fd6f0caec94ba190b765
ssh_service:
  enabled: true
  labels:
    env: staging
app_service:
  enabled: true
  debug_app: true
proxy_service:
  enabled: true
  listen_addr: 0.0.0.0:3023
  web_listen_addr: 0.0.0.0:3080
  tunnel_listen_addr: 0.0.0.0:3024
```

```yaml
teleport:
  data_dir: ./teleport
  auth_token: proxy,node,app:f7adb7ccdf04037bcd2b52ec6010fd6f0caec94ba190b765
  auth_servers:
  - 192.168.1.2:3025
  advertise_ip: 192.168.1.3
ssh_service:
  enabled: true
  listen_addr: 0.0.0.0:3022
proxy_service:
  enabled: false
auth_service:
  enabled: false
```

```bash
teleport configure --cluster-name demo-cluster -o $PWD/tele.yaml

# 启动
teleport start -c tele.yaml
# 添加用户
tctl users add admin -c tele.yaml --roles=admin --logins=root,admin

tsh --proxy localhost:3080 --insecure login --user admin
tsh status
tsh ls

# 添加节点
tctl tokens add --type=node -c tele.yaml
# 启动节点
sudo teleport start \
--roles=node \
--auth-server=https://teleport.example.com:443 \
--token=${TOKEN?} \
--labels=env=demo

# macOS
curl -O https://get.gravitational.com/teleport-v6.0.1-darwin-amd64-bin.tar.gz
# Linux
curl -O https://get.gravitational.com/teleport-v6.0.1-linux-amd64-bin.tar.gz

docker run --rm -it quay.io/gravitational/teleport

teleport start --roles=node --auth-server=10.1.0.1 --token=xyz --nodename=d

teleport start --roles=app --token=xyz --auth-server=proxy.example.com:3080 \
    --app-name="example-app" \
    --app-uri="http://localhost:8080" \
    --labels=group:dev

teleport start --roles=app --token=xyz --auth-server=proxy.example.com:3080 \
  --app-name="example-app" \
  --app-uri="http://localhost:8080"

teleport start --roles=database --token=xyz --auth-server=proxy.example.com:3080 \
  --db-name="example-db" \
  --db-protocol="postgres" \
  --db-uri="localhost:5432"
```

## access plugin

- https://github.com/gravitational/teleport-plugins/tree/master/access

## 配置

- [Teleport Configuration Reference](https://goteleport.com/teleport/docs/config-reference/)
- /etc/teleport.yaml
- 服务类型
  - auth - 提供认证授权
  - node/ssh - 对接节点到集群
  - proxy - 提供 WebUI 和 SSH
  - app - 反向代理应用
  - kubernetes

```yaml
# 全局配置 影响所有服务
teleport:
  # 作为 hostname 别名
  nodename: graviton
  # 数据目录 https://goteleport.com/teleport/docs/admin-guide/#filesystem-layout
  data_dir: /var/lib/teleport

  # JOIN 到集群的 Token - 初次使用后便不在需要
  auth_token: xxxx-token-xxxx

  # AuthServer CA PIN
  # https://goteleport.com/teleport/docs/admin-guide/#adding-nodes-to-the-cluster
  ca_pin: "sha256:7e12c17c20d9cb504bbcb3f0236be3f446861f1396dcbb44425fe28ec1c108f1"

  # 支持 FQDN
  advertise_ip: 10.1.0.5

  # 集群中的授权服务
  auth_servers:
  - 10.1.0.5:3025
  - 10.1.0.6:3025

  # 限流
  connection_limits:
    max_connections: 1000
    max_users: 250

  # 支持配置 stdout,stderr,syslog  INFO, WARN, ERROR
  # 默认 ERROR
  log:
    output: /var/lib/teleport/teleport.log
    severity: ERROR

  # 存储集群状态和审计日志
  # 支持 DynamoDB, S3, etcd 等
  # https://goteleport.com/teleport/docs/admin-guide/#high-availability
  storage:
    # 默认存储到数据目录
    type: dir

    # 默认 /var/lib/teleport/log
    audit_events_uri: [ 'dynamodb://events_table_name', 'firestore://events_table_name', 'file:///var/lib/teleport/log', 'stdout://' ]

    # 存储记录的会话
    # https://goteleport.com/teleport/docs/admin-guide/#using-amazon-s3
    audit_sessions_uri: 's3://example.com/path/to/bucket?region=us-east-1'

    # DynamoDB
    # ==========
    continuous_backups: [ true|false ]
    auto_scaling: [ true|false ]

    # minimum/maximum read capacity in units
    read_min_capacity: int
    read_max_capacity: int
    read_target_value: float
    # minimum/maximum write capacity in units
    write_min_capacity: int
    write_max_capacity: int
    write_target_value: float

  # ssh-rsa, rsa-sha2-256, rsa-sha2-512
  ca_signature_algo: "rsa-sha2-512"
  ciphers:
  - aes128-ctr
  - aes192-ctr
  - aes256-ctr
  - aes128-gcm@openssh.com
  - chacha20-poly1305@openssh.com
  kex_algos:
  - curve25519-sha256@libssh.org
  - ecdh-sha2-nistp256
  - ecdh-sha2-nistp384
  - ecdh-sha2-nistp521
  mac_algos:
  - hmac-sha2-256-etm@openssh.com
  - hmac-sha2-256
  ciphersuites:
  - tls-ecdhe-rsa-with-aes-128-gcm-sha256
  - tls-ecdhe-ecdsa-with-aes-128-gcm-sha256
  - tls-ecdhe-rsa-with-aes-256-gcm-sha384
  - tls-ecdhe-ecdsa-with-aes-256-gcm-sha384
  - tls-ecdhe-rsa-with-chacha20-poly1305
  - tls-ecdhe-ecdsa-with-chacha20-poly1305

# Auth 服务
auth_service:
  # 是否启用
  enabled: yes

  # 生成 CA 包含的名字 - 尽量设置为有意义的名字
  # 修改会导致所有生成的证书失效，可能需要清除 /var/lib/teleport
  cluster_name: "main"
  # 认证
  authentication:
    # OSS 'local', 'github'
    # Enterprise 'oidc', 'saml', 'false'
    type: local
    # off,otp, u2f
    second_factor: otp
    u2f:
      # Teleport Web UI (proxy) - 确保其他节点可访问
      app_id: https://localhost:3080
      # 列举所有
      facets:
      - https://localhost:3080

  # Auth API, Cluster API
  listen_addr: 0.0.0.0:3025

  # AuthServer DNS - 可选
  # https://goteleport.com/teleport/docs/admin-guide/#public-addr
  public_addr: auth.example.com:3025

  # 预定义用于加入节点的 Token
  # tctl nodes add --ttl 生成带 TTL 的随机 Token
  # 建议使用 pwgen 生成 32+ byte 的 Token
  tokens:
  - "proxy,node:xxxxx"
  - "auth:yyyy"
  # node - 默认
  # proxy - https://goteleport.com/teleport/docs/architecture/proxy/#recording-proxy-mode
  # off - 关闭
  # 实验性 *-sync - 直接发送到 S3
  session_recording: "node"

  # session_recording=proxy 生效
  # https://goteleport.com/teleport/docs/architecture/proxy/#recording-proxy-mode
  proxy_checks_host_keys: yes
  # 例如 30m, 1h, 1h30m
  client_idle_timeout: never
  # 连接上的 ssh 如果 cert 过期是否断开
  disconnect_expired_cert: no

  keep_alive_interval: 5m
  keep_alive_count_max: 3

  # 集群纬度会话控制超时时间
  # session_control_timeout: 2m

  license_file: /var/lib/teleport/license.pem

# 节点 SSH 服务
ssh_service:
  enabled: yes
  listen_addr: 0.0.0.0:3022
  # 可以配置允许直连
  public_addr: node.example.com:3022
  # 节点标签
  # https://goteleport.com/teleport/docs/admin-guide/#labeling-nodes-and-applications
  labels:
    role: leader
    type: postgres

  # 命令定义标签
  commands:
  # arch=x86_64
  - name: arch
    command: [ '/bin/uname', '-p' ]
    period: 1h0m0s

  # ~/.tsh/environment
  permit_user_env: false

  # 增强会话记录
  # https://gravitational.com/teleport/docs/features/enhanced-session-recording
  enhanced_recording:
    enabled: false
    # 单位 page
    command_buffer_size: 8
    disk_buffer_size: 128
    network_buffer_size: 8
    # cgroupv2 挂载点
    cgroup_path: /cgroup2
  # PAM 集成
  # https://goteleport.com/teleport/docs/features/ssh-pam/
  pam:
    enabled: no
    service_name: teleport

# 代理服务
proxy_service:
  enabled: yes
  # SSH forwarding/proxy
  listen_addr: 0.0.0.0:3023
  # Reverse tunnel
  tunnel_listen_addr: 0.0.0.0:3024
  # Web UI - password+HOTP
  web_listen_addr: 0.0.0.0:3080
  public_addr: proxy.example.com:3080
  ssh_public_addr: proxy.example.com:3023
  tunnel_public_addr: proxy.example.com:3024

  https_keypairs:
  - key_file: /var/lib/teleport/webproxy_key.pem
    cert_file: /var/lib/teleport/webproxy_cert.pem
  - key_file: /etc/letsencrypt/live/*.teleport.example.com/privkey.pem
    cert_file: /etc/letsencrypt/live/*.teleport.example.com/fullchain.pem

  kube_listen_addr: 0.0.0.0:3026
  # 修改 k8s 接入地址
  kube_public_addr: kube.example.com:3026

# 应用服务
app_service:
  enabled: yes
  # 开启 debug 应用 - 会显示 JWT 内容
  debug_app: true
  apps:
  - name: "kubernetes-dashboard"
    # 应用
    uri: "http://10.0.1.27:8000"
    # 外部地址
    public_addr: "example.com"
    # 标签
    labels:
      env: "prod"
    # 动态标签
    commands:
    - name: "os"
      command: [ "/usr/bin/uname" ]
      period: "5s"

kubernetes_service:
  enabled: yes
  public_addr: [ k8s.example.com:3026 ]
  listen_addr: 0.0.0.0:3026
  # 未运行在 k8s 内通过 kubeconfig_file 指定配置
  kubeconfig_file: /secrets/kubeconfig
  # 运行在 k8s 内 定义集群名字
  # 使用 SA 认证
  kube_cluster_name:
  labels:
    env: "prod"
    # 动态标签
    - name: "os"
        command: [ "/usr/bin/uname" ]
        period: "5s"
    # GKE 集群名字
    - name: cluster-name
      command: [ 'curl', 'http://metadata.google.internal/computeMetadata/v1/instance/attributes/cluster-name', '-H', 'Metadata-Flavor: Google' ]
      period: 1m0s
```

# FAQ
## access denied to admin connecting to on cluster teleport

## the connection was closed on the remote side
