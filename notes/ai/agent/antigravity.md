---
title: Antigravity
---

# Antigravity

- https://antigravity.google/
- .agent/rules/
- ~/.gemini/GEMINI.md
- AGENTS.md
- agent.md
- .antigravity/rules.md
- ~/.gemini/antigravity/mcp_config.json

## antigravity-claude-proxy

- https://github.com/badrisnarayanan/antigravity-claude-proxy

```bash
# PORT=8080
npx -y antigravity-claude-proxy start
npx -y antigravity-claude-proxy accounts

curl "http://localhost:8080/account-limits?format=table"

# 避免出现 400 错误, command MCP 可能会触发
ENABLE_EXPERIMENTAL_MCP_CLI=true claude -c
```

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "test",
    "ANTHROPIC_BASE_URL": "http://localhost:8080",
    "ANTHROPIC_MODEL": "claude-opus-4-5-thinking",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-5-thinking",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-5-thinking",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-sonnet-4-5",
    "CLAUDE_CODE_SUBAGENT_MODEL": "claude-sonnet-4-5-thinking"
  }
}
```

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "test",
    "ANTHROPIC_BASE_URL": "http://localhost:8080",
    "ANTHROPIC_MODEL": "gemini-3-pro-high",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "gemini-3-pro-high",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "gemini-3-flash",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "gemini-2.5-flash-lite",
    "CLAUDE_CODE_SUBAGENT_MODEL": "gemini-3-flash"
  }
}
```

- https://github.com/linwanxiaoyehua/AntiProxy
