---
title: Claude Code
tags: [Claude, AI, Code, Agent]
---

# Claude Code

- [anthropics/claude-code](https://github.com/anthropics/claude-code)
- https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
- Awesome
  - [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
  - [Maciek-roboblog/Claude-Code-Usage-Monitor](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor)
    - MIT, Python
  - [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
  - [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow)
    - MIT, TS, JS
  - [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage)
  - [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)
  - https://github.com/Piebald-AI/tweakcc
    - `npx -y tweakcc`
  - https://github.com/sirmalloc/ccstatusline
    - `npx -y ccstatusline@latest`
    - https://github.com/powerline/fonts
      - brew install font-powerline-symbols

:::caution

- Add dynamic loading/unloading of MCP servers during active sessions [#6638](https://github.com/anthropics/claude-code/issues/6638)
  - 目前 mcp 太多会导致 token 消耗过多
  - 可以临时 deny 一些 mcp
- Add --session-name and /session-name for custom session identification https://github.com/anthropics/claude-code/issues/2112
- 官方正在 Work 把 CC 做到 Web 和 移动端

:::

```bash
brew install claude-code
npm install -g @anthropic-ai/claude-code

CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 claude

ANTHROPIC_BASE_URL= ANTHROPIC_AUTH_TOKEN= ANTHROPIC_MODEL= claude

npx -y ccusage blocks --live
npx -y ccusage session

claude config list
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

- ~/.claude.json

**配置文件和优先级**

- ~/.claude/settings.json
- .claude/settings.json
- .claude/settings.local.json
- 命令行参数
- enterprise managed policy settings
  - /Library/Application Support/ClaudeCode/managed-settings.json
  - /etc/claude-code/managed-settings.json
  - C:\ProgramData\ClaudeCode\managed-settings.json

```json title="settings.json"
{
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test:*)", "Read(~/.zshrc)"],
    "deny": ["Bash(curl:*)"],
    "ask": [],
    // Claude 可以访问的额外工作目录
    // /add-dir
    // --add-dir <path>
    "additionalDirectories": [],
    // default - 标准行为：首次使用每个工具时提示权限
    // acceptEdits - 自动接受会话的文件编辑权限
    // plan - 计划模式：Claude 可以分析但不能修改文件或执行命令
    // bypassPermissions - 跳过所有权限提示
    "defaultMode": "default",
    // 设置为 "disable" 可防止激活 bypassPermissions 模式
    "disableBypassPermissionsMode": "disable"
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  },
  // 覆盖 Claude Code 使用的默认模型
  "model": "",
  "hooks": {},
  "apiKeyHelper": "",
  // 基于最后活动日期，本地保留聊天记录的天数
  "cleanupPeriodDays": 30,
  // 是否在 git 提交和拉取请求中包含 Claude 共同作者标记
  "includeCoAuthoredBy": true,
  "statusLine": { "type": "command", "command": "~/.claude/statusline.sh" },
  "forceLoginMethod": "claudeai",
  // 自动批准项目 .mcp.json 文件中定义的所有 MCP 服务器
  "enableAllProjectMcpServers": true,
  // 批准的 .mcp.json 文件中的特定 MCP 服务器列表
  "enabledMcpjsonServers": ["memory", "github"],
  // 拒绝的 .mcp.json 文件中的特定 MCP 服务器列表
  "disabledMcpjsonServers": ["filesystem"],
  // 修改 .aws 目录的自定义脚本
  "awsAuthRefresh": "aws sso login --profile myprofile",
  // 输出包含 AWS 凭据的 JSON 的自定义脚本
  "awsCredentialExport": "/bin/generate_aws_grant.sh"
}
```

- 权限格式
  - Tool, Tool(optional-specifier)
- Tool
  - Edit
  - Read
  - WebFetch
  - `mcp__github`
    - 整个 MCP
  - `mcp__github__get_issue`
    - 单个 MCP 工具

| 工具         | 描述                           | 需要权限 |
| ------------ | ------------------------------ | -------- |
| Bash         | 在环境中执行 shell 命令        | 是       |
| Edit         | 对特定文件进行精确编辑         | 是       |
| Glob         | 基于模式匹配查找文件           | 否       |
| Grep         | 在文件内容中搜索模式           | 否       |
| LS           | 列出文件和目录                 | 否       |
| MultiEdit    | 对单个文件原子性地执行多次编辑 | 是       |
| NotebookEdit | 修改 Jupyter 笔记本单元格      | 是       |
| NotebookRead | 读取并显示 Jupyter 笔记本内容  | 否       |
| Read         | 读取文件内容                   | 否       |
| Task         | 运行子代理处理复杂的多步骤任务 | 否       |
| TodoWrite    | 创建和管理结构化任务列表       | 否       |
| WebFetch     | 从指定 URL 获取内容            | 是       |
| WebSearch    | 执行带域名过滤的网络搜索       | 是       |
| Write        | 创建或覆盖文件                 | 是       |

| env                                      | for                                                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| ANTHROPIC_API_KEY                        | API 密钥，作为 X-Api-Key 头发送，Claude SDK 使用（交互式运行 /login）                                               |
| ANTHROPIC_AUTH_TOKEN                     | Authorization 头的自定义值（设置值将添加 Bearer 前缀）                                                              |
| ANTHROPIC_BASE_URL                       | 自定义 API 端点 URL                                                                                                 |
| ANTHROPIC_CUSTOM_HEADERS                 | 添加到请求的自定义头（Name: Value 格式）                                                                            |
| ANTHROPIC_MODEL                          | 要使用的自定义模型名称（如 claude-sonnet-4-20250514）                                                               |
| ANTHROPIC_DEFAULT_HAIKU_MODEL            |
| ANTHROPIC_DEFAULT_OPUS_MODEL             |
| ANTHROPIC_DEFAULT_SONNET_MODEL           |
| CLAUDE_CODE_SUBAGENT_MODEL               |
| ANTHROPIC_SMALL_FAST_MODEL               | Haiku 类模型名称，用于后台任务                                                                                      |
| ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION    | 使用 Bedrock 时小型快速模型的 AWS 区域覆盖                                                                          |
| ANTHROPIC_BEDROCK_BASE_URL               | AWS Bedrock 端点 URL                                                                                                |
| ANTHROPIC_VERTEX_BASE_URL                | Google Vertex AI 端点 URL                                                                                           |
| ANTHROPIC_VERTEX_PROJECT_ID              | Google Cloud 项目 ID                                                                                                |
| AWS_BEARER_TOKEN_BEDROCK                 | Bedrock 认证的 API 密钥（参见 Bedrock API 密钥）                                                                    |
| BASH_DEFAULT_TIMEOUT_MS                  | 长时间运行 bash 命令的默认超时时间（毫秒）                                                                          |
| BASH_MAX_TIMEOUT_MS                      | 模型可设置的长时间运行 bash 命令的最大超时时间（毫秒）                                                              |
| BASH_MAX_OUTPUT_LENGTH                   | bash 输出在被中间截断前的最大字符数                                                                                 |
| CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR | 每次 Bash 命令后返回原始工作目录                                                                                    |
| CLAUDE_CODE_API_KEY_HELPER_TTL_MS        | 凭据刷新间隔（毫秒），使用 apiKeyHelper 时                                                                          |
| CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC | 禁用非必要流量（等同于设置 DISABLE_AUTOUPDATER、DISABLE_BUG_COMMAND、DISABLE_ERROR_REPORTING 和 DISABLE_TELEMETRY） |
| CLAUDE_CODE_DISABLE_TERMINAL_TITLE       | 设为 1 可禁用基于对话上下文的自动终端标题更新                                                                       |
| CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL        | 跳过 IDE 扩展的自动安装                                                                                             |
| CLAUDE_CODE_MAX_OUTPUT_TOKENS            | 设置大多数请求的最大输出令牌数                                                                                      |
| CLAUDE_CODE_SKIP_BEDROCK_AUTH            | 跳过 Bedrock 的 AWS 认证（如使用 LLM 网关时）                                                                       |
| CLAUDE_CODE_SKIP_VERTEX_AUTH             | 跳过 Vertex 的 Google 认证（如使用 LLM 网关时）                                                                     |
| CLAUDE_CODE_USE_BEDROCK                  | 使用 Bedrock                                                                                                        |
| CLAUDE_CODE_USE_VERTEX                   | 使用 Vertex                                                                                                         |
| DISABLE_AUTOUPDATER                      | 设为 1 可禁用自动更新，优先于 autoUpdates 配置设置                                                                  |
| DISABLE_BUG_COMMAND                      | 设为 1 可禁用 /bug 命令                                                                                             |
| DISABLE_COST_WARNINGS                    | 设为 1 可禁用成本警告消息                                                                                           |
| DISABLE_ERROR_REPORTING                  | 设为 1 可选择退出 Sentry 错误报告                                                                                   |
| DISABLE_NON_ESSENTIAL_MODEL_CALLS        | 设为 1 可禁用非关键路径（如风格化文本）的模型调用                                                                   |
| DISABLE_TELEMETRY                        | 设为 1 可选择退出 Statsig 遥测（注意 Statsig 事件不包含代码、文件路径或 bash 命令等用户数据）                       |
| HTTP_PROXY                               | 指定网络连接的 HTTP 代理服务器                                                                                      |
| HTTPS_PROXY                              | 指定网络连接的 HTTPS 代理服务器                                                                                     |
| MAX_MCP_OUTPUT_TOKENS                    | MCP 工具响应中允许的最大令牌数（默认：25000）                                                                       |
| MAX_THINKING_TOKENS                      | 强制模型思考预算的令牌数                                                                                            |
| MCP_TIMEOUT                              | MCP 服务器启动超时时间（毫秒）                                                                                      |
| MCP_TOOL_TIMEOUT                         | MCP 工具执行超时时间（毫秒）                                                                                        |
| USE_BUILTIN_RIPGREP                      | 设为 0 可使用系统安装的 rg 而非 Claude Code 自带的 rg                                                               |
| VERTEX_REGION_CLAUDE_3_5_HAIKU           | 使用 Vertex AI 时 Claude 3.5 Haiku 的区域覆盖                                                                       |
| VERTEX_REGION_CLAUDE_3_5_SONNET          | 使用 Vertex AI 时 Claude Sonnet 3.5 的区域覆盖                                                                      |
| VERTEX_REGION_CLAUDE_3_7_SONNET          | 使用 Vertex AI 时 Claude 3.7 Sonnet 的区域覆盖                                                                      |
| VERTEX_REGION_CLAUDE_4_0_OPUS            | 使用 Vertex AI 时 Claude 4.0 Opus 的区域覆盖                                                                        |
| VERTEX_REGION_CLAUDE_4_0_SONNET          | 使用 Vertex AI 时 Claude 4.0 Sonnet 的区域覆盖                                                                      |
| VERTEX_REGION_CLAUDE_4_1_OPUS            | 使用 Vertex AI 时 Claude 4.1 Opus 的区域覆盖                                                                        |

- MAX_THINKING_TOKENS
  - 499
  - 有些 provider 需要至少 1024
  - 会让所有请求变成思考请求
  - https://github.com/anthropics/claude-code/issues/5257

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

## MCP

- 范围
  - local：个人服务器、实验性配置或特定于单个项目的敏感凭据
    - ~/.claude.json
  - project：团队共享的服务器、项目特定的工具或协作所需的服务
    - .mcp.json
  - user：跨多个项目需要的个人工具、开发工具或常用服务
- .mcp.json 支持展开 `${VAR:-default}`
  - command, args, env, url, headers

```json
{
  "mcpServers": {
    "api-server": {
      "type": "sse",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

## settings.local.json

```json title="settings.local.json"
{
  "permissions": {
    "allow": [
      "Bash(cat:*)",
      "Bash(cp:*)",
      "Bash(find:*)",
      "Bash(git add:*)",
      "Bash(git checkout:*)",
      "Bash(git commit:*)",
      "Bash(git fetch:*)",
      "Bash(git merge:*)",
      "Bash(git log:*)",
      "Bash(git push:*)",
      "Bash(git rm:*)",
      "Bash(git stash:*)",
      "Bash(go build:*)",
      "Bash(go get:*)",
      "Bash(go mod:*)",
      "Bash(go test:*)",
      "Bash(ls:*)",
      "Bash(mkdir:*)",
      "Bash(npm run lint)",
      "Bash(npm run test:*)"
      "Bash(python3:*)",
      "Bash(true)",
      "WebFetch(domain:docs.anthropic.com)",
      "WebFetch(domain:github.com)",
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

```bash
# base
awk
cat
date
diff
du
find
fzf
grep
head
less
ls
man
mkdir
more
ps
pwd
sed
sort
touch
tree
true
uname
whoami

# git
git diff
git pull
git checkout
git fetch
git log
git stash
git status
git remote -v
git shortlog
git add
git commit

# golang
go build
go get
go mod
go test

# node/npm/pnpm
npm run lint
npm run test
pnpm run format
pnpm run lint
pnpm run test
pnpm install
pnpm dev
pnpm ls

# docker
docker ps
docker events
docker logs
docker inspect
```

## .claude/commands

```

```

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

## subagent

- 内置
  - general-purpose
  - statusline-setup
  - output-style-setup

## cc-switch

- GUI 切换 .claude/settings.json 文件
- https://github.com/farion1231/cc-switch

```bash
brew install farion1231/ccswitch/cc-switch
```

## cc-mirror

- https://github.com/numman-ali/cc-mirror
- 创建多个 claude 这样的命令行，使用预设的环境变量
- ~/.cc-mirror/NAME/
  - npm/ Claude Code installation
  - config/ API keys, sessions, MCP servers
  - tweakcc/ Theme & prompt customization
  - variant.json Metadata
- ~/.local/bin/NAME

```bash
npx -y cc-mirror quick --provider custom --no-tweak --no-prompt-pack \
  --base-url http://localhost:7180 \
  --api-key dummy \
  --model-opus claude-opus-4-5-thinking \
  --model-sonnet claude-sonnet-4-5-thinking \
  --model-haiku claude-sonnet-4-5 \
  --name cc-anti

npx -y cc-mirror quick --provider custom --no-tweak --no-prompt-pack \
  --base-url http://localhost:7180 \
  --api-key dummy \
  --model-opus gemini-3-pro-high \
  --model-sonnet gemini-3-flash \
  --model-haiku gemini-2.5-flash-lite \
  --name cc-gemini
```

# FAQ

## This organization has been disabled.

## VSC multi session

当多个 claude 的时候，VSC 只能 connect 到一个, 断开的一个可以使用 `/ide` 重连

```bash
VSCODE_PID= VSCODE_CWD= TERM_PROGRAM= command claude
```

- https://github.com/anthropics/claude-code/issues/1276

# Version

| version | date       | notes |
| ------- | ---------- | ----- |
| 2.1     | 2026-01-07 |
| 2.0     | 2025-09-29 |

- https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
- https://claudelog.com/claude-code-changelog/
- ENABLE_EXPERIMENTAL_MCP_CLI

| env                                     | since |
| --------------------------------------- | ----- |
| CLAUDE_CODE_TMPDIR                      | 2.1.5 |
| CLAUDE_CODE_DISABLE_BACKGROUND_TASKS    | 2.1.4 |
| CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS | 2.1.0 |

## Claude Code 2.1

- 技能热重载
  - ~/.claude/skills
  - .claude/skills
- skill `context: fork` to run skill in forked sub-agent context
- `list_changed` notification to reload mpc tools
- 支持 `language` 设置
- `Shift+Enter` 能正常使用
- permission Bash 支持 `*` 通配符在任意位置
  - 例如 `Bash(git * main)`
  - 之前必须 `:*` 例如 `Bash(git checkout:*)`
- `Ctrl+B` 能同时控制 Bash 和 Agent 在后台运行
- `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` 能控制文件读取的输出 token 数
