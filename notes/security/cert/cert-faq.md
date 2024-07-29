---
tags:
  - FAQ
---

# Cert FAQ

## cert 825d

- 825d = 2y 3m 5d = 2 年 3 个月 5 天
- https://support.apple.com/en-us/HT210176
  - 苹果要求
- https://github.com/FiloSottile/mkcert/issues/174#issuecomment-508955273

## OCSP vs CLR

- OCSP: Online Certificate Status Protocol - 在线证书状态协议
  - 协议
  - 可能存在泄漏隐私的问题
  - 服务端判断
- CLR: Certificate Revocation List - 证书吊销列表
  - 文件内容
  - 会请求全量列表 - 有时候会很大
  - 客户端判断
