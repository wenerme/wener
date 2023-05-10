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

## AES-CBC vs. AES-GCM vs. AES-CTR

- CTR (Counter Mode)
- CBC (Cipher Block Chaining)
- GCM (Galois/Counter Mode)

```js
const key = await window.crypto.subtle.generateKey({ name: 'AES-CBC', length: 256 }, true, ['encrypt', 'decrypt']);
```

## PKCS#7 Padding

- 用于 AES
- 补齐 BlockSize - 一般 32
- 最后一位记录 Padding 的长度

## pkcs1 vs pkcs8

PKCS（Public-Key Cryptography Standards）是由 RSA 实验室制定的一系列公钥密码体系标准。PKCS#1 和 PKCS#8 是这些标准中的两个，它们分别定义了 RSA 密钥对的表示和私钥信息的表示。

1. PKCS#1（RSA Cryptography Standard）：
   PKCS#1 是专门针对 RSA 密钥对的标准。它定义了 RSA 公钥和私钥的表示和编码。在 PKCS#1 标准中，私钥的表示通常包含以下信息：

   - RSA 模数（n）
   - 公钥指数（e）
   - 私钥指数（d）
   - 两个质数（p 和 q）
   - 两个质数的乘法逆元（dp 和 dq）
   - 系数 q 的逆元（qi）
     PKCS#1 格式的密钥通常用于与 RSA 密钥相关的操作，如加密、解密、签名和验证。

2. PKCS#8（Private-Key Information Syntax Standard）：
   PKCS#8 是一种更通用的私钥表示标准，它适用于各种类型的非对称加密算法（例如 RSA、DSA 和 ECDSA 等）。PKCS#8 私钥通常包含以下信息：
   - 私钥算法标识符
   - 私钥本身
   - 可选的属性集合
     PKCS#8 格式的密钥可以用于与多种非对称加密算法相关的操作，而不仅仅是 RSA。

总之，PKCS#1 是专门针对 RSA 密钥对的标准，而 PKCS#8 是一种更通用的私钥表示标准，适用于各种非对称加密算法。
