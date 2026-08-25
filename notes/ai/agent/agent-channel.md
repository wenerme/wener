---
tags:
  - Communication
  - Protocol
---

# Channel

- 能力维度
  - 输入类型
  - 输出输出
  - 撤回
  - Typing
  - Reaction

| Channel         | Receiver          | Notes                                                                                       |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| Telegram        |                   |                                                                                             |
| Discord         |                   | 需要 Bot Token 和 intents，支持群组触发                                                     |
| Slack           |                   | Socket Mode，无需公网 IP                                                                    |
| QQ bot          |                   | 官方 QQ Bot API（AppID + AppSecret）                                                        |
| DingTalk        |                   | Stream Mode，无需公网 IP。                                                                  |
| WeCom           | WebSocket         | 通过 AI Bot API 提供统一的基于 WebSocket 的企业微信集成，支持扫码登录；external plugin。    |
| Feishu          | WebSocket/Webhook | 企业协作平台                                                                                |
| LINE            | Webhook           | 通过共享网关端口使用 Webhook                                                                |
| OneBot          |                   | 兼容 NapCat/Go-CQHTTP。                                                                     |
| Matrix          |                   | 开放的去中心化协议，支持输入状态、占位消息和媒体                                            |
| WhatsApp        |                   | 桥接模式或原生模式（whatsmeow）                                                             |
| MaixCam         |                   | 硬件集成式 AI 摄像头。                                                                      |
| VK              | Polling           | Long Poll API 实现的 VKontakte 社区机器人。                                                 |
| PicoClaw        | WebSocket         | PicoClaw Native WebSocket channel。                                                         |
| Wechat iLink    |                   |                                                                                             |
| Buzz            |                   | 连接 OpenClaw agents 到 Buzz rooms                                                          |
| ClickClack      |                   | ClickClack bot-token channel                                                                |
| Google Chat     |                   | Google Chat app                                                                             |
| iMessage        |                   | 通过 imsg 原生支持（JSON-RPC over stdio），支持回复、tapback、effects、poll、附件和群组管理 |
| IRC             |                   | IRC                                                                                         |
| Mattermost      |                   | Mattermost bot                                                                              |
| Microsoft Teams |                   | Microsoft Teams bot                                                                         |
| Nextcloud Talk  |                   | Nextcloud Talk                                                                              |
| Nostr           |                   | 通过 NIP-04 加密消息的 DM channel                                                           |
| Raft            |                   | 通过 Raft CLI wake bridge 支持 External Agent                                               |
| Reef            |                   | 不同用户的 OpenClaw agents 之间受保护、端到端加密的通信                                     |
| Signal          |                   | 通过 signal-cli（原生 daemon 或 bbernhard container）                                       |
| SMS             | Webhook           | Twilio SMS/MMS                                                                              |
| Synology Chat   | Webhook           | Synology Chat webhook                                                                       |
| Tlon            |                   | Tlon/Urbit                                                                                  |
| Twitch          |                   | Twitch chat bot                                                                             |
| WebChat         | WebSocket         | 通过 Gateway WebSocket 使用 Native 和 Control UI WebChat；included in core。                |
| WeChat          |                   | 通过 external openclaw-weixin plugin；external plugin。                                     |
| Yuanbao         |                   | Yuanbao bot；external plugin。                                                              |
| Zalo            |                   | Zalo bot                                                                                    |
| Zalo ClawBot    |                   | 通过 external openclaw-zaloclawbot plugin；external plugin。                                |
| Zalo personal   |                   | 通过原生 zca-js 支持个人账号，使用 QR 登录                                                  |

| Platform           | Voice | Images | Files | Threads | Reactions | Typing | Streaming |
| ------------------ | :---: | :----: | :---: | :-----: | :-------: | :----: | :-------: |
| Telegram           |  ✅   |   ✅   |  ✅   |   ✅    |     —     |   ✅   |    ✅     |
| Discord            |  ✅   |   ✅   |  ✅   |   ✅    |    ✅     |   ✅   |    ✅     |
| Slack              |  ✅   |   ✅   |  ✅   |   ✅    |    ✅     |   ✅   |    ✅     |
| Google Chat        |   —   |   ✅   |  ✅   |   ✅    |     —     |   ✅   |     —     |
| WhatsApp           |   —   |   ✅   |  ✅   |    —    |     —     |   ✅   |    ✅     |
| WhatsApp Cloud API |  ✅   |   ✅   |  ✅   |    —    |     —     |   ✅   |     —     |
| Signal             |   —   |   ✅   |  ✅   |    —    |     —     |   ✅   |     —     |
| SMS                |   —   |   —    |   —   |    —    |     —     |   —    |     —     |
| Email              |   —   |   ✅   |  ✅   |   ✅    |     —     |   —    |     —     |
| Home Assistant     |   —   |   —    |   —   |    —    |     —     |   —    |     —     |
| Mattermost         |  ✅   |   ✅   |  ✅   |   ✅    |     —     |   ✅   |    ✅     |
| Matrix             |  ✅   |   ✅   |  ✅   |   ✅    |    ✅     |   ✅   |    ✅     |
| DingTalk           |   —   |   ✅   |  ✅   |    —    |    ✅     |   —    |    ✅     |
| Feishu/Lark        |  ✅   |   ✅   |  ✅   |   ✅    |    ✅     |   ✅   |    ✅     |
| WeCom              |  ✅   |   ✅   |  ✅   |    —    |     —     |   —    |     —     |
| WeCom Callback     |   —   |   —    |   —   |    —    |     —     |   —    |     —     |
| Weixin             |  ✅   |   ✅   |  ✅   |    —    |     —     |   ✅   |     —     |
| BlueBubbles        |   —   |   ✅   |  ✅   |    —    |    ✅     |   ✅   |     —     |
| Photon (iMessage)  |  ✅   |   ✅   |  ✅   |    —    |    ✅     |   ✅   |     —     |
| QQ                 |  ✅   |   ✅   |  ✅   |    —    |     —     |   ✅   |     —     |
| Yuanbao            |  ✅   |   ✅   |  ✅   |    —    |     —     |   ✅   |    ✅     |
| Microsoft Teams    |   —   |   ✅   |   —   |   ✅    |     —     |   ✅   |     —     |
| LINE               |   —   |   ✅   |  ✅   |    —    |     —     |   ✅   |     —     |
| ntfy               |   —   |   —    |   —   |    —    |     —     |   —    |     —     |
| Raft               |   —   |   —    |   —   |    —    |     —     |   —    |     —     |
| IRC                |   —   |   —    |   —   |    —    |     —     |   —    |     —     |
| Buzz               |   —   |   ✅   |   —   |   ✅    |     —     |   —    |     —     |
| SimpleX            |  ✅   |   ✅   |  ✅   |    —    |     —     |   ✅   |     —     |

- https://docs.picoclaw.io/docs/channels
- https://github.com/botuniverse/onebot
- https://docs.openclaw.ai/channels
- https://hermes-agent.nousresearch.com/docs/user-guide/messaging/
