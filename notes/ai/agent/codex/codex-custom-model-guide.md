---
title: Codex CLI 自定义模型使用指南
tags: [Codex, AI, 自定义模型, 配置]
---

# Codex CLI 自定义模型使用指南

本指南专注于如何在 Codex CLI 中配置和使用自定义模型，包括第三方 API 服务、本地模型和自定义端点。

## 目录

- [快速开始](#快速开始)
- [模型提供程序配置](#模型提供程序配置)
- [常用第三方服务配置](#常用第三方服务配置)
- [本地模型配置](#本地模型配置)
- [高级配置选项](#高级配置选项)
- [故障排除](#故障排除)

## 快速开始

### 1. 安装 Codex CLI

```bash
# 使用 npm 安装
npm install -g @openai/codex

# 或使用 Homebrew 安装
brew install codex

# 检查版本
codex --version
```

### 2. 基本配置

Codex 的配置文件位于 `~/.codex/config.toml`，支持多种配置方式：

- 命令行标志（最高优先级）
- 配置文件
- 环境变量

## 模型提供程序配置

### 配置结构

在 `~/.codex/config.toml` 中配置自定义模型提供程序：

```toml
# 设置默认模型和提供程序
model = "your-custom-model"
model_provider = "your-provider"

# 定义模型提供程序
[model_providers.your-provider]
name = "Your Provider Name"
base_url = "https://api.your-provider.com/v1"
env_key = "YOUR_PROVIDER_API_KEY"
wire_api = "chat"  # 或 "responses"
```

### 配置参数说明

| 参数               | 描述                     | 示例                                     |
| ------------------ | ------------------------ | ---------------------------------------- |
| `name`             | 提供程序显示名称         | `"OpenAI"`                               |
| `base_url`         | API 基础 URL             | `"https://api.openai.com/v1"`            |
| `env_key`          | API 密钥环境变量名       | `"OPENAI_API_KEY"`                       |
| `wire_api`         | 使用的 API 协议          | `"chat"` 或 `"responses"`                |
| `query_params`     | 额外的查询参数           | `{ api-version = "2025-04-01-preview" }` |
| `http_headers`     | 静态 HTTP 头             | `{ "X-Custom-Header" = "value" }`        |
| `env_http_headers` | 从环境变量读取的 HTTP 头 | `{ "X-API-Key" = "API_KEY_ENV" }`        |

## 常用第三方服务配置

### 1. Azure OpenAI

```toml
[model_providers.azure]
name = "Azure OpenAI"
base_url = "https://YOUR_PROJECT_NAME.openai.azure.com/openai"
env_key = "AZURE_OPENAI_API_KEY"
query_params = { api-version = "2025-04-01-preview" }
wire_api = "responses"
```

环境变量设置：

```bash
export AZURE_OPENAI_API_KEY="your-azure-api-key"
```

### 2. OpenRouter

```toml
[model_providers.openrouter]
name = "OpenRouter"
base_url = "https://openrouter.ai/api/v1"
env_key = "OPENROUTER_API_KEY"
wire_api = "chat"
```

环境变量设置：

```bash
export OPENROUTER_API_KEY="your-openrouter-key"
```

### 3. Mistral

```toml
[model_providers.mistral]
name = "Mistral"
base_url = "https://api.mistral.ai/v1"
env_key = "MISTRAL_API_KEY"
wire_api = "chat"
```

### 4. DeepSeek

```toml
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com"
env_key = "DEEPSEEK_API_KEY"
wire_api = "chat"
```

### 5. Groq

```toml
[model_providers.groq]
name = "Groq"
base_url = "https://api.groq.com/openai/v1"
env_key = "GROQ_API_KEY"
wire_api = "chat"
```

## 本地模型配置

### 1. Ollama

```toml
[model_providers.ollama]
name = "Ollama"
base_url = "http://localhost:11434/v1"
# 通常不需要 API 密钥
wire_api = "chat"
```

使用示例：

```bash
# 启动 Ollama 服务
ollama serve

# 拉取模型
ollama pull llama2

# 配置 Codex 使用本地模型
model = "llama2"
model_provider = "ollama"
```

### 2. 自定义本地端点

```toml
[model_providers.local]
name = "Local Model"
base_url = "http://localhost:8000/v1"
env_key = "LOCAL_API_KEY"  # 如果需要
wire_api = "chat"
```

## 高级配置选项

### 1. 网络调优

```toml
[model_providers.your-provider]
name = "Your Provider"
base_url = "https://api.example.com/v1"
env_key = "API_KEY"

# 网络重试配置
request_max_retries = 4        # HTTP 请求重试次数
stream_max_retries = 10        # 流重连次数
stream_idle_timeout_ms = 300000 # 流空闲超时（毫秒）
```

### 2. 自定义 HTTP 头

```toml
[model_providers.custom]
name = "Custom Provider"
base_url = "https://api.example.com/v1"
env_key = "API_KEY"

# 静态 HTTP 头
http_headers = {
    "X-Custom-Header" = "custom-value",
    "User-Agent" = "Codex-CLI/1.0"
}

# 从环境变量读取的 HTTP 头
env_http_headers = {
    "X-API-Version" = "API_VERSION_ENV",
    "X-Client-ID" = "CLIENT_ID_ENV"
}
```

### 3. 配置文件示例

完整的 `~/.codex/config.toml` 示例：

```toml
# 默认模型配置
model = "gpt-4o"
model_provider = "openai"

# 批准策略
approval_policy = "on-request"

# 沙箱模式
sandbox_mode = "workspace-write"

# OpenAI 配置
[model_providers.openai]
name = "OpenAI"
base_url = "https://api.openai.com/v1"
env_key = "OPENAI_API_KEY"
wire_api = "responses"

# Azure OpenAI 配置
[model_providers.azure]
name = "Azure OpenAI"
base_url = "https://your-project.openai.azure.com/openai"
env_key = "AZURE_OPENAI_API_KEY"
query_params = { api-version = "2025-04-01-preview" }
wire_api = "responses"

# Ollama 本地模型配置
[model_providers.ollama]
name = "Ollama"
base_url = "http://localhost:11434/v1"
wire_api = "chat"

# 配置多个配置文件
[profiles.azure]
model = "gpt-4o"
model_provider = "azure"
approval_policy = "never"

[profiles.local]
model = "llama2"
model_provider = "ollama"
approval_policy = "never"
```

## 使用配置文件

### 1. 切换模型提供程序

```bash
# 使用配置文件中的默认设置
codex

# 临时切换模型
codex --model gpt-4o --config model_provider=azure

# 使用配置文件
codex --profile azure
```

### 2. 命令行配置

```bash
# 使用通用配置标志
codex --config model="gpt-4o" --config model_provider="azure"

# 设置复杂配置
codex --config model_providers.custom.base_url="https://api.example.com/v1"
```

## 故障排除

### 1. 常见问题

**问题：401 认证错误**

```bash
# 检查 API 密钥
echo $YOUR_API_KEY

# 重新登录
rm ~/.codex/auth.json
codex login
```

**问题：连接超时**

```toml
# 增加超时时间
[model_providers.your-provider]
stream_idle_timeout_ms = 600000  # 10分钟
request_max_retries = 6
```

**问题：模型不支持**

```bash
# 检查模型名称是否正确
# 确保使用正确的 wire_api 设置
```

### 2. 调试日志

```bash
# 启用详细日志
RUST_LOG=codex_core=trace,reqwest=trace codex

# 查看日志文件
tail -f ~/.codex/log/codex-tui.log
```

### 3. 测试连接

```bash
# 使用 curl 测试 API 端点
curl -H "Authorization: Bearer $YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"your-model","messages":[{"role":"user","content":"hello"}]}' \
  https://api.your-provider.com/v1/chat/completions
```

## 最佳实践

1. **安全性**：使用环境变量存储 API 密钥，不要硬编码在配置文件中
2. **性能**：根据网络情况调整重试和超时参数
3. **兼容性**：确保选择的 `wire_api` 与你的服务兼容
4. **测试**：配置完成后先用简单命令测试连接
5. **备份**：定期备份配置文件

## 环境变量参考

| 变量                  | 描述                                   |
| --------------------- | -------------------------------------- |
| `OPENAI_API_KEY`      | OpenAI API 密钥                        |
| `CODEX_HOME`          | Codex 配置目录（默认：`~/.codex`）     |
| `CODEX_API_KEY`       | Codex API 密钥（仅 `codex exec` 支持） |
| `RUST_LOG`            | 日志级别配置                           |
| `<PROVIDER>_API_KEY`  | 特定提供程序的 API 密钥                |
| `<PROVIDER>_BASE_URL` | 自定义提供程序的基础 URL               |

通过本指南，你应该能够成功配置和使用各种自定义模型提供程序。如有问题，请参考官方文档或查看日志文件进行调试。
