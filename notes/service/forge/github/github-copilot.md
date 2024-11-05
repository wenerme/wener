---
title: Copilot
---

# GitHub Copilot

- https://github.com/features/copilot
  - $10/月, $100/年
  - 支持 Python, JavaScript, TypeScript, Go, Ruby
- 社区 https://github.com/community/community/discussions
- 参考
  - [moyix/fauxpilot](https://github.com/moyix/fauxpilot)
    - open-source GitHub Copilot server

:::info

- https://github.com/orgs/community/discussions/29127
  - 支持 http_proxy 不支持 socks

:::

```bash
brew install gh
gh auth login
gh extension install github/gh-copilot # 安装 Copilot 扩展
gh extension upgrade gh-copilot        # 升级 Copilot 扩展

gh copilot config # 配置 Copilot

gh copilot explain "sudo apt-get"

# GH_DEBUG
# GH_HOST
# ghcs -> gh copilot suggest
# ghce -> gh copilot explain
[ -n "$BASH_VERSION" ] && eval "$(gh copilot alias -- bash)"
[ -n "$ZSH_VERSION" ] && eval "$(gh copilot alias -- zsh)"

curl https://copilot-proxy.githubusercontent.com/_ping
```

## IDEA Shortcut

|                                              key | for            |
| -----------------------------------------------: | -------------- |
|                                   <kbd>Tab</kbd> | 接受建议       |
|                                   <kbd>Esc</kbd> | 取消建议       |
|         <kbd>Alt + ]</kbd>,<kbd>Option + ]</kbd> | 下一个建议     |
|         <kbd>Alt + [</kbd>,<kbd>Option + [</kbd> | 上一个建议     |
|         <kbd>Alt + \</kbd>,<kbd>Option + \</kbd> | 触发建议       |
| <kbd>Alt + Enter</kbd>,<kbd>Option + Enter</kbd> | 显示建议侧边栏 |
|                      <kbd>Ctrl + Shift + G</kbd> | Inline Chat    |
|                      <kbd>Ctrl + Shift + C</kbd> | Chat           |

## VSC Shortcut

| key | for |
| --: | --- |

## Reference

- https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-your-environment#keyboard-shortcuts-for-macos
- https://docs.github.com/en/copilot/configuring-github-copilot/configuring-github-copilot-in-your-environment
- https://github.com/search?q=GH_COPILOT_TOKEN&type=code
- https://news.ycombinator.com/item?id=34032872
- https://thakkarparth007.github.io/copilot-explorer/posts/copilot-internals.html
