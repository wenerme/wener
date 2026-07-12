---
title: Codex
tags:
  - Agent
  - CLI
---

# Codex

- [openai/codex](httpss://github.com/openai/codex)

```bash
npm i -g @openai/codex
brew install codex

codex --version

# OPENAI_API_KEY 第一次会写入 auth.json ，之后需要修改 auth.json
OPENAI_BASE_URL=https://api.openai.com/v1 OPENAI_API_KEY=<openai-api-key> codex --model deepseek-v3.2-exp

# 使用自定义 provider，环境变量定义 env_key
MY_PROVIDER_KEY=xyz codex
# 使用内置 OPENAI provider，环境变量定义 base_url
OPENAI_BASE_URL=xyz codex

# ~/.codex/log/codex-tui.log
RUST_LOG=debug codex
# 会包含 request
RUST_LOG=trace codex
```

## 配置 {#config}

Codex 支持多种设置配置值的机制：

- 特定于配置的命令行标志，例如 `--model o3`（最高优先级）。
- 通用 `-c`/`--config` 标志，接受 `key=value` 对，例如 `--config model="o3"`。
- CODEX_HOME=~/.codex
- $CODEX_HOME/config.toml
- 参考
  - https://github.com/openai/codex/issues/2760

```toml
model=gpt-5-codex #  模型
model_provider=openai
# 批准策略
# untrusted, on-failure, on-request, never
approval_policy=untrusted
# 沙箱策略
# read-only, workspace-write, danger-full-access
sandbox_mode=read-only

# 启用的 profile
profiles=o3

# MCP 服务器
mcp_servers=mcp-server

# 传递给子进程的环境变量
shell_environment_policy=inherit=all

# 内置 openai provider
[model_providers.openai]
name = "OpenAI"
# OPENAI_BASE_URL
base_url = "https://api.openai.com/v1"
env_key = "OPENAI_API_KEY"
# 使用 v1/chat/completions 还是 v1/responses
# chat, responses
wire_api = "chat"

# 请求配置
query_params = {}
http_headers = {  }

env_http_headers = { "OpenAI-Organization" = "OPENAI_ORGANIZATION", "OpenAI-Project" = "OPENAI_PROJECT" }

request_max_retries = 4
stream_max_retries = 5
# 等待 stream 响应的时间
stream_idle_timeout_ms = 300000

[model_providers.ollama]
name = "Ollama"
base_url = "http://localhost:11434/v1"

[model_providers.azure]
name = "Azure"
base_url = "https://YOUR_PROJECT_NAME.openai.azure.com/openai"
env_key = "AZURE_OPENAI_API_KEY"
query_params = { api-version = "2025-04-01-preview" }
wire_api = "responses"
```

| 变量                  | 描述                                                        |
| --------------------- | ----------------------------------------------------------- |
| `OPENAI_API_KEY`      | 您的 OpenAI API 密钥。                                      |
| `CODEX_HOME`          | 用于日志、配置和其他数据的目录。默认为 `~/.codex`。         |
| `CODEX_API_KEY`       | API 密钥，仅在 `codex exec` 中支持。                        |
| `RUST_LOG`            | 配置日志记录行为 (例如, `codex_core=info,codex_tui=info`)。 |
| `<PROVIDER>_API_KEY`  | 特定提供程序的 API 密钥 (例如, `MISTRAL_API_KEY`)。         |
| `<PROVIDER>_BASE_URL` | 自定义提供程序的基础 URL。                                  |

## auth.json

- OPENAI_API_KEY
- tokens
  - id_token
    - email
    - chatgpt_plan_type
      - Free, Plus, Pro, Team, Business, Enterprise, Edu
    - raw_jwt
  - access_token
  - refresh_token
  - account_id
- last_refresh

## Tools

### Core

| tool                           | 作用                                 |
| ------------------------------ | ------------------------------------ |
| `shell`                        | 执行本地 shell 命令                  |
| `local_shell`                  | Responses API 原生本地 shell 形态    |
| `shell_command`                | 以字符串形式执行 shell               |
| `exec_command` + `write_stdin` | 支持持续进程和交互输入的统一执行模式 |
| `apply_patch`                  | 修改文件                             |
| `update_plan`                  | 更新任务计划                         |
| `view_image`                   | 读取本地图片                         |
| `request_user_input`           | 向用户发起结构化问题                 |
| `request_permissions`          | 申请额外文件、网络等权限             |

### Shell

| tool                           | 说明                           |
| ------------------------------ | ------------------------------ |
| `shell`                        | 常规命令执行                   |
| `local_shell`                  | Responses API local shell tool |
| `shell_command`                | 字符串命令执行形态             |
| `exec_command` + `write_stdin` | 长进程、交互进程、持续输入输出 |

### MCP / Search

| tool                          | 条件                               |
| ----------------------------- | ---------------------------------- |
| `web_search`                  | 开启 cached/live web search        |
| `list_mcp_resources`          | 配置了 MCP server                  |
| `list_mcp_resource_templates` | 配置了 MCP server                  |
| `read_mcp_resource`           | 配置了 MCP server                  |
| MCP server 提供的具体工具     | 动态转换为 Responses function tool |
| `search_tool_bm25`            | 开启 Apps/Connectors tool search   |

### Collaboration

| tool                      | 作用                          |
| ------------------------- | ----------------------------- |
| `spawn_agent`             | 启动 sub-agent                |
| `send_input`              | 给 sub-agent 发消息或中断转向 |
| `resume_agent`            | 恢复已关闭 agent              |
| `wait`                    | 等待 agent 结果               |
| `close_agent`             | 关闭 agent                    |
| `spawn_agents_on_csv`     | 按 CSV 行批量派发 agent       |
| `report_agent_job_result` | CSV worker 回报结构化结果     |

### Other

| tool               | 作用                          |
| ------------------ | ----------------------------- |
| `image_generation` | 图片生成                      |
| `js_repl`          | JavaScript REPL               |
| `js_repl_reset`    | 重置 JavaScript REPL          |
| `artifacts`        | 创建演示文稿、表格等 artifact |
| `grep_files`       | 搜索文件内容                  |
| `read_file`        | 读取文件                      |
| `list_dir`         | 列出目录                      |
