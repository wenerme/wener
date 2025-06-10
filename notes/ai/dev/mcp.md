---
title: MCP
tags:
  - Protocol
---

# MCP

- Model Context Protocol
  - JSON-RPC 2.0
- https://github.com/modelcontextprotocol
  - [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector)
- MCP Hosts - Claude, IDEs, Tools
- MCP Clients
  - [punkpeye/awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients)
- MCP Servers
  - [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
  - [Dhravya/apple-mcp](https://github.com/Dhravya/apple-mcp)
  - https://www.open-mcp.org/servers
  - https://www.claudemcp.com/servers
  - https://smithery.ai/
- Android/iOS/Mobile/Device
  - [minhalvp/android-mcp-server](https://github.com/minhalvp/android-mcp-server)
  - [mobile-next/mobile-mcp](https://github.com/mobile-next/mobile-mcp)

```json
{
  "servers": {
    "apple-mcp": {
      "command": "bunx",
      "args": ["@dhravya/apple-mcp@latest"]
    }
  }
}
```

- Github Copilot Agent
  - ~/Library/Application Support/Code/User/settings.json
    - mcp.servers
- Roo
  - 全局 ~/Library/Application Support/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json
  - 项目 ./.roo/mcp.json
- Stateless mode - 无需在 MCP 服务器之间维护会话状态，适合简单的 API 封装服务。
  - sessionIdGenerator: undefined
  - 不需要管理 session
- Persistent storage mode - 本地无需保存状态，但会话数据存储在数据库中。例如：用于在线下单的 MCP 服务器，购物车信息存储在数据库。
  - sessionIdGenerator: () => randomUUID(),
  - eventStore: databaseEventStore
- Local state with message routing - 需要本地维护状态，所有属于同一会话的请求需路由到同一节点。可通过消息队列和发布/订阅系统实现。

```bash
# 默认  http://127.0.0.1:6277/ http://127.0.0.1:6274/
npx @modelcontextprotocol/inspector node build/index.js

# Proxy http://127.0.0.1:9000
# Inspector http://127.0.0.1:8080
CLIENT_PORT=8080 SERVER_PORT=9000 npx @modelcontextprotocol/inspector node build/index.js
```

# Spec

- https://www.claudemcp.com/specification
