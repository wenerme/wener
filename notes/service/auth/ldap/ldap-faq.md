---
title: LDAP FAQ
tags:
  - FAQ
---

# LDAP FAQ

## 属性命名

- `[a-zA-Z0-9-]`
- [Best Practices For LDAP Naming Attributes](https://ldapwiki.com/wiki/Best%20Practices%20For%20LDAP%20Naming%20Attributes)

## 认证方式

| method         | value |
| -------------- | ----- |
| simple         | 0     |
| ~~krbv42LDAP~~ | 1     |
| ~~krbv42DSA~~  | 2     |
| sasl           | 3     |

- [LDAP Authentication Methods](https://ldapwiki.com/wiki/LDAP%20Authentication%20Methods)

## Bind DN vs Simple Auth

- Bind DN
  - DN + Password
  - Bind Request
  - 服务使用自己的账号去校验用户的账号密码是否匹配
  - 可以预先知道账号信息
  - 可用于导入账号、同步账号
- Simple Authentication / simple bind
  - Username + Password
  - 直接校验
  - 最小粒度权限

---

- ldapwiki [Simple Auth](https://ldapwiki.com/wiki/Simple%20Authentication)
