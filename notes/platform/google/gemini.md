---
title: Gemini
---

# Gemini

## gemini-cli

- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

```bash
npm install -g @google/gemini-cli

gemini
```

| command         | for                            | notes                                                          |
| --------------- | ------------------------------ | -------------------------------------------------------------- |
| `/bug`          | 提交 Gemini CLI 问题           | `/bug <标题>`                                                  |
| `/chat`         | 保存/恢复会话历史              | `save <tag>`<br>`resume <tag>`<br>`list`                       |
| `/clear`        | 清屏，清除可见历史             | Ctrl+L                                                         |
| `/compress`     | 用摘要替换全部上下文           |
| `/copy`         | 复制上次输出到剪贴板           |
| `/editor`       | 选择支持的编辑器               |
| `/extensions`   | 列出当前会话扩展               |
| `/help` `/？`   | 显示帮助信息                   |
| `/mcp`          | 管理 MCP 服务器和工具          | `desc`/`descriptions`<br>`nodesc`/`nodescriptions`<br>`schema` |
| `/memory`       | 管理 AI 指令上下文             | `add <内容>`<br>`show`<br>`refresh`                            |
| `/restore`      | 恢复文件到工具执行前状态       | `/restore [tool_call_id]`                                      |
| `/stats`        | 显示会话统计信息               |
| `/theme`        | 更换 CLI 主题                  |
| `/auth`         | 更换认证方式                   |
| `/about`        | 显示版本信息                   |
| `/tools`        | 列出可用工具                   | `desc`/`descriptions`<br>`nodesc`/`nodescriptions`             |
| `/privacy`      | 显示隐私声明及同意设置         |
| `/quit` `/exit` | 退出 CLI                       |
| `!<shell命令>`  | 执行 shell 命令                | `!ls -la`<br>`!git status`                                     |
| `!`             | 切换 shell 模式                |
| `@<路径>`       | 注入指定文件/目录内容到 prompt | `@README.md`<br>`@src/`                                        |
| `@`             | 单独 `@` 传递原始查询          |

> ⚠️ Shell 模式下命令拥有与终端同等权限，请谨慎操作。

- ~/.gemini/settings.json
- .gemini/settings.json
- /etc/gemini-cli/settings.json
- `C:\ProgramData\gemini-cli\settings.json`
- `/Library/Application Support/GeminiCli/settings.json`
- .env
  - `"$MY_API_TOKEN"`
- .gemini/
  - sandbox-macos-custom.sb
  - sandbox.Dockerfile
- `~/.gemini/tmp/<project_hash>/shell_history`
- 参考
  - https://cloud.google.com/gemini/docs/codeassist/gemini-cli
  - https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md

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

## GEMINI.md

- 使用 `@file.md` 可注入指定文件内容到 prompt
