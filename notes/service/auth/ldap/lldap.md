---
title: LLDAP
---

# LLDAP

- [nitnelave/lldap](https://github.com/nitnelave/lldap)
  - GPLv3, Rust
  - 支持 totp, mfa
  - 支持 sqlite3, mysql ,postgresql
    - by sea-orm
  - 内置 WebUI, 支持 GraphQL

```bash
# http://127.0.0.1:17170
# admin,LLDAP_LDAP_USER_PASS
docker run --rm -it \
  -p 3890:3890 \
  -p 17170:17170 \
  -v $PWD/data:/data \
  -e UID=1000 \
  -e GID=1000 \
  -e TZ=Asia/Shanghai \
  -e LLDAP_JWT_SECRET=LLDAP_JWT_SECRET \
  -e LLDAP_LDAP_USER_PASS=LLDAP_LDAP_USER_PASS \
  -e LLDAP_LDAP_BASE_DN=dc=wener,dc=me \
  --name lldap nitnelave/lldap:stable

cat data/lldap_config.toml
file data/private_key
sqlite3 data/users.db .schema
```

- 默认管理员名字 admin
- 内置分组
  - lldap_admin
  - lldap_password_manager
  - lldap_strict_readonly
