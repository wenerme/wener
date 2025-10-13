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

OPENAI_BASE_URL=https://api.openai.com/v1 OPENAI_API_KEY=sk-proj-1234567890 codex --model deepseek-v3.2-exp
```

## 配置 {#config}

Codex 支持多种设置配置值的机制：

- 特定于配置的命令行标志，例如 `--model o3`（最高优先级）。
- 通用 `-c`/`--config` 标志，接受 `key=value` 对，例如 `--config model="o3"`。
- CODEX_HOME=~/.codex
- $CODEX_HOME/config.toml

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
