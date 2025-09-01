---
tags:
  - Dev
---

# Feishu 开发

- API Schema
  - `https://open.feishu.cn/api_explorer/v1/api_definition?project=task&version=v2&resource=tasklist&apiName=tasks`
- Meego
- tenant_access_token
- user_access_token

## Awesome

- https://github.com/larksuite/lark-openapi-mcp
- API/SDK
  - https://github.com/go-lark/lark
  - https://github.com/larksuite/node-sdk
  - https://open.feishu.cn/api-explorer
    - 目录 https://open.feishu.cn/api_explorer/v1/api_catalog
      - 使用这里的 fullPath 信息
    - 详情 https://open.feishu.cn/api_explorer/v1/api_definition?project=task&version=v2&resource=tasklist&apiName=tasks

## Desktop Client

- 核心数据库使用 sqlcipher 加密
- 主要数据目录：
  - ~/Library/Application Support/LarkShell/ - 主数据目录
    - ~/Library/Application Support/LarkShell/sdk_storage/{用户ID}/
      - messages.db
      - im.db
      - secretchat.db
      - contact.db
      - `search_v2_*.db`
      - whisper.db
  - ~/Library/Containers/com.larksuite.macos.lark/ - 沙盒应用数据
- 用户数据存储：
  - ~/Library/Application Support/LarkShell/aha/users/ - 用户配置文件数据
  - ~/Library/Containers/com.larksuite.macos.lark/Data/Library/Application Support/LarkInternational/
- 缓存文件：
  - ~/Library/Caches/LarkShell/
  - ~/Library/Caches/com.electron.lark.helper/
- 偏好设置：
  - ~/Library/Preferences/com.electron.lark.plist
  - ~/Library/Containers/com.larksuite.macos.lark/Data/Library/Preferences/

## 实时更新消息

- 通过发送一个 TextCard 然后 Patch 内容实现
- https://open.feishu.cn/document/common-capabilities/message-card/api-and-resource-reference
- https://github.com/ConnectAI-E/Feishu-OpenAI-Stream-Chatbot/blob/c586682ca2899c2bff039be8d4dfa79cba96c1f8/code/handlers/msg.go#L606-L635

## MCP



```bash
npm add @larksuiteoapi/lark-mcp -g

lark-mcp -V

npx -y @larksuiteoapi/lark-mcp login -a $APP_ID -s $APP_SECRET
```

- https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/mcp_installation#46d7e401
- https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/advanced-configuration
