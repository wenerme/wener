---
id: kerberos
title: Kerberos
---

# Kerberos

## Tips

- [Kerberos: The Network Authentication Protocol](https://web.mit.edu/kerberos/)
  - [文档](https://web.mit.edu/kerberos/krb5-latest/doc/)
- network authentication protocol
- 密码不会被传输 - 使用有 TTL 的 Tickets
- SSO 体系 - 单个 Tickets 可以访问较多的服务
- KDC 作为可信的第三方 - 管理所有的用户和服务
- 双向鉴权系统 - 类似 mTLS
- Windows 环境下大量使用
- 应用
  - Samba
- 主要端口就 88/udp/tcp 和 464/udp/tcp
- 可以使用 SVR 避免指定端口

| 端口 | 说明                                              |
| ---- | ------------------------------------------------- |
| 88   | Kerberos authentication system                    |
| 464  | Kerberos Change/Set password                      |
| 543  | klogin, Kerberos login                            |
| 544  | kshell, Kerberos Remote shell                     |
| 749  | Kerberos (protocol) administration[10]            |
| 750  | kerberos-iv, Kerberos version IV                  |
| 751  | kerberos_master, Kerberos authentication          |
| 752  | passwd_server, Kerberos password (kpasswd) server |
| 754  | krb5_prop, Kerberos v5 slave propagation          |
| 760  | krbupdate, Kerberos registration                  |
| 1109 | Kerberos Post Office Protocol                     |

## 客户端
```ini
[logging]
# 默认配置
[libdefaults]
dns_lookup_realm = false
ticket_lifetime = 24h
renew_lifetime = 7d
forwardable = true
rdns = false
# 默认域
default_realm = EXAMPLE.COM

# 域配置
[realms]
EXAMPLE.COM = {
  kdc = example.com:60088
  kpasswd_server = example.com:60464
}

# 域名映射域
[domain_realm]
.example.com = EXAMPLE.COM
example.com = EXAMPLE.COM
```

```bash
# 初始
kinit wener
# 查看缓存授权
klist
# 修改密码
kpasswd
```
