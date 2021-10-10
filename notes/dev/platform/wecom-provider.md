---
title: 企业微信服务商
---

# 企业微信服务商

- 合作模式
  - 区域服务
    - 当地区域提供上门服务
    - 服务奖励基金 - 三分推广收益
  - 产品销售 - 增值服务+三方推广
  - 标准应用 ISV - 提供 SaaS 服务应用
  - 行业方案 - 提供行业解决方案 - 例如 教育、医疗
  - 智慧硬件 - 硬件接入企业微信
- 参考
  - [企业微信通用行业奖励规则](https://open.work.weixin.qq.com/wwopen/policyDocument?uuid=jKCVPhkXXw3gTQ58Dyefme)
  - [企业微信中小企业专项拉新扶持政策](https://open.work.weixin.qq.com/wwopen/policyDocument?uuid=osNuozxdSepV7jJLUrKxtE)
  - https://open.work.weixin.qq.com/

**userAgent**

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16) AppleWebKit/605.1.15 (KHTML, like Gecko)wxwork/3.1.12 (MicroMessenger/6.2) WeChat/2.0.4
```

:::caution

- 在第三方回调事件中使用加解密算法 ReceiveID 内容为 SuiteID
- 无法获取用户的 Name
  - 调用时返回 userid 以代替 name
  - 自建应用需要管理员授权才返回
  - 对于非第三方创建的成员，第三方通讯录应用也不可获取
  - 未返回 name 的情况需要通过通讯录展示组件来展示名字
- 很多个人信息第三方都是无法获取的

:::

## Auth

- 企业接口 Token - access_token
  - corpid + 永久授权码
- 应用授权的 Token - suite_access_token
  - suite_id/第三方应用 ID + suite_secret/第三方应用密钥
    - 登录服务商管理后台->标准应用服务->应用管理栏->应用
    - -> suite_access_token 访问应用授权的接口
      - -> 企业 access_token
- 服务商的 Token - provider_access_token
  - corpid + provider_secret
    - 登录服务商管理后台->标准应用服务->通用开发参数
  - 服务商的身份，与应用无关
  - 用于 请求单点登录、注册定制化等接口
  - https://qyapi.weixin.qq.com/cgi-bin/service/get_provider_token

## 网页授权登陆

- scope
  - snsapi_base - 默认 - 可获取成员的的基础信息（UserId 与 DeviceId）；
  - snsapi_userinfo - 可获取成员的详细信息，但不包含手机、邮箱；
  - snsapi_privateinfo - 手动授权 - 可获取成员的详细信息，包含手机、邮箱
    - 第三方 **不能** 获取手机和邮箱

```pre title="自建应用 oauth2"
https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect
```

- scope 固定为 snsapi_base

```pre title="第三方应用 oauth2"
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
```

- 第三方应用 需要在打开的网页里面携带用户的身份信息
- 与自建相同 - 但 appid 为 suite_id
  - ww, wx 开头

```pre title="企业 oauth2"
https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&agentid=AGENTID&state=STATE#wechat_redirect
```

- 企业 需要在打开的网页里面携带用户的身份信息
- agentid
  - 没有时则认为是 snsapi_base
- snsapi_userinfo 或 snsapi_privateinfo 需要 agentid
  - redirect_uri 匹配 可信域名
  - 服务商配置的可信域名
- 第三方 qr 回调包含
  - auth_code
  - appid

## Dev

- 普通应用 - 只读通讯录
- 通讯录应用 - 可读写通讯录
  - 一家企业只能授权一个通讯录应用
- 回调服务
  - 自定义丰富的服务行为。比如，用户向应用发消息时，识别消息关键词，回复不同的消息内容；用户点击应用菜单时，转化为指令，执行自动化任务。
  - 可以及时获取到状态变化。比如，通讯录发生变化时，不需要定时去拉取通讯录对比，而是实时地获取到变化的通讯录结点，进行同步。
  - GET+POST
    - GET 用于验证
  - AES 加密
- 接口差异
  - 消息推送
    - 不支持发送到群聊
    - 不支持发送到互联

## 回调

- https://work.weixin.qq.com/api/doc/10982
  - 在第三方回调事件中使用加解密算法，receiveid 的内容为 suiteid
  - 收到推送后都必须直接返回字符串 success
- SuiteTicket
  - 有效期 30 分钟
  - 一般每隔 11 分钟会推送一次
  - 最长为 512 字节

## 会话存档

- RSA2048 pkcs1

```bash
openssl genrsa -out private-key.pem 2048
openssl rsa -in private-key.pem -pubout -out public-key.pem
```

# FAQ

## redirect_uri 与配置的授权完成回调域名不一致

服务商 qr 不能用 js 内嵌
