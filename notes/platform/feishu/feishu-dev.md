---
tags:
  - Dev
---

# Feishu 开发

- API Schema
  - `https://open.feishu.cn/api_explorer/v1/api_definition?project=task&version=v2&resource=tasklist&apiName=tasks`

## 实时更新消息

- 通过发送一个 TextCard 然后 Patch 内容实现
- https://open.feishu.cn/document/common-capabilities/message-card/api-and-resource-reference
- https://github.com/ConnectAI-E/Feishu-OpenAI-Stream-Chatbot/blob/c586682ca2899c2bff039be8d4dfa79cba96c1f8/code/handlers/msg.go#L606-L635
