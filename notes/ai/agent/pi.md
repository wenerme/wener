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
  - https://github.com/davebcn87/pi-autoresearch
  - https://github.com/qualisero/awesome-pi-agent
  - https://github.com/tmustier/pi-extensions
- 会自动下载 fd, ripgrep
  - Widnows `C:\Users\$USER\.pi\agent\bin`

```bash
# 安装
bun add -g @earendil-works/pi-coding-agent
# 或者使用 npm
npm install -g --ignore-scripts @earendil-works/pi-coding-agent

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

- $PWD/.pi/
  - settings.json
  - SYSTEM.md
  - APPEND_SYSTEM.md
  - skills/
  - prompts/
  - extenstions/
  - npm/
    - node_modules/
  - git/
    - github.com/org/repo/
  - themes/
- ~/.pi/agent
  - auth.json
  - models.json
  - sessions/--PATH--/TIMESTAMP_UUID.jsonl
- .agents/skills
  - 主要支持 skills 递归向上查找

```bash
pi install -l npm:@org/pi-package
pi install -l git:github.com/org/repo
```

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

# Awesome

- RTK
  - https://github.com/MasuRii/pi-rtk-optimizer
  - https://github.com/sherif-fanous/pi-rtk
  - https://github.com/mcowger/pi-rtk
- Tools
  - https://github.com/RimuruW/pi-hashline-edit
- Agent
  - https://github.com/can1357/oh-my-pi
  - https://github.com/itayinbarr/little-coder

```bash
# ~/.pi/agent/extensions/pi-rtk-optimizer
pi install npm:pi-rtk-optimizer
```

## Session

```bash
# session dir
ls ~/.pi/agent/sessions/-$(echo "$PWD/" | sed 's#/#-#g')-
cd ~/.pi/agent/sessions/-$(echo "$PWD/" | sed 's#/#-#g')-

jq -r 'select(.type=="message" and .message.role=="user") | if (.message.content|type)=="string" then .message.content else [.message.content[]? | select(.type=="text") | .text] | join("\n---\n") end' *.jsonl
```

## Inside

```ts
type KnownApi =
    | "openai-completions"
    | "mistral-conversations"
    | "openai-responses"
    | "azure-openai-responses"
    | "openai-codex-responses"
    | "anthropic-messages"
    | "bedrock-converse-stream"
    | "google-generative-ai"
    | "google-vertex";
```

- openrouter-images
- OpenAI-compatible proxy / Ollama / vLLM / LM Studio：openai-completions
- Anthropic-compatible proxy：anthropic-messages
- Google AI Studio：google-generative-ai
- OpenAI Responses-compatible：openai-responses

# Version

## v0.74

- repo 变更为 badlogic/pi-mono -> earendil-works/pi
- npm @mariozechner/pi-coding-agent -> @earendil-works/pi-coding-agent

```bash
pi update
pi update --self
```

# FAQ


```bash
# 修复会话 cwd
cd /new/project/path
pi --fork /path/to/old/session.jsonl
```
