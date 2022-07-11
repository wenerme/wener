---
tags:
  - Protocol
---

# 邮件协议

- SMTP - Simple Mail Transfer Protocol
  - 发信
  - 端口 25 SSL 465
- IMAP - Internet Message Access Protocol
  - 与 POP3 类似
  - 会将邮件保留在服务器上
  - 比 POP 使用更多的磁盘空间和 CPU 资源
  - 端口 143 SSL 993
- POP - Post Office Protocol
  - 收信
  - 协议提供的功能相对简单,只是简单的从服务器下载所有邮件并删除.
  - 端口 110 SSL 995
- LMTP
- ManageSieve
- JMAP
- [rfc3501](https://datatracker.ietf.org/doc/html/rfc3501)
