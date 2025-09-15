---
tags:
  - Provider
  - Awesome
---

# MCP Providers

:::caution

- 避免 API Wrapper 类型的 MCP - 效率低下、浪费 Token
- 避免启用太多用不到的 MCP - 浪费 Token

:::

<!--
- <分类>
  - [标题](link 如果有)
    - 描述说明
    - <protocol> <link>
    - e.g. sse https://example.com/sse
    - e.g. http https://example.com/mcp
-->

- 项目管理与文档
  - [Asana](https://mcp.asana.com/sse)
    - 项目管理与协作
    - sse https://mcp.asana.com/sse
  - [Atlassian](https://mcp.atlassian.com/v1/sse)
    - Jira 工单与 Confluence 文档管理
    - sse https://mcp.atlassian.com/v1/sse
  - [ClickUp](https://github.com/hauptsache/clickup-mcp)
    - 任务管理与项目跟踪
    - npx -y @hauptsache.net/clickup-mcp
  - [Intercom](https://mcp.intercom.com/mcp)
    - 客户对话、工单与用户数据
    - http https://mcp.intercom.com/mcp
  - [Linear](https://mcp.linear.app/sse)
    - 问题追踪与项目管理
    - sse https://mcp.linear.app/sse
  - [Notion](https://mcp.notion.com/mcp)
    - 文档、任务管理
    - http https://mcp.notion.com/mcp
  - [Box](https://mcp.box.com/)
    - 企业内容管理与自动化
    - http https://mcp.box.com/
  - [Fireflies](https://api.fireflies.ai/mcp)
    - 会议纪要与摘要
    - http https://api.fireflies.ai/mcp
  - [Monday](https://mcp.monday.com/sse)
    - board 管理、任务分配
    - sse https://mcp.monday.com/sse
- 数据库与数据管理
  - [Airtable](https://github.com/airtable/airtable-mcp-server)
    - 数据库记录管理
    - npx -y airtable-mcp-server
  - [Daloopa](https://mcp.daloopa.com/server/mcp)
    - 金融数据服务
    - http https://mcp.daloopa.com/server/mcp
  - [HubSpot](https://mcp.hubspot.com/anthropic)
    - CRM 数据管理
    - http https://mcp.hubspot.com/anthropic
- 支付与电商
  - [PayPal](https://mcp.paypal.com/mcp)
    - 支付与交易管理
    - http https://mcp.paypal.com/mcp
  - [Plaid](https://api.dashboard.plaid.com/mcp/sse)
    - 银行业务与数据集成
    - sse https://api.dashboard.plaid.com/mcp/sse
  - [Square](https://mcp.squareup.com/sse)
    - 支付、库存、订单管理
    - sse https://mcp.squareup.com/sse
  - [Stripe](https://mcp.stripe.com)
    - 支付与订阅管理
    - http https://mcp.stripe.com
- 设计与媒体
  - [Figma](http://127.0.0.1:3845/mcp)
    - 设计稿访问与导出
    - http http://127.0.0.1:3845/mcp
  - [Cloudinary](https://mcp.cloudinary.com/mcp)
    - 媒体资源管理与分析
    - http https://mcp.cloudinary.com/mcp
  - [invideo](https://mcp.invideo.io/sse)
    - 视频创作
    - sse https://mcp.invideo.io/sse
  - [Canva](https://mcp.canva.com/mcp)
    - 设计生成与管理
    - http https://mcp.canva.com/mcp
- 基础设施与 DevOps
  - [Netlify](https://netlify-mcp.netlify.app/mcp)
    - 网站部署与管理
    - http https://netlify-mcp.netlify.app/mcp
  - [Stytch](http://mcp.stytch.dev/mcp)
    - 认证服务管理
    - http http://mcp.stytch.dev/mcp
  - [Vercel](https://mcp.vercel.com/)
    - 项目与部署管理
    - http https://mcp.vercel.com/
- 自动化与集成
  - [Workato](https://www.workato.com/)
    - 工作流与数据集成
    - 自动生成
  - [Zapier](https://mcp.zapier.com)
    - 自动化平台，连接 8000+ 应用
    - 用户专属 URL https://mcp.zapier.com
- [github/github-mcp-server](https://github.com/github/github-mcp-server)
  - MIT, Go
  - GitHub's official MCP Server
  - 支持 OAuth 和 PAT
- ~~[Doist/todoist-mcp](https://github.com/Doist/todoist-mcp)~~
- [Doist/todoist-ai](https://github.com/Doist/todoist-ai)
  - TODOIST_API_KEY
  - TODOIST_BASE_URL
  - add-projects, update-projects, delete-object
- [Upstash/context7](https://github.com/upstash/context7)
  - MIT, JS, TS
  - Up-to-date code documentation for LLMs and AI code editors
  - `use context7`
  - MCP mcp.context7.com/mcp
    - Header CONTEXT7_API_KEY
  - MCP mcp.context7.com/sse
  - API context7.com/api/v1

```json
{
  "mcpServers": {
    "linear": {
      "type": "http",
      "url": "https://mcp.linear.app/mcp"
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp",
      "headers": {
        "Authorization": "Bearer ${GITHUB_MCP_PAT}"
      }
    },
    "gitlab": {
      "type": "sse",
      "url": "http://localhost:3002/sse"
    },
    "todoist": {
      "type": "stdio",
      "command": "npx",
      "args": ["@doist/todoist-ai"],
      "env": {
        "TODOIST_API_KEY": "${TODOIST_API_KEY}"
      }
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}"
      }
    },
    "feishu": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "${FEISHU_APP_ID}",
        "-s",
        "${FEISHU_APP_SECRET}",
        "-t",
        "preset.default,im.v1.message,im.v1.message.resource"
      ]
    }
  }
}
```

- [hangwin/mcp-chrome](https://github.com/hangwin/mcp-chrome)
- [0xKoda/WireMCP](https://github.com/0xKoda/WireMCP)
  - MIT, JS
- [geelen/mcp-remote](https://github.com/geelen/mcp-remote)
  - MIT, TS
  - stdio -> HTTP
- [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp)
  - restricted
  - unrestricted
- PostgreSQL MCP
- Playwright MCP
- Slack MCP
- Google Sheets MCP
- Sentry MCP
- Docker MCP
- AWS MCP
- Weather MCP
- File system MCP
- Calendar MCP
