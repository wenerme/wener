---
tags:
  - API
---

# Auth API

- API Keys
- Basic Auth
- OAuth 2.0
- HMAC
- 参考
  - [simov/grant](https://github.com/simov/grant)
    - JS
    - OAuth Proxy
  - [simov/purest](https://github.com/simov/purest)
    - REST API Client Library
  - https://docs.strapi.io/dev-docs/plugins/users-permissions
  - https://docs.directus.io/reference/authentication.html

## strapi

- Login /api/auth/local
- /connect/github/redirect
- `/api/connect/${provider}`
- `/api/auth/${provider}/callback`
- `/api/auth/forgot-password`
- `/api/auth/reset-password`
- `/api/auth/send-email-confirmation`
- `/api/auth/email-confirmation?confirmation=TOKEN`

```
POST /api/auth/local/register
```

```json
{
  "username": "Strapi user",
  "email": "user@strapi.io",
  "password": "strapiPassword"
}
```

**修改密码**

```
POST /api/auth/change-password
```

```json
{
  "currentPassword": "currentPassword",
  "password": "userNewPassword",
  "passwordConfirmation": "userNewPassword"
}
```

## directus

### access token

- by header
- by cookie
- by query

```
Authorization: Bearer <token>
Cookie: directus_session_token=<token>
```

```
?access_token=<token>
```

### login

```
POST /auth/login
POST /auth/login/provider
```

```json
{
  "email": "example@wener.com",
  "password": "password",
  "otp": "123456",
  "mode": "jsoncookie|session"
}
```

```json
{
  "access_token": "",
  "expires": 7200,
  "refresh_token": ""
}
```

### refresh

```
POST /auth/refresh
```

```json
{
  "refresh_token": "refresh_token_string",
  "mode": "json|cookie|session"
}
```

```json
{
  "access_token": "",
  "expires": 7200,
  "refresh_token": ""
}
```

### logout

```
POST /auth/logout
```

```json
{
  "refresh_token": "refresh_token",
  "mode": "json"
}
```

### password reset

```
POST /auth/password/request
```

```json
{
  "email": "user_email",
  "reset_url": ""
}
```

```
POST /auth/password/reset
```

```json
{
  "token": "password_reset_token",
  "password": "password"
}
```

### providers

```
GET /auth
```

```json
{
  "data": [
    {
      "name": "GitHub",
      "driver": "oauth2",
      "icon": "github"
    },
    {
      "name": "Google",
      "driver": "openid",
      "icon": "google"
    },
    {
      "name": "Okta",
      "driver": "openid"
    }
  ],
  "disableDefault": false
}
```
