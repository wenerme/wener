---
title: npmrc
tags:
  - Configuration
---

# npmrc

- 位置
  - $PROJECT_DIR/.npmrc
  - $HOME/.npmrc
  - $GLOBAL_PREFIX/etc/npmrc
  - $NPM_PREFIX/npmrc - 内置
- 语法
  - `${VARIABLE_NAME}`
- 参考
  - https://docs.npmjs.com/cli/v10/configuring-npm/npmrc
  - parser [npm/ini](https://github.com/npm/ini)

```ini
//registry.npmjs.org/:_authToken=
# //gitlab.com/api/v4/projects/$ID/packages/npm/:_authToken=
# //npm.pkg.github.com/:_authToken=
registry=https://registry.npmmirror.com/
sharp_binary_host=https://npmmirror.com/mirrors/sharp
sharp_libvips_binary_host=https://npmmirror.com/mirrors/sharp-libvips
init.type=module

# @myscope:registry=https://mycustomregistry.example.org
# //mycustomregistry.example.org:_authToken=
```

```bash
npm login
```

- auth
  - `_auth` Base64
  - `_authToken` (authentication token)
  - `username`
  - `_password`
  - `email`
  - `certfile` path -> cert
  - `keyfile` path -> key
