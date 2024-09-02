---
tags:
  - FAQ
---

# 企业微信 常见问题

- 上下游 -> 经销商、供应商等业务伙伴
  - 共享应用与客户
- 企业内部开发配置域名指引
- https://open.work.weixin.qq.com/wwopen/common/readDocument/40754
- 通讯录回调
  - URL、Token、EncodingAESKey
  - https://developer.work.weixin.qq.com/document/path/90967
- 访问频率
  - https://developer.work.weixin.qq.com/document/path/90312

| 限制          | 分钟   | 小时     |
| ------------- | ------ | -------- |
| 企业/API      | 1 万次 | 15 万次  |
| IP/API        | 2 万次 | 60 万次  |
| 第三方/IP/API | 4 万次 | 120 万次 |

## 侧边栏控制台

- Command+Shift+Control+D 开启 Debug 模式
  - 帮助栏里可打开 webView 元素审查

## 已知 Agent/应用

- AgentID
  - 1000000 - 自建应用
  - 2000000 - 系统应用
  - 3000000 - 内置应用

| AgentID | for                 | API                                        |
| ------- | ------------------- | ------------------------------------------ |
| 2000002 | 通讯录同步          |
| 2000003 | 客户联系/外部联系人 | Contact Customers                          |
| 2000004 | 会话内容存档        | financial,[会话内容存档/API]               |
| 2000005 | groupSharedApps     |
|         | 安全管理            |
|         | 数据同步            |
| 3010168 | 上下游              | 密钥,事件接收                              |
| 3010011 | 打卡                |
| 3010040 | 审批                | 密钥,事件接收,[审批/API]                   |
| 3010041 | 汇报                |
| 3010097 | 直播                | [直播/API]                                 |
| 3010115 | 对外收款            | 密钥,事件接收,[对外收款/API]               |
| 3010185 | 人事助手            |
|         | 公费电话            | [公费电话/API]                             |
|         | 微信客服            | 密钥,事件接收,[微信客服/API]               |
|         | 企业微信服务商助手  |
|         | 会议室              |
|         | 学习园地            |
|         | 公告                |
|         | 健康上报            |
|         | 同事吧              |
|         | 行业资讯            |
|         | 投屏                |
|         | 测温                |
|         | 打印                |
|         | 网络                |
|         | 门禁                |
|         | 通讯录同步          | contactsApi,密钥,事件接收,[通讯录管理/API] |
|         | 员工服务            | intelligentServicer                        |
|         | 奖励                | fuli                                       |
|         | 一周小结            | weeklySummary                              |
|         | 素材库              | material                                   |

[会话内容存档/API]: https://developer.work.weixin.qq.com/document/path/91360
[直播/API]: https://developer.work.weixin.qq.com/document/path/93633
[公费电话/API]: https://work.weixin.qq.com/api/doc/14744
[微信客服/API]: https://open.work.weixin.qq.com/api/doc/31106
[对外收款/API]: https://open.work.weixin.qq.com/api/doc/24952
[审批/API]: https://work.weixin.qq.com/api/doc/17893
[通讯录管理/API]: https://developer.work.weixin.qq.com/document/path/90193

## 群聊

- 消息归档应用 /cgi-bin/msgaudit/groupchat/get

```
only support inner room
```

- 外部联系人应用 /cgi-bin/externalcontact/groupchat/get

```
chat is not external group chat
```
