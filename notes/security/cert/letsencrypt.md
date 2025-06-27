---
title: Let's Encrypt
---

# Let's Encrypt

- [letsdebug](https://letsdebug.net/)
  - 检查域名证书问题
- [频率限制](https://letsencrypt.org/docs/rate-limits/)
  - 50 证书/注册域名/周
    - 注册域名按照顶级域名算
    - 例如 www.example.com -> example.com
  - 每个证书最多 100 个域名
    - 每周最多 5000 域名证书
  - 续期不计入每周注册域名数 - 每周最多 5 重复证书
    - 通过证书内 SAN 判断是否相同
  - Revoke 无限制
  - 每小时最多 5 次验证失败
  - 核心接口 20 RPS，非核心 40 RPS
  - 一般不会遇到的限制
    - 10 账户/IP/3 小时
    - 500 账户/IPv6-48/3 小时
    - 300 待验证授权/账户
- 证书有效期 三个月, 90 天, 13 周
- [staging](https://letsencrypt.org/docs/staging-environment/)
  - https://acme-staging-v02.api.letsencrypt.org/directory
  - ACME v2 New Orders 1,500/3h
- IP 证书 - IP SAN
  - 使用 HTTP, TLS-ALPN challange
  - 参考
    - https://community.letsencrypt.org/t/getting-ready-to-issue-ip-address-certificates/238777/3
