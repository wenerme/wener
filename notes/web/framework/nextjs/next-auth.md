---
title: NextAuth
---

# NextAuth

- [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth)
  - ISC, TS
- 回调 `/api/auth/callback/<NAME>`
- Provider
  - Gitlab
    - 回调要完整，127.0.0.1 要额外加
    - 可以配置多个回调
  - Github
    - 回调配前缀，默认支持 127.0.0.1
    - 只能配置**一个**回调

| env                   | for               |
| --------------------- | ----------------- |
| NEXTAUTH_URL          |
| NEXTAUTH_SECRET       | 生产环境必须      |
| NEXTAUTH_URL_INTERNAL | 默认 NEXTAUTH_URL |

- AUTH_TRUST_HOST || VERCEL
  - 用于 detectHost

:::caution

- [#6710](https://github.com/nextauthjs/next-auth/issues/6710)
  refresh token rotation doesn't update client session

:::

```ts
// 内部全局上下文
const __NEXTAUTH: NextAuthClientConfig = {
  baseUrl: parseUrl(process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL).origin,
  basePath: parseUrl(process.env.NEXTAUTH_URL).path,
  baseUrlServer: parseUrl(process.env.NEXTAUTH_URL_INTERNAL ?? process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL)
    .origin,
  basePathServer: parseUrl(process.env.NEXTAUTH_URL_INTERNAL ?? process.env.NEXTAUTH_URL).path,
  _lastSync: 0,
  _session: undefined,
  _getSession: () => {},
};

// profile 转 account 逻辑
const getProfile = {
  profile,
  account: {
    provider: provider.id,
    type: provider.type,
    providerAccountId: profile.id.toString(),
    ...tokens,
  },
  OAuthProfile: profile,
};

export const defaultCallbacks: CallbacksOptions = {
  signIn() {
    // 是否允许登录
    // 可以返回 字符串做 redirect
    return true;
  },
  redirect({ url, baseUrl }) {
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    else if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
  session({ session }) {
    return session;
  },
  // jwt session
  jwt({ token }) {
    return token;
  },
};
```

- tokens:TokenSet
  - 包含 access_token
- createState - state
  - maxAge: 900 - 15m
- 会在 sessionMaxAge 更新 session 有效期

```ts
import { generators } from 'openid-client';
// 生成 state
const state = generators.state();
```

## 数据模型 {#models}

- User -1-\*-> Account
- User -1-\*-> Session
- VerificationToken

**Adapter**

- 登录
  - createUser
  - getUser
  - getUserByEmail
  - getUserByAccount
  - linkAccount
  - createSession
  - getSessionAndUser
  - updateSession
  - deleteSession
  - updateUser
- 邮箱/无密码登录
  - createVerificationToken
  - useVerificationToken
- 目前没用到
  - deleteUser
  - unlinkAccount

---

- https://next-auth.js.org/adapters/models

## REST API

| method | url                          | note                |
| ------ | ---------------------------- | ------------------- |
| GET    | /api/auth/signin             | 内置登录页          |
| GET    | /api/auth/signout            | 内置登出页          |
| POST   | /api/auth/signout            | 退出登录 - CSRF     |
| GET    | /api/auth/csrf               | 获取 CSRF           |
| GET    | /api/auth/session            |
| GET    | /api/auth/providers          |
| POST   | /api/auth/signin/:provider   | 开始登录流程        |
| GET    | /api/auth/callback/:provider | OAuth 回调          |
| POST   | /api/auth/callback/:provider | 账号密码登录 - CSRF |

- https://next-auth.js.org/getting-started/rest-api

# FAQ

## CORS

- https://github.com/nextauthjs/next-auth/issues/4327#issuecomment-1090389591

## 不能获取 Cookie

- HTTP Only

```js
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
getCookie('next-auth.session-token');
```
