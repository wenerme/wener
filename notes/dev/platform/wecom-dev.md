---
title: 企业微信开发
---

# 企业微信开发

- [wenerme/go-wecom](https://github.com/wenerme/go-wecom)
- [xen0n/go-workwx](https://github.com/xen0n/go-workwx)
- [sbzhu/weworkapi_golang](https://github.com/sbzhu/weworkapi_golang)

## 配置

- config 注入企业身份与权限
- agentConfig 注入应用身份与权限 - 三方场景用的多
- agentConfig 与 config 的 jsapi_ticket 获取方式不同
- wx.agentConfig 必须在 wx.config 成功之后调用
- 3.0.14 之后可以只调用 wx.agentConfig
- agentConfig 要求 2.5.0+, 微信客户端不支持
