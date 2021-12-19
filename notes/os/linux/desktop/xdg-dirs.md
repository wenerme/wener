---
title: XDG Dirs
tags:
  - 目录结构
---

# XDG Dirs

- /etc/xdg/user-dirs.defaults
  - ~/.config/user-dirs.dirs
- ~/.config/user-dirs.locale
- [xdg-user-dirs](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)
- /etc/xdg/user-dirs.conf
  - ~/.config/user-dirs.conf

| env             | default                       |
| --------------- | ----------------------------- |
| XDG_DATA_HOME   | $HOME/.local/share            |
| XDG_CONFIG_HOME | $HOME/.config                 |
| XDG_STATE_HOME  | $HOME/.local/state            |
| XDG_CACHE_HOME  | $HOME/.cache                  |
| XDG_RUNTIME_DIR |
| XDG_DATA_DIRS   | /usr/local/share/:/usr/share/ |
| XDG_CONFIG_DIRS | /usr/local/share/:/usr/share/ |

```env title="~/.config/user-dirs.dirs"
XDG_DESKTOP_DIR="$HOME/Desktop"
XDG_DOCUMENTS_DIR="$HOME/Documents"
XDG_DOWNLOAD_DIR="$HOME/Downloads"
XDG_MUSIC_DIR="$HOME/Music"
XDG_PICTURES_DIR="$HOME/Pictures"
XDG_PUBLICSHARE_DIR="$HOME/Public"
XDG_TEMPLATES_DIR="$HOME/Templates"
XDG_VIDEOS_DIR="$HOME/Videos"
```

```bash
xdg-user-dirs-update
xdg-user-dir TEMPLATES
```

## xdg-utils

- [xdg-utils](https://www.freedesktop.org/wiki/Software/xdg-utils/)
