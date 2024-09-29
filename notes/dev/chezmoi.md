---
title: chezmoi
tags:
  - Golang
---

# chezmoi

- [twpayne/chezmoi](https://github.com/twpayne/chezmoi)
  - MIT, Go
- 参考
  - https://www.chezmoi.io/comparison-table/
- ~/.local/share/chezmoi
- ~/.config/chezmoi/
  - chezmoi.{json,timl,taml,jsonc}
  - chezmoistate.boltdb

```bash
brew install chezmoi

# 使用现有仓库初始化
chezmoi init --source git@github.com:wenerme/dotfiles.git
chezmoi apply --dry-run --verbose
chezmoi apply

# 直接初始化
chezmoi init # ~/.local/share/chezmoi

# ~/.local/share/chezmoi/dot_bashrc
chezmoi add ~/.bashrc

chezmoi managed # 查看管理的文件
chezmoi status  # 查看状态
chezmoi re-add  # 重新添加 - 添加修改后的配置
chezmoi cd      # cd ~/.local/share/chezmoi
```
