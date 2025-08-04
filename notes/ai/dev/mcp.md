---
title: MCP
tags:
  - Protocol
---

# MCP

- Model Context Protocol
  - JSON-RPC 2.0
- https://github.com/modelcontextprotocol
  - [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector)
- MCP Hosts - Claude, IDEs, Tools
- MCP Clients
  - [punkpeye/awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients)
- MCP Servers
  - [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
  - [Dhravya/apple-mcp](https://github.com/Dhravya/apple-mcp)
  - https://www.open-mcp.org/servers
  - https://www.claudemcp.com/servers
  - https://smithery.ai/

```json
{
  "servers": {
    "apple-mcp": {
      "command": "bunx",
      "args": ["@dhravya/apple-mcp@latest"]
    }
  }
}
```

- Github Copilot Agent
  - ~/Library/Application Support/Code/User/settings.json
    - mcp.servers
- Roo
  - 全局 ~/Library/Application Support/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json
  - 项目 ./.roo/mcp.json
- Stateless mode - 无需在 MCP 服务器之间维护会话状态，适合简单的 API 封装服务。
  - sessionIdGenerator: undefined
  - 不需要管理 session
- Persistent storage mode - 本地无需保存状态，但会话数据存储在数据库中。例如：用于在线下单的 MCP 服务器，购物车信息存储在数据库。
  - sessionIdGenerator: () => randomUUID(),
  - eventStore: databaseEventStore
- Local state with message routing - 需要本地维护状态，所有属于同一会话的请求需路由到同一节点。可通过消息队列和发布/订阅系统实现。

## inspector

```bash
# 默认  http://127.0.0.1:6277/ http://127.0.0.1:6274/
npx @modelcontextprotocol/inspector node build/index.js

# Proxy http://127.0.0.1:9000
# Inspector http://127.0.0.1:8080
CLIENT_PORT=8080 SERVER_PORT=9000 npx @modelcontextprotocol/inspector node build/index.js

npx @modelcontextprotocol/inspector --config mcp.json --server everything
```

```json title="mcp.json"
{
  "mcpServers": {
    "everything": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything"],
      "env": {
        "hello": "Hello MCP!"
      }
    },
    "jetbrains": {
      "command": "npx",
      "args": ["-y", "@jetbrains/mcp-proxy"]
    }
  }
}
```

# Spec

- https://www.claudemcp.com/specification

## JetBrains

- https://github.com/JetBrains/mcp-jetbrains
- 安装插件 https://plugins.jetbrains.com/plugin/26071-mcp-server

```json
{
  "servers": {
    "jetbrains": {
      "command": "npx",
      "args": ["-y", "@jetbrains/mcp-proxy"]
    }
  }
}
```

<!--
document.querySelector('#radix-\\:rv\\:-content-tools > div > div:nth-child(1) > div:nth-child(2) > div')
copy(Array.from($0.querySelectorAll('&>div span:nth-child(1)')).map(v=>[v.innerText,v.nextElementSibling.innerText].join('|')).join('\n'))
-->

| tool                          | desc                                                               |
| ----------------------------- | ------------------------------------------------------------------ |
| create_new_file_with_text     | 在项目指定路径创建新文件并写入内容，自动创建父目录。返回操作结果。 |
| execute_action_by_id          | 执行指定 ID 的编辑器操作，返回操作结果。                           |
| execute_terminal_command      | 在终端执行指定命令，返回输出或错误。                               |
| find_commit_by_message        | 按提交信息或关键字查找项目历史中的提交，返回匹配哈希列表。         |
| find_files_by_name_substring  | 按名称子串搜索项目文件，返回匹配文件列表。                         |
| get_all_open_file_paths       | 获取当前编辑器所有打开文件的路径列表。                             |
| get_all_open_file_texts       | 获取当前编辑器所有打开文件的内容列表。                             |
| get_current_file_errors       | 检查当前文件的错误和警告，返回问题列表。                           |
| get_debugger_breakpoints      | 获取项目所有断点列表，包含文件路径和行号。                         |
| get_file_text_by_path         | 按项目相对路径获取文件内容，返回文本或错误信息。                   |
| get_open_in_editor_file_path  | 获取当前编辑器中当前文件的绝对路径，无文件则返回空字符串。         |
| get_open_in_editor_file_text  | 获取当前编辑器中当前文件的全部内容，无文件则返回空字符串。         |
| get_progress_indicators       | 获取所有运行中的进度指示器状态。                                   |
| get_project_dependencies      | 获取项目所有依赖列表。                                             |
| get_project_modules           | 获取项目所有模块及依赖列表。                                       |
| get_project_problems          | 获取项目所有问题（错误、警告等），返回问题列表。                   |
| get_project_vcs_status        | 获取项目版本控制状态，返回变更文件列表。                           |
| get_run_configurations        | 获取当前项目所有运行配置列表。                                     |
| get_selected_in_editor_text   | 获取当前编辑器中当前选中的文本，无选中则返回空字符串。             |
| get_terminal_text             | 获取第一个活动终端的内容，无终端则返回空字符串。                   |
| list_available_actions        | 列出编辑器所有可用操作。                                           |
| list_directory_tree_in_folder | 递归展示指定文件夹的目录树结构，可限制深度。                       |
| list_files_in_folder          | 列出指定项目文件夹下所有文件和目录。                               |
| open_file_in_editor           | 打开指定文件并写入内容，需提供路径和内容。返回操作结果。           |
| reformat_current_file         | 格式化当前打开文件，返回操作结果。                                 |
| reformat_file                 | 格式化指定文件，需提供路径。返回操作结果。                         |
| replace_current_file_text     | 替换当前文件全部内容，需提供新内容参数。返回操作结果。             |
| replace_file_text_by_path     | 按路径替换指定文件全部内容，需提供新内容。返回操作结果。           |
| replace_selected_text         | 替换当前选中的文本，需提供新内容参数。返回操作结果。               |
| replace_specific_text         | 在指定文件中替换特定文本，优先使用此工具。返回操作结果。           |
| run_configuration             | 运行指定项目配置，最长等待 120 秒，返回输出或错误。                |
| search_in_files_content       | 在项目文件内容中搜索指定文本，返回匹配文件列表。                   |
| toggle_debugger_breakpoint    | 在指定文件行切换断点，需提供文件路径和行号。返回操作结果。         |
| wait                          | 等待指定毫秒数（默认 5000ms），完成后返回 "ok"。                   |

- list_available_actions
  - 会的到所有可用的编辑器操作
  - 接近 3000 个操作

## Github Copilot

- https://code.visualstudio.com/mcp
- https://code.visualstudio.com/docs/copilot/chat/mcp-servers
