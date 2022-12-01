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

| env             | for          |
| --------------- | ------------ |
| NEXTAUTH_SECRET | 生产环境必须 |

## 数据模型 {#models}

- User -1-\*-> Account
- User -1-\*-> Session
- VerificationToken
- https://next-auth.js.org/adapters/models
