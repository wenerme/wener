---
title: playwright-mcp
---

# playwright-mcp

- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- 参考
  - Playwright MCP Bridge https://github.com/microsoft/playwright-mcp/releases

```bash
# http://localhost:8931/mcp
# http://localhost:8931/sse
npx @playwright/mcp@latest --port 8931

# by Remote SSE
claude mcp add playwright -s project -t sse http://localhost:8931/sse
```
