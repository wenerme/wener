---
tags:
  - arch
  - Shell
commands:
  - arch
  - machine
---

# macOS arch

- ~/Library/archSettings
- /Library/archSettings
- /Network/Library/archSettings
- /System/Library/archSettings

```bash
machine # 当前架构

# 使用制定的架构来运行 universal binary
arch -x86_64 brew --version
arch -arm64 brew --version
```

| flag       | for            |
| ---------- | -------------- |
| -32        |
| -64        |
| -c         | 忽略所有 env   |
| -d ENV     | 移除给定的 ENV |
| -e ENV=VAL | 设置 ENV       |

| arch    | for                        |
| ------- | -------------------------- |
| i386    | 32-bit intel               |
| x86_64  | 64-bit intel               |
| x86_64h | 64-bit intel (haswell)     |
| arm64   | 64-bit arm                 |
| arm64e  | 64-bit arm (Apple Silicon) |
