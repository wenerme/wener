---
title: 企业微信
---

# 企业微信

- 应用类型
  - 基础应用 - 内置
  - 第三方应用
  - 自建应用
  - 硬件开发
  - 服务商
- 参考
  - [开发文档](https://work.weixin.qq.com/api/doc/)
    - [全局错误码](https://work.weixin.qq.com/api/doc/90001/90148/90455)
  - [Keycloak 集成](https://www.kkzxak47.com/2019/07/30/使用企业微信登录keycloak/)
  - [企业微信开发指南](https://zhuanlan.zhihu.com/p/36320213)

:::caution

- 企业微信会话存档保存最长为 90 天

:::

:::caution

- access_token 是全局的，不能返回到前端
- 授权认证时的 code 只是使用 access_token 去 **校验** 而不是为用户换取属于用户的 access_token
- 默认 scope 为 snsapi_base

:::

## 授权

- 非标准 OAuth2
- access_token 是全局
  - 默认 7200s
- 换 token 需要 appid 和 agentid
- code 只能用一次

### 网页授权

```title="跳转授权"
https://open.weixin.qq.com/connect/oauth2/authorize?
  appid=wx10101&
  response_type=code&
  scope=snsapi_base&
  redirect_uri=https%3A%2F%2Ftest.example.com%3A3000%2Fapi%2Fmyredirect
  #wechat_redirect
```

```title="换取 Token"
https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?
  access_token=ACCESS_TOKEN&
  code=CODE
```

### Web 扫码授权登录

```title="跳转授权"
https://open.work.weixin.qq.com/wwopen/sso/qrConnect?
  appid=wx10101&
  agentid=1000000&
  redirect_uri=https%3A%2F%2Ftest.example.com%3A3000%2Fapi%2Fmyredirect
```

```title="换取 Token"
https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?
  access_token=ACCESS_TOKEN&
  code=CODE
```

## 会话存档

> **Note**
>
> 1. 会话存档保存 **5** 天
> 1. 从 Sequence+1 拉取，不包含 Sequence
> 1. limit 最大 1000
> 1. 图片 jpg, 音频 amr, 视频 mp4
> 1. MediaData 的 MD5 可能匹配不上，可以一直重试
> 1. MediaData 单次最多返回 512K

- libWeWorkFinanceSdk_C.so
  - 依赖 GLIBC
  - 使用了 libcurl
    - https_proxy 能生效
- 实际请求 qyapi.weixin.qq.com
- RSA2048 key
  - `openssl genrsa -out private.pem 2048`
  - `openssl rsa -in private.pem -pubout -out public.pem`

# FAQ

## redirect_uri 与配置的授权完成回调域名不一致

配置 Web 授权回调域名
