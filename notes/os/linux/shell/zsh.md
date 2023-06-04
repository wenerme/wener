---
title: zsh
---

# zsh

- 配置
  - .zshenv - 所有
  - .zprofile - 登陆 shell
  - .zshrc - 交互 shell
  - .zlogin
  - .zlogout
- 参考
  - [robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
  - [zsh-users/antigen](https://github.com/zsh-users/antigen)
  - https://apple.stackexchange.com/a/361957/103557

```bash
# 使用相同的配置
echo source ~/.bash_profile >> ~/.zshenv && source ~/.zshenv
```

<!--  ✅❌🟡-->

| feature                                        | zsh | bash |
| ---------------------------------------------- | --- | ---- |
| Automatic cd                                   |
| Recursive path expansion                       |
| Spelling correction and approximate completion |
| Plugin and theme suppor                        |

# FAQ

## Why ZSH

- Pros
  - macOS 默认 Shell
- Cons
  - 大多 ZSH 有的特性 Bash 也有
    - 但 zsh 可能支持的更完善
  - 大多服务器环境都是 Bash 或 POSIX Shell
    - 平时使用 bash 更利于服务端编码
    - 过多使用 zsh 相关特性会产生依赖
