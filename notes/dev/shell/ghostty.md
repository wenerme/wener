---
title: ghostty
---

# ghostty

- [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty)
  - MIT, Zig, Swift
  - 支持 Tmux Control Mode

:::caution

- Support for tmux's Control Mode https://github.com/ghostty-org/ghostty/issues/1935

:::

```bash
brew install ghostty
# apk add ncurses # AlpineLinux for tic
infocmp -x | ssh SERVER -- tic -x -

ghostty +show-config

ghostty +ssh-cache --remove=user@host

infocmp xterm-ghostty
echo $TERM
```
