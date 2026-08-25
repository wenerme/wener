---
title: Codex CLI 入门指南
tags: [Codex, AI, 入门, 使用指南]
---

# Codex CLI 入门指南

Codex CLI 是 OpenAI 开发的本地代码助手，可以在终端中直接与 AI 对话并执行代码任务。

## 快速开始

### 1. 安装

```bash
# 使用 npm 安装
npm install -g @openai/codex

# 或使用 Homebrew 安装
brew install codex
```

### 2. 首次使用

```bash
# 启动 Codex
codex

# 首次运行会提示登录，选择 "Sign in with ChatGPT"
# 或者使用 API 密钥登录
```

### 3. 基本使用

```bash
# 交互式对话
codex

# 直接执行任务
codex "帮我写一个 Python 函数计算斐波那契数列"

# 非交互模式（适合脚本）
codex exec "解释这个代码文件的功能"
```

## 常用命令

| 命令                | 用途           | 示例                    |
| ------------------- | -------------- | ----------------------- |
| `codex`             | 启动交互式对话 | `codex`                 |
| `codex "任务"`      | 直接执行任务   | `codex "修复这个 bug"`  |
| `codex exec "任务"` | 非交互模式     | `codex exec "运行测试"` |
| `codex resume`      | 恢复之前的会话 | `codex resume`          |
| `codex --help`      | 查看帮助       | `codex --help`          |

## 快捷键

| 快捷键             | 功能           |
| ------------------ | -------------- |
| `@`                | 搜索文件       |
| `Ctrl+V` / `Cmd+V` | 粘贴图片       |
| `Esc` `Esc`        | 编辑上一条消息 |
| `Ctrl+C`           | 中断当前任务   |

## 配置自定义模型

### 1. 配置文件位置

配置文件：`~/.codex/config.toml`

### 2. 基本配置

```toml
# 设置默认模型
model = "gpt-4o"

# 设置批准策略（何时需要用户确认）
approval_policy = "on-request"  # untrusted, on-failure, on-request, never

# 设置沙箱模式
sandbox_mode = "workspace-write"  # read-only, workspace-write, danger-full-access
```

### 3. 使用第三方模型

#### Azure OpenAI

```toml
model = "gpt-4o"
model_provider = "azure"

[model_providers.azure]
name = "Azure OpenAI"
base_url = "https://your-project.openai.azure.com/openai"
env_key = "AZURE_OPENAI_API_KEY"
query_params = { api-version = "2025-04-01-preview" }
wire_api = "responses"
```

设置环境变量：

```bash
export AZURE_OPENAI_API_KEY="your-azure-key"
```

#### 本地 Ollama

```toml
model = "llama2"
model_provider = "ollama"

[model_providers.ollama]
name = "Ollama"
base_url = "http://localhost:11434/v1"
wire_api = "chat"
```

启动 Ollama：

```bash
# 安装 Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 启动服务
ollama serve

# 拉取模型
ollama pull llama2
```

## 常用场景

### 1. 代码审查

```bash
codex "审查这个 PR 的代码质量"
```

### 2. 调试问题

```bash
codex "这个错误是什么原因？如何修复？"
```

### 3. 重构代码

```bash
codex "重构这个函数，让它更简洁"
```

### 4. 写测试

```bash
codex "为这个函数写单元测试"
```

### 5. 文档生成

```bash
codex "为这个项目生成 README 文档"
```

## 安全设置

### 批准策略说明

- `untrusted` - 所有操作都需要确认（最安全）
- `on-failure` - 只在失败时询问
- `on-request` - AI 决定何时询问（推荐）
- `never` - 从不询问（最危险）

### 沙箱模式说明

- `read-only` - 只能读取文件，不能修改
- `workspace-write` - 可以修改工作目录的文件
- `danger-full-access` - 完全访问权限（不推荐）

## 故障排除

### 1. 登录问题

```bash
# 删除认证文件重新登录
rm ~/.codex/auth.json
codex login
```

### 2. 查看日志

```bash
# 查看详细日志
RUST_LOG=codex_core=info codex

# 查看日志文件
tail -f ~/.codex/log/codex-tui.log
```

### 3. 检查配置

```bash
# 查看当前配置
cat ~/.codex/config.toml

# 检查环境变量
echo $OPENAI_API_KEY
```

## 环境变量

| 变量             | 说明                         |
| ---------------- | ---------------------------- |
| `OPENAI_API_KEY` | OpenAI API 密钥              |
| `CODEX_HOME`     | 配置目录（默认：`~/.codex`） |
| `RUST_LOG`       | 日志级别                     |

## 小贴士

1. **首次使用**：建议先用 `read-only` 模式熟悉功能
2. **文件搜索**：使用 `@` 快速找到项目中的文件
3. **会话恢复**：使用 `codex resume` 继续之前的对话
4. **图片输入**：可以直接粘贴截图让 AI 分析
5. **项目记忆**：在项目根目录创建 `AGENTS.md` 文件，AI 会记住项目信息

## 下一步

- 尝试不同的任务类型
- 配置适合你的批准策略
- 探索 MCP 服务器功能
- 学习高级配置选项

开始使用 Codex CLI，让 AI 成为你的编程助手！
