---
title: opencode
---

# OpenCode

- [anomalyco/opencode](https://github.com/anomalyco/opencode)
  - MIT, TypeScript
  - 开源 AI 编程助手，Claude Code 的替代品
  - 支持多模型 (Claude、OpenAI、Google、Anthropic 等)
  - 基于终端的交互界面，类似 neovim 用户体验
  - 支持 MCP (Model Context Protocol) 协议
  - 客户端-服务器架构，支持远程连接
  - 内建 LSP 支持，代码智能补全
  - 插件系统，支持自定义工具和代理
- 参考
  - https://github.com/code-yeongyu/oh-my-opencode

:::caution

- 项目维度 MCP
  - https://github.com/anomalyco/opencode/issues/361
    - .vscode/mcp.json

:::

:::tip

- 使用 vercel ai sdk, 因此 adapter 可以配置 @ai-sdk/anthropic 这样的 adapter
- 很多功能模块是动态的，动态通过 npm package 方式提供
- tool 直接支持写 typescript 方式提供
- 使用 bun 执行
- grep, glob, list 使用 ripgrep 提供工具

:::

```bash
# npm
npm i -g opencode-ai@latest

# Homebrew (macOS/Linux)
brew install opencode
brew install --cask opencode-desktop
# Scoop (Windows)
scoop bucket add extras
scoop install extras/opencode

# Chocolatey (Windows)
choco install opencode

# Arch Linux
paru -S opencode-bin

# Nix
nix run nixpkgs#opencode

# 安装特定版本
curl -fsSL https://opencode.ai/install | bash -s -- --version 1.1.3

# 自定义安装目录
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://opencode.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://opencode.ai/install | bash

# http://127.0.0.1:4096/
opencode web
```

- `~/.config/opencode/config.json`
- `~/Library/Application Support/opencode/config.json`
- `%APPDATA%\opencode\config.json`
- ./opencode.json
- ./opencode.jsonc
- ./.opencode/config.json
- OPENCODE_CONFIG_CONTENT
- OPENCODE_CONFIG
- OPENCODE_CONFIG_DIR
- OPENCODE_PERMISSION='{"bash":"allow","edit":"ask"}'
- `.opencode/agent/*.md`
- `.opencode/command/*.md`
- `.opencode/themes/*.json`
- `.opencode/lsp.json`
- `.opencode/formatter.json`
- `.opencode/mcp.json`
- `{env:VAR_NAME}`
- `{file:path/to/file}`
- `/.well-known/opencode` URL
- ~/.local/share/opencode/mcp-auth.json
  - MCP Auth
  - `opencode mcp auth my-oauth-server`
- .opencode/tool/
- ~/.config/opencode/tool/
  - `import { tool } from "@opencode-ai/plugin"; export default tool({description:'',args:tool.schema.object(),execute:async({args})=>{}})`
  - 可以一个文件一个，也可以一个文件 export 多个工具

```bash
opencode debug config

# ~/.local/share/opencode/auth.json
opencode auth list

opencode models
opencode models --refresh
opencode models anthropic

# --continue
# --session
# --model
# --file 附加文件
# --attach http://localhost:4096
# --title
opencode run "hello"


# build, plan
opencode run --agent plan "analyze this codebase"

# debug agent|lsp|file|ripgrep|snapshot|skill
opencode debug agent NAME

opencode session list
opencode session rename <id> <new-name>


opencode stats
opencode upgrade

opencode export SESSION-ID
opencode import FILE # 导入会话

# GitHub 集成
opencode github pr create
opencode github issue list
```

- **opencode** - 推荐的免费模型 (Recommended free models)
- **anthropic** - Claude models
- **openai** - GPT models
- **google** - Gemini models
- **github-copilot** - GitHub Copilot
- **vercel** - Vercel AI Gateway
- **openrouter** - Multiple providers
- **deepinfra**, **cerebras**, **groq**, **mistral**, **togetherai** 等

## 配置 {#configuration}

- opencode.json

```json
{
  "model": "anthropic/claude-3-5-sonnet",
  "agent": "build",
  "disabled_providers": ["openai"],
  "enabled_providers": ["anthropic", "opencode"],
  "share": "auto"
}
```

```json
{
  "theme": "dark",
  "keybindings": {
    "quit": "ctrl+c",
    "submit": "enter"
  }
}
```

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-3-5-sonnet",
  "small_model": "opencode/glm-4.6",
  "default_agent": "build",
  "theme": "dark",
  "share": "manual",
  "disabled_providers": ["openai"],
  "enabled_providers": ["anthropic", "opencode"],
  "compaction": {
    "auto": true,
    "prune": true
  },
  "agent": {
    "build": {
      "model": "anthropic/claude-3-5-sonnet",
      "temperature": 0.7,
      "permission": {
        "bash": "allow",
        "edit": "allow"
      }
    },
    "plan": {
      "model": "opencode/glm-4.6",
      "permission": {
        "bash": "deny",
        "edit": "ask"
      }
    }
  },
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "",
        "headers": {}
      },
      "models": {
        "custom": {
          "name": "Custome Model"
        }
      }
    }
  },
  "mcp": {
    "filesystem": {
      "type": "remote",
      "url": "http://localhost:3000/mcp",
      "headers": {},
      // false 为 disable
      "oauth": {
        "clientId": "{env:MY_MCP_CLIENT_ID}",
        "clientSecret": "{env:MY_MCP_CLIENT_SECRET}",
        "scope": "tools:read tools:execute"
      },
      "enabled": true
    },
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "my-mcp-command"],
      "enabled": true,
      "environment": {
        "MY_ENV_VAR": "my_env_var_value"
      },
      "timeout": 5000
    }
  },
  "tools": {
    // 可以关闭 mcp tool
    "my-mcp-foo": false,
    "my-mcp*": false
  },
  // 单独开启
  "agent": {
    "my-agent": {
      "tools": {
        "my-mcp*": true
      }
    }
  }
}
```

**.opencode/agent/{agent-name}.md**

```markdown
---
description: 自定义代理描述
model: anthropic/claude-3-5-sonnet
color: '#FF5733'
temperature: 0.8
mode: primary
steps: 50
permission:
  bash: allow
  edit: allow
---

你的代理指令内容...

使用特定的编程风格和方法论。
专注于 [特定任务]。

[详细指令...]
```

**.opencode/command/{command-name}.md`**

```markdown
---
description: 命令描述
model: opencode/glm-4.6
agent: build
subtask: true
---

命令执行的具体指令...

[详细步骤和模板...]
```

```json title=".opencode/themes/{theme-name}.json"
{
  "$schema": "https://opencode.ai/theme.json",
  "defs": {
    "primary": "#007ACC",
    "secondary": "#6C757D",
    "nord0": "#2E3440"
  },
  "theme": {
    "primary": {
      "dark": "primary",
      "light": "primary"
    },
    "background": {
      "dark": "nord0",
      "light": "#FFFFFF"
    },
    "text": {
      "dark": "#D8DEE9",
      "light": "#2E3440"
    }
  }
}
```
