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

```bash
CLIENT_PORT=8080 SERVER_PORT=9000 npx @modelcontextprotocol/inspector node build/index.js
```

# Spec

- https://www.claudemcp.com/specification
