---
tags:
  - Awesome
---

# AI Agent Awesome

- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
  - Apache-2.0, TS
  - 官方明确目前不会支持 OpenAI 兼容接口
  - forks
    - https://github.com/vybestack/llxprt-code
- [charmbracelet/crush](https://github.com/charmbracelet/crush)
  - FSL-1.1-MIT, Golang
- [sst/opencode](https://github.com/sst/opencode)
  - MIT, TS, Go
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)
  - MIT, TS
- [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)
  - Apache-2.0, TS
  - Gemini CLI fork
- Claude Code
- Kilocode
- [openai/codex](https://github.com/openai/codex)
  - Apache-2.0, Rust
- [a2aproject/A2A](https://github.com/a2aproject/A2A)
- [microsoft/autogen](https://github.com/microsoft/autogen)
- [DavidZWZ/Awesome-Deep-Research](https://github.com/DavidZWZ/Awesome-Deep-Research)
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui)
  - GPLv3, JS, React
  - 不能 accept/deny 工具
- [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)
  - MIT, JS, TS
- [sugyan/claude-code-webui](https://github.com/sugyan/claude-code-webui)
  - MIT, TS, React
- [rowboatlabs/rowboat](https://github.com/rowboatlabs/rowboat)
  - Apache-2.0, TypeScript
  - AI-powered CLI for background agents

# FAQ

## Notification

- macOS terminal-notifier
- Linux notify-send

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title '🔔 Claude Code: Input Needed' -message 'Claude is waiting for your input'"
          }
        ]
      }
    ]
  }
}
```
