---
title: vaultwarden
---

# vaultwarden

- [dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
  - AGPL-3.0, Rust
  - 非官方 bitwarden 兼容服务实现
  - 支持 LDAP
  - 必须要求 HTTPS
  - 支持 SQLite, MySQL, PostgreSQL
- 参考
  - https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb
    - Chrome
  - https://apps.apple.com/cn/app/bitwarden-password-manager/id1137397744
    - iOS

:::tip

- Feature Requests [dani-garcia/vaultwarden#246](https://github.com/dani-garcia/vaultwarden/issues/246)
  - 不支持 SSO
  - 暂不支持 2FA 管理

:::

```bash
docker run --rm -it \
  -v $PWD/vaultwarden/data/:/data/ \
  -p 80:80 \
  --name vaultwarden vaultwarden/server:latest

# 生成 admin token
openssl rand -base64 48
```

- data/
  - db.sqlite3
  - rsa_key.der
  - rsa_key.pem
  - rsa_key.pub.der
  - icon_cache/

| env                                      | default                        | for                                                      |
| ---------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| DATA_FOLDER                              | data                           | 主数据目录，可为本地路径或外部存储（如 S3）              |
| RSA_KEY_FILENAME                         | data/rsa_key                   | RSA 密钥文件路径                                         |
| ICON_CACHE_FOLDER                        | data/icon_cache                | 图标缓存目录                                             |
| ATTACHMENTS_FOLDER                       | data/attachments               | 附件存储目录                                             |
| SENDS_FOLDER                             | data/sends                     | Send 文件存储目录                                        |
| TMP_FOLDER                               | data/tmp                       | 临时文件目录                                             |
| TEMPLATES_FOLDER                         | data/templates                 | HTML 模板目录                                            |
| RELOAD_TEMPLATES                         | false                          | 是否每次请求自动重新加载模板，仅开发用                   |
| WEB_VAULT_FOLDER                         | web-vault/                     | Web vault 静态文件目录                                   |
| WEB_VAULT_ENABLED                        | true                           | 是否启用 Web vault                                       |
| DATABASE_URL                             | data/db.sqlite3                | 数据库连接字符串，支持 SQLite/MySQL/PostgreSQL           |
| ENABLE_DB_WAL                            | true                           | 是否启用 SQLite WAL                                      |
| DB_CONNECTION_RETRIES                    | 15                             | 启动时数据库连接重试次数                                 |
| DATABASE_TIMEOUT                         | 30                             | 获取数据库连接超时时间（秒）                             |
| DATABASE_IDLE_TIMEOUT                    | 600                            | 数据库空闲连接超时时间（秒）                             |
| DATABASE_MIN_CONNS                       | 2                              | 数据库连接池最小连接数                                   |
| DATABASE_MAX_CONNS                       | 10                             | 数据库连接池最大连接数                                   |
| DATABASE_CONN_INIT                       |                                | 新建数据库连接时执行的 SQL 语句                          |
| ENABLE_WEBSOCKET                         | true                           | 是否启用 websocket 通知                                  |
| PUSH_ENABLED                             | false                          | 是否启用推送通知                                         |
| PUSH_INSTALLATION_ID                     | CHANGEME                       | 推送通知安装 ID                                          |
| PUSH_INSTALLATION_KEY                    | CHANGEME                       | 推送通知安装 KEY                                         |
| PUSH_RELAY_URI                           | https://push.bitwarden.com     | 推送中继 URI                                             |
| PUSH_IDENTITY_URI                        | https://identity.bitwarden.com | 推送身份 URI                                             |
| JOB_POLL_INTERVAL_MS                     | 30000                          | 任务调度线程轮询间隔（ms）                               |
| SEND_PURGE_SCHEDULE                      | `0 5 * * * *`              | Send 过期清理任务 cron                                   |
| TRASH_PURGE_SCHEDULE                     | `0 5 0 * * *`               | 回收站清理任务 cron                                      |
| INCOMPLETE_2FA_SCHEDULE                  | `30 * * * * *`              | 未完成 2FA 登录检查 cron                                 |
| EMERGENCY_NOTIFICATION_REMINDER_SCHEDULE | `0 3 * * * *`              | 紧急访问提醒 cron                                        |
| EMERGENCY_REQUEST_TIMEOUT_SCHEDULE       | `0 7 * * * *`              | 紧急访问超时处理 cron                                    |
| EVENT_CLEANUP_SCHEDULE                   | `0 10 0 * * *`              | 事件表清理 cron                                          |
| EVENTS_DAYS_RETAIN                       |                                | 事件保留天数                                             |
| AUTH_REQUEST_PURGE_SCHEDULE              | `30 * * * * *`              | 认证请求清理 cron                                        |
| DUO_CONTEXT_PURGE_SCHEDULE               | `30 * * * * *`              | Duo MFA context 清理 cron                                |
| PURGE_INCOMPLETE_SSO_NONCE               | `0 20 0 * * *`              | SSO nonce 清理 cron                                      |
| DOMAIN                                   |                                | 服务访问域名（建议配置，影响附件下载、邮件链接、U2F 等） |
| SENDS_ALLOWED                            | true                           | 是否允许创建 Bitwarden Send                              |
| HIBP_API_KEY                             |                                | HaveIBeenPwned API Key                                   |
| ORG_ATTACHMENT_LIMIT                     |                                | 组织附件存储上限（KB）                                   |
| USER_ATTACHMENT_LIMIT                    |                                | 用户附件存储上限（KB）                                   |
| USER_SEND_LIMIT                          |                                | 用户 Send 存储上限（KB）                                 |
| TRASH_AUTO_DELETE_DAYS                   |                                | 回收站自动删除天数                                       |
| INCOMPLETE_2FA_TIME_LIMIT                | 3                              | 2FA 登录未完成判定超时时间（分钟）                       |
| DISABLE_ICON_DOWNLOAD                    | false                          | 禁用图标下载                                             |
| SIGNUPS_ALLOWED                          | true                           | 是否允许新用户注册                                       |
| SIGNUPS_VERIFY                           | false                          | 注册时是否需要邮箱验证                                   |
| SIGNUPS_VERIFY_RESEND_TIME               | 3600                           | 邮箱验证重发间隔（秒）                                   |
| SIGNUPS_VERIFY_RESEND_LIMIT              | 6                              | 邮箱验证重发次数上限                                     |
| SIGNUPS_DOMAINS_WHITELIST                |                                | 允许注册的邮箱域名白名单                                 |
| ORG_EVENTS_ENABLED                       | false                          | 是否启用组织事件日志                                     |
| ORG_CREATION_USERS                       |                                | 允许创建组织的用户                                       |
| INVITATIONS_ALLOWED                      | true                           | 是否允许邀请用户加入组织                                 |
| INVITATION_ORG_NAME                      | Vaultwarden                    | 邀请邮件中显示的组织名                                   |
| INVITATION_EXPIRATION_HOURS              | 120                            | 邀请链接有效期（小时）                                   |
| EMERGENCY_ACCESS_ALLOWED                 | true                           | 是否允许紧急访问                                         |
| EMAIL_CHANGE_ALLOWED                     | true                           | 是否允许用户更改邮箱                                     |
| PASSWORD_ITERATIONS                      | 600000                         | 密码哈希迭代次数                                         |
| PASSWORD_HINTS_ALLOWED                   | true                           | 是否允许设置/显示密码提示                                |
| SHOW_PASSWORD_HINT                       | false                          | 无 SMTP 时是否直接在页面显示密码提示                     |
| IP_HEADER                                | X-Real-IP                      | 客户端 IP 头部名                                         |
| ICON_SERVICE                             | internal                       | 图标服务类型                                             |
| ICON_REDIRECT_CODE                       | 302                            | 图标重定向 HTTP 状态码                                   |
| ICON_CACHE_TTL                           | 2592000                        | 图标缓存 TTL（秒，成功）                                 |
| ICON_CACHE_NEGTTL                        | 259200                         | 图标缓存 TTL（秒，失败）                                 |
| ICON_DOWNLOAD_TIMEOUT                    | 10                             | 图标下载超时时间（秒）                                   |
| HTTP_REQUEST_BLOCK_REGEX                 |                                | 阻止的 HTTP 域名/IP 正则                                 |
| HTTP_REQUEST_BLOCK_NON_GLOBAL_IPS        | true                           | 阻止非公网 IP                                            |
| EXPERIMENTAL_CLIENT_FEATURE_FLAGS        |                                | 客户端实验性功能标志                                     |
| REQUIRE_DEVICE_EMAIL                     | false                          | 新设备登录是否强制发送邮件                               |
| EXTENDED_LOGGING                         | true                           | 是否启用扩展日志                                         |
| LOG_TIMESTAMP_FORMAT                     | "%Y-%m-%d %H:%M:%S.%3f"        | 扩展日志时间戳格式                                       |
| USE_SYSLOG                               | false                          | 是否日志输出到 syslog                                    |
| LOG_FILE                                 |                                | 日志文件路径                                             |
| LOG_LEVEL                                | info                           | 日志级别                                                 |
| ADMIN_TOKEN                              |                                | 管理后台 token，未设置则禁用 admin                       |
| DISABLE_ADMIN_TOKEN                      | false                          | 跳过 admin token 校验（需前置认证层）                    |
| ADMIN_RATELIMIT_SECONDS                  | 300                            | admin 登录限流间隔（秒）                                 |
| ADMIN_RATELIMIT_MAX_BURST                | 3                              | admin 登录限流突发次数                                   |
| ADMIN_SESSION_LIFETIME                   | 20                             | admin 会话有效期（分钟）                                 |
| ALLOWED_IFRAME_ANCESTORS                 |                                | 允许嵌入 iframe 的域                                     |
| ALLOWED_CONNECT_SRC                      |                                | 允许 connect-src 的域                                    |
| LOGIN_RATELIMIT_SECONDS                  | 60                             | 登录限流间隔（秒）                                       |
| LOGIN_RATELIMIT_MAX_BURST                | 10                             | 登录限流突发次数                                         |
| ORG_GROUPS_ENABLED                       | false                          | 是否启用组织分组（Beta）                                 |
| INCREASE_NOTE_SIZE_LIMIT                 | false                          | 增加安全笔记大小限制                                     |
| ENFORCE_SINGLE_ORG_WITH_RESET_PW_POLICY  | false                          | 启用重置密码策略时强制单组织                             |
| SSO_ENABLED                              | false                          | 是否启用 SSO                                             |
| SSO_ONLY                                 | false                          | 是否只允许 SSO 登录                                      |
| SSO_SIGNUPS_MATCH_EMAIL                  | true                           | SSO 注册时是否自动关联邮箱                               |
| SSO_ALLOW_UNKNOWN_EMAIL_VERIFICATION     | false                          | 允许未知邮箱验证状态（有安全风险）                       |
| SSO_AUTHORITY                            |                                | OIDC 服务器地址                                          |
| SSO_SCOPES                               | `email profile`                | SSO 授权 scope                                           |
| SSO_AUTHORIZE_EXTRA_PARAMS               |                                | SSO 授权额外参数                                         |
| SSO_PKCE                                 | true                           | SSO 是否启用 PKCE                                        |
| SSO_AUDIENCE_TRUSTED                     | '^$'                           | 额外信任的 ID token audience 正则                        |
| SSO_CLIENT_ID                            |                                | SSO 客户端 ID                                            |
| SSO_CLIENT_SECRET                        |                                | SSO 客户端密钥                                           |
| SSO_MASTER_PASSWORD_POLICY               |                                | SSO 主密码策略                                           |
| SSO_AUTH_ONLY_NOT_SESSION                | false                          | SSO 仅用于认证不管理会话                                 |
| SSO_CLIENT_CACHE_EXPIRATION              | 0                              | SSO 发现端点缓存时间（秒）                               |
| SSO_DEBUG_TOKENS                         | false                          | SSO 是否调试输出 token                                   |
| YUBICO_CLIENT_ID                         |                                | Yubikey OTP 客户端 ID                                    |
| YUBICO_SECRET_KEY                        |                                | Yubikey OTP 密钥                                         |
| YUBICO_SERVER                            |                                | Yubikey OTP 服务器                                       |
| DUO_IKEY                                 |                                | Duo 集成 key                                             |
| DUO_SKEY                                 |                                | Duo secret key                                           |
| DUO_HOST                                 |                                | Duo API 主机                                             |
| DUO_USE_IFRAME                           | false                          | Duo 是否使用传统 iframe 提示                             |
| EMAIL_TOKEN_SIZE                         | 6                              | 邮件 2FA 验证码位数                                      |
| EMAIL_EXPIRATION_TIME                    | 600                            | 邮件 2FA 验证码有效期（秒）                              |
| EMAIL_ATTEMPTS_LIMIT                     | 3                              | 邮件 2FA 最大尝试次数                                    |
| EMAIL_2FA_ENFORCE_ON_VERIFIED_INVITE     | false                          | 注册时强制设置邮件 2FA                                   |
| EMAIL_2FA_AUTO_FALLBACK                  | false                          | 自动设置邮件 2FA 作为备用                                |
| DISABLE_2FA_REMEMBER                     | false                          | 禁用 2FA 记住设备功能                                    |
| AUTHENTICATOR_DISABLE_TIME_DRIFT         | false                          | 禁用 TOTP 时间漂移容忍                                   |
| SMTP_HOST                                |                                | SMTP 服务器                                              |
| SMTP_FROM                                |                                | 邮件发件人                                               |
| SMTP_FROM_NAME                           | Vaultwarden                    | 邮件发件人名称                                           |
| SMTP_USERNAME                            |                                | SMTP 用户名                                              |
| SMTP_PASSWORD                            |                                | SMTP 密码                                                |
| SMTP_TIMEOUT                             | 15                             | SMTP 超时时间（秒）                                      |
| SMTP_SECURITY                            | starttls                       | SMTP 安全类型（starttls/force_tls/off）                  |
| SMTP_PORT                                | 587                            | SMTP 端口                                                |
| USE_SENDMAIL                             | false                          | 是否使用 sendmail 命令发送邮件                           |
| SENDMAIL_COMMAND                         |                                | sendmail 命令路径                                        |
| SMTP_AUTH_MECHANISM                      |                                | SMTP 认证机制                                            |
| HELO_NAME                                |                                | SMTP HELO 名称                                           |
| SMTP_EMBED_IMAGES                        | true                           | 邮件内嵌图片                                             |
| SMTP_DEBUG                               | false                          | SMTP 调试输出                                            |
| SMTP_ACCEPT_INVALID_CERTS                | false                          | SMTP 是否接受无效证书（危险）                            |
| SMTP_ACCEPT_INVALID_HOSTNAMES            | false                          | SMTP 是否接受无效主机名（危险）                          |
| ROCKET_ADDRESS                           | 0.0.0.0                        | Rocket 监听地址                                          |
| ROCKET_PORT                              | 8000                           | Rocket 监听端口                                          |
| ROCKET_TLS                               |                                | Rocket TLS 配置                                          |

## 无邮件操作流程

1. admin 添加用户
2. 使用添加的 email 创建账号
3. 邀请新的用户加入组织，在新账号创建好后点确认
