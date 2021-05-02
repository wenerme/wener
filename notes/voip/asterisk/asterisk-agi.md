---
title: Asterisk AGI
---

# Asterisk AGI

- AGI - Asterisk Gateway Interface - CGI
  - stdio 交互
- Async AGI
  - Asterisk 1.6+
  - 异步 CGI 脚本
- FastAGI
  - tcp 交互
  - 远程脚本
- /var/lib/asterisk/agi-bin/agi-test.agi

**extensions.conf**

```conf
[default]
exten = > 1000,1,AGI(agi://localhost:3000)
```
