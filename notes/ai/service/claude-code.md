---
title: Claude Code
tags: [Claude, AI, Code, Agent]
---

# Claude Code

- [anthropics/claude-code](https://github.com/anthropics/claude-code)
- Awesome
  - [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
  - [Maciek-roboblog/Claude-Code-Usage-Monitor](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor)
    - MIT, Python
  - [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
  - [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow)
    - MIT, TS, JS
  - [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage)
  - [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)

```bash
npm install -g @anthropic-ai/claude-code

CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 claude

npx -y ccusage blocks --live
```

| cmd         | for                        |
| ----------- | -------------------------- |
| `!`         | 进入 bash 模式运行终端命令 |
| `/`         | 执行 Claude Code 内置命令  |
| `@`         | 快速引用或操作文件路径     |
| `#`         | 记忆内容供后续使用         |
| esc esc     | 清空当前输入               |
| ctrl + \_   | 撤销操作                   |
| shift + tab | 自动接受编辑建议           |
| ctrl + r    | 启用详细输出模式           |
| ctrl + z    | 暂停 Claude Code           |
| shift + ⏎   | 换行（在输入框中）         |

- ~/.claude/settings.json
- .claude/settings.json
- .claude/settings.local.json
- enterprise managed policy settings
  - /Library/Application Support/ClaudeCode/managed-settings.json
  - /etc/claude-code/managed-settings.json
  - C:\ProgramData\ClaudeCode\managed-settings.json

```json title="settings.json"
{
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test:*)", "Read(~/.zshrc)"],
    "deny": ["Bash(curl:*)"]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

| env                                   | for                         |
| ------------------------------------- | --------------------------- |
| ANTHROPIC_BASE_URL                    | 自定义 API 端点 URL         |
| ANTHROPIC_AUTH_TOKEN                  | API 认证令牌                |
| ANTHROPIC_MODEL                       | claude-sonnet-4-20250514    |
| ANTHROPIC_SMALL_FAST_MODEL            | Haiku 类模型，用于后台任务  |
| CLAUDE_CODE_USE_BEDROCK               | 启用 AWS Bedrock 集成       |
| ANTHROPIC_BEDROCK_BASE_URL            | AWS Bedrock 端点 URL        |
| CLAUDE_CODE_SKIP_BEDROCK_AUTH         | 跳过 Bedrock 认证           |
| CLAUDE_CODE_USE_VERTEX                | 启用 Google Vertex AI 集成  |
| ANTHROPIC_VERTEX_BASE_URL             | Google Vertex AI 端点 URL   |
| ANTHROPIC_VERTEX_PROJECT_ID           | Google Cloud 项目 ID        |
| HTTPS_PROXY                           | HTTPS 代理服务器地址        |
| HTTP_PROXY                            | HTTP 代理服务器地址         |
| ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION | Bedrock 小型模型的 AWS 区域 |

```bash
export ANTHROPIC_AUTH_TOKEN=sk-1234
export ANTHROPIC_BASE_URL=http://localhost:4000
export ANTHROPIC_MODEL=openrouter/qwen/qwen3-coder
export ANTHROPIC_SMALL_FAST_MODEL=openrouter/qwen/qwen3-coder

export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
# 等同于
export DISABLE_TELEMETRY=1
export DISABLE_ERROR_REPORTING=1
export DISABLE_BUG_COMMAND=1
```

- Qwen3-Coder-480B-A35B
- 自定义 slash 命令 .claude/commands/fix-github-issue.md
- https://docs.anthropic.com/en/docs/claude-code/settings

## CLAUDE.md

- ~/.claude/CLAUDE.md
- CLAUDE.md
- CLAUDE.local.md
- “提示即程序”（Prompt as a Program）

---

- 技术栈 (Tech Stack): 声明项目使用的语言、框架和工具及其版本。
- 项目结构 (Project Structure): 概述关键目录的用途和组织方式。
- 命令 (Commands): 列出重要的构建、测试、部署等 shell 命令。
- 代码风格与约定 (Code Style & Conventions): 定义编码规范，如命名约定、导入顺序等。
- 仓库礼仪 (Repository Etiquette): 说明分支命名规则、提交信息格式等版本控制流程。
- 核心文件 (Core Files): 指向项目中关键的配置文件或实用工具模块。
- 禁止触碰列表 (Do Not Touch): 明确指出 AI 不应修改的敏感文件或代码区域，如配置文件或遗留代码。

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you’re done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

- 工作流
  - 探索、计划、编码、提交
    - 探索：要求 Claude 阅读相关文件、图片或 URL，但明确指示它暂时不要编写代码。
    - 计划：让 Claude 制定一个计划。使用 "think"、"think hard" 或 "ultrathink" 等关键词可以为其分配更多计算时间进行深度思考 。
    - 编码：指示 Claude 根据计划实现解决方案。
    - 提交：让 Claude 提交结果、创建拉取请求 (Pull Request)，并更新相关文档。
  - 测试驱动开发 (TDD)
  - 可视化驱动开发

# Claude Code Router

- ~/.claude-code-router/config.json
- ccr
- https://github.com/musistudio/claude-code-router

```bash
npm install -g @musistudio/claude-code-router

ccr code   # 启动 Claude Code
ccr ui     # UI 模式
ccr status # 状态
```

# FAQ

## This organization has been disabled.
