---
title: codex-lb
---

# codex-lb

- [Soju06/codex-lb](https://github.com/Soju06/codex-lb)
  - MIT, Python, FastAPI, SQLAlchemy, React, Docker
  - Load balancer for ChatGPT accounts with usage tracking and dashboard.

```bash
# Docker (recommended)
docker volume create codex-lb-data
docker run -d --name codex-lb \
  -p 2455:2455 -p 1455:1455 \
  -v codex-lb-data:/var/lib/codex-lb \
  ghcr.io/soju06/codex-lb:latest

# or uvx
uvx codex-lb
```

# FAQ

## 如何配置 OpenCode 使用 codex-lb？

在 `~/.config/opencode/opencode.json` 中配置：

```jsonc
{
  "provider": {
    "openai": {
      "options": {
        "baseURL": "http://127.0.0.1:2455/v1",
        "apiKey": "{env:CODEX_LB_API_KEY}"
      }
    }
  }
}
```

## 如何配置 OpenClaw 使用 codex-lb？

在 `~/.openclaw/openclaw.json` 中配置：

```jsonc
{
  "models": {
    "providers": {
      "codex-lb": {
        "baseUrl": "http://127.0.0.1:2455/v1",
        "apiKey": "${CODEX_LB_API_KEY}",
        "api": "openai-responses"
      }
    }
  }
}
```

```
HTTP bridge session closed before response.completed
Proxy request budget exhausted
```
