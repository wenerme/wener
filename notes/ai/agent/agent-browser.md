---
title: Agent Browser
---

# Agent Browser

- [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)
  - 专为 AI Agent 设计的无头浏览器自动化 CLI。提供基于 Rust 的极速 CLI 以及 Node.js 回退支持。
  - 适合各类 AI 编程助手（Claude Code, Cursor, Windsurf, Copilot 等），可通过引用其元素的方式进行浏览器交互，避免 AI 编写复杂的 Playwright/Puppeteer 脚本。
- 参考
  - [agent-browser.dev](https://agent-browser.dev/)

```bash
# 推荐全局安装（性能最快，直接通过 Rust Native CLI 运行）
npm install -g agent-browser
agent-browser install # 首次需下载 Chromium

# 或者通过 macOS Homebrew 安装
brew install agent-browser
agent-browser install
```

## AI Agent 使用模式

将技能添加到 AI 助手是最推荐的方式：

```bash
npx skills add vercel-labs/agent-browser
```

以 `AGENTS.md` / `CLAUDE.md` 为例，常用的基础 Workflow：

1. `agent-browser open <url>` - 访问页面
2. `agent-browser snapshot -i` - 获取带有引用标识（如 `@e1`, `@e2`）的可交互元素快照
3. `agent-browser click @e1` / `fill @e2 "text"` - 直接通过引用标识交互
4. 页面变化后重新获取 snapshot

支持非常丰富的语义化定位器，如 `agent-browser find role button click --name "Submit"`。

## 配置文件

Agent Browser 按优先级读取以下配置文件进行合并：

1. `./agent-browser.json` (项目级，优先级最高)
2. `~/.agent-browser/config.json` (用户级)
3. 环境变量 `AGENT_BROWSER_*`
4. 命令行参数 (优先级绝对最高)

**配置示例 (`agent-browser.json`)**：

```json
{
  "headed": true,
  "proxy": "http://localhost:8080",
  "profile": "./browser-data",
  "userAgent": "my-agent/1.0",
  "ignoreHttpsErrors": true
}
```
