---
title: gemini-cli
tags: [Agent, CLI]
---

# gemini-cli

- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
  - Apache-2.0, TypeScript
- .geminiignore
- settings.json
  - ~/.gemini/settings.json
  - .gemini/settings.json
  - /etc/gemini-cli/settings.json
  - `C:\ProgramData\gemini-cli\settings.json`
  - `/Library/Application Support/GeminiCli/settings.json`
- .env
  - 在 JSON 里直接使用 `"$MY_API_TOKEN"`
- .gemini/
  - sandbox-macos-custom.sb
  - sandbox.Dockerfile
- `~/.gemini/tmp/<project_hash>/shell_history`
- `<workspace>/.gemini/extensions`
- `<home>/.gemini/extensions/<name>/gemini-extension.json`
- 参考
  - https://geminicli.com/extensions/browse/
  - [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)
    - based on Gemini CLI
  - https://cloud.google.com/gemini/docs/codeassist/gemini-cli
  - https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md
  - https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md
- env
  - GEMINI_CLI=1 用于 Shell 检测运行环境
  - GEMINI_CONFIG_DIR=.gemini
  - GEMINI_SYSTEM_MD=.gemini/system.md
    - override system prompt from file
  - GEMINI_WRITE_SYSTEM_MD
  - GEMINI_CLI_NO_RELAUNCH
  - GEMINI_CLI_SYSTEM_SETTINGS_PATH
  - GEMINI_CLI_DISABLE_AUTOUPDATER
  - SANDBOX
  - GEMINI_API_KEY
  - TERM_PROGRAM=vscode
    - 检测 IDE 类型
    - vscode 扩展 https://github.com/google-gemini/gemini-cli/tree/main/packages/vscode-ide-companion
    - Open Editor File Context
    - Selection Context

```bash
brew install gemini-cli
npm install -g @google/gemini-cli@latest

gemini
```

## commands

| command         | for                            | notes                                                          |
| --------------- | ------------------------------ | -------------------------------------------------------------- |
| `/about`        | 显示版本信息                   |
| `/auth`         | 更换认证方式                   |
| `/bug`          | 提交 Gemini CLI 问题           | `/bug <标题>`                                                  |
| `/chat`         | 保存/恢复会话历史              | `save <tag>`<br>`resume <tag>`<br>`list`                       |
| `/clear`        | 清屏，清除可见历史             | Ctrl+L                                                         |
| `/compress`     | 用摘要替换全部上下文           |
| `/copy`         | 复制上次输出到剪贴板           |
| `/corgi`        | 切换 Corgi 模式（AI 角色）     |
| `/editor`       | 选择支持的编辑器               |
| `/extensions`   | 列出当前会话扩展               |
| `/help` `/？`   | 显示帮助信息                   |
| `/ide`          |                                | `/ide status`, `/ide install`                                  |
| `/mcp`          | 管理 MCP 服务器和工具          | `desc`/`descriptions`<br>`nodesc`/`nodescriptions`<br>`schema` |
| `/memory`       | 管理 AI 指令上下文             | `add <内容>`<br>`show`<br>`refresh`                            |
| `/privacy`      | 显示隐私声明及同意设置         |
| `/quit` `/exit` | 退出 CLI                       |
| `/restore`      | 恢复文件到工具执行前状态       | `/restore [tool_call_id]`                                      |
| `/stats`        | 显示会话统计信息               |
| `/theme`        | 更换 CLI 主题                  |
| `/tools`        | 列出可用工具                   | `desc`/`descriptions`<br>`nodesc`/`nodescriptions`             |
| `!<shell命令>`  | 执行 shell 命令                | `!ls -la`<br>`!git status`                                     |
| `!`             | 切换 shell 模式                |
| `@<路径>`       | 注入指定文件/目录内容到 prompt | `@README.md`<br>`@src/`                                        |
| `@`             | 单独 `@` 传递原始查询          |

> ⚠️ Shell 模式下命令拥有与终端同等权限，请谨慎操作。

## settings.json

```json
{
  "contextFileName": "GEMINI.md",
  "bugCommand": {
    "urlTemplate": "https://bug.example.com/new?title={title}&info={info}"
  },
  "fileFiltering": {
    "respectGitIgnore": true,
    "enableRecursiveFileSearch": false
  },
  // https://github.com/google-gemini/gemini-cli/blob/main/docs/core/tools-api.md#built-in-tools
  "coreTools": [],
  "excludeTools": [],
  "allowMCPServers": [],
  "excludeMCPServers": [],
  "autoAccept": false,
  "sandbox": false, // docker
  "toolDiscoveryCommand": "",
  "toolCallCommand": "",
  "mcpServers": {
    "myPythonServer": {
      "command": "python",
      "args": ["mcp_server.py", "--port", "8080"],
      "cwd": "./mcp_tools/python",
      "timeout": 5000
    }
  },
  "checkpointing": { "enabled": false },
  "preferredEditor": "vscode",
  "telemetry": {
    "enabled": false,
    "target": "local",
    "otlpEndpoint": "http://localhost:4317",
    "logPrompts": true
  },
  "usageStatisticsEnabled": false,
  "hideTips": false,
  "hideBanner": false,
  "summarizeToolOutput": {
    "run_shell_command": {
      "tokenBudget": 2000
    }
  },
  "maxSessionTurns": -1,
  "theme": "Atom One",
  "selectedAuthType": "oauth-personal"
}
```

| tool              | for                            |
| ----------------- | ------------------------------ |
| **FS**            | 文件系统工具                   |
| LSTool            | 列出目录内容                   |
| ReadFileTool      | 读取单个文件内容               |
| WriteFileTool     | 写入内容到文件                 |
| GrepTool          | 在文件中搜索模式               |
| GlobTool          | 查找匹配 glob 模式的文件       |
| EditTool          | 对文件进行原地修改             |
| ReadManyFilesTool | 读取并拼接多个文件或 glob 内容 |
| **Execution**     | 执行工具                       |
| ShellTool         | 执行 shell 命令                |
| **Web**           | Web 工具                       |
| WebFetchTool      | 获取指定 URL 内容              |
| WebSearchTool     | 执行网页搜索                   |
| **Memory**        | 内存工具                       |
| MemoryTool        | 与 AI 的记忆交互               |

- Promopts
  - https://github.com/google-gemini/gemini-cli/blob/main/packages/core/src/core/prompts.ts
  - getCoreSystemPrompt
  - getCompressionPrompt

| env                    | for                  |
| ---------------------- | -------------------- |
| GEMINI_MODEL           | gemini-2.5-pro       |
| GEMINI_FLASH_MODEL     | gemini-2.5-flash     |
| GEMINI_EMBEDDING_MODEL | gemini-embedding-001 |
| GOOGLE_GEMINI_BASE_URL |
| GEMINI_API_KEY         |

- 目前只支持 Gemini 模型
  - https://github.com/google-gemini/gemini-cli/discussions/1974#discussioncomment-13591013
  - LiteLLM 代理 https://docs.litellm.ai/docs/tutorials/litellm_gemini_cli
  - multi provider fork https://github.com/acoliver/llxprt-code

## extensions

```json title="gemini-extension.json"
{
  "name": "my-extension",
  "version": "1.0.0",
  "mcpServers": {
    "my-server": {
      "command": "node my-server.js"
    }
  },
  "contextFileName": "GEMINI.md",
  "excludeTools": ["run_shell_command"]
}
```

```
.gemini/extensions/gcp/
├── gemini-extension.json
└── commands/
    ├── deploy.toml
    └── gcs/
        └── sync.toml
```

- https://github.com/google-gemini/gemini-cli/blob/main/docs/extension.md

## GEMINI.md

- 现在支持 [AGENTS.md](./agents.md)
- 使用 `@file.md` 可注入指定文件内容到 prompt
