---
tags:
  - Reference
---

# Telegram Reference

| 接入方式    | 消息格式                        | 适用场景                          |
| ----------- | ------------------------------- | --------------------------------- |
| Bot API     | JSON                            | Bot、Webhook、频道消息接收        |
| MTProto API | TL 二进制协议，SDK 转换成对象   | 用户账号、频道/群组采集、历史消息 |
| TDLib       | 基于 MTProto 的结构化 JSON 接口 | 完整 Telegram Client 开发         |

| 类型     | chat.type    | 主要用途                 | 特点                                   |
| -------- | ------------ | ------------------------ | -------------------------------------- |
| 私聊     | `private`    | 用户与用户、用户与 Bot   | 一对一交流                             |
| 普通群组 | `group`      | 小型多人聊天             | 最多 200 人                            |
| 超级群组 | `supergroup` | 大型社区、讨论群         | 最多 20 万人，可开启话题               |
| 频道     | `channel`    | 新闻发布、公告、资讯订阅 | 主要由管理员发布，订阅人数不设固定上限 |

- Bot API chat.type
- MTProto
  - Peer
    - PeerUser
    - PeerChat
    - PeerChannel

| 特殊形式                   | 底层归属                    | 说明                               |
| -------------------------- | --------------------------- | ---------------------------------- |
| Forum Topics（话题）       | Supergroup                  | 群组内部按照 Topic 分讨论          |
| Discussion Group（讨论群） | Supergroup                  | 与频道关联，频道帖子可以有评论区   |
| Gigagroup（广播式超级群）  | Channel 构造器              | 超大规模，只有管理员能发布         |
| Secret Chat（秘密聊天）    | 独立加密会话                | 一对一端到端加密，不是普通云端私聊 |
| Saved Messages（收藏）     | 自己的私聊空间              | 给自己发送消息                     |
| Bot Chat                   | Private                     | 与 Bot 一对一对话                  |
| Channel Direct Messages    | 特殊 Supergroup / Monoforum | 频道接收私信，可按独立话题组织     |

## MessageEntity

type | bot type | note

## MediaEntity
type | bot type | note
## Message Group
media group
## Chat ID

| 形式                             | 对应类型     |
| -------------------------------- | ------------ |
| 正数，如 `123456789`             | 用户、私聊   |
| 负数，如 `-123456789`            | 普通群组     |
| `-100` 开头，如 `-1001234567890` | 频道、超级群 |

# 参考

- https://core.telegram.org/bots/api
- https://core.telegram.org/constructor/message
