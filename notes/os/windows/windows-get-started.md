---
title: Get Started
---

# Get Started

```bash
winget install Google.Chrome
winget install Anthropic.ClaudeCode

winget install --id Git.Git -e --source winget

# fnm 包管理器
# Fast Node Manager
# https://github.com/Schniz/fnm
winget install Schniz.fnm
# 安装 node 环境
fnm install --lts

# nvm
winget install CoreyButler.nvm-windows


# 直接安装 - 单一版本
winget install OpenJS.NodeJS.LTS
```


- `C:\Program Files\ClaudeCode\`

```json
{
  "env": {
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe"
  }
}
```
