---
title: Kratos
---

# Kratos

- API first 用户管理
- Identity Infrastructure Service
  - 对比 Identity and Access Management (IAM), Identity Management (IdM), Identity Provider (IP/IdP), Identity as a Service (IDaaS)
- Username + Password -> Cookie, Token
- Email + Password -> Cookie, Token
- Passwordless login -> Cookie, Token
- 可当作库来使用
- 主要解决问题
  - 凭证管理 - 密码、恢复邮箱、安全问题
  - 认证 - 安全登录、会话、设备
  - 账号信息管理 - profile、邮箱、密码
  - 账号管理 - CRUD
  - 身份信息管理 - 名字、照片、生日
- 适用场景
  - 不涉及第三方登陆，希望登陆后拿到 Token

:::caution

- 不要在浏览器使用 API flow - 使用 HTML __form__
- 目前不支持 MFA - 多因素验证 - 不支持短信
- 前端需要自行实现，但相对容易

:::

## Flow

- 注册
  - /self-service/registration/browser
- 登陆
  - /self-service/login/browser
- 注销
- 验证
 - `/self-service/verification/methods/link?token=${TOKEN}`
- User Settings
- Account Recovery
- Address Verification
- User-Facing Error
- 2FA / MFA



## 配置

```bash
# 密码参数
kratos hashers argon2 calibrate 1s
```

## SDK
* [REST API](https://www.ory.sh/kratos/docs/reference/api/)
* Go [client](https://github.com/ory/kratos-client-go)
* Admin
  * 系统信息接口
    * /health/alive
    * /health/ready
    * /metrics/prometheus
  * 业务接口
    * /identities
    * /recovery/link
* Public
  * /schemas/{id}
  * /self-service/browser/flows/logout
  * /self-service/browser/flows/registration/strategies/oidc/settings/connections
  * /self-service/errors?error=string
  * /version
  * 登陆/login 流程
    * /self-service/login/browser - 初始化浏览器登陆流程
    * /self-service/login/api - 初始化 API 登陆流程
      * 不要在浏览器使用
      * 用于 移动设备，智能电视 等
    * `/self-service/login/flows?flow=string` - 获取注册流程信息
    * `/self-service/login/methods/password?flow=string` - 完成密码登陆流程
  * 注册/registration 流程
    * /self-service/registration/browser
    * /self-service/registration/api
    * `/self-service/registration/flows?flow=string`
    * /self-service/registration/methods/password
  * 恢复/recovery 流程
    * /self-service/recovery/browser
    * /self-service/recovery/api
    * `/self-service/recovery/flows?id=string`
    * /self-service/recovery/methods/link
  * 设置/setting
    * /self-service/settings/api
    * /self-service/settings/browser/flows
    * /self-service/settings/flows?id=string
    * /self-service/settings/methods/password - 修改密码
    * /self-service/settings/methods/profile - 修改信息
  * 验证/verification
    * /self-service/verification/api
    * /self-service/verification/browser
    * /self-service/verification/flows?id=string
    * /self-service/verification/methods/link
  * 会话管理
    * DELETE /sessions - `{"session_token": "string"}`
    * GET /sessions/whoami

## Serve

```bash
export DSN=sqlite:///tmp/kratos.sqlite?_fk=true
./kratos -c ./contrib/quickstart/kratos/email-password migrate sql -e --yes
LOG_LEVEL=trace ./kratos serve -c /etc/config/kratos/kratos.yml --dev
```

## Get Started

```bash
git clone https://github.com/ory/kratos.git
cd kratos
# 切换到最新版本
git checkout v0.5.4-alpha.1

docker pull oryd/kratos:latest-sqlite
docker pull oryd/kratos-selfservice-ui-node:latest
# 4455 - http://github.com/ory/kratos-selfservice-ui-node
# 4433 - Kratos Public API
# 4434 - Kratos Admin API
# 4436 - https://github.com/mailslurper - 开发用的 SMTP 服务器
# 入口 http://127.0.0.1:4455/dashboard
docker-compose -f quickstart.yml -f quickstart-standalone.yml up --build --force-recreate

# 清理
docker-compose -f quickstart.yml down -v
docker-compose -f quickstart.yml rm -fsv
```

- /dashboard -> /auth/login
  - 未登录重定向
- /auth/login -> http://127.0.0.1:4433/self-service/login/browser
  - 无 flowid 重定向
  - 设置 cookie csrf_token
- -> `/auth/login?flow=<flow_id>`
  - 显示登陆
- -> `http://kratos:4434/self-service/login/flows?id=<flow_id>`
  - 表单提交

```bash
# 登陆信息
curl -s "http://127.0.0.1:4434/self-service/login/flows?id=<flow_id>" | jq

# 注册信息
curl -s "http://127.0.0.1:4434/self-service/registration/flows?id=<flow_id>" | jq
```
