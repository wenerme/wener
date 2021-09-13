---
title: ACME
tags:
- Awesome
---

# ACME

## Provider

- letsencrypt
- ZeroSSL
  - 不支持 ACME 账号自动申请 - 需要注册账号, 客户端要支持 EAB
  - Maximum NIST P-384
  - 支持 certificate revocation
- BuyPass
  - 只对 ACME 账号提供 RSA 证书
  - 支持自动 ACME account 申请
  - Maximum NIST P256 certs
  - 支持 certificate revocation
  - 默认证书 6 个月 - 对于 ACME 自动化来说并不是特别好
- sslcom
  - 需要账号
  - 单证书 500 域名
  - 域名证书不限
- 参考
  - [letsencrypt/boulder](https://github.com/letsencrypt/boulder)
    - ACME CA
  - [letsencrypt/pebble](https://github.com/letsencrypt/pebble)
    - small RFC 8555 ACME test server
  - [crt.sh](https://crt.sh/)
    - 证书记录查询
  - [hashicorp/vault#8690](https://github.com/hashicorp/vault/issues/8690)
    Vault as an ACME-based CA
  - [acmesh-official/acme.sh/wiki/Server](https://github.com/acmesh-official/acme.sh/wiki/Server)

| Provider         | ACME server URL                                                        | Doc                                       |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| letsencrypt      | https://acme-v02.api.letsencrypt.org/directory                         | https://letsencrypt.org/docs/rate-limits/ |
| letsencrypt_test | https://acme-staging-v02.api.letsencrypt.org/directory                 |
| buypass          | https://api.buypass.com/acme/directory                                 |
| buypass_test     | https://api.test4.buypass.no/acme/directory                            |
| zerossl          | https://acme.zerossl.com/v2/DV90                                       | https://zerossl.com/documentation/acme/   |
| sslcom           | https://acme.ssl.com/sslcom-dv-rsa, https://acme.ssl.com/sslcom-dv-ecc |

## Challenge

- HTTP-01
  - `http://example.com/.well-known/acme-challenge/<challenge>`
  - 要求能被外部访问
  - 一次一个域名
- DNS-01
  - `TXT _acme-challenge.example.com <challenge>`
  - 要求能修改 DNS
  - 支持泛域名证书

## Client

- [acmesh-official/acme.sh](https://github.com/acmesh-official/acme.sh)
  - GPL-3.0, Shell
- Caddy Server
- [certbot/certbot](https://github.com/certbot/certbot)
  - Apache-2.0, Python
