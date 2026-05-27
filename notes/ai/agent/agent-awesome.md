---
tags:
  - Awesome
---

# AI Agent Awesome

- TUI Agent/CLI Agent
  - [claude-code](./claude-code.md)
  - [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
    - Apache-2.0, TS
    - 官方明确目前不会支持 OpenAI 兼容接口
    - forks
      - https://github.com/vybestack/llxprt-code
  - [charmbracelet/crush](https://github.com/charmbracelet/crush)
    - FSL-1.1-MIT, Golang
  - [opencode](./opencode.md)
    - MIT, TS, Go
  - [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)
    - MIT, TS
    - 内置 WebUI
    - 提供 AGP 集成
  - [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)
    - Apache-2.0, TS
    - Gemini CLI fork
  - [openai/codex](https://github.com/openai/codex)
    - Apache-2.0, Rust
- Gateway/Proxy
  - [codex-lb](./codex-lb.md)
    - MIT, Python, FastAPI
    - ChatGPT account load balancer & proxy
- GUI Agent
  - Curosr
  - Antigravity
  - Windsurf
- Extensions Agent
  - Kilocode
  - Cline
  - Continue.dev
  - Github Copilot
- Protocol/Spec
  - MCP
  - Skills
  - AGENTS.md
  - [a2aproject/A2A](https://github.com/a2aproject/A2A)
- Claude Based/WebUI Agent/Manager/Automation/Integration
  - [slopus/happy](https://github.com/slopus/happy)
  - [getpaseo/paseo](https://github.com/getpaseo/paseo)
  - [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui)
    - GPLv3, JS, React
    - 不能 accept/deny 工具
  - [sugyan/claude-code-webui](https://github.com/sugyan/claude-code-webui)
    - MIT, TS, React
  - [rowboatlabs/rowboat](https://github.com/rowboatlabs/rowboat)
    - Apache-2.0, TypeScript
    - AI-powered CLI for background agents
- 编排/Orchestration
  - [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)
    - MIT, JS, TS
  - [ruvnet/claude-flow](./claude-flow.md)
    - MIT, TypeScript
  - https://github.com/smtg-ai/claude-squad
  - https://github.com/Pimzino/claude-code-spec-workflow
  - https://github.com/SuperClaude-Org/SuperClaude_Framework
- Monitor
  - https://github.com/steipete/CodexBar
    - brew install --cask steipete/tap/codexbar
- sandbox
  - https://github.com/always-further/nono
- Accessbility
  - https://github.com/googleworkspace/cli
- [microsoft/autogen](https://github.com/microsoft/autogen)
- [DavidZWZ/Awesome-Deep-Research](https://github.com/DavidZWZ/Awesome-Deep-Research)
- learning
  - https://openai.com/index/unrolling-the-codex-agent-loop/

## configuration

- https://code.claude.com/docs/en/settings
- https://claudelog.com/claude-code-changelog/

## Browser

- chrome-devtools mcp
  - 走协议
- agent-browser
  - 依赖 playwright
  - cli
- chrome-mcp
  - 使用 extension 的方式
- [theredsix/agent-browser-protocol](https://github.com/theredsix/agent-browser-protocol)

```bash
npm add -g agent-browser
npx skills add vercel-labs/agent-browser
```

## Claw

- [openclaw](https://github.com/openclaw/openclaw)
- [picoclaw](./picoclaw.md)
- claw like
- IM as UI
- 特点
  - 不关心过程，只关心结果
  - 对话额外最后的总结性输出，而不是包含中间思考过程、工具调用 这样的输出
  - 更像是一个 Agent/助手，而不是一个 Coding Assistant

## Computer Use

- https://ai.google.dev/gemini-api/docs/computer-use
  - click_at
  - hover_at
  - type_text_at - x, y, text, press_enter, clear_before_typing
  - key_combination - keys
  - scroll_document - direction: ("up", "down", "left", "right")
  - scroll_at - x, y, direction, magnitude
  - drag_and_drop - x, y, destination_x, destination_y
  - search
  - wait
  - go_back / go_forward
- https://huggingface.co/collections/johannhartmann/computer-use-models
- https://huggingface.co/microsoft/Phi-Ground
  - Text-First
  - box_2d `[ymin, xmin, ymax, xmax]`  scale 1000
  - $1008 \times 672$ 像素（即代码中的 336 * 3 宽，336 * 2 高）
- https://huggingface.co/microsoft/Fara-7B
  - visit_url - url
  - web_search - query
  - mouse_move - `[x,y]`
  - left_click - `[x,y]`
  - type - coordinate`[x,y]`, text
  - key - keys
  - scroll - pixels
  - history_back
  - wait - time
  - pause_and_memorize_fact - fact
  - terminate - status
- benchmark
  - ScreenSpot-Pro
  - Screenspot-V2
  - GroundUI-Web
  - Showdown
  - WebClick
- 参考
  - https://github.com/omxyz/zoom-consistency-routing
