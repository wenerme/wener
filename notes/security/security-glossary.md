---
title: Security Glossary
tags:
  - Glossary
---

# Security Glossary

| abbr.   | stand for                                     | cn                     |
| ------- | --------------------------------------------- | ---------------------- |
| AEAD    | Authenticated Encryption with Associated Data | 带关联数据的认证加密   |
| ASN.1   | Abstract Syntax Notation One                  | 抽象语法标记一         |
| DER     | Distinguished Encoding Rules                  |                        |
| HSM     | Hardware Security Modules                     | 硬件安全模块           |
| KMS     | Key Management Systems                        | 密钥管理系统           |
| PEM     | Privacy Enhanced Mail [rfc1421]               | 隐私增强邮件           |
| PKCS    | Public-Key Cryptography Standards [rfc7292]   |
| PKCS#1  | RSA                                           |
| PKCS#12 |
| PKCS#7  |
| RSA     | Rivest–Shamir–Adleman                         |
| TPM     | Trusted Platform Modules                      | 受信任平台模块         |
| ED25519 | Edwards-curve Digital Signature Algorithm     | 爱德华曲线数字签名算法 |
| X.509   |
| SLSA    | Supply chain Levels for Software Artifacts    | 软件构件供应链级别     |
| CA      | Certificate Authority                         | 证书颁发机构           |
| OCSP    | Online Certificate Status Protocol            | 在线证书状态协议       |
| CRL     | Certificate Revocation List                   | 证书吊销列表           |
| PKI     | Public Key Infrastructure                     | 公钥基础设施           |

[rfc1421]: https://www.rfc-editor.org/rfc/rfc1421
[rfc7292]: https://www.rfc-editor.org/rfc/rfc7292

| pem header              | stand for                   |
| ----------------------- | --------------------------- |
| CERTIFICATE             | Certificate                 |
| X509 CRL                | Certificate Revocation List |
| NEW CERTIFICATE REQUEST | Certificate Request         |
| RSA PRIVATE KEY         | PKCS#1 private key          |
| RSA PUBLIC KEY          | PKCS#1 public key           |
| PRIVATE KEY             | PKCS#8 private key          |

| file extension      | stand for                   | encoding  |
| ------------------- | --------------------------- | --------- |
| .csr                | Certificate Signing Request | PKCS10    |
| .pem                |                             | base64    |
| .key                | private key                 | PEM       |
| .pkcs12, .pfx, .p12 | PCKS                        |
| .der                |                             | ASN.1     |
| .cert, .cer, .crt   |                             | .pem,.der |
| .p7b, .keystore     | PCKS#7, [rfc2315]           |
| .crl                | certificate revocation list |
