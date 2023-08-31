---
title: Vault 密钥引擎
---

# Vault 密钥引擎

- ad - Active Directory
  - password rotation
  - service account check-out
- alicloud - 阿里云
  - 基于 RAM 策略生成 token
    - 会有时间限制，自动 revoke
  - 基于 RAM 角色生成 STS 授权信息
    - 短期、不可刷新
- cubbyhole - token 独立空间 - 类似于 session/cookie
- consul
  - 基于策略生成 Token
- 数据库 - `<type>-database-plugin` - 基于配置的角色动态生成授权
  - cassandra
  - elasticsearch
  - mysql
    - mysql-database-plugin
    - mysql-aurora-database-plugin
    - mysql-rds-database-plugin
    - mysql-legacy-database-plugin
  - postgresql
- kv
- identity - Vault 自身授权
- nomad
- openldap - LDAP v3
- pki - 动态生成 X.509 证书
  - 减少证书时限，每个应用可用独立证书，避免证书共享交换
- rabbitmq
- ssh - SSH 授权认证
  - 证书签发
  - 一次性密码
  - ~动态 Key~ - 废弃
- totp
- transit - 提供加密解密功能
  - cryptography as a service / encryption as a service

## consul

```bash
vault secrets enable consul

vault write consul/config/access \
  address=127.0.0.1:8500 \
  token=E2A500CD-0599-409E-949B-E321135FAAD5
```
