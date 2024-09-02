---
title: 企业微信开发
tags:
  - Devlopment
---

# 企业微信开发

- 参考
  - [所有 JS 接口列表](https://work.weixin.qq.com/api/doc/90000/90136/90507)
  - [wenerme/go-wecom](https://github.com/wenerme/go-wecom)
    - MIT,Golang
    - 客户端，会话存档
  - [@wener/client](https://github.com/wenerme/wode/tree/main/packages/client)
    - MIT, NodeJS
    - 客户端，会话存档，服务回调
  - [xen0n/go-workwx](https://github.com/xen0n/go-workwx)
  - [sbzhu/weworkapi_golang](https://github.com/sbzhu/weworkapi_golang)
  - [gallonyin/worktool](https://github.com/gallonyin/worktool)
    - Apache-2.0, Kotlin
    - Android 机器人
- 媒体
  - 图片（image）：10MB，支持JPG,PNG格式
  - 语音（voice） ：2MB，播放长度不超过60s，仅支持AMR格式
  - 视频（video） ：10MB，支持MP4格式
  - 普通文件（file）：20MB

:::tip

- 绑定微信开发者 ID
  - 小程序、公众号，绑定后可通过 api 接口获取微信联系人对应的唯一身份标识（微信 unionid)
- 电脑端，聊天工具栏为固定宽度 360px
- Command+Shift+Control+D 开启 Debug 模式
  - 帮助栏里可打开 webView 元素审查

:::

:::caution

- ExternalUserId - 企业微信外部联系人的标识
  - 同一个外部联系人，不同调用方（企业/第三方服务商）获取到的 ExternalUserId 是不同的
  - 同一个人在不同群 ID 是不一样的
- 不同调用方（企业/第三方服务商）获取到的 chat_id 是不同的

:::

| secret                             | valid/refresh | desc                                                |
| ---------------------------------- | ------------- | --------------------------------------------------- |
| corp_id                            |               | 企业身份                                            |
| agent_id                           |               | 企业应用身份编号                                    |
| corp_secret                        | 7200          | 企业 **应用** 的凭证密钥                            |
| access_token                       |               | corp_id+corp_secret                                 |
| js_api_ticket                      | 7200          | access_token                                        |
| js_config_signature                |               | 微信 JS SDK 签名 - corp_id+js_api_ticket            |
| agent_ticket                       | 7200          | access_token                                        |
| agent_config_signature             |               | 企业微信 JS SDK 签名 - agent_id+agent_ticket        |
| contacts_sync_secret               |               | 通讯录同步密钥                                      |
| message_archiving_secret           |               | 消息存档密钥                                        |
| token+encoding_aes_key+receiver_id |               | 消息回调密钥组 - receiver_id 为 corp_id 或 suite_id |
| suite_id                           |               | 应用套件                                            |
| suite_secret                       |               | 应用密钥                                            |
| suite_ticket                       | 1800/660      | 应用票据 - 通过推送接收                             |
| suite_access_token                 | 7200          | suite_id+suite_secret+suite_ticket                  |
| provider_secret                    |               | 服务商密钥                                          |
| provider_access_token              | 7200          | corp_id+provider_secret                             |
| pre_auth_code                      | 1200          | 预授权码 - 企业授权时的第三方服务商安全验证         |
| auth_code                          | 600           | 应用安装完成回调参数                                |
| permanent_code                     |               | 企业微信永久授权码 - 使用 auth_code 换取            |
| auth_corp_access_token             | 7200          | suite_access_token+auth_corpid+permanent_code       |
| ServiceCorpId                      |               | 服务商 corpid - push event                          |
| AuthCorpId                         |               | 企业 corpid - push event                            |

- 接收消息场景
  - 消息推送
  - 事件推送
  - 通讯录变更推送
  - 会话内容存档
  - 服务商
    - 数据回调 - 接收托管企业微信应用 的 用户消息
      - 用户消息、进入应用事件、通讯录变更事件
      - receiver_id 为 corp_id
    - 指令回调 - 应用授权变更 + ticket
      - 应用添加、删除、修改
      - receiver_id 为 suite_id
  - 安装完成回调域名
    - 包含临时 auth_code，再用此 code 换取永久授权码

## UserAgent

```pre
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16) AppleWebKit/605.1.15 (KHTML, like Gecko) wxwork/3.1.12 (MicroMessenger/6.2) WeChat/2.0.4
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Language/en ColorScheme/Dark DistType/publish-website wxwork/4.1.9 (MicroMessenger/6.2) WeChat/2.0.4 Safari/605.1.15
```

## Limit

|       API limit |    min |      hour |
| --------------: | -----: | --------: |
|        Corp/api | 10,000 |   150,000 |
|          IP/api | 20,000 |   600,000 |
| Provider/IP/api | 40,000 | 1,200,000 |

| message            | limit               |
| ------------------ | ------------------- |
| Agent/Message      | 帐号上限数\*200/day |
| Agent/User/Message | 30/min              |

- [访问频率限制](https://work.weixin.qq.com/api/doc/90000/90139/90312)
- [企业微信发送文件的限制](https://open.work.weixin.qq.com/help2/pc/cat?person_id=1&is_tencent=&doc_id=14908)

## 配置

- config 注入企业身份与权限
- agentConfig 注入应用身份与权限 - 三方场景用的多
- agentConfig 与 config 的 jsapi_ticket 获取方式不同
- wx.agentConfig 必须在 wx.config 成功之后调用
- 3.0.14 之后可以只调用 wx.agentConfig
- agentConfig 要求 2.5.0+, 微信客户端不支持

## jssdk

- getCurExternalChat
  - 自建 客户联系功能权限
  - 第三方 企业客户权限->客户基础信息

```html
<!-- 微信 SDK -->
<script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<!-- 企业微信 SDK -->
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>

<!-- 基于 TS 的 企业微信 SDK - 调试阶段 - 不建议使用 -->
<!-- https://developers.weixin.qq.com/community/develop/article/doc/00066e5ca6ca78537a1b56b1056c13 -->
<script src="https://wwcdn.weixin.qq.com/node/open/js/jwecom-1.0.3.js"></script>
```

## api

- 主接口 https://qyapi.weixin.qq.com/cgi-bin
- 企业支付 https://api.mch.weixin.qq.com

| category     | api               | res          |
| ------------ | ----------------- | ------------ |
| 身份验证     | /user/getuserinfo | 验证 CODE    |
| 通讯录       |                   |
| ^            | /user             | 成员         |
| ^            | /department       | 部门         |
| ^            | /tag              | 标签         |
| ^            | /batch            | 批量         |
| ^            | /linkedcorp       | 互联企业     |
| ^            | /export           | 导出         |
| 客户联系     | /crm              |              |
| ^            | /externalcontact  | 外部联系人   |
| 微信客服     | /kf               |
| ^            | /kf/account       | 账号         |
| ^            | /kf/servicer      | 接待人员     |
| 应用管理     | /agent            |
| 消息推送     | /message          |
| 素材管理     |
| OA           |
| ^            |                   | 打卡         |
| ^            |                   | 审批         |
| ^            |                   | 回报         |
| ^            |                   | 自建应用     |
| ^            |                   | 会议室       |
| ^            |                   | 紧急通知应用 |
| 效率工具     |
| ^            | /oa/calendar      | 日历         |
| ^            | /oa/schedule      | 日程         |
| ^            |                   | 会议         |
| ^            |                   | 直播         |
| ^            |                   | 微盘         |
| ^            |                   | 公费电话     |
| 企业支付     |
| 企业互联     | /corpgroup        |
| ^            | /corpgroup/corp   | 企业信息     |
| ^            | /miniprogram      | 小程序信息   |
| 会话内容存档 | /msgaudit         |
| 服务商       | /service          |

## 客户联系

- 独立的一套开发接口

# FAQ

- https://developer.work.weixin.qq.com/document/path/91552

## 60011: no privilege to access/modify contact/party/agent

- 修改应用的 可见范围
  - 操作会触发 change_auth 事件
  - 新可见用户会发送 subscribe 事件
  - 不可见用户会发送 unsubscribe 事件

## 校验请求来源错误

- 只有在服务商后台-通用开发参数-配置登入授权发起域名下的页面才可以发起授权
- QR 测试的时候也需要 - 无法从本地发起
- 依赖 referrer - 不能从服务端发起跳转
  - 必须从 Web 客户端发起点击

## 扫码登陆内容

- https://open.work.weixin.qq.com/wwopen/sso/confirm2?k=0000000000000000
