---
title: Antigravity
---

# Antigravity

- https://antigravity.google/
- .agent/rules/
- ~/.gemini/GEMINI.md
- AGENTS.md / agent.md
- .antigravity/rules.md
- ~/.gemini/antigravity/mcp_config.json


## proxy

- https://github.com/badri-s2001/antigravity-claude-proxy

```bash
# PORT=8080
npx -y antigravity-claude-proxy start
npx -y antigravity-claude-proxy accounts

curl "http://localhost:8080/account-limits?format=table"
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