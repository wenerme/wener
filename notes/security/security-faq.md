---
title: Security FAQ
tags:
  - FAQ
---

# Security FAQ

## X.509 vs PEM

都用于对证书进行编码

- X.509
  - 一些列安全相关标准
  - 只有 X.509 object presentation 与 PEM 相关
  - 传输时基于 ASN.1 编码
  - 要分析内容才知道编码的是什么
  - bytes - 面向机器
  - 后缀一般为 .der
  - .cer 和 .crt 都是 ASN.1 编码 - 后缀用于标识作用，便于系统区分
- PEM - Privacy Enhanced Mail - RFC1421
  - 提供额外嵌套对象标识信息
  - 文本格式 - 面向人
  - 后缀一般为 .pem

## TLS vs SSL

都用于提供安全连接 - 认证、加密、完整性检查。

- SSL - Secure socket layer
  - SSL 1.0 by Netscape - 1995
  - 已废弃
  - MD5, SHA1, MAC
- TLS - Transport layer security
  - TLS 1.0 by IETF - 1999
  - 继承 SSL - SSL 新版本
  - 非对称加密
  - HMAC - integrity
  - AEAD - TLS 1.3
    - Authenticated Encryption with Associated Data

| time      | SSL     | TLS     |
| --------- | ------- | ------- |
| 1995-2011 | SSL 2.0 |
| 1996-2015 | SSL 3.0 |
| 1999-2020 |         | TLS 1.0 |
| 2006-2020 |         | TLS 1.1 |
| 2008-     |         | TLS 1.2 |
| 2018-     |         | TLS 1.3 |
