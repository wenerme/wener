---
id: dex
---

# Dex

- 是什么？
  - OIDC, OAuth2 Provider - IdP
  - 支持插件式的 Connector
- 存储
  - sqlite3, mysql, postgres
  - etcd
  - kubernetes - CRD
    - 相当于无状态部署
- 可作为嵌入使用
- 支持 [Kubernetes 授权](https://dexidp.io/docs/kubernetes/) 是核心场景
- Connector
  - LDAP, GitHub, SAML2.0, Gitlab, OpenID Connect, Google, LinkedIn, Microsoft, AuthProxy, Gitea

```bash
go get github.com/dexidp/dex/cmd/dex

dex serve config-dev.yaml
```

**config-dev.yaml**

```yaml
# dex 服务地址
issuer: http://127.0.0.1:5556/dex

# 存储配置
storage:
  type: sqlite3
  config:
    file: examples/dex.db

  # type: mysql
  # config:
  #   host: localhost
  #   port: 3306
  #   database: dex
  #   user: mysql
  #   password: mysql
  #   ssl:
  #     mode: "false"

  # type: postgres
  # config:
  #   host: localhost
  #   port: 5432
  #   database: dex
  #   user: postgres
  #   password: postgres
  #   ssl:
  #     mode: disable

  # type: etcd
  # config:
  #   endpoints:
  #     - http://localhost:2379
  #   namespace: dex/

  # type: kubernetes
  # config:
  #   kubeConfigFile: $HOME/.kube/config

# HTTP 地址
web:
  http: 0.0.0.0:5556
  # Uncomment for HTTPS options.
  # https: 127.0.0.1:5554
  # tlsCert: /etc/dex/tls.crt
  # tlsKey: /etc/dex/tls.key

# Configuration for telemetry
telemetry:
  http: 0.0.0.0:5558

# GRPC 接口
# grpc:
#   addr: 127.0.0.1:5557
#  tlsCert: examples/grpc-client/server.crt
#  tlsKey: examples/grpc-client/server.key
#  tlsClientCA: /etc/dex/client.crt

# 失效控制
# expiry:
#   deviceRequests: "5m"
#   signingKeys: "6h"
#   idTokens: "24h"

# Options for controlling the logger.
# logger:
#   level: "debug"
#   format: "text" # can also be "json"

# Default values shown below
# oauth2:
# use ["code", "token", "id_token"] to enable implicit flow for web-only clients
#   responseTypes: [ "code" ] # also allowed are "token" and "id_token"
# By default, Dex will ask for approval to share data with application
# (approval for sharing data from connected IdP to Dex is separate process on IdP)
#   skipApprovalScreen: false
# If only one authentication method is enabled, the default behavior is to
# go directly to it. For connected IdPs, this redirects the browser away
# from application to upstream provider such as the Google login page
#   alwaysShowLoginScreen: false
# Uncommend the passwordConnector to use a specific connector for password grants
#   passwordConnector: local

# Instead of reading from an external storage, use this list of clients.
#
# If this option isn't chosen clients may be added through the gRPC API.
staticClients:
  - id: example-app
    redirectURIs:
      - 'http://127.0.0.1:5555/callback'
    name: 'Example App'
    secret: ZXhhbXBsZS1hcHAtc2VjcmV0
#  - id: example-device-client
#    redirectURIs:
#      - /device/callback
#    name: 'Static Client for Device Flow'
#    public: true
connectors:
  - type: mockCallback
    id: mock
    name: Example
# - type: google
#   id: google
#   name: Google
#   config:
#     issuer: https://accounts.google.com
#     # Connector config values starting with a "$" will read from the environment.
#     clientID: $GOOGLE_CLIENT_ID
#     clientSecret: $GOOGLE_CLIENT_SECRET
#     redirectURI: http://127.0.0.1:5556/dex/callback
#     hostedDomains:
#     - $GOOGLE_HOSTED_DOMAIN

# Let dex keep a list of passwords which can be used to login to dex.
enablePasswordDB: true

# A static list of passwords to login the end user. By identifying here, dex
# won't look in its underlying storage for passwords.
#
# If this option isn't chosen users may be added through the gRPC API.
staticPasswords:
  - email: 'admin@example.com'
    # bcrypt hash of the string "password"
    hash: '$2a$10$2b2cU8CPhOTaGrs1HRQuAueS7JTT5ZHsHSzYiFPm1leZck7Mc8T4W'
    username: 'admin'
    userID: '08a8684b-db88-4b73-90a9-3cd1661f5466'
```
