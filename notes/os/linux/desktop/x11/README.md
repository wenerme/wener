---
title: X11
---

# X11

- X Windows System - X, X11
  - MIT
  - by X.Org Foundation
  - since 1984-06
  - X11R7.7 6 2012-06
- CS 结构
- 参考
  - https://www.x.org/
  - [X Window System](https://en.wikipedia.org/wiki/X_Window_System)
  - https://datacadamia.com/ssh/x11/x11
  - https://linux.die.net/man/7/x
  - [mviereck/x11docker](https://github.com/mviereck/x11docker)
    - 支持 Linux & MS Windows
    - 不支持 macOS

:::caution

- X11 处于可用状态
- 针对 X11 的开发已经几乎停滞 - 不会有新的特性，兼容新的环境
- 建议 xwayland

:::

## Commands

- xdm - X Display Manager
- xinit
  - /etc/X11/xinit/xinitrc
  - /etc/X11/xinit/Xsession
  - /etc/X11/xinit/xserverrc
- startx
- xauth
  - https://en.wikipedia.org/wiki/X_Window_authorization#Cookie-based_access
- xvfb-run
- [Xvfb](./xvfb.md)
- xdpyinfo
- xmessage
  - 窗口显示信息
  - `(fluxbox -v; fluxbox -info | sed 1d) | xmessage -file - -center`
- xwininfo - 查看窗口
- wmctrl
  - 切换窗口状态
  - 关闭窗口
- xdottool
  - 最小化
- xprop - 窗口熟悉

```bash
xwininfo -root -children -tree
wmctrl -l # 窗口列表
wmctrl -d # desktop/workspace 列表 - DG - desktop geometry, VP viewport position, WA workarea geometry

# F9 -> Insert
xmodmap -e "keycode 75 = Insert Insert Insert"
```

- iTerm2
  - Preferences -> Keys -> Key Mappings -> +


```txt title="$HOME/.Xresources"
XTerm*selectToClipboard: true
```

```bash
xrdb -merge ~/.Xresources
```

## ssh

```
Host remote.host.name
ForwardX11 yes
```
