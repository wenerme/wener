---
title: dotenv
---

# dotenv

- dotenv
- direnv
- NodeJS/JS
  - [motdotla/dotenv](https://github.com/motdotla/dotenv)
    - npm:[dotenv](https://npmjs.com/package/dotenv)
  - [dotenvx/dotenvx](https://github.com/dotenvx/dotenvx)
    - `dotenvx run -- node index.js`
  - [kerimdzhanov/dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow)
- 通常覆盖逻辑 .env, .env.local, .env.development, .env.development.local
  - `local` 不提交到仓库
- 通常提供 `.env.example`
- 参考
  - https://www.dotenv.org/

```ini
# 多行
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----"
```

## .env

- key - `[a-zA-Z_]+[a-zA-Z0-9_]*`
- .env.ci
- .env.production
- .env.vault
  - DOTENV_VAULT
- .env.me
- .env.keys
  - DOTENV_PRIVATE_KEY, DOTENV_PRIVATE_KEY_PRODUCTION, DOTENV_PRIVATE_KEY_CI
  - DOTENV_PUBLIC_KEY_PRODUCTION
  - `HELLO="encrypted:"` 表示加密内容
  - dotenv 密钥信息
- 参考
  - https://www.dotenv.org/docs/security/env
