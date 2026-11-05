---
title: PKCS
---

# PKCS

- PKCS - Public-Key Cryptography Standards，RSA Laboratories 制定的一系列公钥密码学标准
- 多数已移交 IETF，以 RFC 形式继续维护；部分（PKCS#2、#4、#6）已被废弃/合并
- [Wikipedia: PKCS](https://en.wikipedia.org/wiki/PKCS)

## 标准列表

| 标准    | 名称                                            | 状态                          | 用途                                                                                 |
| ------- | ----------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| PKCS#1  | RSA Cryptography Standard                       | Active（RFC 8017）            | RSA 公私钥的数学定义和编码格式，加密/签名的 padding scheme（PKCS#1 v1.5、OAEP、PSS） |
| PKCS#2  | -                                               | 废弃                          | 已并入 PKCS#1                                                                        |
| PKCS#3  | Diffie-Hellman Key Agreement Standard           | -                             | DH 密钥协商                                                                          |
| PKCS#4  | -                                               | 废弃                          | 已并入 PKCS#1                                                                        |
| PKCS#5  | Password-Based Cryptography Standard            | Active（RFC 8018）            | 基于密码派生密钥（PBKDF1/PBKDF2），常用于 PBE 加密                                   |
| PKCS#6  | Extended-Certificate Syntax Standard            | 废弃                          | 已被 X.509v3 取代                                                                    |
| PKCS#7  | Cryptographic Message Syntax                    | Active（演进为 RFC 5652 CMS） | 签名/加密消息封装格式，`.p7b`/`.p7c` 文件                                            |
| PKCS#8  | Private-Key Information Syntax Standard         | Active（RFC 5958）            | 通用私钥存储格式，不限于 RSA                                                         |
| PKCS#9  | Selected Attribute Types                        | RFC 2985                      | 定义证书请求、PKCS#7/#8 中可用的扩展属性类型                                         |
| PKCS#10 | Certification Request Syntax Standard           | Active（RFC 2986）            | 证书签名请求（CSR）格式                                                              |
| PKCS#11 | Cryptographic Token Interface Standard          | Active                        | 访问硬件安全模块（HSM）、智能卡等加密 Token 的标准 API                               |
| PKCS#12 | Personal Information Exchange Syntax            | Active（RFC 7292）            | 打包私钥 + 证书链的容器格式，`.p12`/`.pfx`                                           |
| PKCS#13 | Elliptic Curve Cryptography Standard            | 未完成                        | 草案阶段，未正式发布                                                                 |
| PKCS#14 | Pseudo-random Number Generation                 | 未完成                        | 草案阶段，未正式发布                                                                 |
| PKCS#15 | Cryptographic Token Information Format Standard | Active                        | 定义 PKCS#11 Token 上存储对象的格式，便于跨厂商互操作                                |

## 常用项说明

- PKCS#1 vs PKCS#8：均可表示 RSA 私钥，但 PKCS#1 只针对 RSA（字段包含模数、公钥指数、私钥指数、两个质数等），PKCS#8 是通用私钥格式（算法标识符 + 私钥内容 + 可选属性），可承载 RSA、DSA、ECDSA 等任意非对称算法的私钥
  - PEM header：PKCS#1 私钥为 `RSA PRIVATE KEY`，PKCS#8 私钥为 `PRIVATE KEY`
  - 详见 [security-faq.md#pkcs1-vs-pkcs8](./security-faq.md#pkcs1-vs-pkcs8)、[RSA 笔记](./crypto/rsa.md)
- PKCS#7：签名/加密消息的封装格式，也用于不含私钥的证书链打包（`.p7b`），详见 [security-glossary.md](./security-glossary.md)
- PKCS#12：同时打包私钥和证书（带密码保护），即常见的 `.p12`/`.pfx` 文件；`.pfx` 是 PKCS#12 的前身，现在内容格式通常与 PKCS#12 一致
- PKCS#10：生成证书时提交给 CA 的 CSR（Certificate Signing Request），对应文件后缀 `.csr`
- PKCS#11：跨厂商访问 HSM/智能卡的标准接口，详见 [HSM/PKCS#11 相关说明](./crypto/README.md)

## 文件后缀对照

| 后缀                                   | 对应标准 | 说明                      |
| -------------------------------------- | -------- | ------------------------- |
| `.csr`                                 | PKCS#10  | 证书签名请求              |
| `.p7b`、`.p7c`                         | PKCS#7   | 不含私钥，只有证书/CRL 链 |
| `.p12`、`.pfx`                         | PKCS#12  | 含私钥 + 证书，通常带密码 |
| `.key`（PEM header `RSA PRIVATE KEY`） | PKCS#1   | RSA 专用私钥格式          |
| `.key`（PEM header `PRIVATE KEY`）     | PKCS#8   | 通用私钥格式              |

## openssl 常用命令

```bash
# PKCS#1 -> PKCS#8
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in pkcs1.key -out pkcs8.key

# 打包为 PKCS#12
openssl pkcs12 -export -in cert.pem -inkey key.pem -out cert.p12

# 查看 PKCS#12 内容
openssl pkcs12 -info -in cert.p12 -noout

# 生成 CSR（PKCS#10）
openssl req -new -key key.pem -out request.csr
```

- 更多 openssl 命令和证书相关操作见 [crypto/README.md](./crypto/README.md)
