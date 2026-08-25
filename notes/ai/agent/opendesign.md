---
title: Open Design
---

# OpenDesign

- [nexu-io/open-design](https://github.com/nexu-io/open-design)
  - Apache-2.0, TypeScript, React, Next.js, Electron, Express, SQLite
  - 本地优先的 AI 设计工作台，可生成 Web、桌面和移动端原型、Dashboard、Deck、图片、视频和文档
  - 支持本地 Agent CLI、MCP 和 BYOK OpenAI-compatible API
- 参考
  - https://open-design.ai/
  - https://github.com/nexu-io/open-design/releases
  - https://github.com/nexu-io/open-design/blob/main/docs/i18n/README.zh-CN.md
  - https://github.com/nexu-io/open-design/blob/main/docs/i18n/QUICKSTART.zh-CN.md

```bash
# macOS Desktop
brew install --cask open-design
brew upgrade --cask open-design

# shallow clone
git clone --depth 1 https://github.com/nexu-io/open-design.git ~/gits/nexu-io/open-design
```

## 概念

- Artifact Type - 交付物类型
  - Prototype, Live Artifact, Deck, Template, Media, Other
- Skill - 定义如何完成任务
- Design Template - 可渲染的起始结构和内容
- Design System - `DESIGN.md`，定义品牌、颜色、字体、间距和组件风格
- Plugin - 对 Skill、Template、Design System 和工作流的可安装封装

```text
Skill = 怎么做
Design Template = 从哪里开始
Design System = 做成什么样
Model = 谁来做
```

## Execution Mode

| Mode        | 特点                                                       | 适用场景                       |
| ----------- | ---------------------------------------------------------- | ------------------------------ |
| Local Agent | Agent 可读写本地文件，项目文件是 canonical source          | 多文件项目、已有仓库、持续开发 |
| BYOK        | 直接调用模型 API，无文件系统工具，返回完整 `<artifact>` 块 | 独立原型、Deck、快速设计       |

BYOK 在 `Settings -> Execution mode` 配置：

- Provider: OpenAI Compatible
- Base URL: 一般以 `/v1` 结尾
- API Key
- Model

模型选择：

- `gpt-5.6-terra` - 默认，质量、速度和成本均衡
- `gpt-5.6-sol` - 复杂 UX、信息架构、最终审查
- `gemini-3.7-flash` - 参考图、设计稿还原、多模态输入
- `grok-4.6` - 代码型原型和第二设计方向

## MCP

```bash
# 安装到 Agent
od mcp install codex
od mcp install codex --print

# 查询 OpenDesign 项目
od project list --json
od files list <project-id> --json
od files read <project-id> <relative-path>
od plugin list --json
od skills list --json
```

:::caution

macOS 自带 `/usr/bin/od`，它是 octal dump 工具，可能覆盖 OpenDesign CLI。
Desktop 安装场景优先复制 `Settings -> MCP server` 中包含绝对路径的配置。

:::

## Development

```bash
cd ~/gits/nexu-io/open-design
corepack enable
pnpm install
pnpm tools-dev run web
```

- Node.js `~24`
- pnpm `10.33.x`
- `pnpm tools-dev` 是本地开发生命周期入口

# FAQ

## BYOK 提示 Internal IPs blocked

OpenDesign 默认阻止解析到 private、link-local、CGNAT 和 metadata 地址的 Provider URL，以避免 SSRF。

- 优先使用解析到公网 IP 的 HTTPS 地址
- 自己运行 daemon 时可使用 `OD_ALLOWED_INTERNAL_HOSTS` 明确允许指定主机
- allowlist 是精确 hostname/IP，不支持 CIDR
