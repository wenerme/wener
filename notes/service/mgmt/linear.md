---
title: Linear
---

# Linear

Linear 是一款面向现代软件开发的管理系统，可高效梳理问题、项目和产品路线图，受到包括 Vercel、CashApp、Perplexity 等在内的众多优秀团队使用和青睐。

- https://linear.app/pricing

| 方案     | 价格      | 主要特性                                                                                                         |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| Free     | $0        | - 最多2个团队<br>- 250个任务<br>- 集成Slack和GitHub<br>- AI助手                                                  |
| Basic    | $10/人/月 | - 最多5个团队<br>- 无限任务<br>- 无限文件上传<br>- 管理员角色                                                    |
| Business | $16/人/月 | - 无限团队<br>- 私有团队与访客<br>- 智能分类<br>- 运营洞察<br>- 智能问答<br>- 任务SLA<br>- 集成Zendesk和Intercom |

# MCP

- 端口
  - https://mcp.linear.app/mcp
  - https://mcp.linear.app/sse
- 参考
  - https://linear.app/docs/mcp

```bash
claude mcp add --transport sse linear-server https://mcp.linear.app/sse
```
