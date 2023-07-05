---
title: Auth
---

# Auth

:::tip 场景

1. 资源访问

- 有 Owner 对象
- 通常通过 Agent/Browser 方式
- 客户端不受信
- 交换获取 Token
- Token 会失效

2. 服务访问 - 后端-后端

- 客户端受信
- API Key
- Service Account
- Basic Auth

:::

- API Auth
- Service Auth
- Service Account - SA
- API Key
- HTTP Auth [HTTP Authentication Schemes](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml)
  - Basic RFC7617
  - Bearer RFC6750
- PAT - Persional Access Token
- Bearer - Opaque 的内容
- JWT 对 Token 内容做第一
- 参考
  - [Swagger Aith](https://swagger.io/docs/specification/authentication/)

## API Key

- [Swagger API Key](https://swagger.io/docs/specification/authentication/api-keys/)
  - `?api_key=$KEY`
  - `X-API-Key: $KEY`
  - `Cookie: X-API-KEY=KEY`
- [key-auth](https://apisix.apache.org/docs/apisix/plugins/key-auth/)
  - `X-API-KEY: `
  - `apikey: `
  - `?apikey=`

### OpenAI

```
GET https://api.openai.com/v1/models
Authorization: Bearer $OPENAI_API_KEY
OpenAI-Organization: $ORG_ID
```

- ORG_ID 有默认
  - `org-ID`
- Secret Key
  - `sk-KEY`

## Service Account

- client_id + client_secret
  - grant=client_credential -> AccessToken
- 可以获取用户相关的 AccessToken
