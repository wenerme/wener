---
title: bitwarden
---

# bitwarden
- bitwarden
  - 密码管理器
- [dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
  - 非官方 bitwarden 兼容服务实现
  - 支持 LDAP
  - Feature Requests [dani-garcia/vaultwarden#246](https://github.com/dani-garcia/vaultwarden/issues/246)
    - 不支持 SSO
  - 必须要求 HTTPS
- SIGNUPS_ALLOWED=false - 禁止注册 - 但还是可以邀请
- INVITATIONS_ALLOWED - 是否允许邀请
- ADMIN_TOKEN - 开启 admin

```bash
docker run --rm -it \
  -v $PWD/bitwarden/data/:/data/ \
  -p 80:80 \
  --name bitwarden bitwardenrs/server:latest

# 生成 admin token
openssl rand -base64 48
```
