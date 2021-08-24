---
title: 企业微信开发
---

# 企业微信开发

- CorpID/SuitID - ww000000000000000a
- 参考
  - [所有 JS 接口列表](https://work.weixin.qq.com/api/doc/90000/90136/90507)
  - [wenerme/go-wecom](https://github.com/wenerme/go-wecom)
  - [xen0n/go-workwx](https://github.com/xen0n/go-workwx)
  - [sbzhu/weworkapi_golang](https://github.com/sbzhu/weworkapi_golang)

:::tip

- 绑定微信开发者 ID
  - 小程序、公众号，绑定后可通过 api 接口获取微信联系人对应的唯一身份标识（微信 unionid)

:::

:::caution

- ExternalUserId - 企业微信外部联系人的标识
  - 同一个外部联系人，不同调用方（企业/第三方服务商）获取到的 ExternalUserId 是不同的
- 不同调用方（企业/第三方服务商）获取到的 chat_id 是不同的

:::

```html
<!-- 微信 SDK -->
<script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<!-- 企业微信 SDK -->
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>

<!-- 基于 TS 的 企业微信 SDK - 调试阶段 - 不建议使用 -->
<!-- https://developers.weixin.qq.com/community/develop/article/doc/00066e5ca6ca78537a1b56b1056c13 -->
<script src="https://wwcdn.weixin.qq.com/node/open/js/jwecom-1.0.3.js"></script>
```

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
| 应用管理     |
| 消息推送     |
| 素材管理     |
| OA           |
| ^            |                   | 打卡         |
| ^            |                   | 审批         |
| ^            |                   | 回报         |
| ^            |                   | 自建应用     |
| ^            |                   | 会议室       |
| ^            |                   | 紧急通知应用 |
| 效率工具     |
| ^            |                   | 日程         |
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
