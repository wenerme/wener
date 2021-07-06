---
title: Keycloak JS SDK
---

# Keycloak JS SDK

- 是什么？
  - Keycloak 提供的 JS SDK
  - 支持登陆、注册、SSO 检测、个人信息 URL、自动刷新、退出登陆等功能

```js
const kc = Keycloak({
    url: 'https://kc.example.com/auth',
    realm: 'app',
    clientId: 'app-web',
  });
}
await kc.init({
  // onLoad: 'login-required', //  每次进行强制登陆
  onLoad: 'check-sso', // iframe 检测登陆状态
  // iframe sso 重定向地址 - 将 href postMessage 到主 window
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  silentCheckSsoFallback: true, // 未登陆时进行强制登陆
  // useNonce: true,
  checkLoginIframe: true, // 使用 iframe 检测
  checkLoginIframeInterval: 30, // 检测间隔
  enableLogging: process.env.NODE_ENV === 'development', // 日志记录
  // redirectUri: '' // 重定向地址

  responseMode: 'fragment', // 通过 # 返回状态
  // responseMode: 'query', // 通过 ? 返回状态

  flow: 'standard', // 默认
  responseType: 'code',
  flow: 'implicit',
  responseType: 'id_token token',
  flow: 'hybrid',
  responseType: 'code id_token token',

  // timeSkew: 0 ,// 允许的时间倾斜
  // pkceMethod: 'S256',
})
// 授权状态
kc.authenticated
// token 如果还有 45s 失效则刷新 token
kc.updateToken(45)
```

- check-sso
  - loginIframe.enable == true
    - setup login iframe
    - check login iframe
    - silentCheckSsoRedirectUri
      - 有 - checkSsoSilently
      - 无 - doLogin
  - loginIframe.enable == false
    - silentCheckSsoRedirectUri
      - 有 - checkSsoSilently
      - 无 - doLogin
- login-required
  - doLogin - kc.login
- checkSsoSilently
  - 创建 iframe
  - src=`kc.createLoginUrl({prompt: 'none', redirectUri: kc.silentCheckSsoRedirectUri})`
  - 接受 postMessage - 包含结果 href
- 非 implicit 取到 token 后会请求 kc 获取 access_token 和 refresh_token
- standard
  - code, state, session_state, kc_action_status
- implicit
  - access_token, token_type, id_token, state, session_state, expires_in, kc_action_status
- hybrid
  - access_token, id_token, code, state, session_state, kc_action_status
- 异常参数 - error, error_description, error_uri

```ts
// loadUserProfile
// token 中本身携带了个人信息 - profile 会请求用户的 account 信息
interface KeycloakProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  totp?: boolean;
  createdTimestamp?: number;
  // 注意 - 值是数组
  attributes?: Record<string, string[]>;
}
```
