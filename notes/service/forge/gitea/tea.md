---
tags:
  - Command
---

# tea

- [gitea/tea](https://gitea.com/gitea/tea)

```bash
brew install tea # macOS Homebrew

tea login add --name $NAME --url $URL --token $TOKEN

tea login list

tea repos ls              # 列出仓库
tea issues create         # 创建 Issue
tea pr ls                 # 列出 PR
tea pr create             # 创建 PR
tea pr checkout $ID       # Checkout PR
tea pr merge $ID          # 合并 PR
tea notifications ls      # 查看通知
tea api /repos/owner/repo # 直接 API 调用
tea clone owner/repo      # 克隆仓库
tea open                  # 浏览器打开
```
