---
title: sipp
---

# sipp

- [SIPp/sipp](https://github.com/SIPp/sipp) 是什么？
  - SIP 协议测试工具
- SER - Session Establishment Rate
- 参考
  - [SIP Performance Benchmark](https://www.youtube.com/watch?v=LWjfA06443g)

```bash
# macOS
brew install sipp
# AlpineLinux
apk add sipp

# 服务端
sipp -sn uas
# 客户端
# 1 测试场景 2 统计 3 响应延时分布 4 测试变量
sipp -sn uac 127.0.0.1
```
