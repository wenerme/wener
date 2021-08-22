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
