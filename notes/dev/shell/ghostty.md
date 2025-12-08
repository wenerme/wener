---
title: ghostty
---

# ghostty

- [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty)
  - MIT, Zig, Swift
  - 支持 Tmux Control Mode

```bash
brew install ghostty
# apk add ncurses # AlpineLinux for tic
infocmp -x | ssh SERVER -- tic -x -

ghostty +show-config

ghostty +ssh-cache --remove=user@host

infocmp xterm-ghostty
echo $TERM
```
