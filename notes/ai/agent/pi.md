---
tags:
  - Coding
---

# pi

- [badlogic/pi-mono](https://github.com/badlogic/pi-mono)
  - MIT, TypeScript
  - 一个固执己见（opinionated）且极简的终端编码助手，是 `pi-mono` 项目的一部分。支持多种 LLM 提供商（OpenAI, Anthropic, Google 等）和 MCP (Model Context Protocol)。
  - 扩展性强
  - 极简设计
    - 没有 MCP
    - 没有 Permission - 默认执行所有
    - 内置 几个 个 Tool
    - 没有 Plan
- 参考
  - https://github.com/can1357/oh-my-pi
  - https://github.com/davebcn87/pi-autoresearch
  - https://github.com/qualisero/awesome-pi-agent
  - https://github.com/tmustier/pi-extensions
- 会自动下载 fd, ripgrep
  - Widnows `C:\Users\$USER\.pi\agent\bin`

```bash
# 安装
bun add -g @mariozechner/pi-coding-agent
# 或者使用 npm
npm install -g @mariozechner/pi-coding-agent

export PI_SKIP_VERSION_CHECK=1 # 只关版本检查
export PI_CACHE_RETENTION=long # 1h 缓存
export PI_TELEMETRY=0          # 关遥测

pi
```

| Variable                | Description                                   |
| ----------------------- | --------------------------------------------- |
| `PI_CODING_AGENT_DIR`   | `~/.pi/agent`                                 |
| `PI_PACKAGE_DIR`        |                                               |
| `PI_SKIP_VERSION_CHECK` | 关闭版本检测                                  |
| `PI_TELEMETRY`          | 1/true/yes to enable or 0/false/no to disable |
| `PI_CACHE_RETENTION`    | long (Anthropic: 1h, OpenAI: 24h)             |
| `VISUAL`, `EDITOR`      |                                               |

- .pi/
- ~/.pi/agent
  - auth.json
  - models.json
  - sessions/--PATH--/TIMESTAMP_UUID.jsonl

```json title=~/.pi/agent/settings.json
{
  "enableInstallTelemetry": false,
  "skills": [
    // "+/path/SKILL.md"
  ]
}
```

```json title=~/.pi/agent/models.json
{
  "providers": {
    "name": {
      "baseUrl": "",
      "apiKey": "",
      "api": "openai-completions",
      "headers": {},
      "compact": {},
      "models": [
        {
          "id": "model-id",
          "name": "",
          "reasoning": true,
          "contextWindow": 128000,
          "maxTokens": 16384,
          "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 }
        }
      ],
      "modelOverrides": {}
    }
  }
}
```

- https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/model-registry.ts
