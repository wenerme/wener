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
