---
tags:
  - IM
  - Interface
---

# Design Channel Service

Channel Service 统一管理渠道接入、会话和消息。业务调用方读写统一模型；Webhook、轮询、长连接、平台鉴权和协议转换由 Adapter 负责。

## 术语 {#glossary}

| 英文         | 中文 |
| ------------ | ---- |
| Channel      | 渠道 |
| Conversation | 会话 |
| Chat         | 聊天 |
| Session      | 会话 |
| Thread       | 线程 |
| Topic        | 话题 |
| Message      | 消息 |

- Channel - 接入实例，一个账号
- Conversation / Chat - 一个聊天 - direct, group
- Session - 一个会话,可能和 chat, conversation 是一样的
- Thread - 一个会话内的消息分组
- Topic - 特殊的聊天形式,类似论坛

## 收发

```text
入站：Adapter → ChannelEvent → Worker → Conversation / Message
出站：sendMessage → ChannelCommand + Message → Adapter → 更新投递状态
```

## ChannelService

调用方使用内部 `channelId`、`conversationId` 和 `messageId`。平台 ID 由 Adapter 映射，凭据和接收器生命周期由管理接口负责。

```ts
type ChannelRequestOptions = Readonly<{ signal?: AbortSignal }>;
type PageRequest = { limit?: number; before?: string };
type Page<T> = { items: readonly T[]; beforeCursor?: string };

type Channel = { id: string; platform: string; name?: string };
type Conversation = { id: string; channelId: string; title?: string };

type MessagePart =
  | { type: 'text'; text: string }
  | { type: 'image'; attachmentId: string };

type Message = {
  id: string;
  conversationId: string;
  senderId?: string;
  threadId?: string;
  replyToMessageId?: string;
  content: readonly MessagePart[];
  createdAt: string;
} & (
  | { direction: 'inbound' }
  | { direction: 'outbound'; deliveryStatus: 'pending' | 'sent' | 'failed' }
);

type GetChannelRequest = { channelId: string };
type ListConversationRequest = PageRequest & { channelId?: string };
type GetConversationRequest = { conversationId: string };
type ListMessageRequest = PageRequest & { conversationId: string; threadId?: string };
type ListMessageResult = Page<Message> & { streamCursor: string };

type SendMessageRequest = {
  conversationId: string;
  threadId?: string;
  replyToMessageId?: string;
  content: readonly MessagePart[];
  idempotencyKey: string;
};

type SubscribeMessageRequest = { conversationId: string; after?: string };
type MessageEvent = { type: 'message.created' | 'message.updated'; cursor: string; message: Message };

interface IChannelService {
  listChannel(options?: ChannelRequestOptions): Promise<readonly Channel[]>;
  getChannel(input: GetChannelRequest, options?: ChannelRequestOptions): Promise<Channel | undefined>;
  listConversation(input?: ListConversationRequest, options?: ChannelRequestOptions): Promise<Page<Conversation>>;
  getConversation(input: GetConversationRequest, options?: ChannelRequestOptions): Promise<Conversation | undefined>;
  listMessage(input: ListMessageRequest, options?: ChannelRequestOptions): Promise<ListMessageResult>;
  sendMessage(input: SendMessageRequest, options?: ChannelRequestOptions): Promise<Message>;
  subscribeMessage(input: SubscribeMessageRequest, options?: ChannelRequestOptions): AsyncIterable<MessageEvent>;
}
```

- `beforeCursor` 用于向前翻历史；`streamCursor` 传给 `subscribeMessage.after`，用于接上列表读取后的消息变化。断线后，从最后处理的事件 `cursor` 继续。
- `sendMessage` 返回已记录的消息，可能仍是 `pending`。用同一 `idempotencyKey` 重试同一次发送；`sent` 只表示上游已接受，不表示送达或已读。
- 指定的线程、回复目标必须属于目标会话。Adapter 不支持相应能力时明确报错，不降级为向主会话发送。

# 参考

- https://core.telegram.org/bots/api
- https://open.feishu.cn/document/server-docs/group/chat/intro
