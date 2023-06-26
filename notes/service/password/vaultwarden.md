---
title: vaultwarden
---

# vaultwarden

- [dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
  - GPL-3.0, Rust
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

| env                 | default | for                                  |
| ------------------- | ------- | ------------------------------------ |
| SIGNUPS_ALLOWED     | false   | 禁止注册 - 但还是可以邀请            |
| INVITATIONS_ALLOWED |         | 是否允许邀请                         |
| ADMIN_TOKEN         |         | 开启 admin - https://localhost/admin |

```bash
docker run --rm -it \
  -v $PWD/bitwarden/data/:/data/ \
  -p 80:80 \
  --name bitwarden bitwardenrs/server:latest

# 生成 admin token
openssl rand -base64 48
```

- data/
  - db.sqlite3
  - rsa_key.der
  - rsa_key.pem
  - rsa_key.pub.der
  - icon_cache/

## 无邮件操作流程

1. admin 添加用户
2. 使用添加的 email 创建账号
3. 邀请新的用户加入组织，在新账号创建好后点确认
